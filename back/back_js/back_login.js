
// 宣告登入按鍵
let backLogin = document.getElementById("back-login-in");
// 宣告帳號與密碼
let mgrAccount =document.getElementById("loginAccount");
let mgrPassword =document.getElementById("loginPsw");
let loginMsg = document.getElementById("login-msg");

// ajax 
fuc_ajax=(mod)=>{

    if(mod == 'login' && (mgrAccount.value =="" || mgrPassword.value =="")){
        loginMsg.innerText = `請輸入帳號或密碼`; 
        loginMsg.style.color=`yellow`;
        return false;
    };

    let data_info = `loginMod=${mod}& mgrAccount=${mgrAccount.value}& mgrPsw=${mgrPassword.value}`;

    axios.post('./back_php/back_login_copy.php',data_info)
        .then( (response) => { 
                console.log(response);
                console.log(response.data);

                response_data = response.data;
                if(response_data.status == "PASS"){
                    location.href = "./back_member.html"; 
                }else{
                    loginMsg.innerText = response_data.msg; 
                    loginMsg.style.color=`#f00`;
                }

                // if(mod == 'login' && response.data.status == "not found"){ 
                //     loginMsg.innerText = `帳號或密碼有誤`; 
                //     loginMsg.style.color=`#f00`;
                //     //console.log('false');
                //     //alert("false");      
                // }else if(response.data != "not found"){
                //     //alert("ok");
                //     loginMsg.innerText = `登入成功`;
                //     loginMsg.style.color=`green`;
                //     // 網頁跳轉
                //     location.href = "./back_member.html"; 
                // }
            })
            
        .catch( (error) => console.log(error))
    
};    
// ============================================
function init(){
    fuc_ajax('session');
    backLogin.addEventListener('click', 
                                (e)=>{
                                    fuc_ajax('login');
                                    },
                                false);
}; 

//window.onload
window.addEventListener('load', init, false);