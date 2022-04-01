<?php
# 檢查檔案是否上傳成功
if ($_FILES['file']['error'] === UPLOAD_ERR_OK){
//接收到的變數 $_FILES接收file的資料,$_REQUEST接收其他變數資料
  // echo '檔案名稱: ' . $_FILES['file']['name'] . '<br/>';
  // echo '檔案類型: ' . $_FILES['file']['type'] . '<br/>';
  // echo '檔案大小: ' . ($_FILES['file']['size'] / 1024) . ' KB<br/>';
  // echo '暫存名稱: ' . $_FILES['file']['tmp_name'] . '<br/>';
  // echo '會員編號: ' . $_REQUEST['memNo'] . '<br/>';
  // echo '會員姓名: ' . $_REQUEST['memName'] . '<br/>';
  // echo '會員密碼: ' . $_REQUEST['memPsw'] . '<br/>';
  // $array = getimagesize($_FILES['file']['tmp_name']);
  // print_r($array);

  # 檢查檔案是否已經存在
  // if (($_FILES['file']['size'] / 1024) > 1024){
  //   echo 'tooBig';
  // }else if(checkIsImage($_FILES['file']['tmp_name']) == false){
  //   echo 'notImg';
  // }else{
  //   $file = $_FILES['file']['tmp_name'];
  //   $dest = '../images/test/' . 'memNo' . $_REQUEST['memNo'] . '.jpg';
  //   //新增資料夾
  //   // $file_path = '../images/test/'.'memNo' . $_REQUEST['memNo'].'/';//資料夾路徑
  //   // mkdir($file_path);
  //   # 將檔案移至指定位置
  //   move_uploaded_file($file, $dest);
  // };
  $info= getimagesize($_FILES['file']['tmp_name']);        
  $ext = image_type_to_extension($info['2']);
  echo $ext;
}else{
  echo '錯誤代碼：' . $_FILES['file']['error'] . '<br/>';
}


function checkIsImage($filename){   
  $alltypes = '.jpeg|.png';//定义检查的图片类型    
  if(file_exists($filename)){        
    $info= getimagesize($filename);        
    $ext = image_type_to_extension($info['2']);        
      return stripos($alltypes,$ext);    
  }else{        
      return false;   
  }
} 

// getimagesize($filename) $filename要放暫存路徑
// 返回結果說明
// 索引0 給出的是圖像寬度的像素值
// 索引1 給出的是圖像高度的像素值
// 索引2 給出的是圖像的類型，返回的是數字，其中1 = GIF，2 = JPG，3 = PNG，4 = SWF，5 = PSD，6 = BMP，7 = TIFF(intel byte order)，8 = TIFF(motorola byte order)，9 = JPC，10 = JP2，11 = JPX，12 = JB2，13 = SWC，14 = IFF，15 = WBMP，16 = XBM
// 索引3 給出的是一個寬度和高度的字符串，可以直接用於HTML 的<image> 標籤
// 索引bits 給出的是圖像的每種顏色的位數，二進制格式
// 索引channels 給出的是圖像的通道值，RGB 圖像默認是 3
// 索引mime 給出的是圖像的MIME 信息，此信息可以用來在HTTP Content-type 頭信息中發送正確的信息，如：
// header("Content-type: image/jpeg");

?>