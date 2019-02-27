<?php

$check = [];
if (phpversion() < '5.4') {
    $check[] = 'You need to use PHP5.4+ or above for API work';
}
if (!extension_loaded('curl')) {
    $check[] = 'CURL extension needs to be loaded for API work';
}
if (!empty($check)) {
    echo "<h1>Для работы API необходимо устранить следующие проблемы:</h1>";
    echo "<pre>"; echo var_export($check, true); echo "</pre>";
    exit();
}

if (is_file('config.php')) {
    echo 'CONFIG EXIST';
    exit();
}

$valid = true;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $valid = isset($_POST['token']) && !empty($token = $_POST['token']) && isset($_POST['channel']) && !empty($channel = $_POST['channel']);
    if ($valid) {
        $valid = preg_match('/^\w{6}$/', $channel) && preg_match('/^[\w-]{32}$/', $token);
        if ($valid) {
            $output  = "<?php" . PHP_EOL . PHP_EOL;
            $output .= "define('KMA_ACCESS_TOKEN', '$token');" . PHP_EOL;
            $output .= "define('KMA_CHANNEL', '$channel');" . PHP_EOL;
            $output .= "define('KMA_DEBUG', false);" . PHP_EOL;
            $file = fopen('config.php', 'w');
            fwrite($file, $output);
            fclose($file);
            echo 'CONFIG SAVED';
            exit();
        } else {
            $message = 'API ключ или поток не могут принимать данные значения';
        }
    } else {
        $message = 'API ключ и поток не могут быть пустыми';
    }
}

include_once 'setup.php';
exit();
