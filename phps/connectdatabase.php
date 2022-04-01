<?php
	// tibame資料庫
	// $host = "https://tibamef2e.com/";
	// $host = "localhost";
	// $dbname = "tibamefe_cfd104g3";
	// $user = "tibamefe_since2021";
	// $password = "vwRBSb.j&K#E";

	// 思蘋資料庫
	$host = "cfd104g5.asuscomm.com";
	$dbname = "g3";
	$user = "g3-1";
	$password = "cfd104_g3@hihi";

	$dsn = "mysql:host=$host;port=3306;dbname=$dbname;charset=utf8";

	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	
	$pdo = new PDO($dsn, $user, $password, $options);
		
?>