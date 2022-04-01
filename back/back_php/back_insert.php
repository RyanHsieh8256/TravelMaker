<?php
    require_once("../../phps/connectdatabase.php");
    try{
        $spotName = $_REQUEST['spotName'];
        $spotImg = '';
        $spotPlace = $_REQUEST['spotPlace'];
        $spotLongitude = $_REQUEST['spotLongitude'];
        $spotLatitude = $_REQUEST['spotLatitude'];
        $spotInfo = $_REQUEST['spotInfo'];
        $cityNo = $_REQUEST['cityNo'];
        $spotState = $_REQUEST['spotState'];

        // 處理原本預設圖片的檔名
        // $spotNo_pad = str_pad($spotNo,3,"0",STR_PAD_LEFT);
        // $spotImg = "spotImg-$spotNo_pad.jpg";
        
        // 新增資料到gro表
        //insert into g3.spot(spotName, spotImg, spotPlace, spotLongitude, spotLatitude, spotInfo, cityNo, spotState) value ('大武崙砲台', 'http://www.northguan-nsa.gov.tw/user/Article.aspx?Lang=1&SNo=04005325', '基隆市安樂區基金一路208巷19號(情人湖上方)', '121.7055588', '25.15675926', '大武崙砲台位於基隆西北方，居外木山漁港後的大武崙山上，也就是情人湖的上方。因其地勢險要，而成為扼守基隆港西側的重要據點，在道光二十年，西元1840年的清英鴉片戰爭及光緒十年，西元1884年的清法戰爭時，清政府均曾派兵駐防。但據其構造及設計特色來看，應為日治時期所改建之結果。  大武崙砲台為國定古蹟，位於大武崙山巔，地形居高臨下，地勢非常險要，其標高為231公尺，可西瞰情人湖，北俯大武崙澳，東望基隆港及東海。在進入砲台區的入口處，是一條充滿林蔭落葉的碎石步道。而當抵達山頂的砲台區時，尚可看見以塊石丁順疊砌的砲台結構、砲盤、儲彈室及運輸砲台、機械坡道，雖然現今大砲已經不存在了，但地面仍有明顯的砲架痕跡。      大武崙砲台遺址保存良好，包括營區大門步道、洞窟營舍、東稜堡、北稜堡、南稜堡、避彈壕、蓄水池等。區內幽靜、林木翠綠，登上環道的短牆上眺覽四周，基隆嶼、外木山澳漁村、八斗子、北海岸一帶的秀麗風光盡收眼底，是一處觀景、談心的好地，也常為婚紗公司取景之選擇，增添它浪漫的風情。  資料來源於：基隆市政府', '1', '正常')
        $sql = "insert into spot(spotName, spotImg, spotPlace, spotLongitude, spotLatitude, spotInfo, cityNo, spotState) 
        values ('$spotName', '$spotImg', '$spotPlace', '$spotLongitude', '$spotLatitude', '$spotInfo', '$cityNo', '$spotState')";
        
        $result = $pdo -> prepare($sql);
        $result ->execute();
        $count = $result->rowCount();

        //查有無一筆以上資料受影響
        if( $count > 0 ){ 

            $id = $pdo->lastInsertId(); 
            $dataRow = $result->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(array('msg'=>'OK~已更新資料',
                           'rowNo'=>$id,
                        'dataRow' => $dataRow));
            // 如果我沒有上傳圖片，就不要做以下update資料的動作
            if(!empty($_FILES['file'])){
                //sportImg_009.jpg
                $spotNo_pad = str_pad($id,3,"0",STR_PAD_LEFT);

                $spotImg = "sportImg_$spotNo_pad.jpg";
                move_uploaded_file($_FILES["file"]["tmp_name"],"../back_img/spot_img/".$spotImg);

                $sql = "update g3.spot set spotImg = \"$spotImg\" where spotNo = '$id'";
                
                $spotData = $pdo -> query($sql);
                //$id = $pdo->lastInsertId();
            }else{
                $sql = "update g3.spot set spotImg = \"預設name\" where spotNo = '$id'";
                
                $spotData = $pdo -> query($sql);

            };
        }else{ 
        //查無資料
            $dataRow = false;
            echo "not found~ 資料更新失敗/未異動";
        };

    }catch(PDOExcaption $e){
        echo $e->getMessage();
    }
?>