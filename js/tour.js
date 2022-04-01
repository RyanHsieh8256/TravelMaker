window.addEventListener('load',function() {
    addJour = document.querySelectorAll('.addJour');

    tourLike = document.querySelector('#tourLike');
    tourLike.addEventListener('click',likeClick);

    // 初始化
    sessionStorage.clear();
    localStorage.setItem('memLike','');
    
    fetchCity();
    displayTheTour();
    
})

window.addEventListener('beforeunload',function(e) {
  e.preventDefault();
  
  // // 傳新的收藏清單
  if(localStorage.getItem("memLike" == null)) return;
  let memLikes = localStorage.getItem('memLike');
  let likeData = new FormData();
  likeData.append('like',memLikes);

  updateMemLike(likeData);

  // 傳要刪除的行程
  if(localStorage.getItem("unlike") == null) return;
    let unlikes = localStorage.getItem('unlike');
    console.log(unlikes);
    let unLikeData = new FormData();
    unLikeData.append('unlike',unlikes);

    updateMemLike(unLikeData);
    
})



  function updateMemLike(data) {
   
    fetch(`./phps/updateMemLike.php`, {
      method: 'POST',
      // headers 加入 formdata 格式
      header: {
        'Content-Type': 'multipart/form-data' 
      },
      body: data
    })
    .then(data => data.json());
  }
  



// 行程用
// 點擊加入行程抓到這個行程的資料
function fetchData() {
    let sliderItem = document.querySelector('.slider_item--active');
    if(!sliderItem) return;
    
    // 預設的active行程會顯示收藏
    curJour = +sliderItem.dataset["jour"];

    if(localStorage.getItem('memData') != null) {
      haveLike(curJour);
    }
    
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
        tourForm();
        displayTheTour();
    })

}


// 抓到所有城市
async function fetchCity() {
  fetch(`./phps/fetchCity.php`)
  .then(res => res.json())
  .then(data => {
    displayCityBtn(data);

    if(localStorage.getItem('memData') == null) return;
    fetchLike();
  });
}

// 抓到行程(會員的或該城市的)
function fetchTour(thing,no) {
 
  fetch(`./phps/fetchTour.php?${thing}=${no}`)
  .then(res => res.json())
  .then(data => displayTour(data));
}


// 呈現城市按鈕
function displayCityBtn(data) {
  sortBtn = document.querySelector('.tour_sort');
  let mineBtn = sortBtn.children[0];

  let cities = data.map((city,i) => {
    let {cityNo, cityName} = city;

    return `
    <button class="sort_item ${i == 0 ? 'sort_item--active': ''}" data-sort="${cityNo}">
      <span class="sort-title">
        ${cityName}
      </span>
    </button>
    `
  }).join('\n');

  sortBtn.insertAdjacentHTML('beforeend',cities);
  
  // 如果會員沒登入就沒有我的行程按鈕
  getMemData() ? '' : mineBtn.remove();

  sortTour();

  
}


// 抓會員的收藏行程
function fetchLike() {

  fetch(`./phps/fetchLike.php?like=${getMemData().memNo}`)
  .then(res => res.json())
  .then(data => takeLike(data));
}



// 儲存目前會員的收藏行程
function takeLike(data) {
  let likeArr = data;
  localStorage.setItem('unlike','');   
  localStorage.setItem('memLike',JSON.stringify(likeArr));

}

// 在localStorage加減收藏行程資料
function handleLike(jourNo) {
  let likes = JSON.parse(localStorage.getItem('memLike'));
  let unlikes = [];
  let likeState = displayLike();

  // 找到收藏裡的這個行程索引值
  let findTour =  likes.findIndex(like => like.journeyNo == jourNo);
  
  let likeObj = {
    memNo: getMemData().memNo,
    journeyNo: jourNo
  }


  if(likeState) {
    likes.push(likeObj);

  }else {
    likes.splice(findTour,1);
    unlikes.push(likeObj);
    localStorage.setItem('unlike',JSON.stringify(unlikes))
  }

  

  localStorage.setItem('memLike',JSON.stringify(likes));

}


