<?php
try{
  require_once("./connectdatabase.php");

    $memPsw = $_POST['memPsw'];
    $memNo = $_POST['memNo'];

    $sql = "UPDATE `member` SET `memPsw`='$memPsw' WHERE `memNo`='$memNo';"; 


    $pdo->exec($sql);

    echo '更新成功';

    
}catch(PDOException $e){
  echo $e->getMessage();
}
?>