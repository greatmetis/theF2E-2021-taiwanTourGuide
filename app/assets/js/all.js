import {addTogglePopup,prevUpdate,nextUpdate,load} from './modules/animation.js';
import {createStickyPopups} from './modules/createElements.js'

window.addEventListener('load',load)


// Sticky Popup

// Generate stickyPopups html from Database
let sticyPopupInfo = [
  {region:'北部地區', city:'台北市',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'中部地區', city:'台中市',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'南部地區', city:'高雄市',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'東部地區', city:'花蓮縣',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'},
{region:'離島地區', city:'澎湖縣',tempeture:28, weather:'多雲有太陽',shortDescription:'臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。'}];

let stickyPopups = document.querySelector(".sticky-popups");

(function(){
  let str = '';
  sticyPopupInfo.forEach((item,index)=>{
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


