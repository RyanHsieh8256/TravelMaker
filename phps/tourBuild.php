<?php
    // 舊的寫法
    // $conn = mysqli_connect('cfd104g5.asuscomm.com','g3-1','cfd104_g3@hihi','g3');

    // $search = $_GET['search'];

    // $sql = mysqli_query($conn, "select *
    // from spot s join city c on s.cityNo = c.cityNo
    // where s.spotName like '%$search%' or c.cityName like '%$search%' or s.spotPlace like '%$search%'");

    // $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

    // echo json_encode($result);

    // PDO寫法
    require_once("./connectdatabase.php");
    
    $search = $_GET['search'];
    $sql = "select *
    from spot s join city c on s.cityNo = c.cityNo
    where s.spotName like '%$search%' or c.cityName like '%$search%' or s.spotPlace like '%$search%'";

    $searchData = $pdo -> prepare($sql);
    $searchData -> execute();

    $data = $searchData -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
?>

