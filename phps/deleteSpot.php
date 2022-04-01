<?php
    require_once("./connectdatabase.php");

    try {
        $no = $_GET['no'];
        $sql = "delete from `journeyspot_copy` where journeyNo = $no";

        $spotData = $pdo -> prepare($sql);
        $spotData -> execute();




        $result = $spotData -> fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);

    }catch(PDOExcaption $e) {
        echo $e->getMessage();
    }
   
?>