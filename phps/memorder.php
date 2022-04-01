<?php
try{
  require_once("connectdatabase.php");
  // $sql = "SELECT (ticketspot.mainImg,ticketspot.ticketSpotName, ord.ordNo, orddetail.fullFareQuan, orddetail.fullFarePrice, orddetail.halfFareQuan, orddetail.halfFarePrice, orddetail.conTicketQuan, orddetail.conTicketPrice, ord.ordDate) FROM (`ord` join `orddetail` on ord.ordNo = orddetail.ordNo)INNER join `ticketspot` on ticketSpot.ticketSpotNo = orddetail.ticketSpotNo WHERE ord.memNo=:memNo;"; 
  $sql = "select * FROM `ord` o join (select d.ordNo, d.fullFarePrice,d.fullFareQuan, d.halfFarePrice,d.halfFareQuan, d.conTicketPrice,d.conTicketQuan, t.ticketSpotName, t.mainImg from `orddetail` d join ticketspot t on d.ticketSpotNo = t.ticketSpotNo) as aa on o.ordNo = aa.ordNo where o.memNo=:memNo;"; 



  $orderData = $pdo->prepare($sql);
  $orderData->bindValue(":memNo", $_POST["memNo"]);
  $orderData->execute();

  if($orderData->rowCount()==0){ 
    echo "noData";
  }else{ 
    $result = $orderData->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>