// 取得local storage的memLike
function getLikeArr() {
  if(localStorage.getItem('memLike') == null || !localStorage.getItem('memLike')) return;
  let likes = JSON.parse(localStorage.getItem('memLike'));
  let arr = [];
  likes.forEach(like => arr.push(+like.journeyNo));

  return arr;
}

if(localStorage.getItem('memData') != null) {
  getLikeArr();
}




// 篩選行程
function sortTour() {
    sorts = document.querySelectorAll('.sort_item');
    main = document.querySelector('.tour_main');

    // 先抓到一開始預設的城市
    let cityActive = document.querySelector('.sort_item--active').dataset['sort'];
    fetchTour('city',cityActive);
    
    // 當按鈕被點擊
    sorts.forEach(sort => sort.addEventListener('click',changeCity));
   
}

function changeCity(e) {
  let curSort = e.currentTarget.dataset['sort'];
  sorts.forEach(tab => tab.classList.remove('sort_item--active'));
  e.currentTarget.classList.add('sort_item--active');
  
  
  if(curSort == 'mine') {
    fetchTour('mem',getMemData().memNo);
    tourLike.style.display = 'none';
    let addJour = document.querySelector('#addOrEdit');
    addJour.textContent = '';

   let jourNo = addJour.parentElement.previousElementSibling.dataset['jour'];

    let link = document.createElement('a');
        link.href = `tourbuild.html#/tourEdit/${jourNo}`;
        link.textContent = '編輯行程';
        link.style.color = '#fff';
        addJour.append(link);

  }else {
    fetchTour('city',curSort);
    document.querySelector('#addOrEdit').textContent = '加入行程';
    tourLike.classList.remove('tour_Like--active');
    displayLike();
  }

}

// 渲染行程
async function displayTour(data) {
  tourSlider = document.querySelector('.tour_slider');
  tourWrap = document.querySelector('.tour_wrap');
  noTour = document.querySelector('.tour_noTour');
  

  // 沒有行程時
  if(data.length == 0) {
    noTour.style.display = 'flex';
    tourWrap.style.display = 'none';
    
  }else {
    noTour.style.display = 'none';
    tourWrap.style.display = 'flex';

    let tours = data.map((tour,i) => {
      let {journeyImg,journeyNo,journeyName} = tour;
     
      return `
         <div class="slider_item ${i == 0 ? 'slider_item--active' : ''}" data-jour="${journeyNo}">
         <div class="slider_img">
           <img src="images/journeyImg/${journeyImg}" alt="">
         </div>
         <div class="slider_title">${journeyName}</div>
       </div>
      `
   
    }).join('\n');
   
    tourSlider.innerHTML = tours;
    await fetchData();
    changeItem();
  }
  
 
}


// 呈現該行程景點
function displaySide(no,num) {
    let timelineBox = document.querySelector('.timeline_box');
    let timelineList = document.querySelector('.timeline_list');
    let oldPages = timelineList.children;
    [...oldPages].forEach(page => page.remove());

    let tabs = '';

    for(let i = 1; i <= num; i++) {
        let dayData = JSON.parse(sessionStorage.getItem(`day${i}`));

        let timelinePage = document.createElement('div');
        timelinePage.className = `timeline_page timeline_page--${i} ${i == 1 ? 'timeline_page--active' : ''}`;
        timelineList.append(timelinePage);

        tabs += `<div class="timeline_tab timeline_tab--${i} ${i == 1 ? 'timeline_tab--active' : ''}" data-tab="${i}">第${i}天</div>`;
        
    

        let items = dayData.map(day => {
            let {spotNo,sequence,spotName,spotImg} = day;

            let spotItem = `
            <li class="timeline_item tourBuild_item" data-no="${spotNo}" drag-handle>
            <div class="timeline_text">
                <div class="timeline_num">${sequence}</div>
                <div class="timeline_name">${spotName}</div>
            </div>
            <div class="timeline_img">
                <img src="${spotImg}" alt="">
            </div>
            </li>
            `
            return spotItem;
        }).join('');
        

        timelinePage.innerHTML = items;
    }
 
    timelineBox.innerHTML = tabs;

    changeTab();
}

