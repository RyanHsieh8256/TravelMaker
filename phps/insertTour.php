<?php
    //  $conn = mysqli_connect('cfd104g5.asuscomm.com','g3-1','cfd104_g3@hihi','g3');

     

    // switch($_POST) {

    //     case !empty($_POST['tour']):
    //         $datas = $_POST['tour'];
    //         $array = json_decode($datas,true);

    //         foreach($array as $row) {

    //             $sql = "INSERT INTO journey(journeyNo, journeyName, journeyImg, journeyInfo, memNo, journeyStartDay, journeyEndDay, journeyState) VALUES ('".$row["journeyNo"]."','".$row["journeyName"]."','".$row["journeyImg"]."','".$row["journeyInfo"]."','".$row["memNo"]."','".$row["journeyStartDay"]."','".$row["journeyEndDay"]."','".$row["journeyState"]."') ON DUPLICATE KEY UPDATE journeyName ='".$row["journeyName"]."',journeyImg = '".$row["journeyImg"]."',journeyInfo = '".$row["journeyInfo"]."',journeyStartDay = '".$row["journeyStartDay"]."',journeyEndDay = '".$row["journeyEndDay"]."'";

    //             mysqli_query($conn,$sql);

    //             echo $conn->insert_id;

    //         }
    //         break;

    //     case !empty($_POST['spots']):
    //         $datas = $_POST['spots'];
    //         $array = json_decode($datas,true);


    //         foreach($array as $row) {
                
    //             $sql = "INSERT INTO journeyspot_copy(journeyNo,journeySpotDay,`sequence`,spotNo) VALUES ('".$row["journeyNo"]."','".$row["journeySpotDay"]."','".$row["sequence"]."','".$row["spotNo"]."')ON DUPLICATE KEY UPDATE journeySpotDay = '".$row["journeySpotDay"]."',`sequence` = '".$row["sequence"]."', spotNo = '".$row["spotNo"]."'";

        
    //             mysqli_query($conn,$sql);
    //         }

    //         print_r($array);
    //         break;
        
    // }
    


    // PDO寫法
    require_once("./connectdatabase.php");

    switch($_POST) {

        case !empty($_POST['tour']):
            $datas = $_POST['tour'];
            $array = json_decode($datas,true);

            foreach($array as $row) {

                $sql = "INSERT INTO journey(journeyNo, journeyName, journeyImg, journeyInfo, memNo, journeyStartDay, journeyEndDay, journeyState) VALUES ('".$row["journeyNo"]."','".$row["journeyName"]."','".$row["journeyImg"]."','".$row["journeyInfo"]."','".$row["memNo"]."','".$row["journeyStartDay"]."','".$row["journeyEndDay"]."','".$row["journeyState"]."') ON DUPLICATE KEY UPDATE journeyName ='".$row["journeyName"]."',journeyImg = '".$row["journeyImg"]."',journeyInfo = '".$row["journeyInfo"]."',journeyStartDay = '".$row["journeyStartDay"]."',journeyEndDay = '".$row["journeyEndDay"]."'";

                $insertData = $pdo -> prepare($sql);
                $insertData -> execute();

                echo $id = $pdo->lastInsertId();

            }
            break;

        case !empty($_POST['spots']):
            $datas = $_POST['spots'];
            $array = json_decode($datas,true);


            foreach($array as $row) {
                
                $sql = "INSERT INTO journeyspot_copy(journeyNo,journeySpotDay,`sequence`,spotNo) VALUES ('".$row["journeyNo"]."','".$row["journeySpotDay"]."','".$row["sequence"]."','".$row["spotNo"]."')ON DUPLICATE KEY UPDATE journeySpotDay = '".$row["journeySpotDay"]."',`sequence` = '".$row["sequence"]."', spotNo = '".$row["spotNo"]."'";

        
                $insertData = $pdo -> prepare($sql);
                $insertData -> execute();
            }

            print_r($array);
            break;
        
    }

?>