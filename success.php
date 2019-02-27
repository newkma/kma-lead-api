<?php

if (is_file('config.php')) {
    require_once 'config.php';
} else {
    exit('CONFIG FILE NOT EXIST');
}

$token = defined('KMA_ACCESS_TOKEN') ? KMA_ACCESS_TOKEN : 'access token';
$channel = defined('KMA_CHANNEL') ? KMA_CHANNEL : 'channel';
$debug = defined('KMA_DEBUG') ? KMA_DEBUG : false;

if ($debug) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

require_once 'KmaLead.php';

/** @var KmaLead $kma */
$kma = new KmaLead($token);

if (isset($_SERVER['HTTP_X_KMA_API']) && $_SERVER['HTTP_X_KMA_API'] === 'click') {
    echo $kma->getClick($channel);
    exit();
} elseif ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit();
}

$data = [
    'channel' => $channel,
    'ip' => $_SERVER['REMOTE_ADDR'],
];

foreach (['name', 'phone', 'data1', 'data2', 'data3', 'data4', 'data5', 'click', 'referer', 'return_page'] as $item) {
    if (isset($_POST[$item]) && !empty($_POST[$item])) {
        $data[$item] = $_POST[$item];
    }
}

$kma->debug = $debug;

if (isset($_POST['return_page']) && !empty($_POST['return_page'])) {
    echo $kma->sendLead($data, true);
    exit();
} else {
    $order = $kma->sendLead($data);
    $name = $data['name'];
    $phone = $data['phone'];
}

if (empty($order)) {
    include_once 'tpl_error.php';
} else {
    include_once 'tpl_success.php';
}

exit();
