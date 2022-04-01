<?php
    require_once("./connectdatabase.php");
    try{
        $sql = "select j.memNo, j.journeyNo, journeyName, journeyImg, journeyInfo ,c.cityName from  
        journey j
        join journeyspot_copy js on js.journeyNo = j.journeyNo
        join spot s on s.spotNo = js.spotNo
        join city c on c.cityNo = s.cityNo where j.memNo =:memNo
        group by j.journeyNo";
        

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