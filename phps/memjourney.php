<?php
try{
  require_once("connectdatabase.php");
  $sql = "SELECT * FROM `journey` WHERE memNo=:memNo"; 
  $journeyDate = $pdo->prepare($sql);
  $journeyDate->bindValue(":memNo", $_POST["memNo"]);
  $journeyDate->execute();

  if($journeyDate->rowCount()==0){ 
    echo "noData";
  }else{ 
    $result = $journeyDate->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>