window.addEventListener('load', load);

// dog-eating
const activity = document.getElementById('activity-popover-content');
const activityDefaule = document.getElementById('activity-popover-defaule');
activityDefaule.addEventListener('click', () => {
  if (activity.getAttribute('class').indexOf('active') === -1) {
    activity.classList.add('active');
  }
});
const dogEating = document.getElementById('dog-eating');
dogEating.addEventListener('click', () => {
  activity.classList.toggle('close');
});

/****** get activityData ******/
//TODO fix :babel cannot use async await
// const sendActRequest = async () => {
//   try {
//     const { data } = await axios.get(
//       'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON'
//       // {
//       //   headers: getAuthorizationHeader(),
//       // }
//     );
//     let now = new Date();
//     let allActivities = data.filter((item) => {
//       if (!item.Picture.PictureUrl1 || !item.Picture.PictureDescription1) {
//         item.Picture.PictureUrl1 = `https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`;
//         item.Picture.PictureDescription1 = `活動示意圖片`;
//       }
//       return item.WebsiteUrl !== undefined && new Date(item.EndTime) - now > 0;
//     });
//     console.log(allActivities);
//     let activityPopoverData = converDataForm(getRandomAct(allActivities));
//     console.log(activityPopoverData);
//   } catch (err) {
//     console.log(err);
//   }
// };
// sendActRequest();
axios
  .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON')
  .then((res) => {
    const { data } = res;
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

window.addEventListener('resize', function () {
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
window.addEventListener('load', load);

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
function createStickyPopups({
  id,
  region,
  city,
  tempeture,
  weather,
  shortDescription,
}) {
  return /*html*/ `
      <li class="col">
        <div
          class="sticky-popup open_sticky_popup popup-content-bounce-in-up" data-id="${id}">
          <div class="popup-header">
            <span class="popup-title fs-4">
              <div class="
                  d-flex
                  justify-content-between
                  align-items-center
                  px-6
                  py-4">
                <h2 class="fs-2">${region}</h2>
                <div class="dot-menu">
                  <div class="dot dot1"></div>
                  <div class="dot line1"></div>
                  <div class="dot line2"></div>
                  <div class="dot dot2"></div>
                </div>
              </div>
            </span>
          </div>
          <div class="popup-content-trapezoid"></div>
          <div class="popup-content">
            <div class="border border-2 border-dark px-6 py-6">
              <button class="btn btn-lg btn-yellow border lh-sm text-black mb-2">${tempeture}&#8451;</button>
              <h3 class="fs-l mb-1">${weather}</h3>
              <span class="d-block text-muted fs-5 mb-6">${city}今日早上</span>
              <p class="mb-6 popup-body fw-6">
                ${shortDescription}
              </p>
              <button
                class="btn btn-secondary w-100 rounded-0 border border-1">
                <span class="align-middle text-black">選城市</span>
                <svg
                  width="43"
                  height="18"
                  viewBox="0 0 43 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 9.16699H40.8333"
                    stroke="#131313"
                    stroke-width="1.5"/>
                  <path
                    d="M42.0004 9.40023C39.0448 9.78912 33.0871 11.9669 32.9004 17.5669"
                    stroke="#131313"
                    stroke-width="1.5"/>
                  <path
                    d="M42.0004 9.16667C39.0448 8.77778 33.0871 6.6 32.9004 1"
                    stroke="#131313"
                    stroke-width="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>
    `;
}

(function () {
  let str = '';
  stickyPopupInfo.forEach((item, index) => {
    let tempStickyHtml = createStickyPopups({
      id: index,
      region: item.region,
      city: item.city,
      tempeture: item.city,
      weather: item.weather,
      shortDescription: item.shortDescription,
    });
    str += tempStickyHtml;
    stickyPopups.innerHTML = str;
  });
  addTogglePopup();
})();

// TODO: dogScooter

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
