<?php
    // 舊的寫法
    // $conn = mysqli_connect('cfd104g5.asuscomm.com','g3-1','cfd104_g3@hihi','g3');

    // $sql = mysqli_query($conn,'select * from city');

    // $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

    // echo json_encode($result);

    
    // PDO寫法
    require_once("./connectdatabase.php");

    try {
        $sql = 'select * from city';

        $cities = $pdo -> prepare($sql);
        $cities -> execute();

        $result = $cities -> fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);

    }catch(PDOExcaption $e) {
        echo $e->getMessage();
    }
    

?>