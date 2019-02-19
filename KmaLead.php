<?php

class KmaLead
{
    private $leadUrl = 'https://api.kma1.biz/lead/add';
    private $clickUrl = 'https://kshop5.pro/';
    private $token;
    private $headers = [];
    public $debug = false;

    public function __construct($token = '')
    {
        $this->token = $token;
    }

    public function getClick($channel)
    {
        $_SERVER['HTTP_X_FORWARDED_FOR'] = $_SERVER['REMOTE_ADDR'];
        $_SERVER['HTTP_REFERER'] = isset($_SERVER['HTTP_X_REFERER']) ? $_SERVER['HTTP_X_REFERER'] : '';
        if ($curl = curl_init()) {
            curl_setopt($curl, CURLOPT_URL, $this->clickUrl . $channel);
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

    public function sendLead($data)
    {
        $result = $this->send($data);
        return (!empty($result) && isset($result['id'])) ? $result['id'] : false;
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
            $this->echoDebugMessage("Код ошибки: {$array['code']}. Текст ошибки: {$array['message']}");
            return ['code' => $array['code']];
        }
    }

    private function sendRequest($data)
    {
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
            $array = json_decode($result, true);
            $this->echoDebugMessage("<pre>$header_out</pre>");
            $this->echoDebugMessage($data);
            $this->echoDebugMessage($array);
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
        $this->headers['Hostname'] = $this->headers['Host'];
        unset($this->headers['Host']);
        unset($this->headers['Cookie']);
        unset($this->headers['Content-Type']);
        unset($this->headers['Content-Length']);
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
