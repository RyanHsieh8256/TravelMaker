//管理員表格

let mgrData;
// ajax get manager
fuc_getManagerData=()=>{
    let payload = `SelectMode=manager&SelectWhere=1`;
    axios.post("./back_php/back_select.php", payload)
        .then( (responseMgr) => { 
            console.log(responseMgr);
            console.log(responseMgr.data);
            mgrData = responseMgr.data;
            // call fuc_dataTAble
            printData(mgrData);
        })
        .catch( (error) => console.log(error))    
};
// ============================================

function init(){
    fuc_getManagerData();
}; 

//window.onload
window.addEventListener('load', init, false);
// ============================================
// 管理員表格
printData=(arr)=>{
    arr.forEach(mgr => {
    const mgrtr = document.createElement("tr");
    const trContent1 = `
                            <td>${mgr.mgrNo}</td>
                            <td><img src="./back_img/manager_img/${mgr.mgrImg}" style="width: 30px; height: 30px;border-radius: 50%;vertical-align: middle;"/></td>
                            <td>${mgr.mgrName}</td>
                            <td>${mgr.mgrAccount}</td>
                            <td>${mgr.mgrAuz}</td>
                            
                        `;
        mgrtr.innerHTML = trContent1;
        document.querySelector(".managertable tbody").appendChild(mgrtr);
    });
};
var lightbox =document.querySelector(".lightbox");

// 先將燈箱關閉
lightbox.style.display ='none';

//close 
fuc_closeBtn=()=>{
    lightbox.style.display ='none';
};
 //call-fuc
let closeBoxBtn = document.querySelector(".close-box-btn");
closeBoxBtn.onclick = fuc_closeBtn;
let updateBtn = document.querySelector('.update-btn');

// open search-Box
fuc_excuteBtn=()=>{
    lightbox.style.display ='';
    
};

let searchBtn =document.querySelectorAll(".excute-btn");
searchBtn.forEach(btn => {
    btn.onclick = fuc_excuteBtn;
    
});
