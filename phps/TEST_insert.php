<?php
try{
    require_once("./connectdatabase.php");
    $query = "insert into g3.gro(groName, memNo, groStartDate, groEndDate, applyDeadline, groLimit, groImg, groContent, groPay, journeyNo, groState) value('宜蘭逛逛之旅', '9', '2022-04-10', '2022-04-11', '2022-04-01', '6', 'groImg_009.jpg', '工作讀書讓你很鬱卒嗎?一起來宜蘭蘇澳慢遊輕旅行吧', '各自負擔', '9', '進行中'
);";
    $statement = $pdo->query($query);
    $id = $pdo->lastInsertId(); 
    echo $id;

}catch(PDOException $e){
  echo $e->getMessage();
}
?>