window.addEventListener('load', load);

// dog-eating
const activity = document.getElementById('activity-popover-content');
const activityDefault = document.getElementById('activity-popover-default');
activity.addEventListener('click',(e)=>{
  if(e.currentTarget == e.target || e.target == activityDefault){
    activity.classList.toggle("active");
  }
});
const dogEating = document.getElementById('dog-eating');
dogEating.addEventListener('click', () => {
  activity.classList.toggle("active");
});

/** get activityApiData and render start */
axios
  .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON')
  .then((res) => {
    const { data } = res;
    console.log(res)
    let now = new Date();
    let allActivities = data.filter((item) => {
      if (!item.Picture.PictureUrl1 || !item.Picture.PictureDescription1) {
        item.Picture.PictureUrl1 = `https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`;
        item.Picture.PictureDescription1 = `活動示意圖片`;
      }
      return item.WebsiteUrl !== undefined && new Date(item.EndTime) - now > 0;
    });

    let activityPopoverData = converDataForm(getRandomAct(allActivities, 3));

    const activityPopoverCard = document.querySelector(
      '.activity-popover-card .card_top'
    );
    const activityControlPrev = document.querySelector(
      '.activity-popover-card .arrow_prev_js'
    );
    const activityControlNext = document.querySelector(
      '.activity-popover-card .arrow_next_js'
    );
    const prevActivityBtn = document.getElementById('prevActivityBtn');
    const nextActivityBtn = document.getElementById('nextActivityBtn');
    activityPopoverData.forEach((item, index) => {
      createActivityCards({
        id: index,
        title: item.title,
        imgUrl: item.imgUrl,
        description: item.description,
        endDate: item.endDate,
        link: item.link,
      });
    });
    function createActivityCards({
      id,
      title,
      imgUrl,
      description,
      endDate,
      link,
    }) {
      let newCardItem = document.createElement('li');
      newCardItem.classList.add(
        'activity-popover-card-item',
        'mx-4',
        'mt-2',
        'mt-xxl-0'
      );
      newCardItem.setAttribute('data-id', `${id}`);
      let cardHtml = /*html*/ `
        <h3 class="fs-3 mb-3">${title}</h3>
        <div class="activity-popover-img rounded-m mb-3" style="background-image:url('${imgUrl}')"></div>
        <p class="mb-3 fw-3 ellipsis">${description}</p>
        <span class="d-block fs-5 fw-5">活動結束時間：${endDate}</span>
        <a class="d-inline fs-5 fw-5" href="${link}">活動連結</a>`;
      newCardItem.innerHTML = cardHtml;
      activityPopoverCard.appendChild(newCardItem);
      return activityPopoverCard;
    }
    // the span will overflow when resize
    let currentCardIndex = 0;
    function activityControls(index) {
      if (
        currentCardIndex < 0 ||
        currentCardIndex > activityPopoverData.length
      ) {
        return;
      }
      console.log('activityControls');
      let span = 382; // card width
      currentCardIndex += index;

      if (
        currentCardIndex >= activityPopoverData.length ||
        currentCardIndex < 0
      ) {
        currentCardIndex = 0;
      }
      if (window.innerWidth >= 1400) {
        span = 304;
      }
      let computed_left = -(currentCardIndex * span) + 'px';
      activityPopoverCard.style.left = computed_left;
    }
    activityControlPrev.addEventListener('click', function () {
      console.log('activityControlPrev', activityPopoverData.length);
      activityControls(-1);
      activityBtn(currentCardIndex);
    });
    activityControlNext.addEventListener('click', function () {
      console.log('activityControlNext', activityPopoverData.length);
      activityControls(1);
      activityBtn(currentCardIndex);
    });
    function activityBtn(index) {
      if (
        currentCardIndex < 0 ||
        currentCardIndex > activityPopoverData.length
      ) {
        return;
      }
      if (index === 0) {
        prevActivityBtn.classList.toggle('invisible');
      } else if (index === activityPopoverData.length - 1) {
        nextActivityBtn.classList.toggle('invisible');
      } else {
        if (prevActivityBtn.getAttribute('class').indexOf('invisible') !== -1) {
          prevActivityBtn.classList.remove('invisible');
        }
        if (nextActivityBtn.getAttribute('class').indexOf('invisible') !== -1) {
          nextActivityBtn.classList.remove('invisible');
        }
      }
    }
  });

