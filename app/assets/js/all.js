import { get_activity } from './modules/activity';
import {
  render_stickyPopup,
  computed_stickyPopupWidth,
  selectedCity,
  selectedCategory,
} from './modules/stickyPopup';

//===== 儲存使用者目前的選擇 ===== //
let userSelection = null;

function UserSelection(city, category) {
  this.city = city;
  this.category = category;
}

//===== Functions re-call when users resize the window =====//
window.addEventListener('resize', function () {
  document
    .querySelector('.activity-popover-content')
    .classList.remove('active'); // activity cards
  computed_stickyPopupWidth(); // sticky popup
});

// ===== Functions are called in the first place =====//
function main() {
  get_activity();
  render_stickyPopup();
  userSelection = new UserSelection(selectedCity, selectedCategory); // object to store user selections
  watch_userSelectedValue(); // start watching user selected values
}
main();

// ===== Methods/Functions =====//

// watch radio button, if it's changed, modify the values inside the object
function watch_userSelectedValue() {
  const cityBtnGroup = document.querySelectorAll('.city-btn-group');
  const activityBtnGroup = document.querySelectorAll('.activity-btn-group');

  cityBtnGroup.forEach((item) => {
    item.addEventListener('change', function () {
      userSelection.city = selectedCity;
      console.log(userSelection);
    });
  });

  activityBtnGroup.forEach((item) => {
    item.addEventListener('change', function () {
      userSelection.category = selectedCategory;
      console.log(userSelection);
    });
  });
}

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

// ===== Event Listener =====//
window.addEventListener('load', load);

// 活動 Togggle
const activity = document.getElementById('activity-popover-content');
const activityDefault = document.getElementById('activity-popover-default');
activity.addEventListener('click', (e) => {
  if (e.currentTarget == e.target || e.target == activityDefault) {
    activity.classList.toggle('active');
  }
});
const dogEating = document.getElementById('dog-eating');
dogEating.addEventListener('click', () => {
  activity.classList.toggle('active');
});

//# sourceMappingURL=all.js.map
