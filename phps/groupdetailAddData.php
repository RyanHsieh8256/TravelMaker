<?php
    require_once("./connectdatabase.php");
    try{
        $groNo = $_POST["groNo"];
        $memNo = $_POST["memNo"];

        $sql = "INSERT INTO `gromem`(`memNo`, `groNo`) VALUES ('$memNo','$groNo')";
        
        $groData = $pdo -> exec($sql);

        echo '成功新增一筆資料';
        
    }catch(PDOExcaption $e){
        echo $e->getMessage();
    }
?>