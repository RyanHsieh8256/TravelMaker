// var editor;

$(function () {
    let res='' ;
    let payload = {SelectMode:'gro',
                   SelectWhere:'1'};
    $('.grotable').DataTable({
        responsive: true,
        "ajax": {
            "url": "./back_php/back_select.php",
            "type": "POST",
            "data": payload,
            "dataSrc": function ( data ) {
                res =data;
                // console.log(res);
                return data;
            }       
        },
        "columns": [ 
            { data: 'groNo',width: "10%"},
            { data: 'groName',width: "20%",heightMatch: 'none'},
            { data: 'createName'},
            { data: 'applyDeadline'},
            { data: 'applyNum' , render: getGroAddNum },
            { data: 'getOrdInfo', render: getGroInfo },
            { data: 'groState'},
            
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
    // 目前報名揪團成員
    function getGroAddNum(data, type, full, meta) {
        return GroAddNum = `<td><button class="gro-addnum" ${+data == 0 ? 'disabled' : ''}>成員:${data}</button></td>`;
    };
    // datatable set btn
    function getGroInfo(data, type, full, meta) {
        return groInfo = `<td><button class="gro-info">詳細內容</button></td>`;
    };
    //============================================
    // $('.grotable tbody').on( 'click', '.gro-info', function (e) {
        // setTimeout(newFunction,1000);
        // fuc_getGroInfo();
    // });
     $('.grotable tbody').on( 'click', '.gro-info', showInfo);
    //============================================
    // 詳細內容燈箱
    let groContent = document.querySelector('.gro-info-item');
    groContent.style.display='none';
    // x click
    let closeGroInfoBtn = document.querySelector(".close-info-box-btn");
    fuc_groContentCloseBtn=()=>{
        groContent.style.display ='none';
    };
    closeGroInfoBtn.addEventListener('click', fuc_groContentCloseBtn);
    // 詳細內容Button
    // clickgroInfoBtn=()=>{
    //     groContent.style.display ='';
    // };
    //
    // fuc_showInfoContent = (e) => {
    //     groContent.style.display ='';
    //     groNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
    //     groNo -= 1;
    //     console.log(groNo);

    //     let groDataFromLi = document.querySelectorAll('.gro-info-item ul li');
    //     groDataFromLi[0].innerHTML = `出發日期: ${res[groNo].groStartDate}`;
    //     groDataFromLi[1].innerHTML = `回程日期: ${res[groNo].groEndDate}`;
    //     groDataFromLi[2].innerHTML = `報名人數限制: ${res[groNo].groLimit}人`;
    //     groDataFromLi[3].innerHTML = `揪團簡介: ${res[groNo].groContent}`;
    //     groDataFromLi[4].innerHTML = `付費方式: ${res[groNo].groPay}`;
    //     console.log(`groNo=${groNo}`);
    // };
    //============================================
    // 給 詳細內容建立事件
    // fuc_getGroInfo=()=> {
    //     let groInfoBtn = document.querySelectorAll('.gro-info');
    //     for (let i = 0; i < groInfoBtn.length; i++) {
    //         // groInfoBtn[i].addEventListener('click', e => fuc_showInfoContent(e));
    //         groInfoBtn[i].addEventListener('click', showInfo);
    //     };
        // console.log(spotInfoBtn.length);
    // };
    //============================================
    function showInfo(e){
        groContent.style.display = 'block';
        console.log(e.target.parentNode.parentNode.childNodes[0]);
        groNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
        groNo -= 1;
        console.log(groNo);

        let groDataFromLi = document.querySelectorAll('.gro-info-item ul li');
        groDataFromLi[0].innerHTML = `出發日期: ${res[groNo].groStartDate}`;
        groDataFromLi[1].innerHTML = `回程日期: ${res[groNo].groEndDate}`;
        groDataFromLi[2].innerHTML = `報名人數限制: ${res[groNo].groLimit}人`;
        groDataFromLi[3].innerHTML = `揪團簡介: ${res[groNo].groContent}`;
        groDataFromLi[4].innerHTML = `付費方式: ${res[groNo].groPay}`;
        // console.log(`groNo=${groNo}`);
    };
    //============================================
    let groMemberItem = document.querySelector('.gro-member-item');
    groMemberItem.style.display='none';
    // ====
    $('.grotable tbody').on( 'click', '.gro-addnum', fuc_getGroMember);

    function fuc_getGroMember(e){
        groMemberItem.style.display='block';
        let getGroNo = e.target.parentNode.parentNode.childNodes[0].innerHTML;
        let getGroMem = {SelectMode:'gromem',
                         SelectWhere:`g.groNo = ${getGroNo}`};
            console.log(getGroNo);
        $('#gromem-table').DataTable({
            processing: true,
            destroy: true,
            paging: false,
            searching: false,
            "ajax": {
                "url": "./back_php/back_select.php",
                "type": "POST",
                "data": getGroMem,
                "dataSrc": function ( data ) {
                    // console.log(data);
                    return data;
                }       
            },
            "columns": [ 
                // { data: 'groDetailNo'},
                { data: 'memNo'},
                { data: 'memName'},
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
    // 給 gro member建立事件
    // fuc_getGroMemAll=()=> {
        
    //     let groMemberBtn = document.querySelectorAll('.gro-addnum');
    //     for (let i = 0; i < groMemberBtn.length; i++) {
    //         // groInfoBtn[i].addEventListener('click', e => fuc_showInfoContent(e));
    //         groMemberBtn[i].addEventListener('click',fuc_getGroMember);
    //     };
    //     // console.log(spotInfoBtn.length);
    // };
    // 
    // x click
    let closeGroMemBtn = document.querySelector(".close-gromem-box-btn");
    fuc_groMemberCloseBtn=()=>{
        groMemberItem.style.display ='none';
    };
    closeGroMemBtn.addEventListener('click', fuc_groMemberCloseBtn);
});

//============================================

// window load
// init=()=>{
// }
// window.addEventListener('load',init);