<?php

class KmaLead
{
    private $url = 'https://api.kma1.biz/lead/add';
    private $token;
    private $headers = [];
    protected static $_instance;
    public $debug = false;

    public static function getInstance()
    {
        if (null === static::$_instance) {
            static::$_instance = new static();
        }
        return static::$_instance;
    }

    public function setToken($token = '')
    {
        $this->token = $token;
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

    public function sendLead($data)
    {
        if ($result = $this->send($data)) {
            if (($result['code'] == 0) && isset($result['id'])) {
                return $result['id'];
            }
        }
        return false;
    }

    private function send($data)
    {
        $array = $this->sendRequest($data);
        if (empty($array)) {
            return false;
        }
        if ($array['code'] == 0) {
            return ['code' => 0, 'id' => $array['order']];
        } else {
            $this->_debugMsg('Код ошибки: ' . $array['code'] . '. Текст ошибки: ' . $array['message']);
            return ['code' => $array['code']];
        }
    }

    private function sendRequest($data)
    {
        if ($curl = curl_init()) {
            $this->_debugMsg(" - Отправка запроса апи {$data['method']} - ");
            curl_setopt($curl, CURLOPT_URL, $this->url);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $this->getHeaders());
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
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

    private function getHeaders()
    {
        $this->setHeaders();
        array_walk($this->headers, function (&$value, $key) {
            $value = "$key: $value";
        });
        return array_values($this->headers);
    }

    private function setHeaders()
    {
         foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $this->headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        $this->filterHeaders();
        $this->headers['Accept'] = 'application/json';
        $this->headers['Authorization'] = "Bearer {$this->token}";
    }

    private function filterHeaders()
    {
        // убираем перекрывающие заголовки
        unset($this->headers['Host']);
        unset($this->headers['Cookie']);
        unset($this->headers['Content-Type']);
        unset($this->headers['Content-Length']);
        // в кастомный заголовок Hostname нужно передать текущий Host
        if (isset($this->headers['Referer']) && !empty($this->headers['Referer'])) {
            $this->headers['Hostname'] = $this->headers['Referer'];
        }
        // в любом случае очистить Referer - он будет равен Host
        unset($this->headers['Referer']);
        // записать в Referer переданное в POST значение из JS
        if (isset($_POST['referer']) && !empty($_POST['referer'])) {
            $this->headers['Referer'] = $_POST['referer'];
        }
    }
}
