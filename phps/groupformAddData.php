<?php
require_once("./connectdatabase.php");
try {
    $groName = $_REQUEST['groName'];
    $memNo = $_REQUEST['memNo'];
    $groContent = $_REQUEST['groContent'];
    $groStartDate = $_REQUEST['groStartDate'];
    $groEndDate = $_REQUEST['groEndDate'];
    $applyDeadline = $_REQUEST['applyDeadline'];
    $journeyNo = $_REQUEST['journeyNo'];
    $groPay = $_REQUEST['groPay'];
    $groLimit = $_REQUEST['groLimit'];

    $imgTarget = $_REQUEST['imgTarget'];
    $groDefaultImg = $_REQUEST['groDefaultImg'];

    // 清空img的src部分
    $groImg = '';

    // 新增資料到gro表
    $sql = "INSERT INTO `gro`(`groName`, `memNo`, `groStartDate`, `groEndDate`, `applyDeadline`, `groLimit`, `groImg`, `groContent`, `groPay`, `journeyNo`, `groState`) VALUES ('$groName','$memNo','$groStartDate','$groEndDate','$applyDeadline','$groLimit','$groImg','$groContent','$groPay','$journeyNo','進行中')";

    $groData = $pdo->query($sql);
    $id = $pdo->lastInsertId();
    echo '成功新增資料到gro表';


    // 如果我沒有上傳圖片，就不要做以下update資料的動作，換句話說，我有上傳圖片的話幫他統一格式
    if (!empty($_FILES['file'])) { //檔名依據網址列抓取行程編號
        //groImg_009.jpg
        $groNo_pad = str_pad($id, 3, "0", STR_PAD_LEFT);

        $groImg = "groImg_$groNo_pad.jpg";
        move_uploaded_file($_FILES["file"]["tmp_name"], "../images/groImg/" . $groImg);

        $sql = "update gro set groImg = \"$groImg\" where groNo = '$id'";

        $groData = $pdo->query($sql);
        //$id = $pdo->lastInsertId();
    }else{ //如果是預設圖片，複製該圖片搬移到groImg資料夾
        copy("../" . $imgTarget,"../images/groImg/" . $groDefaultImg);

        $sql = "update gro set groImg = \"$groDefaultImg\" where groNo = '$id'";

        $groData = $pdo->query($sql);
    }

    echo '成功更新一筆資料';
} catch (PDOExcaption $e) {
    echo $e->getMessage();
}
