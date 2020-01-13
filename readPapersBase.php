<?php
    session_start();
    include "link.php";
    $from=$_POST['datefrom'];
    $to=$_POST['dateto'];
    $papers=mysqli_query($_SESSION['link'], "SELECT * FROM `transfer` WHERE `date`>=". $from . "AND `date`<=" . $to);
    for ($i=0; $i<mysqli_num_rows($papers);$i++) {
        $paper[$i]=implode(';',mysqli_fetch_row($papers));
        // echo ($paper[i]).'<p>';
    };
    echo json_encode($paper);

?>
