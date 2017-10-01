<?php
$db = 'it60';
$user = 'root';
$password = '489329';
$host = 'localhost';

$link = mysqli_connect($host, $user, $password, $db);
if (!$link) {
    print mysqli_connect_error();
    exit;
} else {
    mysqli_set_charset($link, 'UTF8');
}
