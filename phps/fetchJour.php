<?php
    // 舊的寫法
    // $conn = mysqli_connect('cfd104g5.asuscomm.com','g3-1','cfd104_g3@hihi','g3');

    // switch($_GET) {
    //     case !empty($_GET['find']):
    //         $find = $_GET['find'];
    //         // 行程用
    //         $sql = mysqli_query($conn, "select y.journeyName,y.journeyInfo, y.journeyImg, y.journeyStartDay, y.journeyEndDay, j.journeyNo, journeySpotDay, j.sequence, s.spotName, s.spotNo, s.spotImg,s.spotInfo,s.spotLatitude,s.spotLongitude, c.cityName
    //         from journeyspot_copy j 
    //         join journey y on j.journeyNo = y.journeyNo 
    //         join spot s on j.spotNo = s.spotNo
    //         join city c on c.cityNo = s.cityNo
    //         where j.journeyNo = $find");

    //         break;

    //         case !empty($_GET['group']):
    //             $group = $_GET['group'];
    //             // 揪團用
    //             $sql = mysqli_query($conn, "select g.groNo,g.groName,g.journeyNo, j.journeySpotDay, j.sequence, s.spotName, s.spotNo, s.spotImg,s.spotInfo, c.cityName
    //             from journeyspot j 
    //             join gro g on j.journeyNo = g.journeyNo 
    //             join spot s on j.spotNo = s.spotNo
    //             join city c on c.cityNo = s.cityNo
    //             where g.groNo = $group");
                
    //         break;

    // }

    

    

    // $result = mysqli_fetch_all($sql, MYSQLI_ASSOC);

    // echo json_encode($result);

    // PDO寫法
    require_once("./connectdatabase.php");
    
    switch($_GET) {
        case !empty($_GET['find']):
            // 行程用
            $sql = "select y.journeyName,y.journeyInfo, y.journeyImg, y.journeyStartDay, y.journeyEndDay, j.journeyNo, journeySpotDay, j.sequence, s.spotName, s.spotNo,s.spotPlace, s.spotImg,s.spotInfo,s.spotLatitude,s.spotLongitude, c.cityName,
            m.memName, m.memIcon
            from journeyspot_copy j 
            join journey y on j.journeyNo = y.journeyNo 
            join spot s on j.spotNo = s.spotNo
            join city c on c.cityNo = s.cityNo
            join member m on m.memNo = y.memNo
            where j.journeyNo = :find";

            $tourData = $pdo -> prepare($sql);
            $tourData->bindValue(":find", $_GET["find"]);
            $tourData -> execute();

            $data = $tourData -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);

            break;

        case !empty($_GET['group']):
            // 揪團用
            $sql = "select g.groNo,g.groName,g.journeyNo, j.journeySpotDay, j.sequence, s.spotName, s.spotNo, s.spotImg,s.spotInfo, c.cityName
            from journeyspot j 
            join gro g on j.journeyNo = g.journeyNo 
            join spot s on j.spotNo = s.spotNo
            join city c on c.cityNo = s.cityNo
            where g.groNo = :group";

            $groupData = $pdo -> prepare($sql);
            $groupData->bindValue(":group", $_GET["group"]);
            $groupData -> execute();

            $data = $groupData -> fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
                
            break;

    }


?>