<?php
    require_once("./connectdatabase.php");
    try{
        // $sql = "select * from ticketspot join underimg_test on ticketspot.ticketSpotNo = underimg_test.ticketSpotNo join city on ticketSpot.cityNo =  city.cityNo";
        $sql = "select * from shopspot_title where ticketSpotNo=:id";
        $ticketspot = $pdo->prepare($sql);
        $ticketspot->bindValue(":id", $_GET['id']);
        $ticketspot->execute();

        if($ticketspot->rowCount() == 0){
            echo "not found";
        }else{
            $memRow = $ticketspot->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($memRow);

        };

    }catch(PDOExcaption $e){
        echo $e->getMessage();
    };

?>