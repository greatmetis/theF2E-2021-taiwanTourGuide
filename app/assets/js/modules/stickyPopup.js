import { setStage, prevStage } from './animation';
import { fetchWeatherData, setStickyPopupInfoData } from './weather';

const stickyPopup = document.getElementsByClassName('sticky-popup');
const stickyPopupHeader = document.getElementsByClassName('popup-header');
const stickyPopups = document.querySelector('.sticky-popups');
const popupContainer = document.querySelector('.sticky-popup-container');
let currentStickyPopupData;

let stickyPopupInfo = [
  {
    region: '北部地區',
    defaultCity: '臺北市',
    weather: {},
    cities: [
      '臺北市',
      '新北市',
      '桃園市',
      '基隆市',
      '新竹市',
      '新竹縣',
      '宜蘭縣',
    ],
  },
  {
    region: '中部地區',
    defaultCity: '臺中市',
    weather: {},
    cities: ['苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣'],
  },
  {
    region: '南部地區',
    defaultCity: '高雄市',
    weather: {},
    cities: ['嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣'],
  },
  {
    region: '東部地區',
    defaultCity: '花蓮縣',
    weather: {},
    cities: ['花蓮縣', '臺東縣'],
  },
  {
    region: '離島地區',
    defaultCity: '澎湖縣',
    weather: {},
    cities: ['金門縣', '澎湖縣', '連江縣'],
  },
];
const activityTags = [
  '逛大自然風景',
  '樂活之旅',
  '古蹟廟宇',
  '國家風景區',
  '藝術文化',
  '溫泉之旅',
  '建築工廠',
  '想要戶外走看看',
  '其他',
];

let scenicSpotData = []; //store api data in the local

let selectedCity = '';
let selectedCategory = '';

