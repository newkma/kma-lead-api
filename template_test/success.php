<?php session_start(); require_once dirname(__DIR__) . "/_session.php"; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>SUCCESS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
</head>
<body>
<h1>Спасибо!</h1>
<h3>Информация о заказе:</h3>
<p>Номер заказа: <?= $order ?></p>
<p>Имя: <?= $name ?></p>
<p>Фамилия: <?= $surname ?></p>
<p>Телефон: <?= $phone ?></p>
<h3>E-mail для связи:</h3>
<div>
    <form action="#" method="POST">
        <input type="email" name="email" placeholder="Оставьте e-mail…" required>
        <button type="submit">Отправить</button>
    </form>
</div>
<script src="js/jquery-2.2.4.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("form.main-form").on("submit", function () {
            $.post(
                "https://system.trackerlead.biz/user/subscribe",
                {
                    feedback_email: $("input.main-form__email").val(),
                    orderid: "<?= $order ?>",
                },
            );
            $(this).fadeOut("fast", function () {
                $(this).parent().append("<p>Спасибо!</p>");
            });
            return false;
        });
    });
</script>
</body>
</html>