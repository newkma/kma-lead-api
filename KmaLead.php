<?php

class KmaLead
{
    private $_apiUrl = 'http://api.kma1.biz/';
    protected static $_instance;
    private $_pdo = null;
    public $debug = false;

    public static function getInstance()
    {
        if (null === static::$_instance) {
            static::$_instance = new static();
        }

        return static::$_instance;
    }

    private function _debugMsg($data)
    {
        if ($this->debug) {
            if (is_array($data)) {
                echo '<pre>'; print_r($data); echo '</pre>';
            } else {
                echo "<br> $data <br>";
            }
        }
    }

    private function _connectDb()
    {
        try {
            $this->_pdo = new PDO('sqlite:kma.sqlite3');
        } catch (PDOException $e) {
            return false;
        }
        return true;
    }

    private function _getAuth()
    {
        if ($this->_pdo == null) {
            $this->_connectDb();
        }

        if ($this->_pdo != null) {
            $stmt = $this->_pdo->prepare("SELECT id, hash FROM kma_api_hash");
            if (!empty($stmt)) {
                $stmt->execute();
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
        }
    }

    private function _setAuth($auth)
    {
        $id = isset($auth['id']) ? $auth['id'] : 0;
        $hash = isset($auth['hash']) ? $auth['hash'] : '';

        if (empty($id) || empty($hash)) {
            $this->_debugMsg('Ошибка при записи авторизационных данных.');
            return false;
        }

        if ($this->_pdo == null) {
            $this->_connectDb();
        }

        if ($this->_pdo != null) {
            $this->_pdo->exec("CREATE TABLE IF NOT EXISTS kma_api_hash (id INTEGER PRIMARY KEY, hash TEXT, time INTEGER)");

            $stmt = $this->_pdo->prepare("REPLACE INTO kma_api_hash (id, hash, time) VALUES (:id, :hash, :time)");
            return $stmt->execute([
                ':id' => $id,
                ':hash' => $hash,
                ':time' => time(),
            ]);
        }
    }

    public function auth($username, $password, $generate = false)
    {
        if (empty($username) || empty($password)) {
            $this->_debugMsg('Не указан email или пароль!');
            return false;
        }

        if (empty($generate)) {
            $auth = $this->_getAuth();

            if (!empty($auth)) {
                $this->_debugMsg('- Использование сохранненых данных авторизации -');
                $this->_debugMsg($auth);
                return $auth;
            }
        }

        $data = [
            'method' => 'auth',
            'username' => $username,
            'pass' => $password
        ];

        $array = $this->sendRequest($data, []);

        $this->_debugMsg('- Генерирование новых данных авторизации -');
        $this->_debugMsg($array);

        if (empty($array)) {
            return false;
        }

        if ($array['code'] == 0) {
            $auth = ['id' => $array['authid'], 'hash' => $array['authhash']];
            $this->_setAuth($auth);
            return $auth;
        } else {
            $this->_debugMsg('Код ошибки: ' . $array['code'] . '. Текст ошибки: ' . $array['msg']);
            return false;
        }
    }

    public function sendLead($username, $password, $data, $headers)
    {
        if ($auth = $this->auth($username, $password)) {
            if ($result = $this->send($auth, $data, $headers)) {
                if (($result['code'] == 0) && isset($result['id'])) {
                    return $result['id'];
                } elseif ($result['code'] == 6) {
                    // если была ошибка авторизации получаем новый хеш для авторизации и повторям создание лида
                    if ($auth = $this->auth($username, $password, true)) {
                        if ($result = $this->send($auth, $data, $headers)) {
                            if (($result['code'] == 0) && isset($result['id'])) {
                                return $result['id'];
                            }
                        }
                    }
                }
            }
        }
    }

    public function send($auth, $data, $headers)
    {
        $data['method'] = 'addlead';
        $data['authid'] = isset($auth['id']) ? $auth['id'] : 0;
        $data['authhash'] = isset($auth['hash']) ? $auth['hash'] : '';

        $array = $this->sendRequest($data, $headers);

        if (empty($array)) {
            return false;
        }

        if ($array['code'] == 0) {
            return ['code' => 0, 'id' => $array['orderid']];
        } else {
            $this->_debugMsg('Код ошибки: ' . $array['code'] . '. Текст ошибки: ' . $array['msg']);
            return ['code' => $array['code']];
        }
    }

    private function sendRequest($data, $headers)
    {
        if ($curl = curl_init()) {
            $this->_debugMsg(" - Отправка запроса апи {$data['method']} - ");
            curl_setopt($curl, CURLOPT_URL, $this->_apiUrl);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
            if (!empty($headers)) {
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            }
            curl_setopt($curl, CURLINFO_HEADER_OUT, true);
            $result = curl_exec($curl);
            $header_out = curl_getinfo($curl, CURLINFO_HEADER_OUT);
            curl_close($curl);
            $array = json_decode($result, true);
            $this->_debugMsg("<pre>$header_out</pre>");
            $this->_debugMsg($data);
            $this->_debugMsg($array);
            return $array;
        }

        return false;
    }
}
