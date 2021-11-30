// dog-eating
const activity = document.getElementById('activity-popover-content');
activity.addEventListener('click', () => {
  activity.classList.toggle('active');
});
const dogEating = document.getElementById('dog-eating');
dogEating.addEventListener('click', () => {
  activity.classList.toggle('d-none');
});

let stickyPopup = document.getElementsByClassName("sticky-popup");
let stickyPopups = document.querySelector(".sticky-popups");
let stickyPopupInfo = [
  {region:'北部地區', city:'台北市',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'中部地區', city:'台中市',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'南部地區', city:'高雄市',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'東部地區', city:'花蓮縣',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'離島地區', city:'澎湖縣',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'}];
window.addEventListener('load',load)

// Generate stickyPopups html from Database

function addTogglePopup(){
    for(let i = 0; i < stickyPopup.length;i++){
      stickyPopup[i].addEventListener('click',togglePopup)
    }
};
function togglePopup(e){
    e.currentTarget.classList.toggle("open")
    // TODO: toggle active class for dots in dot-menu
};
function createStickyPopups({id,region,city,tempeture,weather,shortDescription}){
  return /*html*/`
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
    `
};


(function(){
  let str = '';
  stickyPopupInfo.forEach((item,index)=>{
    let tempStickyHtml = createStickyPopups({id:index,region:item.region,city:item.city,tempeture:item.city,weather:item.weather,shortDescription:item.shortDescription});
    str += tempStickyHtml;
    stickyPopups.innerHTML = str;
})
addTogglePopup();
}());

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
  var widthNum = (currentActive - 1) / (itemNum - 1) * 100;
  progress.style.height = widthNum + '%'; // dogScooter.style.bottom = widthNum + '%';
  
  dogScooter.style.bottom = "calc(".concat(widthNum, "% - ").concat(30 + (currentActive - 1) * 10, "px)"); // dogScooter.style.transform = `translateY(-${widthNum}%) scaleX(-1)`;
  
  dogScooter.style.transform = "scaleX(-1)";
  };
  
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
  };
  
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
  };
  
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
  }; // TODO: color-theme
  
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
  };



//# sourceMappingURL=all.js.map
