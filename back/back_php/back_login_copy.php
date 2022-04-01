<?php
	
	session_start();
	try{
		//先判斷模式為 login
		if($_POST["loginMod"] == 'login'){ 
			//載入link SQL PHP 檔案位置
			require_once("../../phps/connectdatabase.php"); 
			$sql = "select mgrNo,mgrAccount,mgrName,mgrAuz,mgrImg from `manager` where mgrAccount=:mgrAccount and mgrPsw=:mgrPsw";
			$manager = $pdo->prepare($sql);
			$manager->bindValue(":mgrAccount", $_POST["mgrAccount"]);
			$manager->bindValue(":mgrPsw", $_POST["mgrPsw"]);
			$manager->execute();
			
			if( $manager->rowCount() != 0 ){			
				//取回一筆資料
				$memRow = $manager->fetch(PDO::FETCH_ASSOC);
				//送出json字串
				// echo json_encode($memRow);
				$_SESSION["mgrNo"] = $memRow["mgrNo"];
				$_SESSION["mgrAccount"] = $memRow["mgrAccount"];
				$_SESSION["mgrName"] = $memRow["mgrName"];
				$_SESSION["mgrAuz"] = $memRow["mgrAuz"];
				$_SESSION["mgrImg"] = $memRow["mgrImg"];

				$result = [ "status" => "PASS",
							"msg" => "登入成功",
							
							];
			}else{
				$result = [ "status" => "FAIL",
							"msg" => "帳號或密碼有誤"];
			}
		}else if($_POST["loginMod"] == 'session'){
		
			// read session
			if(count($_SESSION) != 0){
				$result = [ "status" => "PASS",
							"msg" => "登入成功",
							"mgrNo" => $_SESSION["mgrNo"],
							"mgrAccount" => $_SESSION["mgrAccount"], 
							"mgrName" => $_SESSION["mgrName"],
							"mgrAuz" => $_SESSION["mgrAuz"],
							"mgrImg" => $_SESSION["mgrImg"], 
							];
			}else{
				$result = [ "status" => "FAIL",
							"msg" => ""];
			}
		}else{
			$result = [ "status" => "FAIL",
						"msg" => "loginMod 錯誤"];
		}
		echo json_encode($result);//送出json字串
		
	}catch(PDOException $e){
		echo $e->getMessage();
	};
	
?>
