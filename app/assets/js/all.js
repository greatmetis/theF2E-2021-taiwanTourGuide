// TODO: sticky-popup
document.getElementById("sticky-popup").addEventListener("click", togglePopup);

// document.querySelectorAll('#sticky-popup').forEach(item => {
//   item.addEventListener('click', togglePopup(e));
// })
// var stickyPopup = document.querySelector("#sticky-popup");
// for( let i = 0 ; i < stickyPopup.length ; i++) {
//   stickyPopup[i].addEventListener("click", togglePopup());
// }

function togglePopup() {
  console.log('click');
  var element = document.getElementById("sticky-popup");
  element.classList.toggle("open");
  // item.classList.toggle("open");
  
  var type = document.querySelector(".dot-menu");
  if(type.classList.contains("active") === true){
      type.classList.remove("active");
    }else{
      type.classList.add("active");
    }
}

// TODO: dogScooter
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circleItems = document.querySelectorAll('.circle-item');
const circleItemNumbers = document.querySelectorAll('.circle-item-number');
const progress = document.getElementById('progress');
const actives = document.querySelectorAll('.active');
const dogScooter = document.getElementById('dog-scooter');

let currentActive = 1;
let itemNum = 4;

// next按鈕行為
next.addEventListener('click', () => {
  currentActive++;
  // 讓currentActive數值與 itemNum 同步
  if (currentActive > itemNum) { 
    currentActive = itemNum;
  }
  nextUpdate();
})

// prev按鈕行為
prev.addEventListener('click', () => {
  currentActive--;
  // 讓currentActive數值與 itemNum 同步
  if (currentActive < 1) {
    currentActive = 1;
  }
  prevUpdate();
})

function progressWidth() {
  // 計算progress的長度（預設為0%）初始值：分母是4 - 1，分子是1 - 1
  // 第一次按next: 分母是4 - 1，分子是2 - 1，相當於33%
  // 第二次按next: 分母是4 - 1，分子是3 - 1，相當於66%
  // 第三次按next: 分母是4 - 1，分子是4 - 1，相當於100%
  let widthNum = (currentActive - 1) / (itemNum - 1) * 100
  progress.style.height = widthNum + '%';
  // dogScooter.style.bottom = widthNum + '%';
  dogScooter.style.bottom = `calc(${widthNum}% - ${30 + (currentActive-1) * 10}px)`;
  // dogScooter.style.transform = `translateY(-${widthNum}%) scaleX(-1)`;
  dogScooter.style.transform = `scaleX(-1)`;
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
  circleItems[currentActive-1].classList.remove('done');
  circleItems[currentActive-1].classList.add('active');
  circleItemNumbers[currentActive-1].classList.add('invisible');
  circleItemNumbers[currentActive-1].classList.add('done');
  circleItemNumbers[currentActive-1].classList.remove('done');
  // set now
  circleItems[currentActive].classList.remove('active');
  circleItemNumbers[currentActive].classList.remove('invisible');
  progressWidth ();
  btnDisable();
}

function nextUpdate() {
  // set finish
  circleItems[currentActive-2].classList.add('done');
  circleItems[currentActive-2].classList.remove('active');
  circleItemNumbers[currentActive-2].classList.remove('invisible');
  circleItemNumbers[currentActive-2].classList.add('done');
  // set now
  circleItemNumbers[currentActive-1].classList.add('invisible');
  circleItems[currentActive-1].classList.add('active');

  progressWidth();
  btnDisable();
}