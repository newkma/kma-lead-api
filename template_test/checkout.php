<?php
session_start();
$order = isset($_SESSION['order']) ? $_SESSION['order'] : '-';
$country = isset($_SESSION['country']) ? $_SESSION['country'] : '-';
$name = isset($_SESSION['name']) ? $_SESSION['name'] : '-';
$phone = isset($_SESSION['phone']) ? $_SESSION['phone'] : '-';
$price = isset($_SESSION['price']) ? $_SESSION['price'] : '-';
$currency = isset($_SESSION['currency']) ? $_SESSION['currency'] : '-';
?>
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
<p><?= $order ?></p>
<p><?= $name ?></p>
<p><?= $phone ?></p>
<h3>Оплатить:</h3>
<button id="payout_button" type="button"><span>Pay</span></button>
</body>
</html>