//random取得的活動陣列轉換成需要的資料格式
const converDataForm = function (arr) {
  let dataArray = [];
  arr.forEach((item) => {
    let obj = {};
    obj['title'] = item.Name;
    obj['imgUrl'] = item.Picture.PictureUrl1;
    obj['description'] = item.Description;
    obj['endDate'] = moment(item.EndTime).format('YYYY.MM.DD');
    obj['link'] = item.WebsiteUrl;
    dataArray.push(obj);
  });
  return dataArray;
};

/*****取得隨機資料*****/
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomAct(arr, num) {
  //宣告一陣列數用來裝隨機產生的數字
  let randomActivities = [];
  let numArr = [];
  let n = 0;
  for (let i = 0; i < num; i++) {
    n = getRandomInt(arr.length);
    if (numArr.includes(n)) {
      //如果有出現過就重跑一次迴圈
      i -= 1;
      continue;
    } else {
      //沒出現過的話寫到陣列裡
      numArr.push(n);
    }
  }
  // console.log(num);
  numArr.forEach((item) => {
    randomActivities.push(arr[item]);
  });
  return randomActivities;
}

/** get activityApiData and render end */

window.addEventListener('resize', function () {
  console.log('resize');
  document
    .querySelector('.activity-popover-content')
    .classList.remove('active');
});

let stickyPopup = document.getElementsByClassName('sticky-popup');
let stickyPopups = document.querySelector('.sticky-popups');
let stickyPopupInfo = [
  {
    region: '北部地區',
    city: '台北市',
    tempeture: 28,
    weather: '多雲有太陽',
    shortDescription:
      '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
  },
  {
    region: '中部地區',
    city: '台中市',
    tempeture: 28,
    weather: '多雲有太陽',
    shortDescription:
      '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
  },
  {
    region: '南部地區',
    city: '高雄市',
    tempeture: 28,
    weather: '多雲有太陽',
    shortDescription:
      '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
  },
  {
    region: '東部地區',
    city: '花蓮縣',
    tempeture: 28,
    weather: '多雲有太陽',
    shortDescription:
      '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
  },
  {
    region: '離島地區',
    city: '澎湖縣',
    tempeture: 28,
    weather: '多雲有太陽',
    shortDescription:
      '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
  },
];
let cityTags = [
  '台北市',
  '新北市',
  '基隆市',
  '桃園市',
  '新竹市',
  '苗栗縣',
  '台中市',
  '彰化縣'
];
let activityTags = [
  "逛大自然風景", "樂活之旅", "古蹟廟宇", "國家風景區", "藝術文化", "溫泉之旅", "建築工廠", "想要戶外走看看", "其他"
];
// window.addEventListener('load', load);

// Generate stickyPopups html from Database

function addTogglePopup() {
  for (let i = 0; i < stickyPopup.length; i++) {
    stickyPopup[i].addEventListener('click', togglePopup);
  }
}
function togglePopup(e) {
  let currentCard = e.currentTarget;
  let currentId = currentCard.getAttribute('data-id');
  let stickyPopupArr = [...stickyPopup];
  stickyPopupArr.forEach((item) => {
    if (item.getAttribute('data-id') !== currentId) {
      item.classList.remove('open');
    }
  });
  currentCard.classList.toggle('open');
}

