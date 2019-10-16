<?php session_start(); require_once dirname(__DIR__) . "/_session.php"; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>CHECKOUT</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://widget.cloudpayments.ru/bundles/cloudpayments"></script>
    <script type="text/javascript">
        $(function () {
            $('#payout_button').click(function() {
                var widget = new cp.CloudPayments({language: "en-US"});
                widget.charge({
                        publicId: 'pk_f7d9735203451116661c46ad06082',
                        description: 'Pay order #<?= $order ?>',
                        amount: <?= $price ?>,
                        currency: '<?= $currency ?>',
                        invoiceId: <?= $order ?>,
                        skin: "mini",
                    },
                    function (options) {
                        alert('Оплата прошла успешно!');
                    },
                    function (reason, options) {
                        alert('Произошла ошибка во время оплаты!');
                    });
            });
            return false;
        });
    </script>
</head>
<body>
<h1>Спасибо!</h1>
<h3>Информация о заказе:</h3>
<p>Номер заказа: <?= $order ?></p>
<p>Имя: <?= $name ?></p>
<p>Фамилия: <?= $surname ?></p>
<p>Телефон: <?= $phone ?></p>
<h3>Оплатить:</h3>
<button id="payout_button" type="button"><span>Pay</span></button>
</body>
</html>