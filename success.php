<?php

// удалить или закомменитировать эти 2 строки при отладке
error_reporting(0);
ini_set('display_errors', 0);

// настройки
$token = 'xxx'; // access token
$channel = 'xxx'; // channel

$name = isset($_POST['name']) ? $_POST['name'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';

$data = [
    'channel' => $channel,
    'ip'      => $_SERVER['REMOTE_ADDR'],
    'name'    => $name,
    'phone'   => $phone,
    'data1'   => isset($_POST['data1']) ? $_POST['data1'] : '',
    'data2'   => isset($_POST['data2']) ? $_POST['data2'] : '',
    'data3'   => isset($_POST['data3']) ? $_POST['data3'] : '',
    'data4'   => isset($_POST['data4']) ? $_POST['data4'] : '',
    'data5'   => isset($_POST['data5']) ? $_POST['data5'] : '',
];

// класс для отправки лида в КМА
require_once 'KmaLead.php';

/** @var KmaLead $kma */
$kma = KmaLead::getInstance();
$kma->setToken($token);

// включить вывод ошибок
//$kma->debug = true;

// отправка лида
$order = $kma->sendLead($data);

// заказ успешно создан
if (!empty($order)) {
    include_once 'tpl_success.php';
    exit();
}

// вывод ошибок
include_once 'tpl_error.php';
