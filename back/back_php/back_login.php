<?php
	session_start();
	

	try{
		if($_POST["loginMod"] == 'login'){ //先判斷模式為 login
			require_once("./db_login.php"); //載入PHP 檔案位置
			$sql = "select * from `manager` where mgrAccount=:mgrAccount and mgrPsw=:mgrPsw";
			$manager = $pdo->prepare($sql);
			$manager->bindValue(":mgrAccount", $_POST["mgrAccount"]);
			$manager->bindValue(":mgrPsw", $_POST["mgrPsw"]);
			$manager->execute();
			//SQL
			// =====================================================

			if( $manager->rowCount() == 0 ){ //找不到
				//傳回空的JSON字串
				echo "not found";

			}else{ //找得到

				//取回一筆資料
				$memRow = $manager->fetch(PDO::FETCH_ASSOC);
				//送出json字串
				// echo json_encode($memRow);
				$_SESSION["mgrNo"] = $memRow["mgrNo"];
				$_SESSION["mgrAccount"] = $memRow["mgrAccount"];
				$_SESSION["mgrName"] = $memRow["mgrName"];
				$_SESSION["mgrAuz"] = $memRow["mgrAuz"];


				$result = [ "mgrNo" => $_SESSION["mgrNo"],
							"mgrAccount" => $_SESSION["mgrAccount"], 
							"mgrName" => $_SESSION["mgrName"],
							"mgrAuz" => $_SESSION["mgrAuz"] 
							];
					
				echo json_encode($result);//送出json字串
			}
		}else{ //GetSesion Mod
			
			if(count($_SESSION) != 0){
				$result = [ "mgrNo" => $_SESSION["mgrNo"],
							"mgrAccount" => $_SESSION["mgrAccount"], 
							"mgrName" => $_SESSION["mgrName"],
							"mgrAuz" => $_SESSION["mgrAuz"] 
							];

				echo json_encode($result);//送出json字串
			}else{
				echo "not found";
			}
			
					
			
		}
	}catch(PDOException $e){
		echo $e->getMessage();
	};
?>

