<?php

	try{
        //載入 DataBase Link 
        require_once("../../phps/connectdatabase.php"); 
        // header 格式 (要加此行 不然會亂碼)
        header('Content-Type: application/x-www-form-urlencoded; charset=utf-8');
        // 參數 ==>要 POST/GET 所代參數
        $mode = $_POST["SelectMode"];
        // condition=>條件
        $condition = $_POST["SelectWhere"];
        if(empty($condition)){
            $condition = 1;
        };
     
        switch($mode){
            case "member":
                $queryCol = "`memNo`, `memName`, `memEmail`, `memPhone`, `memBirth`, `memIcon`,  `memCreateDate`, `memState`";
                $table = "member";
            break;
            case "manager":
                $queryCol = "`mgrNo`, `mgrName`, `mgrAccount`, `mgrAuz`, `mgrImg`";
                $table = "manager";
            break; 
            case "city":
                $queryCol = "`cityNo`, `cityName`, `cityArea`";
                $table = "city";
            break; 
            // case "spot":
            //     $queryCol = "`spotNo`, `spotName`, `spotImg`, `spotPlace`, `spotLongitude`, `spotLatitude`, `spotInfo`, `cityNo`, `spotState`";
            //     $table = "spot";
            // break;
            // case "ticket":
            //     $queryCol = "t.*, c.cityName, c.cityArea, u.ticketSpotImgNo, u.imgSrc ,u.imgDesc";
            //     $table = "ticketspot t  join underimg u on t.ticketspotNo = u.ticketspotNo join city c on c.cityNo =t.cityNo";
            // break; 
            case "ticket":
                $queryCol = "t.*, c.cityName, c.cityArea";
                $table = "ticketspot t join city c on c.cityNo =t.cityNo";
            break; 
            case "ord":
                $queryCol = "*";
                $table = "back_order";
            break; 
            case "ordItem":
                $queryCol = "*";
                $table = "back_orditems";
            break;

            // case "gro":
            //     $queryCol = "groNo, groName, concat(g.memNo, m.memName) createName, groStartDate, groEndDate, applyDeadline, groLimit, applyNum, groContent, groPay, groState";
            //     $table = "gro g join member m on g.memNo = m.memNo";
            // break;
            case "gro":
                $queryCol = "*";
                $table = "back_gro";
            break;
            
            case "spot":
                $queryCol = "spotNo, spotName, spotImg, spotPlace, spotLongitude, spotLatitude, spotInfo, spotState, cityName";
                $table = "spot st join city c on st.cityNo = c.cityNo;";
            break;
            case "gromem":
                $queryCol = "g.groNo ,groDetailNo, m.memNo, memName";
                $table = "gromem gm join member m on m.memNo = gm.memNo join gro g on g.groNo = gm.groNo";
            break;
            default:
                echo "ERROR";     
                return;
        };



        //SQL 執行指令:
        $sql = "select $queryCol from $table where $condition";
        
        $result = $pdo -> query($sql);
        $count = $result->rowCount();

        //查有一筆以上資料
        if( $count != 0 ){ 
            //取得資料
            $dataRow = $result->fetchAll(PDO::FETCH_ASSOC);
            //送出json字串                
            echo json_encode($dataRow);
            
        }else{ 
        //查無資料
            $dataRow = false;
            echo "not found";
            echo $sql;
        };
        
	}catch(PDOException $e){
		echo $e->getMessage();
	};
?>