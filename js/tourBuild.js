
window.addEventListener('load',function() {
   stateArr = [];
    tourForm = document.querySelector('#tourForm');
    tourBuildName = document.querySelector('.tourBuild_name');
    tourBuildDay = document.querySelector('.tourBuild_days span');
    tourBuildDate = document.querySelector('.tourBuild_date');
    alertBG = document.querySelector('.alertBG');
    alertClose = alertBG.querySelector('.alertBG_closeBtn');
    chipBtn = document.querySelectorAll('.btn--chip');
    chipBtn.forEach(btn => btn.addEventListener('click',autofillWord));
    chipBtn.forEach(btn => btn.addEventListener('click',autoSearch));

    setBtn = document.querySelector('#checkSet');
    setBtn.addEventListener('click',reviseSet);

    searchSpot = this.document.querySelector('#searchSpot');
    searchSpot.addEventListener('keyup',searchPlace);

    sessionStorage.clear();
    localStorage.removeItem('lastJourNo');
    localStorage.removeItem('editNum');

    fetchData();
    goBuildGroup();
    getLastJour();
    displayTourForm();
    setTourForm();
})

window.addEventListener('hashchange',fetchData);

// 點擊儲存將行程資料寫回資料庫
saveTour.addEventListener('click',storeHandle);

let curNo = [];
let insertState = 0;


// 點擊預設給的程式快速查詢
function autofillWord(e) {
  let curBtn = e.currentTarget.textContent;
  searchSpot.value = curBtn;

}

function autoSearch(e) {
  let searchVal = e.currentTarget.textContent.trim();

  fetchSearch(searchVal);
}


// 先抓到最新一筆的行程編號
function getLastJour() {
  let parseUrl = document.location.hash.toLowerCase();
  let states = parseUrl.split('/')[1];
  let no = +parseUrl.split('/')[2];

  if(states == 'tour') {
    fetch(`./phps/fetchLastJour.php`)
    .then(res => res.json())
    .then(data => jourNoHandle(data));
  }else {
    getEditNo(no);
  }

}


// 處理返回的行程編號型別
function jourNoHandle(data) {

  let lastJourNo = +data[0].journeyNo;
  // console.log(lastJourNo);

  var noArr = [];
  noArr.push(lastJourNo);

  localStorage.setItem('lastJourNo', lastJourNo);
}

// 若是編輯行程就抓這個值
function getEditNo(num) {
  localStorage.setItem('editNum', num);
}

function storeHandle() {
  let no = localStorage.getItem('lastJourNo') != null ? (+localStorage.getItem('lastJourNo')+ 1 ) :+localStorage.getItem('editNum');
  // console.log(no);
  if(localStorage.getItem('memData') == null) {
    alertBG.style.display = 'block';
    alertBG.querySelector('.alertBG_content').textContent = '請先登入喔';
    alertClose.addEventListener('click',function() {
      alertBG.style.display = 'none';
    })
  }else {
    updateTour(no);
  }
 
 
}

function updateTour(number) {

  let tourBuildDate = document.querySelector('.tourBuild_date');
  let dateArr = (tourBuildDate.textContent).trim().split(' - ');                
  let re = /\./gi;

  let jourdiff = Math.abs(new Date(dateArr[1]) - new Date(dateArr[0]));
  let day = jourdiff/(1000 * 3600 * 24) + 1;


    let tourSpot = [];
    let spotsDom = document.querySelectorAll('.timeline_item');

    spotsDom.forEach(spot => {
      let journeySpotDay = +spot.parentElement.className
                      .split(' ')[1]
                      .split('--')[1];

      let spotObj = {
        journeyNo: number,
        journeySpotDay,
        sequence: +spot.querySelector('.timeline_num').textContent,
        spotNo: +spot.dataset['no']
      }

      tourSpot.push(spotObj);
    })

    // console.log(tourSpot);
    

    let tourObj = {
      journeyNo: number,
      journeyName: tourName.textContent,
      journeyImg: number <= 40 ? `journeyImg-${number}.jpg` : 'journeyImg-0.jpg',
      journeyInfo: tourForm.tourInfo.value,
      memNo: getMemData().memNo,
      journeyStartDay: dateArr[0].replace(re,'-'),
      journeyEndDay: dateArr[1].replace(re,'-'),
      journeyState: '公開'
    }

  let tour = [tourObj];
  tourData = new FormData();
  tourData.append('tour',JSON.stringify(tour));

  insertTour(tourData);

  if(tourSpot.length == 0) return;
  spotData = new FormData();
  spotData.append('spots',JSON.stringify(tourSpot));
  
  deleteSpot(number,spotData);
}


