<?php
require_once("./connectdatabase.php"); // 開發用
try {
   $ordNo = $_POST['ordNo'];
   $spotNo= $_POST['spotNo'];
   $fullPrice = $_POST['fullPrice'];
   $fullqty = $_POST['fullqty'];
   $halfPrice = $_POST['halfPrice'];
   $halfqty = $_POST['halfqty'];
   $conPrice = $_POST['conPrice'];
   $conqty = $_POST['conqty'];

    //ordNo要改成隨機生成號碼
    // 將訂單明細寫入資料庫
   $sql = "INSERT INTO `orddetail`(`ordNo`, `ticketSpotNo`, `fullFarePrice`, `fullFareQuan`, `halfFarePrice`, `halfFareQuan`, `conTicketPrice`, `conTicketQuan`) VALUES ('$ordNo','$spotNo','$fullPrice','$fullqty','$halfPrice','$halfqty','$conPrice','$conqty')";

   $result = $pdo->exec($sql);

   echo json_encode($result);

} catch (PDOException $e) {
 echo "錯誤原因 : ", $e->getMessage(), "<br>";
 echo "錯誤行號 : ", $e->getLine(), "<br>";
 // echo "系統錯誤, 請通知系統維護人員<br>";
};

?>