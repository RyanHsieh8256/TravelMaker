<?php
try{
  require_once("connectdatabase.php");
  $sql = "select memPhone from `member`"; 
  $memPhones = $pdo->prepare($sql);
  $memPhones->execute();
  $memPhone = $_POST['memPhone'];

  $dataList = $memPhones->fetchAll(PDO::FETCH_ASSOC);

  foreach($dataList as $data){
    if(preg_match("/\b$memPhone\b/i",$data["memPhone"])){
      echo "error";
    };
  };
  // echo $sum;
}catch(PDOException $e){
  echo $e->getMessage();
}
?>