<?php
session_start();
$order = isset($_SESSION['order']) ? $_SESSION['order'] : '-';
$country = isset($_SESSION['country']) ? $_SESSION['country'] : '-';
$name = isset($_SESSION['name']) ? $_SESSION['name'] : '-';
$phone = isset($_SESSION['phone']) ? $_SESSION['phone'] : '-';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>DELIVERY</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
</head>
<body>
<h1>Спасибо!</h1>
<h3>Информация о заказе:</h3>
<p><?= $order ?></p>
<p><?= $name ?></p>
<p><?= $phone ?></p>
<h3>Данные для доставки:</h3>
<div>
    <form action="" method="POST">
        <input type="hidden" name="template" value="delivery"/>
        <input type="hidden" name="order" value="<?= $order ?>"/>
        <input type="text" name="zip" placeholder="Почтовый индекс" required/>
        <input type="text" name="city" placeholder="Город" required/>
        <input type="text" name="street" placeholder="Улица" required/>
        <input type="text" name="house" placeholder="Дом" required/>
        <input type="text" name="flat" placeholder="Квартира"/>
        <button class="form-button" type="submit">Передать</button>
    </form>
</div>
</body>
</html>