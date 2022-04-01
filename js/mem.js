//左測會員資料設定
if(memData){
    let member = JSON.parse(memData);
    $('.memberAccountName h3').text(member.memName);
    $('.memberAccountPhto img').attr('src', `images/memIcon/${member.memIcon}`);
}

//檢查是否已登入
if(memData == null){
    window.alert('請先登入!');
    window.location = "home.html";
}

//登出按鈕
logOutBtn.onclick = function(){
    $('.memberAccountName h3').text("");
    $('.memberAccountPhto img').attr('src', `images/memIcon/icon-0.jpg`);
    window.location = 'home.html';
}
//頁面確認
function checkPageTitle(){
    let pageTitle = document.getElementsByTagName('title')[0].innerText;
    let SectionControlor = document.querySelectorAll('.member_SectionControlor');
    for(i = 0;i<SectionControlor.length;i++){
        if(SectionControlor[i].innerText.replace(/^\s*|\s*$/g,"") == pageTitle){
            SectionControlor[i].style.color = "white";
            SectionControlor[i].parentNode.style.backgroundColor = "#007183";
        }
    }
    
}
checkPageTitle();


//loading畫面
$(document).ready(function(){
    let loadingbox = document.createElement('div');
    loadingbox.setAttribute('id','loadingbox');
    let loading = document.createElement('div');
    loading.classList.add('loading');
    loadingbox.appendChild(loading);
    for(i=0;i<200;i++){
        let ball = document.createElement('div');
        ball.classList.add('ball')
        loading.appendChild(ball);
    } 
    document.getElementsByTagName('body')[0].appendChild(loadingbox);
});

window.addEventListener('load',function(){
    $('#loadingbox').fadeOut(1500,function(){
        $('#loadingbox').remove();
    });
});

