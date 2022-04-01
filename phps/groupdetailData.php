<?php
    require_once("./connectdatabase.php");
    try{
        $sql = "select * from groupdetail_title where groNo=:groNo";
        

        $groData = $pdo -> prepare($sql);
        $groData->bindValue(":groNo", $_GET["groNo"]);
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