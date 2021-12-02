"use strict";

// dog-eating
var activity = document.getElementById('activity-popover-content');
activity.addEventListener('click', function () {
  if (activity.getAttribute('class').indexOf('active') === -1) {
    activity.classList.add('active'); // activity.classList.toggle('active');
  }
});
var dogEating = document.getElementById('dog-eating');
dogEating.addEventListener('click', function () {
  activity.classList.toggle('d-none');
}); // activity popover

var nextActivity1 = document.getElementById('nextActivity1');
var activity1 = document.getElementById('activity1');
var nextActivity2 = document.getElementById('nextActivity2');
var activity2 = document.getElementById('activity2');
var prevActivity = document.getElementById('prevActivity');
var activity3 = document.getElementById('activity3');
nextActivity1.addEventListener('click', function () {
  activity1.classList.toggle('left-slider');
  activity1.classList.toggle('now');
  activity2.classList.toggle('now');
});
nextActivity2.addEventListener('click', function () {
  activity2.classList.toggle('left-slider');
  activity2.classList.toggle('now');
  activity3.classList.toggle('now');
});
prevActivity.addEventListener('click', function () {
  activity2.classList.toggle('left-slider');
  activity3.classList.toggle('now');
  activity3.classList.toggle('right-slider');
  activity2.classList.toggle('now');
});
var stickyPopup = document.getElementsByClassName("sticky-popup");
var stickyPopups = document.querySelector(".sticky-popups");
var stickyPopupInfo = [{
  region: '北部地區',
  city: '台北市',
  tempeture: 28,
  weather: '多雲有太陽',
  shortDescription: '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'
}, {
  region: '中部地區',
  city: '台中市',
  tempeture: 28,
  weather: '多雲有太陽',
  shortDescription: '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'
}, {
  region: '南部地區',
  city: '高雄市',
  tempeture: 28,
  weather: '多雲有太陽',
  shortDescription: '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'
}, {
  region: '東部地區',
  city: '花蓮縣',
  tempeture: 28,
  weather: '多雲有太陽',
  shortDescription: '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'
}, {
  region: '離島地區',
  city: '澎湖縣',
  tempeture: 28,
  weather: '多雲有太陽',
  shortDescription: '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'
}];
window.addEventListener('load', load); // Generate stickyPopups html from Database

function addTogglePopup() {
  for (var i = 0; i < stickyPopup.length; i++) {
    stickyPopup[i].addEventListener('click', togglePopup);
  }
}

;

function togglePopup(e) {
  e.currentTarget.classList.toggle("open");
}

;

function createStickyPopups(_ref) {
  var id = _ref.id,
      region = _ref.region,
      city = _ref.city,
      tempeture = _ref.tempeture,
      weather = _ref.weather,
      shortDescription = _ref.shortDescription;
  return (
    /*html*/
    "\n      <li class=\"col\">\n        <div\n          class=\"sticky-popup open_sticky_popup popup-content-bounce-in-up\" data-id=\"".concat(id, "\">\n          <div class=\"popup-header\">\n            <span class=\"popup-title fs-4\">\n              <div class=\"\n                  d-flex\n                  justify-content-between\n                  align-items-center\n                  px-6\n                  py-4\">\n                <h2 class=\"fs-2\">").concat(region, "</h2>\n                <div class=\"dot-menu\">\n                  <div class=\"dot dot1\"></div>\n                  <div class=\"dot line1\"></div>\n                  <div class=\"dot line2\"></div>\n                  <div class=\"dot dot2\"></div>\n                </div>\n              </div>\n            </span>\n          </div>\n          <div class=\"popup-content-trapezoid\"></div>\n          <div class=\"popup-content\">\n            <div class=\"border border-2 border-dark px-6 py-6\">\n              <button class=\"btn btn-lg btn-yellow border lh-sm text-black mb-2\">").concat(tempeture, "&#8451;</button>\n              <h3 class=\"fs-l mb-1\">").concat(weather, "</h3>\n              <span class=\"d-block text-muted fs-5 mb-6\">").concat(city, "\u4ECA\u65E5\u65E9\u4E0A</span>\n              <p class=\"mb-6 popup-body fw-6\">\n                ").concat(shortDescription, "\n              </p>\n              <button\n                class=\"btn btn-secondary w-100 rounded-0 border border-1\">\n                <span class=\"align-middle text-black\">\u9078\u57CE\u5E02</span>\n                <svg\n                  width=\"43\"\n                  height=\"18\"\n                  viewBox=\"0 0 43 18\"\n                  fill=\"none\"\n                  xmlns=\"http://www.w3.org/2000/svg\">\n                  <path\n                    d=\"M0 9.16699H40.8333\"\n                    stroke=\"#131313\"\n                    stroke-width=\"1.5\"/>\n                  <path\n                    d=\"M42.0004 9.40023C39.0448 9.78912 33.0871 11.9669 32.9004 17.5669\"\n                    stroke=\"#131313\"\n                    stroke-width=\"1.5\"/>\n                  <path\n                    d=\"M42.0004 9.16667C39.0448 8.77778 33.0871 6.6 32.9004 1\"\n                    stroke=\"#131313\"\n                    stroke-width=\"1.5\"/>\n                </svg>\n              </button>\n            </div>\n          </div>\n        </div>\n      </li>\n    ")
  );
}

;

(function () {
  var str = '';
  stickyPopupInfo.forEach(function (item, index) {
    var tempStickyHtml = createStickyPopups({
      id: index,
      region: item.region,
      city: item.city,
      tempeture: item.city,
      weather: item.weather,
      shortDescription: item.shortDescription
    });
    str += tempStickyHtml;
    stickyPopups.innerHTML = str;
  });
  addTogglePopup();
})(); // TODO: dogScooter


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
  var widthNum = (currentActive - 1) / (itemNum - 1) * 100;
  progress.style.height = widthNum + '%'; // dogScooter.style.bottom = widthNum + '%';

  dogScooter.style.bottom = "calc(".concat(widthNum, "% - ").concat(30 + (currentActive - 1) * 10, "px)"); // dogScooter.style.transform = `translateY(-${widthNum}%) scaleX(-1)`;

  dogScooter.style.transform = "scaleX(-1)";
}

;

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

;

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

;

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
}

; // TODO: color-theme

function load() {
  var $html = document.querySelector('html');
  var switcher = document.querySelector("#color-theme"); // 透過 useDark.matches 判斷是否為暗模式，將 boolean 寫入 Toggle checked 屬性

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

  var useDark = window.matchMedia("(prefers-color-scheme: dark)"); // user change prefers-color-scheme trigger the listener

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


  switcher.addEventListener("click", switchListener);
}

;
//# sourceMappingURL=all.js.map
