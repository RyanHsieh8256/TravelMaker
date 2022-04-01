<?php
require_once("./connectdatabase.php"); // 開發用
try {
   $sql = "select `ordNo` from `ord` order by `ordNo` desc limit 0,1;";
   //desc 搜尋結果由大到小排列，
   //limit 0,1 顯示搜尋結果為第0筆開始，顯示1筆

   $result = $pdo->prepare($sql);
   $result->execute();
   $ordnoRow = $result -> fetch(PDO::FETCH_ASSOC);
   $ordno = ["ordNo" => $ordnoRow["ordNo"]];
   echo $ordno['ordNo'] ;

} catch (PDOException $e) {
 echo "錯誤原因 : ", $e->getMessage(), "<br>";
 echo "錯誤行號 : ", $e->getLine(), "<br>";
 // echo "系統錯誤, 請通知系統維護人員<br>";
};

?>