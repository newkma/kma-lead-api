<?php
$order = $country = $name = $surname = $phone = $price = $currency = '-';
foreach (['order', 'country', 'name', 'surname', 'phone', 'price', 'currency'] as $item) {
    if (isset($_SESSION[$item])) {
        $$item = $_SESSION[$item];
    }
}
