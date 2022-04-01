// 登入表單組件
Vue.component('login',{
    template: `
    <div class="froLoginForm_wrap">
        <form action="" class="froLoginForm">
            <h4 class='froLoginFormTitle'>請輸入帳號密碼</h4>
            <table>
                <tr class="froLoginFormItem">
                    <th>電子信箱:</th><td><input type="email" id="memEmail" name="memEmail" required></td>
                </tr>
                <tr class="froLoginFormItem">
                    <th>密碼:</th><td><input type="password" id="memPsw" name="memPsw" required></td>
                </tr>
            </table>
            <div class="froLoginBtn">
                <input id='loginBtn' type="submit" name="" value="登入" @click="login">
            </div>
        </form>
    </div>
    `,
    methods: {
        login : function(e){
            e.preventDefault();
            // 帳號密碼
            let memEmail = document.getElementById('memEmail').value;
            let memPsw = document.getElementById('memPsw').value;
            let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            // 燈箱
            let froLoginBG = document.getElementById('froLoginBG');

            if(memEmail=="" || memPsw==""){
                window.alert('請輸入帳號密碼!')
                return false
            }else if(memEmail.search(emailRule) == -1){
                window.alert('帳號格式錯誤!');
                return false
            }else{
                // 傳送資料
                let data_info = `memEmail=${memEmail}&memPsw=${memPsw}`;
                $.ajax({
                    type: "post",
                    url: "./phps/login.php",
                    data: `${data_info}`,
                    dataType:"text",
                    success: function (res) {
                        if(res == "noData"){
                            window.alert('帳號或密碼錯誤!');
                        }else{
                            if(JSON.parse(res).memState == '停權'){
                                window.alert('此帳號已被停權，詳細情況請洽管理人員!');
                                window.location.reload();
                            }else{
                                localStorage.setItem('memData',res);
                                let member = JSON.parse(res);
                                $('#loginBoxBtn').css('display','none');
                                $('#memBoxBtn').css('display','flex');
                                $('#memName').text(member.memName);
                                $('#memEmail').val('');
                                $('#memPsw').val('');
                                $('#memIcon').attr('src', `images/memIcon/${member.memIcon}`);
                                window.alert('登入成功!');
                                froLoginBG.style.display = "none";
                                if(document.getElementsByTagName('title')[0].innerText != '建立行程'){
                                    window.location.reload();
                                }
                            }
                        }

                    }
                });
            }

        },
    },
});
// 註冊表單組件
Vue.component('signin',{
    template: `
    <div class="froLoginForm_wrap">
        <form action="" class="froLoginForm" id="signinForm">
            <h4 class='froLoginFormTitle'>請填寫您的基本資料</h4>
            <table>
                <tr class="froLoginFormItem">
                    <th>電子信箱:</th>
                    <td>
                        <input type="email" name="memEmail" id="memEmail" @blur="emailCheck" required>
                    </td>
                </tr>
                <tr class="froLoginFormItem">
                    <th>密碼:</th>
                    <td>
                        <input type="password" name="memPsw" id="memPsw" maxlength="25" required>
                    </td>
                </tr>
                <tr class="froLoginFormItem">
                    <th>確認密碼:</th>
                    <td>
                        <input type="password" id="checkPsw" maxlength="25" required>
                    </td>
                </tr>
                <tr class="froLoginFormItem">
                    <th>姓名:</th>
                    <td>
                        <input type="test" id="memsigninName" required>
                    </td>
                </tr>
                <tr class="froLoginFormItem">
                    <th>手機號碼:</th>
                    <td>
                        <input type="tel" id="memPhone" maxlength="10"  @blur="phoneCheck" required>
                    </td>
                </tr>
                <tr class="froLoginFormItem">
                    <th>生日:</th>
                    <td>
                        <input type="date" id="memBirth" min="1900-01-01"  required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
                    </td>
                </tr>
            </table>
            <div class="froLoginBtn">
                <input type="submit" id='signinBtn' value="註冊" @click="signin">
            </div>
        </form>
    </div>
    `,
    // onkeyup="this.value=this.value.replace(/^\s+|\s+$/g,'')"禁止空格
    methods: {
        signin:function(e){
            e.preventDefault();
            let memEmail = document.getElementById('memEmail').value.replace(/^\s*|\s*$/g,"");
            let memPsw = document.getElementById('memPsw').value;
            let checkPsw = document.getElementById('checkPsw').value;
            let memsigninName = document.getElementById('memsigninName').value;
            let memPhone = document.getElementById('memPhone').value;
            let memBirth = document.getElementById('memBirth').value;

            let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            let telRule = /^09\d{2}-?\d{3}-?\d{3}$/;

            // 生日驗證 是否為今天之前
            let today = new Date();
            let birthDay = new Date(memBirth);
            let memAge = today.getFullYear() - birthDay.getFullYear();
            //創立日期
            let memCreateDate = today.toLocaleDateString();
            

            if(memEmail.search(emailRule) == -1){//帳號驗證 是否為電子郵件
                window.alert('電子郵件格式錯誤!');
                return false;
            }else if(memPsw == "" || checkPsw == ""){//密碼驗證 是否為空或2次輸入相同
                window.alert('請設定密碼!');
                return false;
            }else if(memPsw != checkPsw){
                window.alert('密碼驗證錯誤!');
                return false;
            }else if(memsigninName == ''){//姓名驗證 是否為空
                window.alert('請輸入姓名!');
                return false;
            }else if(memAge <= 0){
                window.alert('請輸入有效日期!');
                e.preventDefault();
                return false;
            }else if(!telRule.test(memPhone)){
                window.alert('手機號碼格式錯誤!');
                return false;
            }else{
                // 傳送資料
                let data_info = `memEmail=${memEmail}&memPsw=${memPsw}&memsigninName=${memsigninName}&memPhone=${memPhone}&memBirth=${memBirth}&memCreateDate=${memCreateDate}`;

                $.ajax({
                    type: "post",
                    url: "./phps/signin.php",
                    data: `${data_info}`,
                    dataType:"text",
                    success: function (res) {
                        if(res == "成功"){
                            $('#memEmail').val('');
                            $('#memPsw').val('');
                            $('#checkPsw').val('');
                            $('#memsigninName').val('');
                            $('#memPhone').val('');
                            $('#memBirth').val('');
                            window.alert('註冊成功，請重新登入!');
                        }else{
                            window.alert('註冊失敗!');
                        }
                        froLoginBG.style.display = "none";
                    }
                });

            };
        },
        emailCheck:function(){
            let memEmail = document.getElementById('memEmail');
            let signinBtn = document.getElementById('signinBtn');
            if(memEmail != ""){
                $.ajax({
                    type: "post",
                    url: "./phps/emailCheck.php",
                    data: `memEmail=${memEmail.value}`,
                    dataType:"text",
                    success: function (res) {
                        if(res == "error"){
                            signinBtn.disabled = true;
                            signinBtn.style.backgroundColor = 'grey';
                            window.alert('此信箱已被使用!');
                        }else{
                            signinBtn.disabled = false;
                            signinBtn.style.backgroundColor = '#007183'
                        }
                    }
                })
            }
        },
        phoneCheck:function(){
            let memPhone = document.getElementById('memPhone').value;
            let signinBtn = document.getElementById('signinBtn');
            if(memPhone != ""){
                $.ajax({
                    type: "post",
                    url: "./phps/phoneCheck.php",
                    data: `memPhone=${memPhone}`,
                    dataType:"text",
                    success: function (res) {
                        if(res == "error"){
                            signinBtn.disabled=true;
                            signinBtn.style.backgroundColor = 'grey';
                            window.alert('此電話已有人使用!');
                        }else{
                            signinBtn.disabled=false;
                            signinBtn.style.backgroundColor = '#007183'
                        }
                    }
                })
            }
        },
    },
});

