<?php

// удалить или закомменитировать эти 2 строки при отладке
error_reporting(0);
ini_set('display_errors', 0);

// настройки
$username = 'xxx'; // email
$password = 'xxx'; // pass
$channel = 'xxx'; // channel

$name = isset($_POST['name']) ? $_POST['name'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';

$data = [
    'channel' => $channel,
    'ip' => $_SERVER['REMOTE_ADDR'],
    'name' => $name,
    'phone' => $phone,
    'data1' => isset($_POST['data1']) ? $_POST['data1'] : '',
    'data2' => isset($_POST['data2']) ? $_POST['data2'] : '',
    'data3' => isset($_POST['data3']) ? $_POST['data3'] : '',
    'data4' => isset($_POST['data4']) ? $_POST['data4'] : '',
    'data5' => isset($_POST['data5']) ? $_POST['data5'] : '',
];

$headers = [];

if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    array_push($headers, 'X-Forwarded-For: ' . $_SERVER['HTTP_X_FORWARDED_FOR']);
}

if (isset($_SERVER['HTTP_USER_AGENT']) && !empty($_SERVER['HTTP_USER_AGENT'])) {
    array_push($headers, 'User-Agent: ' . $_SERVER['HTTP_USER_AGENT']);
}

if (isset($_POST['referer']) && !empty($_POST['referer'])) {
    array_push($headers, 'Referer: ' . $_POST['referer']);
}

// определение класса устройства
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;
$data['ismobile'] = (int)$detect->isMobile();

// класс для отправки лида в КМА
require_once 'KmaLead.php';

$kma = KmaLead::getInstance();

// включить вывод ошибок
//$kma->debug = true;

// отправка лида
$order = $kma->sendLead($username, $password, $data, $headers);

// заказ успешно создан
if (!empty($order)) {
    include_once 'tpl_success.php';
    exit();
}

// вывод ошибок
include_once 'tpl_error.php';