// 刪除這個行程的景點
function deleteSpot(data,spotdata) {
  fetch(`./phps/deleteSpot.php?no=${data}`)
  .then(res => {
    insertTour(spotdata);
    return res.text();
  })
  
}


// 在資料庫新增行程
function insertTour(data) {
  fetch(`./phps/insertTour.php`, {
    method: 'POST',
    // headers 加入 formdata 格式
    header: {
      'Content-Type': 'multipart/form-data' 
    },
    body: data
  })
  .then(res => res.text())
  .then(data => getJourNo(data))
  .then(data => {
    let parseUrl = document.location.hash.toLowerCase();
    let states = parseUrl.split('/')[1];
    alertBG.style.display = 'block';
    setTimeout(() => alertBG.style.display = 'none',1500);

    if(states == 'tour') {
      history.pushState({page: 1}, "", `tourbuild.html#/tour/${curNo[0]}`)
      alertBG.querySelector('.alertBG_content').textContent = '已儲存行程';  
    }else {
      alertBG.querySelector('.alertBG_content').textContent = '已更新行程';  
    }
  })
}

function getJourNo(data) {
  
  if(data > 0) {
    curNo.push(data);
    insertState = 1;

  }else {
    insertState = 0;
  }

  // console.log(curNo,insertState);
  
}

function fetchJourNo() {
  
}

// 進來抓到該行程的編號並撈資料渲染
    // 點擊加入行程抓到這個行程的資料
function fetchData() {
  
  let parseUrl = document.location.hash.toLowerCase().split('/');
  let [,states,no] = parseUrl;
  // console.log(states);

  // 如果為編輯行程或以舊行程新增行程
  if(states == 'touredit' || (states == 'tour' && no)) {
    let curJour = getUrl();

      fetch(`./phps/fetchJour.php?find=${curJour}`).then(res => res.json())
      .then(data => {

          // 抓該行程的天數

          let dayArr = [];
          let dayNum = Math.max(...data.map(jour => +jour.journeySpotDay));
        

          for(let i = 1; i <= dayNum; i++ ) {
              let theData = data.filter(jour => jour.journeySpotDay == i);
              dayArr.push(theData);
          }

          
          // 寫入session storage
          sessionStorage.clear();
          dayArr.forEach((day,i) => {
              // 整理陣列裡物件順序
              day.sort((a,b) => +a.sequence - +b.sequence);
              sessionStorage.setItem(`day${i+1}`, JSON.stringify(day));
          });

          displaySide(curJour,dayNum);
          displayTab();
          displayContent();
          displayTourForm();
          setTourForm();
      })

  }else {
    // 從localStorage撈剛才建立的資料內容
    let tourData = JSON.parse(localStorage.getItem('newTour'));
    let tName = tourData[0].tourName;
    let startDate = tourData[0].startDate;
    let endDate = tourData[0].endDate;
    
    let diff = Math.abs(new Date(endDate) - new Date(startDate));
    let day = diff/(1000 * 3600 * 24) + 1;

    tourName.textContent = tName;
    days.textContent = day;
    let dates = document.querySelector('.tourBuild_date');
    let re = /-/gi;
    dates.textContent = `${startDate.replace(re,'.')} - ${endDate.replace(re,'.')}`;

    displaySide(undefined,day);
    displayTab();
  }
  
}

