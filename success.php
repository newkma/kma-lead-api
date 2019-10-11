<?php

if (is_file('config.php')) {
    require_once 'config.php';
} else {
    exit('Для начала работы необходимо сконфигурировать приложение');
}

$token = defined('KMA_ACCESS_TOKEN') ? KMA_ACCESS_TOKEN : 'access token';
$channel = defined('KMA_CHANNEL') ? KMA_CHANNEL : 'channel';
$debug = defined('KMA_DEBUG') ? KMA_DEBUG : false;
$delivery = defined('KMA_DELIVERY') ? KMA_DELIVERY : false;
$checkout = defined('KMA_CHECKOUT') ? KMA_CHECKOUT : false;

if ($debug) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['order_status'])) {
    switch ($_GET['order_status']) {
        case 'success':
            include_once 'template/success.php';
            break;
        case 'error':
            include_once 'template/error.php';
            break;
        case 'delivery':
            include_once 'template/delivery.php';
            break;
        case 'checkout':
            include_once 'template/checkout.php';
            break;
        default:
            exit('Template not exists');
    }
    exit();
}

require_once 'KmaLead.php';

/** @var KmaLead $kma */
$kma = new KmaLead($token);

if (isset($_SERVER['HTTP_X_KMA_API']) && $_SERVER['HTTP_X_KMA_API'] === 'click') {
    echo $kma->getClick($channel);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Required method: POST');
}

$kma->debug = $debug;

$data = [
    'channel' => $channel,
    'ip' => $kma->getIp(),
];

if (isset($_POST['template'])) {
    switch ($_POST['template']) {
        case 'delivery':
            foreach (['order', 'zip', 'city', 'street', 'house', 'flat'] as $item) {
                if (isset($_POST[$item]) && !empty($_POST[$item])) {
                    $data[$item] = $_POST[$item];
                }
            }
            $array = $kma->updateLead($data);
            if (empty($array)) {
                exit('Update lead error');
            } else {
                $template = $checkout ? 'checkout' : 'success';
                header("Location: success.php?order_status=$template");
            }
            break;
        default:
            exit('Template not exists');
    }
    exit();
}

foreach (['name', 'surname', 'phone', 'data1', 'data2', 'data3', 'data4', 'data5', 'fbp', 'click', 'referer', 'return_page', 'client_data'] as $item) {
    if (isset($_POST[$item]) && !empty($_POST[$item])) {
        $data[$item] = $_POST[$item];
    }
}

if (isset($_POST['return_page']) && !empty($_POST['return_page'])) {
    echo $kma->addLeadAndReturnPage($data);
} else {
    $array = $kma->addLead($data);
    if (empty($array)) {
        header("Location: success.php?order_status=error");
    } else {
        session_start();
        $_SESSION['order'] = $array['order'];
        $_SESSION['country'] = $array['country'];
        $_SESSION['name'] = $name;
        $_SESSION['phone'] = $phone;
        $template = $delivery ? 'delivery' : 'success';
        header("Location: success.php?order_status=$template");
    }
}

exit();
