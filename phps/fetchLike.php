<?php
    // 舊的部分 
    // $conn = mysqli_connect('cfd104g5.asuscomm.com','g3-1','cfd104_g3@hihi','g3');

    // $like = $_GET['like'];

    // $sql = mysqli_query($conn, "select * from `journeycollect` where memNo = $like");

    // $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

    // echo json_encode($result);

    // PDO寫法
    require_once("./connectdatabase.php");

    $sql = "select * from `journeycollect` where memNo = :like";

    $likeData = $pdo -> prepare($sql);
    $likeData->bindValue(":like", $_GET["like"]);
    $likeData -> execute();

    $data = $likeData -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
?>