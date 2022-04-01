// const ticketData=[
//     {"ticketNo":"1","ticketName":"台北101","cityArea":"台北市","ticketMainImg":"ticket-main-img-01.jpg","upperImg1":"upperImg-001-jpg","ticketSpotIntro":"lorem I am cry! QAQ ","fullFarePrice":"200","halfFarePrice":"100","conTicketPrice":"60","launchDate":"2022-02-30","ticketState":"正常","ticketDesc":"台灣風景好傷好水 宛如阿里山的姑娘"},
//     {"ticketNo":"2","ticketName":"象山","cityArea":"台北市","ticketMainImg":"ticket-main-img-02.jpg","upperImg1":"upperImg-001-jpg","ticketSpotIntro":"lorem I am cry! QAQ ","fullFarePrice":"300","halfFarePrice":"100","conTicketPrice":"60","launchDate":"2022-02-30","ticketState":"下架","ticketDesc":"台灣風景好傷好水 宛如阿里山的姑娘"},
//     {"ticketNo":"3","ticketName":"西門町","cityArea":"台北市","ticketMainImg":"ticket-main-img-03.jpg","upperImg1":"upperImg-001-jpg","ticketSpotIntro":"lorem I am cry! QAQ ","fullFarePrice":"999","halfFarePrice":"100","conTicketPrice":"60","launchDate":"2022-02-30","ticketState":"正常","ticketDesc":"台灣風景好傷好水 宛如阿里山的姑娘"}
//     ];

    // // Table
    // ticketData.forEach(ticket => {
    //     const tickettr = document.createElement("tr");
        
    //     const trContent = `
    //                             <td>${ticket.ticketNo}</td>
    //                             <td>${ticket.ticketName}</td>
    //                             <td>${ticket.cityArea}</td>
                                
    //                             <td>${ticket.fullFarePrice}</td>
    //                             <td>${ticket.halfFarePrice}</td>
    //                             <td>${ticket.conTicketPrice}</td>
    //                             <td><button class="content-info">詳細內容</button >
    //                             <td>${ticket.launchDate}</td>
    //                             <td>${ticket.ticketState}</td>
    //                             <td><button class="btn btn-warning btn-sm">編輯</button></td>
    //                         `;
    //                         tickettr.innerHTML = trContent ;
    //         document.querySelector(".tickettable tbody").appendChild(tickettr);
    // });

    // onclick =" fuc_ticketContent('${ticket.ticketInfo}')"
