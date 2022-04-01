<?php
try{
  require_once("./connectdatabase.php");
  $sql = "INSERT INTO `gromsg`(`memNo`, `groNo`, `msgTime`, `msgContent`) VALUES (:memNo,:groNo,:msgTime,:msgContent)";
  $today = date("Y-m-d H:i:s");
  $msgData = $pdo->prepare($sql);
  $msgData->bindValue(":memNo", $_POST["memNo"]);
  $msgData->bindValue(":groNo", $_POST["groNo"]);
  $msgData->bindValue(":msgTime", $today);
  $msgData->bindValue(":msgContent", $_POST["msgContent"]);
  $msgData->execute();
  echo 'success';
}catch(PDOException $e){
  echo $e->getMessage();
}
?>