<?php 
include "link.php"; 

$currentString=explode(';',$_POST['paper']);

$sql = mysqli_query($_SESSION['link'], "INSERT INTO `transfer` 
    (`paper_name`, 
    `quantity_plan`, 
    `quantity`,
    `order_num`,
    `date`) 
    VALUES
   ('{$currentString[1]}',
    '{$currentString[2]}',
    '{$currentString[3]}',
    '{$currentString[0]}',
    '{$currentString[5]}')");
?>
echo ($sql);

