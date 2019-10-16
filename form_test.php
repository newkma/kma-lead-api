<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Payment</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
    <link rel="stylesheet" href="css/payment_style.css">
</head>
<body>
    <div class="top">
        <div class="container">
            <p>PRODUCT NAME</p>
        </div>
    </div>
    <div class="body_form">
        <div class="container">
            <div class="steps">
                <div class="step active">
                    <p>¡Pedir ahora!</p>
                </div>
                <div class="step">
                    <p>Confirmar el pedido</p>
                </div>
                <div class="step">
                    <div class="circ"></div>
                </div>
            </div>
            <h2>¡Efectúe el pedido hoy mismo!</h2>
            <form action="success.php" class="first_form" method="post">
                <p>Indique su nombre</p>
                <input type="text" name="name" placeholder="e.g. John" value="" required>
                <div class="error_block_text">No ha indicado su nombre</div>
                <p>Indique sus apellidos</p>
                <input type="text" name="surname" placeholder="e.g. Smith" value="" required>
                <div class="error_block_text">No ha indicado sus apellidos</div>
                <p>Y su número de teléfono</p>
                <input type="tel" name="phone" placeholder="+34" value="" required>
                <div class="error_block_text">No ha indicado su número de teléfono</div>
                <button type="submit"><span>Continuar</span></button>
            </form>
        </div>
    </div>
    <div class="deliv">
        <div class="container">
            <p class="ctr">Nos importa su privacidad.</p>
            <a href="#" class="shipping">
                <b>Fast, Free Shipping</b> For A Limited Time
            </a>
            <div class="flex">
                <div class="i_flex"><img src="img/payment/1.jpg" alt=""></div>
                <div class="i_flex"><img src="img/payment/2.jpg" alt=""></div>
                <div class="i_flex"><img src="img/payment/3.jpg" alt=""></div>
            </div>
        </div>
    </div>
    <div class="secure">
        <div class="container">
            <img src="img/payment/safe.jpg" alt="">
        </div>
    </div>
    <div class="copyright">
        <div class="container">
            <p class="cop">Copyright © 2019 </p>
            <p>

            </p>
        </div>
    </div>
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>