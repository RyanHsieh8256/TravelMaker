<?php
try{
  require_once("connectdatabase.php");
  // $sql = "select memNo ,memName ,memEmail ,memPhone ,memBirth ,memIcon ,memCreateDate ,memState from `member` where memEmail=:memEmail and memPsw=:memPsw"; 


  $memsigninName = $_POST["memsigninName"];
  $memEmail = $_POST["memEmail"];
  $memPsw = $_POST["memPsw"];
  $memPhone = $_POST["memPhone"];
  $memBirth = $_POST["memBirth"];
  $memCreateDate = $_POST["memCreateDate"];

  $sql = "INSERT INTO member (memName, memEmail, memPhone, memBirth, memIcon, memPsw, memCreateDate, memState) VALUES ('$memsigninName','$memEmail','$memPhone','$memBirth','icon-0.jpg','$memPsw','$memCreateDate','正常')";
  // echo $sql;
  $result = $pdo->exec($sql);
  if($result){ 
	  echo "成功";
  }else{ 
    echo "失敗";
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>