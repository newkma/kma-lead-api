<?php

class KmaLead
{
    private $leadAddUrl = 'https://api.kma.biz/lead/add';
    private $leadUpdateUrl = 'https://api.kma.biz/lead/update';
    private $clickUrl = 'https://api.kma.biz/click/make';
    private $token;
    private $headers = [];
    public $debug = false;

    const LEAD_ADD_FIELDS = ['name', 'surname', 'phone', 'data1', 'data2', 'data3', 'data4', 'data5', 'fbp', 'click', 'referer', 'return_page', 'client_data'];
    const LEAD_UPDATE_FIELDS = ['order', 'zip', 'city', 'street', 'house', 'flat'];

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
        $this->setClickHeaders($channel);
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
     * @param array $data
     * @return bool|array
     */
    public function addLead($data)
    {
        $result = $this->sendRequest($data, $this->leadAddUrl);
        $this->echoDebugMessage($data);
        $array = json_decode($result, true);
        $this->echoDebugMessage(json_last_error() === JSON_ERROR_NONE ? $array : $result);
        if (isset($array['order'])) {
            return $array;
        }
        if (isset($array['code'], $array['message'])) {
            $this->echoDebugMessage("Код ошибки: {$array['code']}. Текст ошибки: {$array['message']}");
            return false;
        }
        return false;
    }

    /**
     * @param array $data
     * @return bool|array
     */
    public function updateLead($data)
    {
        $result = $this->sendRequest($data, $this->leadUpdateUrl);
        $this->echoDebugMessage($data);
        $array = json_decode($result, true);
        $this->echoDebugMessage(json_last_error() === JSON_ERROR_NONE ? $array : $result);
        if (isset($array['order'])) {
            return $array;
        }
        if (isset($array['code'], $array['message'])) {
            $this->echoDebugMessage("Код ошибки: {$array['code']}. Текст ошибки: {$array['message']}");
            return false;
        }
        return false;
    }

    /**
     * @param array $data
     * @return string
     */
    public function addLeadAndReturnPage($data)
    {
        $result = $this->sendRequest($data, $this->leadAddUrl);
        $this->echoDebugMessage($data);
        return $result;
    }

    /**
     * @param array $data
     * @param string $url
     * @return bool|string
     */
    private function sendRequest($data, $url)
    {
        $this->setHeaders();
        if ($curl = curl_init()) {
            $this->echoDebugMessage(" - Отправка запроса апи - ");
            curl_setopt($curl, CURLOPT_URL, $url);
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
        if (isset($this->headers['Host']) && !empty($this->headers['Host'])) {
            $this->headers['X-Host-Url'] = $_SERVER['REQUEST_SCHEME'] . "://" . $this->headers['Host'] . $_SERVER['REQUEST_URI'];
        }
        $this->filterHeaders();
        $this->headers['Accept'] = 'application/json';
        $this->headers['Authorization'] = "Bearer {$this->token}";
    }

    private function filterHeaders()
    {
        unset($this->headers['Host']);
        unset($this->headers['Cookie']);
        unset($this->headers['Content-Type']);
        unset($this->headers['Content-Length']);
        unset($this->headers['Referer']);
    }

    /**
     * @param string $channel
     */
    private function setClickHeaders($channel)
    {
        $this->headers['X-Forwarded-For'] = $this->getIp();
        $this->headers['X-Kma-Channel'] = $channel;
        if (isset($this->headers['X-Referer']) && !empty($this->headers['X-Referer'])) {
            $this->headers['Referer'] = $this->headers['X-Referer'];
            unset($this->headers['X-Referer']);
        }
    }

    private function echoDebugMessage($data)
    {
        if ($this->debug) {
            if (is_array($data)) {
                echo '<pre>';
                print_r($data);
                echo '</pre>';
            } else {
                echo "<br> $data <br>";
            }
        }
    }

    /**
     * @return string
     */
    public function getIp()
    {
        foreach ([
                     'HTTP_CF_CONNECTING_IP',
                     'HTTP_X_FORWARDED_FOR',
                     'REMOTE_ADDR',
                 ] as $key) {
            if (array_key_exists($key, $_SERVER)) {
                $ips = explode(',', $_SERVER[$key]);
                $ips = array_map('trim', $ips);
                $ips = array_filter($ips);
                foreach ($ips as $ip) {
                    $ip = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
                    if (!empty($ip)) {
                        return $ip;
                    }
                    $ip = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
                    if (!empty($ip)) {
                        return $ip;
                    }
                }
            }
        }
        return '127.0.0.1';
    }

    /**
     * @param array $data
     * @param array $fields
     */
    public function appendData(&$data, $fields = [])
    {
        foreach ($fields as $item) {
            if (isset($_POST[$item]) && !empty($_POST[$item])) {
                $data[$item] = $_POST[$item];
            }
        }
    }
}
