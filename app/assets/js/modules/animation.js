let stickyPopup = document.getElementsByClassName("sticky-popup");

export function addTogglePopup(){
    for(let i = 0; i < stickyPopup.length;i++){
    stickyPopup[i].addEventListener('click',togglePopup)
    }ａ
}
function togglePopup(e){
    e.currentTarget.classList.toggle("open")
    // TODO: toggle active class for dots in dot-menu
};

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

export function prevUpdate() {
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

export function nextUpdate() {
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

export function load() {
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

