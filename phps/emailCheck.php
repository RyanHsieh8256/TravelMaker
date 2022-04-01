<?php
try{
  require_once("connectdatabase.php");
  $sql = "select memEmail from `member`"; 
  $memEmails = $pdo->prepare($sql);
  $memEmails->execute();
  $memEmail = $_POST['memEmail'];

  $dataList = $memEmails->fetchAll(PDO::FETCH_ASSOC);

  foreach($dataList as $data){
    if(preg_match("/\b$memEmail\b/i",$data["memEmail"])){
      echo "error";
    };
  };
  // echo $sum;
}catch(PDOException $e){
  echo $e->getMessage();
}
?>