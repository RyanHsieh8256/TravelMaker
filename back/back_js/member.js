//會員表格
var t ='';
let res = null;
let getTargetInfo;
// ===============================================
// ajax get member
fuc_getMemberData=()=>{
    //var x = "SelectMode: member";
    //let payload = JSON.parse("{"+x.replace(/([\S]+)\:/g,'"$1":')+"}");
    // let payload =  { SelectMode : 'member'};
    //let payload = "SelectMode=member&name=value"; //舉例:參數
    let payload = `SelectMode=member&SelectWhere=1`;
    
    axios.post("./back_php/back_select.php", payload)
        .then( (response) => { 
            // console.log(response);
            console.log(response.data);
            res = response.data;
            $('.membertable').dataTable({
                "destroy": true,
                "data":res,
                //列的標題一般是從DOM中讀取（你還可以使用這個屬性為表格創建列標題)
                "columns": [ 
                    { data: 'memNo'},
                    { data: 'memName'},
                    { data: 'memEmail'},
                    { data: 'memPhone'},
                    { data: 'memBirth'},
                    { data: 'memIcon' ,render: getImg },                  
                    { data: 'memCreateDate'},
                    { data: 'memState' },
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
            var table = $('.membertable').DataTable();
            $('.membertable tbody').on( 'click', 'tr', function () {
                //console.log(table.row(this).data());
                getTargetInfo = table.row(this);
                fuc_getBoxWithInfo();
                if ( $(this).hasClass('selected') ) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            } );
            
        })
        .catch( (error) => console.log(error))
        // '<img src="' + data + '" height="50" width="50"/>'    height: 30px;
        // style="color: red; width: 40px; height: 40px;border-radius: 50%;"
};

// 從 dataTable col get img
function getImg(data, type, full, meta) {
    var orderType = data.OrderType;
    orderType = '<img src="../images/memIcon/' + data +'" style=" width: 30px; height: 30px;border-radius: 50%;vertical-align: middle;"/>';
    return orderType;
};
// ============================================
// 燈箱拿到所點擊資訊
let boxMemId = document.getElementById('box-memId');
let boxMemName = document.getElementById('box-memName');
let boxMemAccount = document.getElementById('box-memAccount');
let boxMemEmail = document.getElementById('box-memEmail');
let boxMemBirth = document.getElementById('box-memBirth');
let boxMemCreateDate = document.getElementById('box-memCreateDate');
let boxMemState = document.getElementById('box-memState');

// var update-btn
let boxUpdateBtn = document.getElementById('member-data-update-btn');
// console.log(optionIndex);

// x close
let closeLightbox=document.getElementById('close-edit-box-btn');
// 設定燈箱 並先關閉
let memLightbox = document.querySelector('.lightbox');
memLightbox.style.display='none';
//---------------------------------------------------------
// 編輯權限 Btn click open
let setEditBtn = document.getElementById('member-set-edit-btn');
fuc_openLightbox=()=>memLightbox.style.display='block';
//let getMemState =secletboxMemState.options[optionIndex].value;
fuc_getBoxWithInfo=()=>{
    boxMemId.value = getTargetInfo.data().memNo;
    // console.log(getTargetInfo.data().memNo);
    boxMemName.value = getTargetInfo.data().memName;
    boxMemEmail.value = getTargetInfo.data().memEmail;
    boxMemBirth.value = getTargetInfo.data().memBirth;
    boxMemCreateDate.value = getTargetInfo.data().memCreateDate;
    boxMemState.value = getTargetInfo.data().memState;
};
setEditBtn.addEventListener('click' ,()=>{fuc_openLightbox(),
                                          fuc_getBoxWithInfo()});
// 清空 欄位值
fuc_closeLightbox=()=>{
    boxMemId.value = '';
    boxMemName.value = '';
    boxMemEmail.value = '';
    boxMemBirth.value = '';
    boxMemCreateDate.value = '';
    // boxMemState.value = '';
    memLightbox.style.display='none';
};
closeLightbox.addEventListener('click',fuc_closeLightbox);
// ============================================
let updateValue = document.querySelectorAll('#box-memState option')[1].value;
fuc_editUpdateData=()=>{
    let sendLoad = `UpdateMode=member&UpdateData=${boxMemState.value}&UpdateWhere=${boxMemId.value}`;
    axios.post("./back_php/back_update.php", sendLoad)
        //.then(response)
    $('.membertable').DataTable().cell(getTargetInfo.index(),7).data(boxMemState.value);

    // let payload = `SelectMode=member&SelectWhere=memNo = '${boxMemId.value}'`;

    // axios.post("./back_php/back_select.php", payload)
    //     .then( (response) => { 
    //         res = response.data;
            
    //         $('.membertable').DataTable().cell(getTargetInfo.index(),7).data(res[0]['memState']);
    //         console.log(res[0]['memState']);
    //     })
    fuc_closeLightbox();
};
boxUpdateBtn.addEventListener('click',fuc_editUpdateData);
// =============================================
function init(){
    // call ajax
    fuc_getMemberData();
    fuc_closeLightbox();
}; 

//window.onload
window.addEventListener('load', init, false);

