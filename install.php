<?php

$check = [];
if (phpversion() < '5.4') {
    $check[] = 'Версия PHP должна быть >5.4 для работы скриптов API';
}
if (!extension_loaded('curl')) {
    $check[] = 'Расширение CURL должно быть загружено для работы по API';
}
if (!is_writable('install.php')) {
    $check[] = 'Сервер не позволяет записывать файлы';
}
if (!empty($check)) {
    echo "<p>Для работы API необходимо устранить следующие проблемы:</p>";
    echo "<pre>"; echo var_export($check, true); echo "</pre>";
    exit();
}

if (is_file('config.php')) {
    $exit = (isset($_GET['action']) && $_GET['action'] === 'done') ? 'Конфигурация успешно сохранена' : 'Конфигурация уже существует';
    exit($exit);
}

$valid = true;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['token']) && !empty($token = $_POST['token']) && isset($_POST['channel']) && !empty($channel = $_POST['channel'])) {
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
            $valid = false;
            $message = 'API ключ или поток не могут принимать данные значения';
        }
    } else {
        $valid = false;
        $message = 'API ключ и поток не могут быть пустыми';
    }
}

include_once 'tpl_setup.php';

exit();
