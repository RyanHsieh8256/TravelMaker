<?php
   // 舊的寫法
   // $conn = mysqli_connect('cfd104g5.asuscomm.com','g3-1','cfd104_g3@hihi','g3');

   // $sql = mysqli_query($conn,"select `journeyNo` from `journey` order by `journeyNo` desc limit 0,1;");

   // $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

   // echo json_encode($result);

   // PDO寫法
   require_once("./connectdatabase.php");

   $sql = "select `journeyNo` from `journey` order by `journeyNo` desc limit 0,1;";

   $lastNo = $pdo -> prepare($sql);
    $lastNo -> execute();

    $data = $lastNo -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);

?>