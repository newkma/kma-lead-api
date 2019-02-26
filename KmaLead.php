<?php

class KmaLead
{
    private $leadUrl = 'https://api.kma.biz/lead/add';
    private $clickUrl = 'https://api.kma.biz/click/make';
    private $token;
    private $headers = [];
    public $debug = false;

    /**
     * @param string $token
     */
    public function __construct($token = '')
    {
        $this->token = $token;
    }

    /**
     * @param string $channel
     * @return bool|string
     */
    public function getClick($channel)
    {
        $this->setHeaders();
        $this->headers['X-Forwarded-For'] = $_SERVER['REMOTE_ADDR'];
        $this->headers['X-Kma-Channel'] = $channel;
        if ($curl = curl_init()) {
            curl_setopt($curl, CURLOPT_URL, $this->clickUrl . "?" . http_build_query($_GET));
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $this->getHeaders());
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($curl);
            curl_close($curl);
            header('Content-Type: application/json');
            return $result;
        }
        return "{}";
    }

    /**
     * @param $data
     * @param bool $render
     * @return bool|string
     */
    public function sendLead($data, $render = false)
    {
        $result = $this->send($data, $render);
        if ($render) {
            return $result;
        } else {
            return (!empty($result) && isset($result['id'])) ? $result['id'] : false;
        }
    }

    /**
     * @param array $data
     * @param bool $render
     * @return bool|string|array
     */
    private function send($data, $render)
    {
        $result = $this->sendRequest($data);
        $this->echoDebugMessage($data);
        if ($render) {
            return $result;
        }
        $array = json_decode($result, true);
        $this->echoDebugMessage($array);
        if (empty($array)) {
            return false;
        }
        if ($array['code'] == 0) {
            return ['code' => 0, 'id' => $array['order']];
        } else {
            $this->echoDebugMessage("Код ошибки: {$array['code']}. Текст ошибки: {$array['message']}");
            return ['code' => $array['code']];
        }
    }

    /**
     * @param array $data
     * @return bool|string
     */
    private function sendRequest($data)
    {
        $this->setHeaders();
        if ($curl = curl_init()) {
            $this->echoDebugMessage(" - Отправка запроса апи {$data['method']} - ");
            curl_setopt($curl, CURLOPT_URL, $this->leadUrl);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $this->getHeaders());
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLINFO_HEADER_OUT, true);
            $result = curl_exec($curl);
            $header_out = curl_getinfo($curl, CURLINFO_HEADER_OUT);
            curl_close($curl);
            $this->echoDebugMessage("<pre>$header_out</pre>");
            return $result;
        }
        return false;
    }

    /**
     * @return array
     */
    private function getHeaders()
    {
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
        if (isset($this->headers['Host']) && !empty($this->headers['Host'])) {
            $this->headers['X-Host-Url'] = $_SERVER['REQUEST_SCHEME'] . "://" . $this->headers['Host'];
        }
        unset($this->headers['Host']);
        unset($this->headers['Cookie']);
        unset($this->headers['Content-Type']);
        unset($this->headers['Content-Length']);
        unset($this->headers['Referer']);
        if (isset($this->headers['X-Referer']) && !empty($this->headers['X-Referer'])) {
            $this->headers['Referer'] = $this->headers['X-Referer'];
        }
        unset($this->headers['X-Referer']);
    }

    private function echoDebugMessage($data)
    {
        if ($this->debug) {
            if (is_array($data)) {
                echo '<pre>'; print_r($data); echo '</pre>';
            } else {
                echo "<br> $data <br>";
            }
        }
    }
}