// 景點資料(時間軸渲染)
function displaySide(no,num) {
  let timelineBox = document.querySelector('.timeline_box');
  let timelineList = document.querySelector('.timeline_list');
  timelineBox.innerHTML = '';
  timelineList.innerHTML = '';

  let tabs = '';

  for(let i = 1; i <= num; i++) {

      if(no) {
        let dayData = JSON.parse(sessionStorage.getItem(`day${i}`));

        // 新增行程天數page
        let timelinePage = document.createElement('div');
        timelinePage.className = `timeline_page timeline_page--${i} ${i == 1 ? 'timeline_page--active' : ''}`;
        timelineList.append(timelinePage);


        tabs += `<div class="timeline_tab timeline_tab--${i} ${i == 1 ? 'timeline_tab--active' : ''}" data-tab="${i}">第${i}天</div>`;
        
    
        let items = dayData.map(day => {
            let {spotNo,sequence,spotName,spotImg,spotInfo, spotPlace} = day;

            let spotItem = `
            <li class="timeline_item tourBuild_item" data-no="${spotNo}" drag-handle>
            <div class="timeline_text">
                <div class="timeline_num">${sequence}</div>
                <div class="timeline_name">${spotName}</div>
            </div>
            <div class="timeline_img">
                <img src="${spotImg}" alt="">
            </div>
            <div class="timeline_info" style="display: none;">
              ${spotInfo}
            </div>
            <div class="timeline_place" style="display: none;">
              ${spotPlace}
            </div>
            </li>
            `
            return spotItem;
        }).join('');


        timelinePage.innerHTML = items;
      }else {
        // 新增行程天數page
        let timelinePage = document.createElement('div');
        timelinePage.className = `timeline_page timeline_page--${i} ${i == 1 ? 'timeline_page--active' : ''}`;
        timelineList.append(timelinePage);

        tabs += `<div class="timeline_tab timeline_tab--${i} ${i == 1 ? 'timeline_tab--active' : ''}" data-tab="${i}">第${i}天</div>`;

      }
      
  }

  timelineBox.innerHTML = tabs;

  changeTab();
}

// 讓popup的資料為fetch回來的資料
function displayTourForm() {
  let data = JSON.parse(sessionStorage.getItem("day1"));
  if (data == null) return;
  let {journeyNo, journeyName,journeyStartDay,journeyEndDay, journeyInfo} = data[0];

  tourName.textContent = journeyName;

  let diff = Math.abs(new Date(journeyEndDay) - new Date(journeyStartDay));
  let day = diff/(1000 * 3600 * 24) + 1;
  days.textContent = day;

  let tourDate = document.querySelector('.tourBuild_date');
  let re = /-/gi;
  tourDate.textContent = `${journeyStartDay.replace(re,'.')} - ${journeyEndDay.replace(re,'.')}`;
  

  return {
    journeyNo,
    journeyName,
    journeyStartDay,
    journeyEndDay,
    journeyInfo
  }

}

displayTourForm();

function setTourForm() {
  let tourdates = document.querySelector('.tourBuild_date').textContent.trim().split(' - ');
  let re = /\./gi;
  tourForm.tourInfo.value = displayTourForm()?.journeyInfo || '';
  formName.value = displayTourForm()?.journeyName || tourName.textContent.trim();
  tourForm['start-date'].value = displayTourForm()?.journeyStartDay || tourdates[0].trim().replace(re,'-');
  tourForm['end-date'].value = displayTourForm()?.journeyEndDay || tourdates[1].trim().replace(re,'-');

  // console.log( tourName.textContent, tourdates[0], tourdates[1]);
}

setTourForm();


