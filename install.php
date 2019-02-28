<?php

$fileTest = fopen('test_create.tmp', 'w');

$checkReq = [
    'php' => phpversion() >= '5.4',
    'curl' => extension_loaded('curl'),
    'file_create' => is_resource($fileTest),
];

@unlink('test_create.tmp');

$allReqOk = !in_array(false, $checkReq);

if (is_file('config.php')) {
    $exitMsg = (isset($_GET['action']) && $_GET['action'] === 'done') ? 'Конфигурация успешно сохранена' : 'Конфигурация уже существует';
    exit($exitMsg);
}

$inputDataValid = true;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST['token']) && !empty($token = $_POST['token']) &&
        isset($_POST['channel']) && !empty($channel = $_POST['channel'])
    ) {
        if (preg_match('/^[\w-]{32}$/', $token) && preg_match('/^\w{6}$/', $channel)) {
            $output  = "<?php" . PHP_EOL . PHP_EOL;
            $output .= "define('KMA_ACCESS_TOKEN', '$token');" . PHP_EOL;
            $output .= "define('KMA_CHANNEL', '$channel');" . PHP_EOL;
            $output .= "define('KMA_DEBUG', false);" . PHP_EOL;
            $file = fopen('config.php', 'w');
            fwrite($file, $output);
            fclose($file);
            header('Location: install.php?action=done');
            exit();
        } else {
            $inputDataValid = false;
            $inputErrorMsg = 'API ключ или поток не могут принимать данные значения';
        }
    } else {
        $inputDataValid = false;
        $inputErrorMsg = 'API ключ и поток не могут быть пустыми';
    }
}

include_once 'tpl_setup.php';

exit();
