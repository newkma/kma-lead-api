<?php
$order = $country = $name = $surname = $phone = $price = $currency = '-';
foreach (['order', 'country', 'name', 'surname', 'phone', 'price', 'currency'] as $item) {
    $$item = isset($_SESSION[$item]) ? $_SESSION[$item] : '-';
}