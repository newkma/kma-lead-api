<?php

if (is_file('config.php')) {
    $successMsg = (isset($_GET['action']) && $_GET['action'] === 'done') ? 'Конфигурация успешно сохранена' : 'Конфигурация уже существует';
    include_once 'tpl_setup.php';
    exit();
}

$fileTest = fopen('test_create.tmp', 'w');
$checkReq = [
    'php' => phpversion() >= '5.4',
    'curl' => extension_loaded('curl'),
    'file_create' => is_resource($fileTest),
];
@unlink('test_create.tmp');
$allReqOk = !in_array(false, $checkReq);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['token']) && isset($_POST['channel'])) {
        if (preg_match('/^[\w-]{32}$/', $_POST['token']) && preg_match('/^\w{6}$/', $_POST['channel'])) {
            $output  = "<?php" . PHP_EOL . PHP_EOL;
            $output .= "define('KMA_ACCESS_TOKEN', '{$_POST['token']}');" . PHP_EOL;
            $output .= "define('KMA_CHANNEL', '{$_POST['channel']}');" . PHP_EOL;
            $output .= "define('KMA_DEBUG', false);" . PHP_EOL;
            $file = fopen('config.php', 'w');
            fwrite($file, $output);
            fclose($file);
            header('Location: install.php?action=done');
            exit();
        } else {
            $inputErrorMsg = 'API ключ или поток не могут принимать данные значения';
        }
    }
}

include_once 'tpl_setup.php';
exit();
