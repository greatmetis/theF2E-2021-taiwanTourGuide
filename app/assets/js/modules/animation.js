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

export function setStage(val){
    let tempVal = currentActive;
    currentActive = val
    if(tempVal>=currentActive){
        prevUpdate();
        return
    }
    nextUpdate();
}

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