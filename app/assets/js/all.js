import {get_activity} from './modules/activity';
import {render_stickyPopup,computed_stickyPopupWidth,selectedCity,selectedCategory} from './modules/stickyPopup'

window.addEventListener('load', load);

// 儲存使用者目前的選擇
let userSelection = null

function UserSelection(city,category){
  this.city = city;
  this.category = category;
}

// Functions re-call when users resize the window
window.addEventListener('resize', function () {
  // activity cards
  document.querySelector('.activity-popover-content')
  .classList.remove('active');
  // sticky popup
  computed_stickyPopupWidth()
});

// Functions are called in the first place
function main(){
  get_activity();
  render_stickyPopup();
  userSelection = new UserSelection(selectedCity,selectedCategory)
  watch_userSelectedValue()
};
main();

// 監聽radio button, if it's changed change value inside the object
function watch_userSelectedValue(){
  const cityBtnGroup = document.querySelector(".city-btn-group");
  const activityBtnGroup = document.querySelector(".activity-btn-group");
  cityBtnGroup.addEventListener('change',function(){
    userSelection.city = selectedCity;
    console.log(userSelection)
  })
  activityBtnGroup.addEventListener('change',function(){
    userSelection.category = selectedCategory;
    console.log(userSelection)
  })
}







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
