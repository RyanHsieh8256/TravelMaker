// 建立動態燈箱
$(function () {
    let res='';
    let getTargetInfo;
    let payload = {SelectMode:'spot',
                   SelectWhere:'1'};
    $('.spottable').DataTable({        
        responsive: true,
        "ajax": {
            "url": "./back_php/back_select.php",
            "type": "POST",
            "data": payload,
            "dataSrc": function ( data ) {
                //Make your callback here.
                res = data;
                // fuc_getSpotIngo();
                // fuc_change();
                console.log(res);
                return data;
            },
            // "success":CreateBox()

        },
        "columns": [ 
            { data: 'spotNo'},
            { data: 'spotName'},
            { data: 'cityName'},
            { data: 'spotImg', render: function(data){
                data = `<td><button class="spot-img-btn" onclick="New_showImg('${data}')"<img src="${data}" alt="img"></img>照片</button></td>`;
                return data;
            } },
            { data: 'spotInfo', render: getSpotInfo },
            { data: 'spotState'},
            { data: 'spotEdit', render: getSpotStaus},
            // <img src="./back_img/spot_img/sportImg_192.jpg" alt=""></img>
        ],
        language: {
            "emptyTable": "無資料...",
            "processing": "處理中...",
            "loadingRecords": "載入中...",
            "lengthMenu": "每頁 _MENU_ 筆資料",
            "zeroRecords": "無搜尋結果",
            "info": "_START_ 至 _END_ / 共 _TOTAL_ 筆",
            "infoEmpty": "尚無資料",
            "infoFiltered": "(從 _MAX_ 筆資料過濾)",
            "infoPostFix": "",
            "search": "關鍵字搜尋:",
            "paginate": {
                "first": "首頁",
                "last": "末頁",
                "next": "下頁",
                "previous": "前頁"
            },
            "aria": {
                "sortAscending": ": 升冪",
                "sortDescending": ": 降冪"
            }
        },
    });
    // var rows 點擊事件並獲得該列資料
    var table = $('.spottable').DataTable();
    $('.spottable tbody').on( 'click', 'tr', function(){
        // console.log(table.row(this).data());
        getTargetInfo = table.row(this).data();
        // fuc_getBoxWithInfo();
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }else{
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        };

    } );
    // datatable set btn 景點資訊
    function getSpotInfo(data, type, full, meta) {
        let SpotInfo = `<td><button class="spot-info">詳細內容</button></td>`;
        return SpotInfo;
    };
    // 圖片
    // function getSpotImg(data, type, full, meta) {
    //     let SpotImg = `<td><button class="spot-img-btn">照片</button></td>`;
    //     return SpotImg;
    // };
    // 編輯狀態--
    function getSpotStaus(data, type, full, meta) {
        let SpotStaus = `<td><button class="spot-staus">編輯</button></td>`;
        return SpotStaus;
    };
    $('.spottable tbody').on( 'click', '.spot-staus', function (e) {
        // setTimeout(newFunction,1000);
        updateSpotBox.style.display ='block';
        console.log(getTargetInfo);
        updateBoxSpotNo.value= getTargetInfo.spotNo;
        updateBoxSpotName.value = getTargetInfo.spotName;
        updateBoxSpotPlace.value = getTargetInfo.spotPlace;
        updateBoxSpotImg.files[0] = getTargetInfo.spotImg;
        updateBoxSpotLongitude.value = getTargetInfo.spotLongitude;
        updateBoxSpotLatitude.value = getTargetInfo.spotLatitude;
        updateBoxSpotState.value = getTargetInfo.spotState;
        updateBoxSpotInfo.value = getTargetInfo.spotInfo;
        updateBoxCity.value = getTargetInfo.cityName;
        // console.log(updateBoxCity.options.selectedIndextext);
    });
    // =====================================================
    //新增動態節點
    let spotImgBoxDiv = document.createElement('div');
    spotImgBoxDiv.classList.add('spot-img');
    // 將盒子加入至 main 下裡
    document.getElementsByTagName('main')[0].appendChild(spotImgBoxDiv);

    let spotImg = document.createElement('img');
    // img > div
    spotImgBoxDiv.appendChild(spotImg);
    // 宣告 <div> => closeInfo btn
    let closeImgDiv = document.createElement('div');
    closeImgDiv.classList.add('close-img-box-btn');
    let closeIcon = document.createElement('span');
    closeIcon.classList.add('material-icons-sharp');
    closeIcon.innerHTML ='close';
    // =====================================================
    // spotImgBoxDiv 先將其隱藏
    spotImgBoxDiv.setAttribute('style', 'display:none;');
    spotImgBoxDiv.appendChild(closeImgDiv);
    closeImgDiv.appendChild(closeIcon);
    //close 案件
    let closeImgBtn = document.querySelector(".close-img-box-btn");
    let spotImgBox =document.querySelector('.spot-img');
    // 關閉圖片內容 fuc
    fuc_closeBtn=()=>{
        spotImgBox.style.display ='none';
    };
    closeImgBtn.addEventListener('click', ()=>{ fuc_closeBtn()});
    // =====================================================
    // 開啟 圖片且換頁面也會有DOM事件
    $('.spottable tbody').on( 'click', '.spot-img-btn', fuc_showImg );
   
        // 點擊後秀出圖片
    function fuc_showImg(e){
        spotImgBox.style.display ='block';
        //spotNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
        spotImg.src = e.target.getAttribute('src');
        console.log(spotImg.src);
        // console.log(spotImg);
    };
    // =====================================================

    // 詳細內容燈箱
    let spotContent = document.querySelector('.spot-info-item');
    spotContent.style.display='none';
    // x click
    let closeInfoBtn = document.querySelector(".close-info-box-btn");
    fuc_spotContentCloseBtn=()=>{
        spotContent.style.display ='none';
    };
    closeInfoBtn.addEventListener('click', fuc_spotContentCloseBtn);
    // 詳細內容Button   
    clickSpotInfoBtn=()=>spotContent.style.display ='block';
    //
    fuc_showInfoContent=(e)=>{
        spotNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
        spotNo -= 1;
        // console.log(spotNo);
        let dataFromLi = document.querySelectorAll('.spot-info-item ul li');
        dataFromLi[0].innerHTML = `地點: ${res[spotNo].spotPlace}`;
        dataFromLi[1].innerHTML = `經度: ${res[spotNo].spotLongitude}`;
        dataFromLi[2].innerHTML = `緯度: ${res[spotNo].spotLatitude}`;
        dataFromLi[3].innerHTML = `資訊: ${res[spotNo].spotInfo}`;
        //console.log(`spotNo=${spotNo}`);
        
    };
    $('.spottable tbody').on( 'click', '.spot-info', function (e) {
        // setTimeout(newFunction,1000);
        clickSpotInfoBtn();
        fuc_showInfoContent(e);
    });

// 新增登相關閉
    let spotAddLightbox = document.querySelector(".spot-add-lightbox");
    spotAddLightbox.style.display ='none';
    //  add box btn 
    let spotInsertBtn = document.querySelector('.spot-add-btn');
    spotInsertBtn.addEventListener('click',()=> {spotAddLightbox.style.display='block'; 
        boxSpotNo.value = "";
    });
    // -- var box
    let boxSpotNo = document.getElementById('spotNo');
    let boxSpotName = document.getElementById('spotName');
    let boxSpotPlace = document.getElementById('spotPlace');
    let boxSpotImg = document.getElementById('spotImg');
    let boxSpotLongitude = document.getElementById('spotLongitude');
    let boxSpotLatitude = document.getElementById('spotLatitude');
    let boxSpotState = document.getElementById('spotState');
    let boxSpotInfo = document.getElementById('spotInfo');
    let boxCity = document.getElementById('spotCity');
    // var 新增燈箱 確定按鍵
    let insertSpotBtn = document.getElementById('insert-confirm-box-btn');
    // 
    let getInsertData;
    let rowID;
    fuc_getImg=()=>{
        // 重要: FormData()
        let form = new FormData();
        //formData.append(name, e.target.files[0], filename);
        //form.append("product[file][]", e.target.files[0])
        // **
        form.append('file', boxSpotImg.files[0]);
        //console.log(boxSpotImg.files[0]);
        form.append('spotName',boxSpotName.value);
        form.append('spotPlace',boxSpotPlace.value);
        form.append('spotLongitude',boxSpotLongitude.value);
        form.append('spotLatitude',boxSpotLatitude.value);
        form.append('spotInfo',boxSpotInfo.value);
        form.append('cityNo',boxCity.value);
        form.append('spotState',boxSpotState.value);
        //console.log(form);
        axios({
            method: 'post',
            url: './back_php/back_spot_insert.php',
            data: form,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            //`./test_img.php`,file)
            .then( (response) => { 
                //console.log(response);
                //console.log(response.data);
                getInsertData = response.data;
                rowID = response.data['rowNo'];           
                data = {
                    "spotNo": rowID,
                    "spotName": boxSpotName.value,
                    "spotImg": boxSpotImg.value,
                    "spotPlace": boxSpotPlace.value,
                    "spotLongitude": boxSpotLongitude.value,
                    "spotLatitude": boxSpotLatitude.value,
                    "spotInfo": boxSpotInfo.value,
                    "spotState":  boxSpotState.value,
                    "cityName": boxCity.options[boxCity.selectedIndex].text
                    }
                res.push(data);
                //console.log(data)
                table.row.add(data).draw(false);
                    fuc_spotCloseBtn();
            })
            .catch( (error) => console.log(error))
    };
    fuc_insertSpotInfo=()=>{
        // if(boxSpotName.value !=='' ){}
        fuc_getImg();
    };
    insertSpotBtn.addEventListener('click',fuc_insertSpotInfo);

    // 新增燈箱 按鍵關閉
    let closeBoxBtn = document.getElementById('close-insert-spot-box-btn');
    fuc_spotCloseBtn=()=>{
        boxSpotNo.value = '';
        boxSpotName.value = '';
        boxSpotPlace.value = '';
        boxSpotImg.value = '';
        boxSpotLongitude.value = '';
        boxSpotLatitude.value = '';
        // boxSpotState.value = '';
        spotAddLightbox.style.display ='none';
    };
    closeBoxBtn.addEventListener('click',fuc_spotCloseBtn);
    // =========================================
    // var 修改燈箱 確定按鍵
    let  updateConfirmBoxBtn= document.getElementById('update-confirm-box-btn');
    // -- var box
    let updateBoxSpotNo = document.getElementById('updateSpotNo');
    let updateBoxSpotName = document.getElementById('updateSpotName');
    let updateBoxSpotPlace = document.getElementById('updateSpotPlace');
    let updateBoxSpotImg = document.getElementById('updateSpotImg');
    let updateBoxSpotLongitude = document.getElementById('updateSpotLongitude');
    let updateBoxSpotLatitude = document.getElementById('updateSpotLatitude');
    let updateBoxSpotState = document.getElementById('updateSpotState');
    let updateBoxSpotInfo = document.getElementById('updateSpotInfo');
    let updateBoxCity = document.getElementById('updateSpotCity');
    // 
    updateConfirmBoxBtn.addEventListener('click',()=>{
        fuc_updateSpotInfo();
        fuc_updateSpotCloseBtn();
    });
    
    fuc_updateSpotInfo=()=>{
        let form = new FormData();

        // **
        form.append('spotNo',updateBoxSpotNo.value);
        form.append('file', updateBoxSpotImg.files[0]);
        form.append('spotName',updateBoxSpotName.value);
        form.append('spotPlace',updateBoxSpotPlace.value);
        form.append('spotLongitude',updateBoxSpotLongitude.value);
        form.append('spotLatitude',updateBoxSpotLatitude.value);
        form.append('spotInfo',updateBoxSpotInfo.value);
        form.append('cityNo',updateBoxCity.value);
        form.append('spotState',updateBoxSpotState.value);
        axios({
            method: 'post',
            url: './back_php/back_spot_update.php',
            data: form,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then((response) => { 
            console.log(response);
        }).catch((error) => console.log(error))
    
        
    }
    // 修改燈箱 盒子
    let updateSpotBox = document.getElementById("updateSpotBox");
    updateSpotBox.style.display ='none';
    // 修改燈箱 按鍵關閉
    let closeUpdateBoxBtn = document.getElementById('close-update-spot-box-btn');
    fuc_updateSpotCloseBtn=()=>{
        updateBoxSpotNo.value = '';
        updateBoxSpotName.value = '';
        updateBoxSpotPlace.value = '';
        updateBoxSpotImg.value = '';
        updateBoxSpotLongitude.value = '';
        updateBoxSpotLatitude.value = '';
        updateBoxSpotState.value='';
        updateBoxSpotInfo.value = '';
        // updateBoxCity.value='';
        updateSpotBox.style.display ='none';
    };
    closeUpdateBoxBtn.addEventListener('click',fuc_updateSpotCloseBtn);
    // ======================================








});
//============================================

//let New_spotImgBox =document.querySelector('.spot-img');
// let New_spotImgBoxDiv = document.createElement('div');
// let New_spotImg = document.createElement('img');

// function CreateBox(){
    
//     //New_spotImgBoxDiv.classList.add('spot-img');
//     // 將盒子加入至 main 下裡
//     document.getElementsByTagName('main')[0].appendChild(New_spotImgBoxDiv);
    
    
//     New_spotImgBoxDiv.appendChild(New_spotImg);
// };


// function New_showImg(src){
//     New_spotImgBoxDiv.style.display ='block';
//     //spotNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
//     New_spotImg.src = src;
//     //console.log(spotImg.src);
//     // console.log(spotImg);
// };