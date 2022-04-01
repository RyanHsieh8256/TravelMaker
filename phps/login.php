<?php
try{
  require_once("connectdatabase.php");
  $sql = "select memNo ,memName ,memEmail ,memPhone ,memBirth ,memIcon ,memCreateDate ,memState from `member` where memEmail=:memEmail and memPsw=:memPsw"; 
  $member = $pdo->prepare($sql);
  $member->bindValue(":memEmail", $_POST["memEmail"]);
  $member->bindValue(":memPsw", $_POST["memPsw"]);
  $member->execute();

  if($member->rowCount()==0){ 
    echo "noData";
  }else{ 
    $memRow = $member->fetch(PDO::FETCH_ASSOC);
    $result = [
      "memNo" => $memRow["memNo"],
      "memEmail" => $memRow["memEmail"], 
      "memName" => $memRow["memName"],
      "memPhone" => $memRow["memPhone"],
      "memBirth" => $memRow["memBirth"], 
      "memIcon" => $memRow["memIcon"],
      "memCreateDate" => $memRow["memCreateDate"],
      "memState" => $memRow["memState"]
    ];

    echo json_encode($result); 
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>