//  通用  /
// ---側邊欄顯示和隱藏---
let sideMenu = document.querySelector("aside");
let menuBtn = document.querySelector("#menu-btn");
let closeBtn = document.querySelector("#closeBtn");

//show sideber
fuc_menuBtn=()=>{
    sideMenu.style.display ='block';
};
//close sideber
fuc_closeBtn=()=>{
    sideMenu.style.display ='none';
}
// call->fuc_menuBtn()
menuBtn.addEventListener('click', fuc_menuBtn ,false);
// call->fuc_closeBtn()
closeBtn.addEventListener('click', fuc_closeBtn); 
// ============================================
//  DATE() today
fuc_getToday=()=>{
const today = new Date();
document.querySelector(".date span").innerHTML =today.toLocaleDateString();
}
// ============================================
//  change theme 背景色彩
const themeToggler = document.querySelector(".theme-toggler");
fuc_themeToggler=()=>{
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
};
// call->fuc_themeToggler()
themeToggler.addEventListener('click',fuc_themeToggler);
// ============================================
let response_data;
//  # login Out use ajax
// ajax login Out
let signOut = document.getElementById('sign-out');
// 登出
fuc_signOut=()=>{
    axios.get('./back_php/login_out.php',)
        .catch( (error) => console.log(error))

    // 呼叫 fuc_ajaxForLogin() 檢查
    fuc_ajaxForLogin();
}
// 跳轉時檢查SESSION有無存在 若無跳到登入介面反之無須登入
fuc_ajaxForLogin=()=>{
    let data_info = `loginMod=session`;

    axios.post('./back_php/back_login_copy.php',data_info)
        .then( (response) => { 
                response_data = response.data;
                // console.log(response_data);
                fuc_getManger();
                // console.log(response_data.mgrName);

                // 在此判斷
                if(response_data.status == "FAIL"){
                    location.href = "./back_login.html"; 
                }
            })
            
        .catch( (error) => console.log(error))
    
};
// console.log(response_data.mgrName); /??? 寫在外面有問題?
// 登出 觸發事件   
signOut.addEventListener('click', fuc_signOut, false);
// =====================================================
// 取得session 登入資訊 
var admin =document.getElementById('admin');
var adminImg =document.querySelector('.profile-photo img');
fuc_getManger=()=>{
    // console.log(response_data.mgrName);
    admin.innerText = response_data.mgrName;
    adminImg.src = `./back_img/manager_img/${response_data.mgrImg}`;
    // console.log(adminImg.src);
    
    let mgrSetBtn =document.getElementById('mgr-set-btn');
    if(response_data.mgrAuz == 'root'){
        mgrSetBtn.style.display = 'block';
    }else{
        mgrSetBtn.style.display = 'none';
    }
};
// ============================================
// 管理員 卡控

// load fuc
function init(){
    fuc_getToday();
    fuc_ajaxForLogin();
    // fuc_getManger();
}; 

//window.onload
window.addEventListener('load', init, false);
// ============================================
