<?php
    require_once("./connectdatabase.php");
    try{
        $sql = "select * from journey where journeyNo=:journeyNo";

        $groData = $pdo -> prepare($sql);
        $groData->bindValue(":journeyNo", $_GET["journeyNo"]);
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