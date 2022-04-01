<?php
require_once("./connectdatabase.php"); // 開發用
try {
   
   $memNo = $_POST['memNo'];
   $ordDate = $_POST['ordDate'];
   $ordSum = $_POST['ordSum'];
   $ordNo = $_POST['ordNo'];


   //將ord表欄位資料寫入資料庫(ordNo要改成隨機生成號碼)
   $sql = "INSERT INTO `ord`(`ordNo`,`memNo`, `ordDate`, `ordSum`) VALUES ('$ordNo','$memNo','$ordDate','$ordSum');";


   $result = $pdo->exec($sql);
   $echoData = ["ordNo" => $ordNo];
   echo json_encode($echoData);

} catch (PDOException $e) {
   // $error = ['error'=>'發生錯誤'];
   // echo json_encode($error);
 echo "錯誤原因 : ", $e->getMessage(), "<br>";
 echo "錯誤行號 : ", $e->getLine(), "<br>";
 echo "系統錯誤, 請通知系統維護人員<br>";
};

?>