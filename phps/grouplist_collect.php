<?php
    require_once("./connectdatabase.php");
    try{
        $sql = "select jc.memNo, j.journeyNo, journeyName, journeyImg, journeyInfo ,c.cityName from journeycollect jc
        join journey j on j.journeyNo = jc.journeyNo
        left join journeyspot js on js.journeyNo = j.journeyNo
        left join spot s on s.spotNo = js.spotNo
        left join city c on c.cityNo = s.cityNo
        where jc.memNo=:memNo group by j.journeyNo;";


        $groData = $pdo -> prepare($sql);
        $groData->bindValue(":memNo", $_GET["memNo"]);
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