// 行程時間軸的tab
function changeTab() {
  tabs = document.querySelectorAll('.timeline_tab');
  pages = document.querySelectorAll('.timeline_page');
  tabs.forEach(tab => tab.addEventListener('click',changePage));
  
      function changePage(e) {
      tabs.forEach(tab => tab.classList.remove('timeline_tab--active'));
      pages.forEach(page => page.classList.remove('timeline_page--active'));
  
      let curPage = Number(e.target.dataset['tab']);
      let tab = document.querySelector(`.timeline_tab--${curPage}`);
      let page = document.querySelector(`.timeline_page--${curPage}`);
  
      if(!tab || !page) return;
      tab.classList.add('timeline_tab--active');
      page.classList.add('timeline_page--active');
      }
}
  
  changeTab();

// 點擊like的事件處理function
function likeClick(e) {
  tourLike.classList.toggle('tour_Like--active');
  let curJour = e.currentTarget.nextElementSibling.dataset['jour'];
  
  displayLike();

  // 增加該會員收藏的行程
  handleLike(curJour);
}

// 處理收藏icon
function displayLike() {
  let sortActive = document.querySelector('.sort_item--active').dataset['sort'];

  if(localStorage.getItem('memData') != null && sortActive != 'mine') {
    
    tourLike.style.display = 'block';
  }else {
    tourLike.style.display = 'none';
  }
  let likeOrNot = tourLike.classList.contains('tour_Like--active');
  let likeIcon = `<i class="bi bi-heart${likeOrNot ? '-fill' : ''}"></i>`;

  tourLike.children[0].remove();
  tourLike.insertAdjacentHTML('beforeend',likeIcon);

  return likeOrNot;
}



// 按箭頭滑動的功能
function slideContent() {
  let seeDetailBtn = document.querySelector('#seeDetail');
  let box = document.querySelector('.tour_box');

  seeDetailBtn.addEventListener('click',() => {
    
    box.style.transform = `translateX(calc(-100% + 15px))`;
  })

  let arrowBtn = document.querySelector('#arrowBtn');
  arrowBtn.addEventListener('click',() => {
    box.style.transform = `translateX(0%)`;
  })
}
slideContent();



// 點擊行程item就抓景點資料
// 要加like的class
function changeItem() {
  let sliderItem = document.querySelectorAll('.slider_item');
  
  sliderItem.forEach(item => item.addEventListener('click', turnActive));

  function turnActive(e) {
    sliderItem.forEach(item => item.classList.remove('slider_item--active'));
    e.currentTarget.classList.add('slider_item--active');
    let curJour = e.currentTarget.dataset['jour'];

    let addJour = document.querySelector('.addJour a');

    if(addJour) {
      addJour.href = `tourbuild.html#/tourEdit/${curJour}`;
    }

    fetchData();

    if(localStorage.getItem('memData') != null) {
      haveLike(curJour);
    }
   
    
  }

}

function haveLike(jourNo) {
  if(!getLikeArr()) return;
  let curLikes = getLikeArr();
  let likeOrNot = curLikes.some(like => like == +jourNo);
  
  if(localStorage.getItem('memData') != null) {
    tourLike.style.display = 'block';
  }
  likeOrNot ? tourLike.className = 'tour_like tour_Like--active' : tourLike.className = 'tour_like';
  displayLike();

}

// 關閉行程細項(手機版)
function closePopup() {
      let closeBtn = document.querySelector('.btn--close');
      let tourBtn = document.querySelector('.tour_btn');
      let box = document.querySelector('.tour_side');

      closeBtn.addEventListener('click',(e) => {
        box.style.display = 'none';
      })

      tourBtn.addEventListener('click',() => {
        box.style.display = 'block';
      })
}

closePopup();

// 建立行程表單需要:
function popupSwitch() {
    let closeBtn = document.querySelector('.popup_close');
    let addBtn = document.querySelectorAll('.btn--add');

    let popup = document.querySelector('.popup');

    closeBtn.addEventListener('click',() => {
        popup.style.display = 'none';
    })

    addBtn.forEach(btn => btn.addEventListener('click',() => {
      if(btn.textContent == '加入行程') {
        popup.style.display = 'flex'; 
      }
    }));

    
}
popupSwitch();

