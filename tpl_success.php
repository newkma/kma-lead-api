<!DOCTYPE html>
<html lang='ru'>
<head>
    <meta http-equiv='Content-Type' content='text/html;charset=UTF-8'>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Поздравляем! Ваш заказ принят!</title>
    <link type='text/css' rel='stylesheet' href='css_success/style.css'>
</head>
<body>
<div class='wrap_block_success'>
    <div class='block_success'>
        <h2>Поздравляем! Ваш заказ принят!</h2>
        <p class='order_number'>Код заказа: <span><?= $order ?></span></p>
        <h2>Проверьте правильность введенных данных</h2>
        <p class='order_number'>Имя: <span><?= $name ?></span></p>
        <p class='order_number'>Телефон: <span><?= $phone ?></span></p>
        <p class='success'>В ближайшее время с вами свяжется оператор для подтверждения заказа. Пожалуйста, включите ваш контактный телефон.</p>
    </div>
</div>
</body>
</html>