function createStickyPopups({id,region,city,tempeture,weather,shortDescription, cityTags, activityTags}){
  return /*html*/`
      <li class="w-20">
        <div
          class="sticky-popup open_sticky_popup popup-content-bounce-in-up" data-id="${id}">
          <div class="popup-header d-flex justify-content-between align-items-center">
            <h2 class="popup-title">${region}</h2>
            <div class="dot-menu">
              <div class="dot dot1"></div>
              <div class="dot line1"></div>
              <div class="dot line2"></div>
              <div class="dot dot2"></div>
            </div>
          </div>
          <div class="popup-content-trapezoid"></div>
          <div class="popup-content popup-body-city">
            <p class="">我想去...</p>
            <ul class="overflow-scroll bottom-popup-tag mb-3 me-n6">
              ${cityTags}
            </ul>
            <div id="popup-activity" class="popup-body-activity">
              <p class="">我想要...</p>
              <div class="overflow-scroll bottom-popup-tag me-n6">
                ${activityTags}
              </div>
              <button
                class="btn btn-secondary w-100 rounded-0 border border-1 rounded-2 mt-3">
                <span class="align-middle text-black">下一步</span>
                <img src="assets/images/arrow_expand.svg" class="arrow-hover ms-1" alt="arrow icon">
              </button>
            </div>
          </div>
          <div class="popup-content border border-2 border-dark border-bottom-0 px-6 py-6">
            <button class="btn btn-lg btn-yellow border border-2 lh-sm text-black mb-2">${tempeture}&#8451;</button>
            <div class="d-flex justify-content-center align-items-center">
              <h3 class="fs-l mb-1">${weather}</h3>
              <img src="assets/images/${weather}.svg" class="ms-1" alt="${weather} icon">
            </div>
            <span class="d-block text-muted fs-5">${city}今日早上</span>
          </div>
          <div class="popup-content popup-body-description border border-2 border-dark border-top-0 px-6 pb-6">
            <p class="mb-6 fw-6">
              ${shortDescription}
            </p>
            <button class="d-flex justify-content-center align-items-center bg-secondary w-100 rounded-2 border py-1 px-4">
              選城市
              <img src="assets/images/arrow_expand.svg" class="arrow-hover ms-1" alt="arrow icon">
            </button>
          </div>
        </div>
      </li>
    `;
}

function addEventToCityTag() {
  let cityTags = document.getElementsByClassName("city-tags");
  const popupActivityTags = document.getElementById("popup-activity");
  for(let i = 0; i < cityTags.length;i++){
    cityTags[i].addEventListener('click', function() {
      if (popupActivityTags.getAttribute("class").includes("popup-body-activity")) {
        popupActivityTags.classList.remove("popup-body-activity");
      }
    });
  }
}
function createActivityTags(items) {
  let str = "";
  items.forEach((item) => {
    str += `
      <li class="d-inline">
        <button class="btn btn-outline-dark">
          <span class="align-middle">${item}</span>
          <img src="assets/images/${item}.svg" class="ms-1" alt="${item} icon">
        </button>
      </li>`;
  });
  return str;
}

(function(){
  console.log(document.body.clientWidth, document.body.clientWidth - 280);
  const popupContainer = document.querySelector('.sticky-popup-container');
  popupContainer.style.maxWidth = `${document.body.clientWidth - 280}px`;

  let strPopup = '';
  let strActivity = '';
  let strCity = '';
  let activityTagColumn = [activityTags.slice(0, Math.ceil(activityTags.length / 2)), activityTags.slice(Math.ceil(activityTags.length / 2))];
  console.log(activityTagColumn);
  cityTags.forEach((item)=>{
    let tempCityHtml = `<li class="d-inline"><button class="btn btn-outline-dark city-tags">${item}</button></li>`;
    strCity += tempCityHtml;
  });
  activityTagColumn.forEach((item) => {
    strActivity += `
      <ul class="bottom-popup-tag">
        ${createActivityTags(item)}
      </ul>
    `;
  });
  stickyPopupInfo.forEach((item,index)=>{
    let tempStickyHtml = createStickyPopups({
      id:index, 
      region:item.region, 
      city:item.city, 
      tempeture:item.city, 
      weather:item.weather, 
      shortDescription:item.shortDescription, 
      cityTags:strCity, 
      activityTags:strActivity});
    strPopup += tempStickyHtml;
    stickyPopups.innerHTML = strPopup;
  });
  addTogglePopup();
}());

// ===== Progress bar ===== //
//TODO: dogScooter

