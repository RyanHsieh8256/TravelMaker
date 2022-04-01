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