Vue.component('loginbear',{
    template:`
    <div class="froLoginMascot">
        <label for="loginBtn">
            <img src="images/mascot/loginBear.svg" alt="">
        </label>
    </div>
    `,
})
Vue.component('singinbear',{
    template:`
    <div class="froLoginMascot">
        <label for="signinBtn">
            <img src="images/mascot/signinBear.svg" alt="">
        </label>
    </div>
    `,
})

new Vue({
    el: '#froLoginBlock',
    data: {
        content: 'login',
        content2: 'loginbear',
        isShow: true
    },
});



let froLoginSwitch_btn = document.querySelectorAll('.froLoginSwitch_btn');
let froLoginCancel = document.querySelectorAll('.froLoginCancel');
let froLoginBG = document.getElementById('froLoginBG');
let loginBoxBtn = document.getElementById('loginBoxBtn');

//存在local的會員資料(字串)
let memData = localStorage.getItem('memData');

let memBoxBtn = document.getElementById('memBoxBtn');
let navDropdownMenu = document.querySelectorAll('.navDropdownMenu')[0];
let logOutBtn = document.getElementById('logOutBtn');
//撈取會員資料
if(memData){
    let member = JSON.parse(memData);
    $('#loginBoxBtn').css('display','none');
    $('#memBoxBtn').css('display','flex');
    $('#memName').text(member.memName);
    $('#memIcon').attr('src', `images/memIcon/${member.memIcon}`);
}

