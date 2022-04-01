//資料庫撈留言
function getMessage(){
    $.ajax({
        type: "post",
        url: "./phps/message.php",
        data: `groNo=${location.search.split('?')[1].split('=')[1]}`,
        dataType: "text",
        success: function (res) {
            res = JSON.parse(res)
            // console.log(res[0])
            // console.log(res)
            creatMessage(res);
        }
    });
};
//建立留言區塊
function creatMessage(res){
    $('.message_wrap').remove();
    for(i=0;i<Object.keys(res).length;i++){

        let messageWrap = document.createElement('div');
        messageWrap.classList.add('message_wrap');
        let messageHeader = document.createElement('div');
        messageHeader.classList.add('header');
        let pic = document.createElement('div');
        pic.classList.add('pic');
        let img = document.createElement('img');
        img.src = `./images/memIcon/${res[i].memIcon}`
        let txt = document.createElement('div');
        txt.classList.add('txt');
        txt.innerText = res[i].memName;
        let content = document.createElement('div');
        content.classList.add('content');
        content.innerText = res[i].msgContent;
        
        messageWrap.appendChild(messageHeader);
        messageWrap.appendChild(content);
        messageHeader.appendChild(pic);
        messageHeader.appendChild(txt);
        pic.appendChild(img);
        let leaveMessage = document.querySelector('.leaveMessage');
        document.getElementsByClassName('message')[0].insertBefore(messageWrap,leaveMessage);
    }
}
//留言寫入資料庫
function messageInsert(){
    if(memData){
        $.ajax({
            type: "post",
            url: "./phps/messageinsert.php",
            data: `groNo=${location.search.split('?')[1].split('=')[1]}&memNo=${JSON.parse(memData).memNo}&msgContent=${$('#inputBox').val()}`,
            dataType: "text",
            success: function (res) {
                if(res == 'success'){
                    $('#inputBox').val('');
                    getMessage();
                }
            }
        });
    }else{
        window.alert('請先登入!');
    }
}
$("#leaveMessageBtn").on('click',messageInsert);
window.addEventListener('load',getMessage);