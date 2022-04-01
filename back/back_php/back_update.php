<?php
    try{
        //載入 DataBase Link 
        require_once("../../phps/connectdatabase.php"); 
        // header 格式 (要加此行 不然會亂碼)
        header('Content-Type: application/x-www-form-urlencoded; charset=utf-8');
        // 參數 ==>要 POST/GET 所代參數
        $mode = $_POST["UpdateMode"];
        $updateData = $_POST["UpdateData"];
        // condition=>條件
        $conditionValue = $_POST["UpdateWhere"];
        if(empty($conditionValue)){
            $conditionValue = 1;
        };
        // UPDATE `member` SET `memState`='停權' WHERE memNo =3;
        switch($mode){
            case "member":
                $updateCol = "memState='{$updateData}'";
                $table = "member";
                $condition = "memNo=$conditionValue";
            break;
            
            default:
                echo "ERROR SQL";     
                return;
        };



        //SQL 執行指令:
        // --------------------------
        $sql = "update $table set $updateCol where $condition";

        $result = $pdo -> prepare($sql);
        $result ->execute();
        $count = $result->rowCount();

        //查有無一筆以上資料受影響
        if( $count != 0 ){ 
            //取得資料
            $dataRow = $result->fetchAll(PDO::FETCH_ASSOC);
            //送出json字串                
            echo json_encode($dataRow);
            echo "OK~已更新資料";
            
        }else{ 
        //查無資料
            $dataRow = false;
            echo "not found~ 資料更新失敗/未異動";
        };
        
	}catch(PDOException $e){
		echo $e->getMessage();
	};











?>