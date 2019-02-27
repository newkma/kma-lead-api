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
			<h1 class="main-content__title">УСТАНОВКА</h1>
			                
            <div class="main-content__description">Пожалуйста, выполните все шаги, и удостовертесь, что все проверки выполнены успешно</div>
			
			<div class="steps">
				<p>1. Запустите и установите скрипт istall.sh</p>
				<p>2. Убедитесь, что перечисленные ниже расширения установлены:</p>
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
								<td>База данных</td>
								<td>Подключено</td>
								<td>Подключено</td>
								<td><i class="success"></i></td>
							</tr>
							<tr>
								<td>GD</td>
								<td>Не подключено</td>
								<td>Подключено</td>
								<td><i class="reject"></i></td>
							</tr>
							<tr>
								<td>cURL</td>
								<td>Не подключено</td>
								<td>Подключено</td>
								<td><i class="reject"></i></td>
							</tr>
							<tr>
								<td>ZLIB</td>
								<td>Подключено</td>
								<td>Подключено</td>
								<td><i class="success"></i></td>
							</tr>
							<tr>
								<td>ZIP</td>
								<td>Подключено</td>
								<td>Подключено</td>
								<td><i class="success"></i></td>
							</tr>
						</tbody>
					</table>
				</div>
				<p>3. Убедитесь, что перечисленные ниже файлы имеют разрешение на запись и соответствующее имя:</p>
				<div class="table-responsive">
					<table>
						<thead>
							<tr>
								<th>Файлы</th>
								<th>Статус соответствия</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>файл1</td>
								<td><i class="success"></i><span>Соответствует (доступно для записи)</span></td>
							</tr>
							<tr>
								<td>файл2</td>
								<td><i class="reject"></i><span>Не соответствует (не доступно для записи)</span></td>
							</tr>
							<tr>
								<td>файл3</td>
								<td><i class="success"></i><span>Соответствует (доступно для записи)</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<p>4. Заполнение полей токена и потока и запись их в файл</p>
			</div>
			 
		</main>
 
		 
	</div>
 
</body>
</html>