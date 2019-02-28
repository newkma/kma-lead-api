<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Установка</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
    <link rel="stylesheet" href="css_setup/style.css">
</head>
<body>
<div class="wrap">
    <main class="main-content">
        <?php if (isset($successMsg)) : ?>
            <h1 class="main-content__title">ВСЕ ГОТОВО</h1>
            <div class="main-content__description"><?= $successMsg ?></div>
        <?php else : ?>
            <h1 class="main-content__title">УСТАНОВКА</h1>
            <div class="main-content__description">Пожалуйста, выполните все шаги, и удостовертесь, что все проверки выполнены успешно</div>
            <div class="steps">
                <p>1. Убедитесь, что перечисленные ниже расширения установлены:</p>
                <div class="table-responsive">
                    <table border>
                        <thead>
                        <tr>
                            <th>Расширение</th>
                            <th>Ваши текущие настроки</th>
                            <th>Необходимые настроки</th>
                            <th>Статус соответствия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Версия PHP</td>
                            <td><?= phpversion() ?></td>
                            <td>5.4.0</td>
                            <td><i class="<?= $checkReq['php'] ? 'success' : 'reject' ?>"></i></td>
                        </tr>
                        <tr>
                            <td>cURL</td>
                            <td><?= $checkReq['php'] ? 'Подключено' : 'Не подключено' ?></td>
                            <td>Подключено</td>
                            <td><i class="<?= $checkReq['curl'] ? 'success' : 'reject' ?>"></i></td>
                        </tr>
                        <tr>
                            <td>Создание файлов</td>
                            <td><?= $checkReq['file_create'] ? 'Возможно' : 'Невозможно' ?></td>
                            <td>Возможно</td>
                            <td><i class="<?= $checkReq['file_create'] ? 'success' : 'reject' ?>"></i></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <?php if ($allReqOk) : ?>
                    <p>2. Введите значения Вашего токена и потока</p>
                    <form class="horizontal-form" action="install.php" method="POST">
                        <input class="form-input" type="text" name="token" placeholder="Token"/>
                        <input class="form-input" type="text" name="channel" placeholder="Поток"/>
                        <button class="form-button" type="submit">Сохранить</button>
                    </form>
                <? endif; ?>
            </div>
            <?php if (isset($inputErrorMsg)) : ?>
                <div><?= $inputErrorMsg ?></div>
            <?php endif; ?>
        <?php endif; ?>
    </main>
</div>
</body>
</html>