const setPopuptWeatherData = (popupData, city) => {
  return new Promise((resolve, reject) => {
    fetchWeatherData(city)
      .then((res) => {
        popupData.weather = { ...res };
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDefaultCityWeatherData = () => {
  const promiseArray = [];
  for (let index = 0; index < stickyPopupInfo.length; index++) {
    promiseArray.push(
      setPopuptWeatherData(
        stickyPopupInfo[index],
        stickyPopupInfo[index].defaultCity
      )
    );
  }
  return Promise.all(promiseArray);
};

// Generate stickyPopups html from Database
export function render_stickyPopup() {
  selectedCity = '';
  selectedCategory = '';
  // calculate the container width based on clients' window
  computed_stickyPopupWidth();

  // render sticky popups based on database(stickyPopupInfo)
  let strPopup = '';

  // render stickyPopup
  stickyPopupInfo.forEach((item, index) => {
    let cityTags = [];
    let strCity = '';
    let strActivity = '';
    let activityTagColumn = [
      activityTags.slice(0, Math.ceil(activityTags.length / 2)),
      activityTags.slice(Math.ceil(activityTags.length / 2)),
    ]; //將活動切成兩行做呈現
    // console.log(activityTagColumn);

    // dynamically insert city tags
    cityTags = item.cities;
    cityTags.forEach((item) => {
      let tempCityHtml = /*html*/ `
                <input type="radio" class="btn-check" name="city-btnradio" id="city-btnradio-${item}" autocomplete="off">
                <label class="btn btn-outline-dark city-tags" for="city-btnradio-${item}">${item}</label>
            `;
      strCity += tempCityHtml;
    });

    // dynamically insert activity tags
    let rederTimes = index;
    activityTagColumn.forEach((item) => {
      strActivity += /*html*/ `
            <div class="activity-btn-group" >
            ${createActivityTags(item, rederTimes)}
            </div>
            `;
    });

    let tempStickyHtml = createStickyPopups({
      id: index,
      region: item.region,
      city: item.defaultCity,
      // tempeture: item.defaultCity,
      weather: item.weather,
      cityTags: strCity,
      activityTags: strActivity,
    });
    strPopup += tempStickyHtml;

    stickyPopups.innerHTML = strPopup;
  });

  //**  Add event listener **//

  for (let i = 0; i < stickyPopupHeader.length; i++) {
    stickyPopupHeader[i].addEventListener('click', togglePopup);
  } // stickyPopup toggle

  // addEventToCityTag(); // city selections
  addEventToActivityTag(); // activity selections
  addEventToSelectedRegion(); // region selection
  addEventToFinalisedBtn(); // 下一步（開始推播）
}

export function computed_stickyPopupWidth() {
  console.log(document.body.clientWidth, document.body.clientWidth - 280);
  popupContainer.style.maxWidth = `${document.body.clientWidth - 280}px`;
}

function createStickyPopups({
  id,
  region,
  city,
  weather,
  cityTags,
  activityTags,
}) {
  return /*html*/ `
        <li class="w-20">
            <div class="sticky-popup open_sticky_popup popup-content-bounce-in-up" data-id="${id}">
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
                    <div class="popup-body-activity disabled">
                        <p class="">我想要...</p>
                        <div class="overflow-scroll bottom-popup-tag mb-3 me-n6" role="btn-group" aria-label="activity selections">
                        ${activityTags}
                        </div>
                        <button
                            class="btn btn-secondary w-100 rounded-0 border border-1 rounded-2 mt-3 finalised-selection-btn">
                            <span class="align-middle text-black">下一步</span>
                            <img src="assets/images/arrow_expand.svg" class="arrow-hover ms-1" alt="arrow icon">
                        </button>
                    </div>
                </div>
                <div class="weather-info">
                ${renderWeatherInfo(city, weather)}</div>
            </div>
        </li>
        `;
}

export const renderWeatherInfo = (city, weather) => {
  return /*html*/ ` <div class="popup-content border border-2 border-dark border-bottom-0 px-6 py-6">
  <button class="btn btn-lg btn-yellow border border-2 lh-sm text-black mb-2">${weather.temperature}&#8451;</button>
  <div class="d-flex align-items-center">
  <h3 class="fs-l mb-1 me-2">${weather.weatherDescription}</h3>
  <img src="assets/images/${weather.iconName}.png" class="ms-1" alt="${weather.iconName} icon">
  </div>
  <span class="d-block text-muted fs-5">${city}${weather.timePriod}</span>
</div> `;
};

function togglePopup(e) {
  let currentCard = e.currentTarget.parentNode;
  let currentId = currentCard.getAttribute('data-id');
  const weatherInfoElements = document.querySelectorAll('.weather-info');
  let stickyPopupArr = [...stickyPopup];
  stickyPopupArr.forEach((item) => {
    if (item.getAttribute('data-id') !== currentId) {
      item.classList.remove('open', 'city');
      selectedCity = '';
      selectedCategory = '';
      watch_tagStatus();
    }
  });
  currentCard.classList.toggle('open');
  currentCard.classList.toggle('city');

  currentStickyPopupData = stickyPopupInfo[currentId];
  weatherInfoElements[currentId].innerHTML = renderWeatherInfo(
    stickyPopupInfo[currentId].defaultCity,
    stickyPopupInfo[currentId].weather
  );
  addEventToCityTag(currentId);
}
function addEventToCityTag(popupIndex) {
  const cityTagBtn = document.querySelectorAll('.city-tags');
  for (let i = 0; i < cityTagBtn.length; i++) {
    cityTagBtn[i].addEventListener('click', function () {
      selectedCity = this.textContent;
      watch_tagStatus();
      setStage(2);
      setPopuptWeatherData(currentStickyPopupData, selectedCity).then(() => {
        const { weather } = currentStickyPopupData;
        const weatherInfoElements = document.querySelectorAll('.weather-info');
        weatherInfoElements[popupIndex].innerHTML = renderWeatherInfo(
          selectedCity,
          weather
        );
      });
    });
  }
}
function addEventToActivityTag() {
  const activityTagBtn = document.querySelectorAll('.activity-tag');
  // activiy selection
  for (let i = 0; i < activityTagBtn.length; i++) {
    activityTagBtn[i].addEventListener('click', function () {
      selectedCategory = this.firstChild.nextElementSibling.textContent;
      setStage(3);
    });
  }
}
function addEventToFinalisedBtn() {
  const finalisedSelectionBtn = document.querySelector(
    '.finalised-selection-btn'
  );
  finalisedSelectionBtn.addEventListener('click', function () {
    setStage(4);
  });
}

// FIXME: a horizontal line in the middle between activity tags
function createActivityTags(items, num) {
  let str = '';
  items.forEach((item) => {
    str += /*html*/ `
            <input type="radio" class="btn-check" name="activity-btnradio" id="activity-btnradio-${item}-${num}" autocomplete="off">
            <label class="btn btn-outline-dark activity-tag" for="activity-btnradio-${item}-${num}">
            <span class="align-middle">${item}</span>
            <img src="assets/images/${item}.svg" class="ms-1" alt="${item} icon">
            </label>
        `;
  });
  return str;
}
function addEventToSelectedRegion() {
  const regionBtn = document.querySelectorAll('.region-btn');
  regionBtn.forEach((item, index) => {
    item.addEventListener('click', function () {
      // stickyPopup[index].classList.add("city");
      setStage(1);
    });
  });
}
function watch_tagStatus() {
  const activityTagSection = document.querySelectorAll('.popup-body-activity');
  if (!selectedCity) {
    activityTagSection.forEach((btn) => btn.classList.add('disabled'));
  } else {
    activityTagSection.forEach((btn) => btn.classList.remove('disabled'));
  }
}

export { selectedCity, selectedCategory };
