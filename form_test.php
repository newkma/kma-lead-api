<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>FORM</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
</head>
<body>
<h1>Оформление заказа</h1>
<h3>Контактные данные:</h3>
<form action="success_test.php" method="POST">
    <input type="text" name="name" placeholder="Имя" required/>
    <input type="text" name="surname" placeholder="Фамилия" required/>
    <input type="text" name="phone" placeholder="Телефон" required/>
    <button class="form-button" type="submit">Заказать</button>
</form>
</body>
</html>