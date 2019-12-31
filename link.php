<?php
session_start();
$_SESSION['link'] = mysqli_connect('localhost:3306', 'root', '', 'kotpaper');
?>