// 建立行程表單的滑動
function slidePage() {
    let nextBtn = document.querySelector('#slide-next');
    let arrowBtn = document.querySelector('#arrowBtn');
    let box = document.querySelector('.tourForm_box');

    nextBtn.addEventListener('click',() => {
    let form = document.querySelector('.tourForm_form');
    if(form.tourName.value) {
        box.style.transform = `translateX(calc(-100% - 20px))`;
    }  
    
    })

    arrowBtn.addEventListener('click',() => {
    box.style.transform = `translateX(0%)`;
    })

}
slidePage();

// 呈現行程名稱 /圖片等內容
function displayTheTour() {
  if(tourForm()?.length == 0 || sessionStorage.getItem("day1") == null) return;

  let names = document.querySelectorAll('.tourName');
  tourImg.src = `images/journeyImg/${tourForm().journeyImg}`;
  tourWrapper.dataset['jour'] = tourForm().journeyNo;
  names.forEach(name => name.textContent = tourForm().journeyName);
  tourInfo.textContent = tourForm().journeyInfo;
  memImg.src = `images/memIcon/${tourForm().memIcon}`;
  mem.textContent = `${tourForm().memName}`;
}
displayTheTour();

// 讓popup的資料為fetch回來的資料
function tourForm() {
  if(sessionStorage.getItem("day1") == null) return;
    let data = JSON.parse(sessionStorage.getItem("day1"));
    let {journeyNo,journeyImg,journeyName,journeyInfo,journeyStartDay,journeyEndDay,memName, memIcon} = data[0];

    let goTourBuild = document.querySelector('#goBuildTour a');

    tourName.value = `${journeyName}`;
    tourStart.textContent = `${journeyStartDay}`;
    tourEnd.textContent = `${journeyEndDay}`;

    startDate.value = `${journeyStartDay}`;
    endDate.value = `${journeyEndDay}`;

    goTourBuild.href = `tourbuild.html#/tour/${journeyNo}`;
    

    let diff = Math.abs(new Date(journeyEndDay) - new Date(journeyStartDay));
    let day = diff/(1000 * 3600 * 24) + 1;
    days.textContent = day;

    return {
      journeyNo,
      journeyImg,
      journeyName,
      journeyInfo,
      journeyStartDay,
      journeyEndDay,
      memName,
      memIcon
    }

}

tourForm();

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


// 共用
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

function slidePage() {
  let nextBtn = document.querySelector('#slide-next');
  let arrowBtn = document.querySelector('#arrowBtn2');
  let box = document.querySelector('.tourForm_box');

  nextBtn.addEventListener('click',() => {
  let form = document.querySelector('.tourForm_form');
  if(form.tourName.value) {
      box.style.transform = `translateX(calc(-100% - 20px))`;
  }  
  
  })

  arrowBtn.addEventListener('click',() => {
  box.style.transform = `translateX(0%)`;
  })

}

slidePage();

// 點擊填字
function autofillWord() {
  chipBtn = document.querySelectorAll('.btn--chip');
  chipBtn.forEach(btn => btn.addEventListener('click',autofillWord));

  function autofillWord(e) {
    chipBtn.forEach(btn => btn.classList.remove('is_active'));

    e.currentTarget.classList.add('is_active');
    let curBtn = e.currentTarget.textContent;
    tourName.value = curBtn;
  }
}

autofillWord();


// 調整popup行程日期的呈現
startDate.addEventListener('change',(e,i) => changeDate(e,tourStart));
endDate.addEventListener('change',(e,i) => changeDate(e,tourEnd));

function changeDate(e,day) {
    let re = /-/gi;
    console.log(e.currentTarget.value.replace(re,'.'));
    day.textContent = e.currentTarget.value.replace(re,'.');

    displayDay();
}

function displayDay() {
    let diff = Math.abs(new Date(tourEnd.textContent) - new Date(tourStart.textContent));
    let day = Math.ceil(diff/(1000 * 3600 * 24) + 1);

    days.textContent = `${day}`;
}
