<?php session_start(); require_once dirname(__DIR__) . "/_session.php"; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Спасибо!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="img/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="img/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="img/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="img/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="img/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="img/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="img/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
    <link rel="manifest" href="img/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="img/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
</head>
<body>
<div class="wrap">
    <header class="header">
        <div class="header__left">
            <div class="header__title">
                Спасибо!
            </div>
            <div class="header__description">
                <h3>Пожалуйста, не выключайте Ваш контактный телефон.</h3>
                Ваш заказ оформлен, и принят к исполнению нашими сотрудниками! В ближайшее время с Вами свяжется
                менеджер для уточнения деталей.
            </div>
        </div>
        <div class="header__right">
            <div class="header__info">
                <div class="header__info-title">
                    Информация о заказе:
                </div>
                <div class="header__info-order"><?= $order ?></div>
                <div class="header__info-phone"><?= $phone ?></div>
                <div class="header__info-name"><?= $name ?></div>
            </div>
        </div>
    </header>
    <main class="main-content">
        <h1 class="main-content__title">
            КАК ПОЛУЧИТЬ МАКСИМАЛЬНЫЙ ЭФФЕКТ ОТ ВАШЕЙ ПОКУПКИ? </h1>
        <div class="main-content__description">
            Получите подробную инструкцию, узнайте, как использовать покупку на 100% эффективно!
        </div>
        <div class="form-block">
            <div class="form-block__left">
                <div class="form-block__left-info">
                    Подтвердите свой е-mail в течение 2 часов, чтобы получить получить детальную инструкцию по
                    использованию нашей продукции, для достижения лучших результатов!
                </div>
                <div class="form-block__left-discount">
                    А щё мы подарим вам постоянную скидку 75% на все покупки! Следите за нашими акциями!
                </div>
            </div>
            <div class="form-block__right">
                <div class="form-wrap">
                    <div class="form-wrap__title">
                        Оставьте свой e-mail и мы вышлем Вам детальную инструкцию по использованию нашей продукции!
                    </div>
                    <form action="#" class="main-form" method="POST">
                        <input type="email" name="email" class="main-form__email" placeholder="Оставьте e-mail…"
                               required="">
                        <button type="submit" class="main-form__button">Получить инструкцию</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer">
        <div class="footer__text">
            Мы не разглашаем Ваши личные данные и не передаем оставленную Вами информацию третьим лицам. Нажав на
            кнопку, вы соглашаетесь на получение новостей об акциях, скидках и новинках.
        </div>
    </footer>
</div>
<script src="js/jquery-2.2.4.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("form.main-form").on("submit", function () {
            $.post(
                "https://system.trackerlead.biz/user/subscribe",
                {feedback_email: $("input.main-form__email").val(), orderid: "<?= $order ?>"}
            );
            $(this).fadeOut("fast", function () {
                $(this).parent().append("<p style='font-size: 1.2em; line-height: 2em; text-align: center;'>Спасибо!</p>");
            });
            return false;
        });
    });
</script>
</body>
</html>