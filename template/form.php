<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Заказ</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
</head>
<body>
<div class="wrap">
    <main class="main-content">
        <h1>Шаг 1</h1>
        <h2>Оформление заказа</h2>
        <form class="horizontal-form" action="api/success.php" method="POST">
            <input class="form-input" type="text" name="name" placeholder="Имя" required/>
            <input class="form-input" type="text" name="surname" placeholder="Фамилия" required/>
            <input class="form-input" type="text" name="phone" placeholder="Телефон" required/>
            <button class="form-button" type="submit">Заказать</button>
        </form>
    </main>
</div>
</body>
</html>