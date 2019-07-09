<?php

if (is_file('config.php')) {
    require_once 'config.php';
} else {
    exit('Для начала работы необходимо сконфигурировать приложение');
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
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit();
}

$data = [
    'channel' => $channel,
    'ip' => $_SERVER['REMOTE_ADDR'],
];

foreach (['name', 'phone', 'data1', 'data2', 'data3', 'data4', 'data5', 'click', 'referer', 'return_page', 'client_data'] as $item) {
    if (isset($_POST[$item]) && !empty($_POST[$item])) {
        $data[$item] = $_POST[$item];
    }
}

$kma->debug = $debug;

if (isset($_POST['return_page']) && !empty($_POST['return_page'])) {
    echo $kma->addLeadAndReturnPage($data);
    exit();
} else {
    $order = $kma->addLead($data);
    $name = $data['name'];
    $phone = $data['phone'];
}

if (empty($order)) {
    include_once 'template/error.php';
} else {
    session_start();
    $_SESSION['order'] = $order;
    $_SESSION['name'] = $name;
    $_SESSION['phone'] = $phone;
    header('Location: template/success.php');
}

exit();
