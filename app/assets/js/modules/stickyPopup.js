const stickyPopup = document.getElementsByClassName('sticky-popup');
const stickyPopupHeader = document.getElementsByClassName('popup-header');
const stickyPopups = document.querySelector('.sticky-popups');
const popupContainer = document.querySelector('.sticky-popup-container');

let stickyPopupInfo = [
    {
        region: '北部地區',
        defaultCity: '台北市',
        tempeture: 28,
        weather: '多雲有太陽',
        shortDescription:
        '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
        cities:['台北市','新北市','桃園市','基隆市','新竹市','新竹縣','宜蘭縣'],
    },
    {
        region: '中部地區',
        defaultCity: '台中市',
        tempeture: 28,
        weather: '多雲有太陽',
        shortDescription:
        '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
        cities:['苗栗縣','台中市','彰化縣','南投縣','雲林縣']
    },
    {
        region: '南部地區',
        defaultCity: '高雄市',
        tempeture: 28,
        weather: '多雲有太陽',
        shortDescription:
        '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
        cities:['嘉義縣','嘉義市','台南市','高雄市','屏東縣']
    },
    {
        region: '東部地區',
        defaultCity: '花蓮縣',
        tempeture: 28,
        weather: '多雲有太陽',
        shortDescription:
        '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
        cities:['花蓮縣','台東縣']
    },
    {
        region: '離島地區',
        defaultCity: '澎湖縣',
        tempeture: 28,
        weather: '多雲有太陽',
        shortDescription:
        '臺灣東部地區包含花蓮縣及臺東縣，東臨浩瀚太平洋，西倚中央山脈，擁有臨山面海的優越地理位置這裡擁有豐富的生態資源、悠久的農業文化和純樸善良的在地居民，是臺灣的「後花園」，非常適合慢活養生之旅longstay是最好的行程安排。',
        cities:['金門縣','澎湖縣','連江縣']
    },
];
const activityTags = [
    "逛大自然風景", "樂活之旅", "古蹟廟宇", "國家風景區", "藝術文化", "溫泉之旅", "建築工廠", "想要戶外走看看", "其他"
];

let scenicSpotData =[]; //store api data in the local

let selectedCity = '';
let selectedCategory = '';

// Generate stickyPopups html from Database
export function render_stickyPopup(){
    selectedCity = '';
    selectedCategory = '';
    // calculate the container width based on clients' window
    computed_stickyPopupWidth();

    // render sticky popups based on database(stickyPopupInfo)
    let strPopup = '';
    let strActivity = '';
    let activityTagColumn = [activityTags.slice(0, Math.ceil(activityTags.length / 2)), activityTags.slice(Math.ceil(activityTags.length / 2))]; //將活動切成兩行做呈現
    // console.log(activityTagColumn);

    // insert activity tags
    activityTagColumn.forEach((item) => {
        // strActivity += /*html*/`
        //     <ul class="bottom-popup-tag">
        //     ${createActivityTags(item)}
        //     </ul>
        // `;
        strActivity += /*html*/`
        <div class="activity-btn-group" >
        ${createActivityTags(item)}
        </div>
        `
    });

    // render stickyPopup
    stickyPopupInfo.forEach((item,index)=>{
        let cityTags = [];
        let strCity = '';

        // dynamically insert city tags
        cityTags = item.cities;
        cityTags.forEach((item,index)=>{
            let tempCityHtml = /*html*/`
                <input type="radio" class="btn-check" name="city-btnradio" id="city-btnradio-${index}" autocomplete="off" checked>
                <label class="btn btn-outline-dark city-tags" for="city-btnradio-${index}">${item}</label>
            `
            strCity += tempCityHtml;
        });
        
        let tempStickyHtml = createStickyPopups({
            id:index, 
            region:item.region, 
            city:item.defaultCity, 
            tempeture:item.defaultCity, 
            weather:item.weather, 
            shortDescription:item.shortDescription, 
            cityTags:strCity, 
            activityTags:strActivity});
        strPopup += tempStickyHtml;
        stickyPopups.innerHTML = strPopup;
    });

    //**  Add event listener **//

    // stickyPopup toggle
    for (let i = 0; i < stickyPopupHeader.length; i++) {
        stickyPopupHeader[i].addEventListener('click', togglePopup);
    };
    // city && activity selections
    addEventToCityTag();
    addEventToActivityTag();
}

export function computed_stickyPopupWidth(){
    console.log(document.body.clientWidth, document.body.clientWidth - 280);
    popupContainer.style.maxWidth = `${document.body.clientWidth - 280}px`;
};

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
                <div class="overflow-scroll bottom-popup-tag city-btn-group mb-3 me-n6" role="btn-group" aria-label="city selections">
                ${cityTags}
                </div>
                <div class="popup-body-activity">
                <p class="">我想要...</p>
                <div class="overflow-scroll bottom-popup-tag mb-3 me-n6" role="btn-group" aria-label="activity selections">
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
function togglePopup(e) {
    let currentCard = e.currentTarget.parentNode;
    let currentId = currentCard.getAttribute('data-id');
    let stickyPopupArr = [...stickyPopup];

    stickyPopupArr.forEach((item) => {
        if (item.getAttribute('data-id') !== currentId) {
        item.classList.remove('open','city');
        selectedCity = '';
        selectedCategory ='';
        watch_tagStatus();
        }
    });
        
    currentCard.classList.toggle('open');
    // TODO: deciding if we want to have city description
    currentCard.classList.toggle('city');
}
function addEventToCityTag() {
    const cityTagBtn = document.querySelectorAll(".city-tags");
    for(let i = 0; i < cityTagBtn.length; i++){
        cityTagBtn[i].addEventListener('click', function(){
            selectedCity = this.textContent;
            watch_tagStatus();
        })
    }
    
}
function addEventToActivityTag(){
    const activityTagBtn = document.querySelectorAll(".activity-tag");
     // activiy selection
    for(let i = 0; i < activityTagBtn.length; i++){
        activityTagBtn[i].addEventListener('click', function(){
            selectedCategory = this.firstChild.nextElementSibling.textContent
        })
    }
}
// FIXME: a horizontal line in the middle between activity tags
function createActivityTags(items) {
    let str = "";
    items.forEach((item) => {
        str += /*html*/`
            <input type="radio" class="btn-check" name="activity-btnradio" id="activity-btnradio-${item}" autocomplete="off" checked>
            <label class="btn btn-outline-dark activity-tag" for="activity-btnradio-${item}">
            <span class="align-middle">${item}</span>
            <img src="assets/images/${item}.svg" class="ms-1" alt="${item} icon">
            </label>
        `
    });
    return str;
}
function watch_tagStatus(){
    const activityTagSection = document.querySelectorAll(".popup-body-activity");
    if(!selectedCity){
        activityTagSection.forEach(btn=>btn.classList.add("disabled"))
    }else{
        activityTagSection.forEach(btn=>btn.classList.remove("disabled"))
    }
}

export {selectedCity,selectedCategory}