var prev = document.getElementById('prev');
var next = document.getElementById('next');
var circleItems = document.querySelectorAll('.circle-item');
var circleItemNumbers = document.querySelectorAll('.circle-item-number');
var progress = document.getElementById('progress');
var actives = document.querySelectorAll('.active');
var dogScooter = document.getElementById('dog-scooter');
var currentActive = 1;
var itemNum = 4; // next按鈕行為

next.addEventListener('click', function () {
  currentActive++; // 讓currentActive數值與 itemNum 同步

  if (currentActive > itemNum) {
    currentActive = itemNum;
  }

  nextUpdate();
}); // prev按鈕行為

prev.addEventListener('click', function () {
  currentActive--; // 讓currentActive數值與 itemNum 同步

  if (currentActive < 1) {
    currentActive = 1;
  }

  prevUpdate();
});

function progressWidth() {
  // 計算progress的長度（預設為0%）初始值：分母是4 - 1，分子是1 - 1
  // 第一次按next: 分母是4 - 1，分子是2 - 1，相當於33%
  // 第二次按next: 分母是4 - 1，分子是3 - 1，相當於66%
  // 第三次按next: 分母是4 - 1，分子是4 - 1，相當於100%
  var widthNum = ((currentActive - 1) / (itemNum - 1)) * 100;
  progress.style.height = widthNum + '%'; // dogScooter.style.bottom = widthNum + '%';

  dogScooter.style.bottom = 'calc('
    .concat(widthNum, '% - ')
    .concat(30 + (currentActive - 1) * 10, 'px)'); // dogScooter.style.transform = `translateY(-${widthNum}%) scaleX(-1)`;

  dogScooter.style.transform = 'scaleX(-1)';
}

function btnDisable() {
  // 判斷何時要將按鈕做disable處理
  if (currentActive <= 1) {
    prev.disabled = true;
  } else if (currentActive === itemNum) {
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}

function prevUpdate() {
  // set finish
  circleItems[currentActive - 1].classList.remove('done');
  circleItems[currentActive - 1].classList.add('active');
  circleItemNumbers[currentActive - 1].classList.add('invisible');
  circleItemNumbers[currentActive - 1].classList.add('done');
  circleItemNumbers[currentActive - 1].classList.remove('done'); // set now

  circleItems[currentActive].classList.remove('active');
  circleItemNumbers[currentActive].classList.remove('invisible');
  progressWidth();
  btnDisable();
}

function nextUpdate() {
  // set finish
  circleItems[currentActive - 2].classList.add('done');
  circleItems[currentActive - 2].classList.remove('active');
  circleItemNumbers[currentActive - 2].classList.remove('invisible');
  circleItemNumbers[currentActive - 2].classList.add('done'); // set now

  circleItemNumbers[currentActive - 1].classList.add('invisible');
  circleItems[currentActive - 1].classList.add('active');
  progressWidth();
  btnDisable();
} // TODO: color-theme

function load() {
  var $html = document.querySelector('html');
  var switcher = document.querySelector('#color-theme'); // 透過 useDark.matches 判斷是否為暗模式，將 boolean 寫入 Toggle checked 屬性

  function setToggleCheck(check) {
    switcher.checked = check;
  }

  function setDarkMode(state) {
    var hasClass = $html.classList.contains('dark-mode');

    if (state) {
      if (!hasClass) {
        $html.classList.toggle('dark-mode');
      }
    } else {
      if (hasClass) {
        $html.classList.remove('dark-mode');
      }
    }
  } // state 代表使用者裝置是否為深色主題

  function toggleDarkMode(state) {
    setToggleCheck(state);
    setDarkMode(state);
  }

  var useDark = window.matchMedia('(prefers-color-scheme: dark)'); // user change prefers-color-scheme trigger the listener

  useDark.addListener(function (evt) {
    console.log(evt);
    toggleDarkMode(evt.matches);
  }); // first page loading

  var darkModeState = useDark.matches;
  toggleDarkMode(darkModeState); // toggle

  function switchListener() {
    darkModeState = !darkModeState;
    toggleDarkMode(darkModeState);
  } // toggle listener

  switcher.addEventListener('click', switchListener);
}

//# sourceMappingURL=all.js.map
