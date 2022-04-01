
// var editor;
let res = '';
$(function () {
    let payload = {SelectMode:'ord',
                   SelectWhere:'1'};
    $('.ordertable').DataTable({
        responsive: true,
        "ajax": {
            "url": "./back_php/back_select.php",
            "type": "POST",
            "data": payload,
            "dataSrc": function ( data ) {
                //Make your callback here.
                res =data;
                // console.log(data);
                return data;
            }       
        },
        "columns": [ 
            { data: 'ordNo'},
            { data: 'memNo'},
            { data: 'memName'},
            { data: 'orderList', render: getOrdInfo },
            { data: 'ordSum'},
            { data: 'ordDate'},
            
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
});

//============================================
// datatable set btn
function getOrdInfo(data, type, full, meta) {
    let orderType = `<td><button class="order-list">詳細內容</button></td>`;
    return orderType;
};
// orderInfoBox.innerText = res[0].memName;
fuc_Info=()=>{
    // 宣告 InfoBox 
    // let InfoBox = document.querySelector('.order-list-item');
    let InfoBox = document.querySelector('.order-info-item');
    let closeInfoBtn = document.querySelector('.close-info-box-btn');
    // 關閉案件
    closeInfoBtn.addEventListener('click', ()=>fuc_closeInfo());
    function fuc_closeInfo(){
        InfoBox.style.display ='none';
    };
    // 開啟詳細內容
    let orderInfoBtn = document.querySelectorAll(".order-list");
    for(let j=0; j<orderInfoBtn.length ;j++){
        // console.log(orderInfoBtn[j]);//5
        // orderInfoBtn[j].index = j ;
        orderInfoBtn[j].addEventListener('click', (e)=>{clickOrderInfoBtn(),
                                                        fuc_getOrdInfo(e)
                                                        });
    };
    clickOrderInfoBtn=()=>{
        InfoBox.style.display ='';
    };
};
// Info Item
fuc_getOrdInfo=(e)=>{
    //console.log(e.target.parentNode.parentNode.childNodes[1].innerHTML);
    ordNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;

    let getOrdItem = {SelectMode:'ordItem',
                    SelectWhere:`ordNo = ${ordNo}`};
    $('#ord-table').DataTable({
        destroy: true,
        paging: false,
        searching: false,
        "ajax": {
            "url": "./back_php/back_select.php",
            "type": "POST",
            "data": getOrdItem,
            "dataSrc": function ( data ) {
                // console.log(data);
                return data;
            }       
        },
        "columns": [ 
            { data: 'ticketSpotNo'},
            { data: 'ticketSpotName'},
            { data: 'fullFarePrice'},
            { data: 'fullFareQuan'},
            { data: 'halfFarePrice'},
            { data: 'halfFareQuan'},
            { data: 'conTicketPrice'},
            { data: 'conTicketQuan'},
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
};

// window load
init=()=>{
    fuc_Info();  
}
window.addEventListener('load',init);