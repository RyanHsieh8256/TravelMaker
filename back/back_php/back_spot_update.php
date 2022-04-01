<?php
    require_once("../../phps/connectdatabase.php");
    try{
        function getD(){
            global $pdo, $sql ,$spotImg ,$cityNo,$result;
            $result = $pdo -> prepare($sql);
            $result->bindValue(":spotNo", $_REQUEST['spotNo']);
            $result->bindValue(":spotName", $_REQUEST['spotName']);
            $result->bindValue(":spotPlace", $_REQUEST['spotPlace']);
            $result->bindValue(":spotLongitude", $_REQUEST['spotLongitude']);
            $result->bindValue(":spotLatitude", $_REQUEST['spotLatitude']);
            $result->bindValue(":spotInfo", $_REQUEST['spotInfo']);
            $result->bindValue(":spotState", $_REQUEST['spotState']);
            
            
            $spotImg = $_FILES['file'];
            $cityNo = $_REQUEST['cityNo'];

            switch ($cityNo) {
                case '基隆市':
                    $cityNo = 1 ;
                    break;
                case '台北市':
                    $cityNo = 2 ;
                    break;
                case '新北市':
                    $cityNo = 3 ;
                    break;
                case '桃園市':
                    $cityNo = 4 ;
                    break;
                case '新竹縣':
                    $cityNo = 5 ;
                    break;
                case '新竹市':
                    $cityNo = 6 ;
                    break;
                case '苗栗縣':
                    $cityNo = 7 ;
                    break;
                case '台中市':
                    $cityNo = 8 ;
                    break;
                case '彰化縣':
                    $cityNo = 9 ;
                    break;
                case '雲林縣':
                    $cityNo = 10 ;
                    break;
                case '南投縣':
                    $cityNo = 11 ;
                    break;
                case '嘉義市':
                    $cityNo = 12 ;
                    break;
                case '嘉義縣':
                    $cityNo = 13 ;
                    break;
                case '台南市':
                    $cityNo = 14 ;
                    break;
                case '高雄市':
                    $cityNo = 15 ;
                    break;
                case '屏東縣':
                    $cityNo = 16 ;
                    break;
                case '台東縣':
                    $cityNo = 17 ;
                break;
                case '花蓮縣':
                    $cityNo = 18 ;
                break;
                case '宜蘭縣':
                    $cityNo = 19 ;
                break;
                default:
                    echo 'Error cityNo' ;
                    break;
                
            };
        };
        // 處理原本預設圖片的檔名
        // $spotNo_pad = str_pad($spotNo,3,"0",STR_PAD_LEFT);
        // $spotImg = "spotImg-$spotNo_pad.jpg";
        // 代表有
        if(!empty($_FILES['file'])){
            //sportImg_009.jpg
            $spotNo_pad = str_pad($_REQUEST['spotNo'],3,"0",STR_PAD_LEFT);

            $spotImg = "sportImg_$spotNo_pad.jpg";
            echo $spotImg;
            // =--
            move_uploaded_file($_FILES["file"]["tmp_name"],"../".$spotImg);
            // upadte 資料到spot表
            $sql = "update spot set  spotName=:spotName , spotImg='$spotImg' , spotPlace=:spotPlace, spotLongitude=:spotLongitude, spotLatitude=:spotLatitude, spotInfo=:spotInfo, spotState=:spotState where spotNo=:spotNo";
            getD();
            // $result = $pdo -> prepare($sql);
            echo $sql;
            $result ->execute();
            $count = $result->rowCount();
        }else{
            $sql = "update spot set  spotName=:spotName ,  spotPlace=:spotPlace, spotLongitude=:spotLongitude, spotLatitude=:spotLatitude, spotInfo=:spotInfo, spotState=:spotState where spotNo=:spotNo";
            getD();
            $result ->execute();
            $count = $result->rowCount();
        };
        //查有無一筆以上資料受影響
        if( $count > 0 ){ 
            // $id = $pdo->lastInsertId(); 
            $dataRow = $result->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array('msg'=>'OK~已更新資料',
                        'rowNo'=>$spotNo_pad,
                        'dataRow' => $dataRow));
        }else{ 
            //查無資料
            $dataRow = false;
            echo "not found~ 資料更新失敗/未異動";
        };

    }catch(PDOExcaption $e){
        echo $e->getMessage();
    };
?>