// // 地圖呈現
function mainMap() {
    // 取得用戶位置
    navigator.geolocation.getCurrentPosition(
    //   如果正確獲取
    function(pos) {
    // let {latitude,longitude} = pos.coords;
    },
    function() {
    alert('請開啟定位謝謝~');
    },
    {enableHighAccuracy: true,  timeout: 5000});


    map = L.map('map');
    map.setView([24.98921012878418, 121.31353759765625], 11);


    var Stadia_AlidadeSmooth = L.tileLayer('https://api.mapbox.com/styles/v1/joyce44528/cl0jxpac0001m14pkbomag45u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam95Y2U0NDUyOCIsImEiOiJja3o0YnN0NWgwZjdpMm9uZjJ4NmptZzB0In0.DYwJjf7K_EZu08ajfWqW0w', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

}



 

// 搜尋結果的景點maker
function displayMaker(data) {

  let greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // 先清空原本有的marker
  // let markerArr = [];
 
  // 顯示地圖景點位置
  for(let i = 0; i < data.length; i++){
     
     let marker = L.marker([+data[i].spotLatitude, +data[i].spotLongitude], {icon: greenIcon});

     marker
      .addTo(map)
      .bindPopup(
        `<div class="spot_popup">
          <div class="spot_popup--header">
            <div class="spot_popup--img">
              <img src="${data[i].spotImg}">
            </div>
            <div class="spot_popup--text">
              <h4 class="spot_popup--name">
              ${data[i].spotName}
              </h4>
              <p class="spot_popup--place">
                ${data[i].spotPlace}
              </p>
            </div>
          </div>
      </div>`,
        L.popup(
          {
            autoClose: true,
            closeOnClick: false
          }
        )
      )
      .on('click',clickZoom)
      .openPopup();
  }


}

// 點擊maker會以他為地圖中心
function clickZoom(e) {
  map.setView(e.target.getLatLng(),15);
}

// 滑到新增景點頁面
function slideAdd() {
    // 滑動
    let newSpotBtn = document.querySelectorAll('.tourBuild_newSpot');
    let arrowBtn = document.querySelector('#arrowBtn');
    let container = document.querySelector('.tourBuild_container');

    newSpotBtn.forEach(btn => btn.addEventListener('click',() => {
      container.style.transform = `translateX(-100%)`;
    }))

    arrowBtn.addEventListener('click',() => {
      container.style.transform = `translateX(0%)`;
    })


}
slideAdd();


// 動態新增刪除tab和page
// var stateArr = [];
function displayTab() {
  let tourBuildDay = document.querySelector('.tourBuild_days span');
  let totalDay = +tourBuildDay.textContent;

  stateArr.push(totalDay);
  if(stateArr.length > 2) {
    stateArr.shift();
  }
  
  let [prev, cur] = stateArr;
  let diff = cur - prev;
 
  console.log(stateArr);

  let timelineBox = document.querySelector('.timeline_box');
  let timelineList = document.querySelector('.timeline_list');

  // 增加天數的狀況
  if(diff >= 1) {
    let innHtml = '';
    let innPage = '';

    for(let i = prev + 1; i <= cur; i++) {
      innHtml += `<div class="timeline_tab timeline_tab--${i}" data-tab="${i}">第${i}天</div>`;

      innPage += ` <div class="timeline_page timeline_page--${i}"></div>`
    }

    timelineBox.insertAdjacentHTML('beforeend',innHtml);
    timelineList.insertAdjacentHTML('beforeend',innPage);

    changeTab();
  }

  if(diff < 0) {
    let tabs = document.querySelectorAll('.timeline_tab');
    let page = document.querySelectorAll('.timeline_page');

    let sliceArr = [...tabs].slice(cur);
    let pageArr = [...page].slice(cur);

    sliceArr.forEach(tab => tab.remove());
    pageArr.forEach(page => page.remove());
  }

}


// 切換行程天標籤
function changeTab() {
  tabs = document.querySelectorAll('.timeline_tab');
  pages = document.querySelectorAll('.timeline_page');
  tabs.forEach(tab => tab.addEventListener('click',changePage));

}
  changeTab();


//切換行程分頁 
function changePage(e) {
    tabs.forEach(tab => tab.classList.remove('timeline_tab--active'));
    pages.forEach(page => page.classList.remove('timeline_page--active'));

    let curPage = Number(e.target.dataset['tab']);
    let tab = document.querySelector(`.timeline_tab--${curPage}`);
    let page = document.querySelector(`.timeline_page--${curPage}`);

    if(!tab || !page) return;
    tab.classList.add('timeline_tab--active');
    page.classList.add('timeline_page--active');

    return curPage;
}

// 行程天標籤的拖動
const dragSlide = function() {

  const infoList = document.querySelector('.timeline_box');

  let clicked = false;
  let startX;
  let xoffest;


  const end = () => {
      clicked = false;
      
  }

  const start = (e) => {
      clicked = true;
      startX = e.pageX || e.touches[0].pageX - infoList.offsetLeft;
      xoffest = infoList.scrollLeft;	
  }

  const move = (e) => {
      if(!clicked) return;
      
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - infoList.offsetLeft;
    const dist = (x - startX);
    infoList.scrollLeft = xoffest - dist;
  }

  
  infoList.addEventListener('mousedown', start);
  infoList.addEventListener('touchstart', start);

  infoList.addEventListener('mousemove', move);
  infoList.addEventListener('touchmove', move);

  infoList.addEventListener('mouseleave', end);
  infoList.addEventListener('mouseup', end);
  infoList.addEventListener('touchend', end);
  
}

dragSlide();
  
// 景點資訊卡
function displayContent() {
  tourBuildItems = document.querySelectorAll('.timeline_page .timeline_item');
  // console.log(tourBuildItems);

  tourBuildItems.forEach(item => item.removeEventListener('click', clickHandler));
  tourBuildItems.forEach(item => item.addEventListener('click', clickHandler)); 
}

let toggleMap = document.querySelector('.toggleMap');
let tourBuildBox = document.querySelector('.tourBuild_box');

toggleMap.addEventListener('click',() => {
  console.log('嗨嗨');
  tourBuildBox.classList.toggle('is_active');
})



// 景點資訊卡
function clickHandler(e) {
  let timelineItem = document.querySelectorAll('.tourBuild_item');

  timelineItem.forEach(item => item.style.background = '');
  e.currentTarget.style.background = '#A7DFD8';
  let spot = document.querySelector('.tourSpot');
  let curPoint = +e.currentTarget.dataset["no"];
  let curImg = e.currentTarget.querySelector('.timeline_img img').src;
  let curName = e.currentTarget.querySelector('.timeline_name').textContent;
  let curInfo = e.currentTarget.querySelector('.timeline_info').textContent;
  let curPlace = e.currentTarget.querySelector('.timeline_place').textContent;
  
      
  let spotHtml = `
    <div class="tourSpot_wrap">
    <button class="btn btn--close tourSpot_close">
      <i class="bi bi-x"></i>
    </button>
    <div class="tourSpot_img">
      <img src="${curImg}" alt="">
    </div>
    <div class="tourSpot_text">
      <h3 class="third-title">${curName}</h3>
      <div class="tourSpot_info">
        <p class="p-text tourSpot_addr">
          ${curPlace}
        </p>
      </div>
      <p class="p-text tourSpot_bewrite">
        ${curInfo}
      </p>
    </div>
  </div>
  `
    spot.innerHTML = spotHtml;
    spot.style.display = 'block';

    spotClose = document.querySelector('.tourSpot_close');
    spotClose.addEventListener('click', function() {
      spot.style.display = 'none';
    })
}


  
// 行程景點列表
function displaytimeline(e) {
  let curTab = document.querySelector('.timeline_tab--active');
  let curPage = +curTab.dataset["tab"];

  let pageInsert = document.querySelector(`.timeline_page--${curPage}`);
  let allpageIndex = document.querySelectorAll(`.timeline_page--active .timeline_item`);

  let curSpot =  +e.target.parentNode.parentNode.dataset["spot"];

  // 找到data裡面的這個資料
  let data = [...getData()];
  let [curData] = data.filter(spot => +spot.spotNo == curSpot);

  let {spotNo,spotName,spotImg,cityName,spotInfo,spotPlace} = curData;
 
  
  // 抓到這是第幾個景點
  let index = allpageIndex.length + 1;

  let spotItem = `
      <li class="timeline_item tourBuild_item" data-no="${spotNo}" drag-handle>
      <div class="timeline_text">
        <div class="timeline_num">${index}</div>
        <div class="timeline_name">${spotName}</div>
      </div>
      <div class="timeline_img">
        <img src="${spotImg}" alt="">
      </div>
      <div class="timeline_info" style="display: none;">
        ${spotInfo}
      </div>
      <div class="timeline_place" style="display: none;">
        ${spotPlace}
      </div>
    </li>
  `
  
  pageInsert.insertAdjacentHTML('beforeend',spotItem);

  displayContent();
}

displayContent();
// 更改行程景點的順序
// function dragSpot() {
//   const pages = document.querySelectorAll('.timeline_page');

//   pages.forEach(page => {
//     let handle = smoothDragOrder(page, 0.2);

//     page.addEventListener("change", (e) => {
//       console.log(Array.from(e.currentTarget.children).map((el) => el.dataset.my));

//     });
//   })
// }

// dragSpot();

// 搜尋結果
function displaySpot(data) {
    let spots = data.map(spot => {
        let {spotName, spotImg, spotNo, cityName} = spot;

        return `
        <div class="tourSearch_spot" data-spot="${spotNo}">
        <div class="tourSearch_ex">
          <div class="tourSearch_img">
            <img src="${spotImg}" alt="">
          </div>
          <div class="tourSearch_text">
            <h4>${spotName}</h4>
            <p>
              <span>
                <i class="bi bi-geo-alt"></i>
              </span>
              ${cityName}
            </p>
          </div>
        </div>
        <div class="tourSearch_btnBox">
          <button class="btn btn--main addSpot">加入景點</button>
        </div>
      </div>
        `
    }).join('');

    let tourContent = document.querySelector('.tourSearch_content');
    // tourContent.insertAdjacentHTML('beforeend', spots);
    tourContent.innerHTML = spots;

    addSpot = document.querySelectorAll('.addSpot');
    addSpot.forEach(add => add.addEventListener('click',displaytimeline));
}


function closePopup() {
  let closeBtn = document.querySelector('.tourSpot_close');
  let box = document.querySelector('.tourSpot');

  closeBtn.addEventListener('click',(e) => {
   
  })
    
}

closePopup();

// 修改行程設定
function reviseSet() {
    let tourName = tourForm.tourName.value;
    let startDate = tourForm["start-date"].value;
    let endDate = tourForm["end-date"].value;
    let popup = document.querySelector('.popup');

    let diff = Math.abs(new Date(endDate) - new Date(startDate));
    let days = diff/(1000 * 3600 * 24) + 1;

    let re = /-/gi;

    tourBuildName.textContent = tourName;
    tourBuildDate.textContent = `${startDate.replace(re,'.')} - ${endDate.replace(re,'.')}`;
    tourBuildDay.textContent = days;   

    popup.style.display = "none";

    // 和原先的天數做比較


    // 更新這裡的天數
    displayTab();
}

// 行程設定燈箱
function setPopup() {
  let setBtn = document.querySelector('#setBtn');
  let popupClose = document.querySelector('.popup_close');
  let popup = document.querySelector('.popup');
  
  setBtn.addEventListener('click',() => {  
    popup.style.display = 'flex';
  })

  popupClose.addEventListener('click',() => {
    popup.style.display = 'none';
  })
  
}

setPopup();

// 搜尋後撈資料
function searchPlace(e) {
  if(e.key != 'Enter') return;
  let searchVal = e.currentTarget.value;
  
  fetchSearch(searchVal);
 
}

function fetchSearch(searchVal) {
  fetch(`./phps/tourBuild.php?search=${searchVal}`).then(res => res.json())
  .then(response => {

    displaySpot(response);
    displayMaker(response);

    // 暫存response的資料
    sessionStorage.setItem('searchSpot',JSON.stringify(response));
    searchInfo(searchVal); 
  })
  .catch(err => console.log(err));

  
  displayClearBtn(searchVal);
}


// 清除搜尋內容按鈕的呈現
function displayClearBtn(search) {
  let clearBtn = document.querySelector('.tourForm_clear');
  
  if(search) {
    clearBtn.style.display = 'block';

    clearBtn.addEventListener('click',(e) => {
      searchSpot.value = '';
      searchInfo(search);
      e.currentTarget.style.display = 'none';
      
      // 刪除session storage所有暫存資料
      sessionStorage.clear();
    })

  }else {
    clearBtn.style.display = 'none';
  }

}

// 搜尋後呈現搜尋結果資訊
function searchInfo(search) {
  let searchInfo = document.querySelector('.tourSearch_info');
  
  infoPlace.textContent = search;
  infoNum.textContent = [...getData()].length;

  if(searchSpot.value) {
    searchInfo.style.opacity = 1;
  }else {
    searchInfo.style.opacity = 0;
  }
}

// 抓session storage資料
function getData() {
  let sessionData = JSON.parse(sessionStorage.getItem('searchSpot'));

  return sessionData;
}

// 共用
// 抓網址的行程編號
function getUrl() {
  let parseUrl = document.location.hash.toLowerCase();
  let no = +parseUrl.split('/')[2];

  return no;
}

// 處理公開揪團按鈕的連結
function goBuildGroup() {
  let buildGroBtn = document.querySelector('#goBuildGroup a');
  buildGroBtn.href = `groupform.html?groupform=${getUrl()}`
}

// 抓local storage的會員資料
function getMemData() {
  let loginState = JSON.parse(localStorage.getItem('memData'));

  if(!loginState) return;

  let {memName, memNo,memState} = loginState;
  let loginOrNot = Boolean(loginState);

  return {
    memName,
    memNo,
    memState,
    loginOrNot
  }
}

mainMap();