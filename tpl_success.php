<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Спасибо!</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
	<link rel="stylesheet" href="css_success/style.css">
 
</head>
<body>
	<div class="wrap">
		<header class="header">
			<div class="header__left">
				<div class="header__title">
					Спасибо!				</div>
				<div class="header__description">
					<h3>Пожалуйста, не выключайте Ваш контактный телефон.</h3>
					Ваш заказ оформлен, и принят к исполнению нашими сотрудниками! В ближайшее время с Вами свяжется менеджер для уточнения деталей.				</div>
			</div>
			<div class="header__right">
				<div class="header__info">
					<div class="header__info-title">
						Информация о заказе:					</div>
					<div class="header__info-order">
						<?= $order ?>					</div>
					<div class="header__info-phone">
						<?= $phone ?>					</div>
					<div class="header__info-name">
						<?= $name ?>					</div>
				</div>
			</div>
		</header>
		<main class="main-content">
			<h1 class="main-content__title">
				 КАК ПОЛУЧИТЬ МАКСИМАЛЬНЫЙ ЭФФЕКТ ОТ ВАШЕЙ ПОКУПКИ?			</h1>
			                
            			<div class="main-content__description">
				 Получите подробную инструкцию, узнайте, как использовать покупку на 100% эффективно!			</div>
			<div class="form-block">
				<div class="form-block__left">
					<div class="form-block__left-info">
						Подтвердите свой е-mail в течение 2 часов, чтобы получить получить детальную инструкцию по использованию нашей продукции, для достижения лучших результатов!					</div>
					<div class="form-block__left-discount">
						А щё мы подарим вам постоянную скидку 75% на все покупки! Следите за нашими акциями!					</div>
				</div>
				<div class="form-block__right">
					<div class="form-wrap">
						<div class="form-wrap__title">
							 Оставьте свой e-mail и мы вышлем Вам детальную инструкцию по использованию нашей продукции!						</div>
						<form action="#" class="main-form" method="POST">
							<input type="email" name="email" class="main-form__email" placeholder="Оставьте e-mail…" required="">
							<button type="submit" class="main-form__button">Получить инструкцию</button>
						</form>
					</div>
				</div>
			</div>
		</main>
		<footer class="footer">
			<div class="footer__text">
				Мы не разглашаем Ваши личные данные и не передаем оставленную Вами информацию третьим лицам. Нажав на кнопку, вы соглашаетесь на получение новостей об акциях, скидках и новинках.			</div>
		</footer>
		 
	</div>
	<script src="success_files/tpl-newdefault/js/jquery-2.2.4.min.js"></script>
	 <script type="text/javascript">
        $(document).ready(function(){
            $("form.main-form").on("submit", function(){
                $.post(
                    "https://system.trackerlead.biz/user/subscribe",
                    { feedback_email: $("input.main-form__email").val(), orderid: "<?= $order ?>" }
                );
                $(this).fadeOut("fast", function(){$(this).parent().append("<p style='font-size: 1.2em; line-height: 2em; text-align: center;'>Спасибо!</p>");});
                return false;
            });
        });
    </script>
</body>
</html>