// 註冊事件
function loginBox_doFirst(){
    for(i=0;i<froLoginSwitch_btn.length;i++){
        froLoginSwitch_btn[i].addEventListener('click',switchBtnColor)
    };
    froLoginCancel[0].addEventListener('click',closeLoginBox);
    loginBoxBtn.addEventListener('click',openLoginBox);
    memBoxBtn.addEventListener('click',openMemBox);
    logOutBtn.addEventListener('click',logOut);   
}


// 開啟登入燈箱
function openLoginBox(){
    froLoginBG.style.display = 'block';
}

// 開啟/關閉會員燈箱
function openMemBox(){
    if(navDropdownMenu.style.display == 'none'){
        navDropdownMenu.style.display = 'block';
    }else{
        navDropdownMenu.style.display = 'none';
    }
}
// 登出
function logOut(){
    localStorage.removeItem('memData');
    $('#loginBoxBtn').css('display','block');
    $('#memBoxBtn').css('display','none');
    $('#memName').text('');
    navDropdownMenu.style.display = 'none';
    window.alert('您已登出!');
    if(location.href.search('mem') == -1){
        window.location.reload();
        
    }else{
        window.location = 'home.html';
    }

};

// 登入/註冊顏色切換
function switchBtnColor(){
    $('.froLoginSwitch_btn').removeClass('froLoginSwitch_active');
    $(this).addClass('froLoginSwitch_active');
}

// 關閉登入燈箱
function closeLoginBox(){
    froLoginBG.style.display = 'none';
}
//購物車提示
function productInCart(){
    if(localStorage.getItem('cart')){
        if(JSON.parse(localStorage.getItem('cart')).length > 0){
            $('.navMember>li:first-child').addClass('productInCart');
            $('.iconNav>li:first-child').addClass('productInCart');
        }else if(JSON.parse(localStorage.getItem('cart')).length == 0){
            $('.navMember>li:first-child').removeClass('productInCart');
            $('.iconNav>li:first-child').removeClass('productInCart');
        }
    }else{
        $('.navMember>li:first-child').removeClass('productInCart');
        $('.iconNav>li:first-child').removeClass('productInCart');
    }
}

window.addEventListener('load',productInCart);
window.addEventListener('load',loginBox_doFirst);
$('.footerCopyRight').text('本網站為緯育TibaMe_前端設計工程師班第73期第五組學員專題成果作品，本平台僅供學習、展示之用。若有牴觸有關著作權，或有第三人主張侵害智慧財產權等情事，若有侵權疑慮，請私訊 [TibaMe-前端設計工程師養成班]，後續由專人協助處理。');
