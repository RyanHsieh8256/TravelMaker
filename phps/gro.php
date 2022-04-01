<?php
    require_once("./connectdatabase.php");

    try{
        // $sql = "select * from group_ ";
        $sql = "SELECT group_.*,groupdetail_title.quota FROM `group_` join `groupdetail_title` on group_.groNo = groupdetail_title.groNo;";
        // $sql ="SELECT `g`.`groNo` AS `groNo`, `g`.`groName` AS `groName`, `g`.`groStartDate` AS `groStartDate`, `g`.`groEndDate` AS `groEndDate`, `g`.`applyDeadline` AS `applyDeadline`, `g`.`groImg` AS `groImg`, `g`.`groContent` AS `groContent`, `c`.`cityName` AS `cityName`, `m`.`memName` AS `memName`, `m`.`memIcon` AS `memIcon` , (`g`.`groLimit` - (SELECT COUNT(memNo) from gromem WHERE groNo=`g`.groNo)) as quota FROM ((((`gro` `g` join `member` `m` on((`g`.`memNo` = `m`.`memNo`))) join `journeyspot` `js` on((`js`.`journeyNo` = `g`.`journeyNo`))) join `spot` `s` on((`s`.`spotNo` = `js`.`spotNo`))) join `city` `c` on((`c`.`cityNo` = `s`.`cityNo`))) GROUP BY `g`.`groNo`;"
        $groData = $pdo -> prepare($sql);
        $groData -> execute();

        if($groData -> rowCount() == 0){
            echo "not found";
        }else{
            $data = $groData -> fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($data);
        }
    }catch(PDOExcaption $e){
        echo $e->getMessage();
    }
?>