var rows;
var editor; 
$(document).ready(function() {
    
    let payload = {SelectMode:'ticket',
                    SelectWhere:'1'};
    $('#tickettable').DataTable( {
        // "processing": true,
        // "serverSide": true,
        "ajax": {
            "url": "./back_php/back_select.php",
            "type": "POST",
            "data": payload,
            "dataSrc": function ( data ) {
                //Make your callback here.
                // console.log(data);
                return data;
            }       
        },
        "columns": [ 
            { data: 'ticketSpotNo'},
            { data: 'ticketSpotName'},
            { data: 'cityName'},
            { data: 'fullFarePrice'},
            { data: 'halfFarePrice'},
            { data: 'conTicketPrice' },                  
            { data: 'launchDate'},
            { data: 'ticketSpotState' },
            // { data: 'ticketState' },
            
        ],
    } );
    var table = $('#tickettable').DataTable();
    
        
    $('#tickettable tbody').on( 'click', 'tr', function () {
        console.log( table.row(this).data());
        rows = table.row(this).data();   
        // console.log(rows.ticketSpotNo);                                                                               
    } );
    
    // 新增燈箱開啟
    let ticketAddBtn = document.querySelector(".ticket-add-btn");
    // let boxTicketSpotNo = document.querySelector('input #ticketNo');
    // boxTicketSpotNo.value = rows.ticketSpotNo; 
    // console.log(TicketSpotNo.value);
    let boxTicketSpotNo = document.querySelector('#ticketNo');
    let boxTicketSpotName = document.querySelector('#ticketName');
    let boxTicketSpotIntro = document.querySelector('#ticketSpotIntro');
    let boxTicketSpotMainImg = document.querySelector('#mainImg');
    let boxTicketSpotUpperImg =document.querySelector('#upperImg');
    let boxTicketSpotFullFarePrice = document.querySelector('#fullFarePrice');
    let boxTicketSpotHalfFarePrice = document.querySelector('#halfFarePrice');
    let boxTicketSpotConTicketPrice = document.querySelector('#conTicketPrice');
    let boxTicketSpotLaunchDate = document.querySelector('#launchDate');
    // select
    let boxTicketSpotTicketDesc = document.querySelector('#ticketDesc');
    let boxTicketSpotSpotLatitude =document.querySelector('#spotLatitude');
    let boxTicketSpotImgDesc = document.querySelector('#imgDesc');
    // 
    
// contentbox 編輯內容按鍵之開關
    // 新增登相關閉
    var ticketAddLightbox = document.querySelector(".ticket-add-lightbox");
    // 先將燈箱關閉
    ticketAddLightbox.style.display ='none';
    fuc_spotAddLighth =()=>{
        ticketAddLightbox.style.display ='block';
        boxTicketSpotNo.value = rows.ticketSpotNo;
        boxTicketSpotName.value = rows.ticketSpotName;
        boxTicketSpotIntro.value = rows.ticketSpotIntro;
        boxTicketSpotMainImg.fileName = rows.mainImg;
        console.log(boxTicketSpotMainImg.fileName);
        // boxTicketSpotUpperImg.value = rows.upperImg1;
        boxTicketSpotFullFarePrice.value = rows.fullFarePrice;
        boxTicketSpotHalfFarePrice.value = rows.halfFarePrice;
        boxTicketSpotConTicketPrice.value = rows.conTicketPrice;
        boxTicketSpotLaunchDate.value = rows.launchDate;
        boxTicketSpotTicketDesc.value = rows.ticketDesc;
        // boxTicketSpotSpotLatitude.value = rows.upperImg2;
        boxTicketSpotImgDesc.value = rows.ticketDesc;
        // console.log(rows.ticketSpotName);
    };
    ticketAddBtn.addEventListener('click',fuc_spotAddLighth);



// 修改燈箱關閉
// var spotLightbox =document.querySelector(".spot-lightbox");
// 詳細內容小視窗
// var spotInfoWindow =document.querySelector(".spot-info-item");


// spotLightbox.style.display ='none';
// spotInfoWindow.style.display ='none';

    //close 
    let closeBoxBtn = document.querySelector(".close-box-btn");
    fuc_closeBtn=()=>{
        ticketAddLightbox.style.display ='none';
    };
    closeBoxBtn.addEventListener('click',fuc_closeBtn);



// 燈箱內容 設定:
// const boxTicketSpotNo = document.querySelector('input #ticketNo');
// boxTicketSpotNo.value = rows.ticketSpotNo; 
// console.log(TicketSpotNo.value);


// // open search-Box
// fuc_excuteBtn=()=>{
//     spotLightbox.style.display ='';
    
// };
// // 修改
// let editBtn =document.querySelectorAll(".btn-warning");
// editBtn.forEach(btn => {
//     btn.onclick = fuc_excuteBtn;
    
// });
// // 詳細內容 按鍵關閉
// fuc_spotCloseBtn=()=>{
//     spotInfoWindow.style.display ='none';
// };
// let closeInfoBtn = document.querySelector(".close-info-box-btn");
// closeInfoBtn.onclick = fuc_spotCloseBtn;
// // 詳細內容 按鍵開啟


// // 詳細內容
// let spotInfoBox = document.querySelector(".spot-info-item p");
// let spotInfoBtn = document.querySelectorAll(".content-info");

// fuc_spotContent =(e)=>{
//     spotInfoBox.innerHTML = e;
//     console.log(e);
//     spotInfoWindow.style.display='';
// };

} );


// spotInfoBtn.forEach(infoBtn=>{
//     infoBtn.onclick = fuc_spotContent;
// });