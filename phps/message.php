<?php
try{
  require_once("./connectdatabase.php");
  $sql = "SELECT gromsg.*,member.memNo,member.memName,member.memIcon FROM `gromsg` join `member` on gromsg.memNo = member.memNo  WHERE groNo=:groNo ORDER by gromsg.msgTime DESC;";
  $msgData = $pdo->prepare($sql);
  $msgData->bindValue(":groNo", $_POST["groNo"]);
  $msgData->execute();

  if($msgData->rowCount()==0){ 
    echo "noData";
  }else{ 
    $result = $msgData->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>