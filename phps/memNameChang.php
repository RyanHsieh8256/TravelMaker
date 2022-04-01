<?php
try{
  require_once("./connectdatabase.php");

    $memName = $_POST['memName'];
    $memNo = $_POST['memNo'];

    $sql = "UPDATE `member` SET `memName`='$memName' WHERE `memNo`='$memNo';"; 


    $pdo->exec($sql);
    $result = ['memName'=>$memName];
    echo json_encode($result);

    
}catch(PDOException $e){
  echo $e->getMessage();
}
?>