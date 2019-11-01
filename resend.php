<?php

if (is_file('config.php')) {
    require_once 'config.php';
} else {
    exit('Для начала работы необходимо сконфигурировать приложение');
}

$fn = fopen(__DIR__ . '/lead-' . sha1(KMA_ACCESS_TOKEN . KMA_CHANNEL) . '.txt','r');
while(! feof($fn))  {
    $result = fgets($fn);
    $array = json_decode($result, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($array)) {
        /** @var KmaLead $kma */
        $kma = new KmaLead($token);
        // TODO: убрать строку из файла, если успех (пересоздать файл с неуспешными результатами)
        $kma->resendRequest($array['data'], $array['headers']);
    }
}
fclose($fn);

// TODO: удаление файла
//@unlink(__DIR__ . '/lead-' . sha1(KMA_ACCESS_TOKEN . KMA_CHANNEL) . '.txt');

exit;
