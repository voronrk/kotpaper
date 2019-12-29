<?php
    session_start();
    include "link.php";
    $papers=mysqli_query($_SESSION['link'], "SELECT * FROM papers");
    for ($i=0; $i<mysqli_num_rows($papers);$i++) {
        $paper=mysqli_fetch_row($papers)[1];
        if ($i==0) {
            $papersList=$paper;
        }else {
            $papersList=$papersList . ';' . $paper;
        }
    };
    
    echo ($papersList);

?>
