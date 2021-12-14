const activityUrl = 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON';
const defaultActivityPicture = `https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`;
const activityPopoverCard = document.querySelector(
    '.activity-popover-card .card_top'
    );
const activityControlPrev = document.querySelector(
    '.activity-popover-card .arrow_prev_js'
    );
const activityControlNext = document.querySelector(
    '.activity-popover-card .arrow_next_js'
    );
const prevActivityBtn = document.getElementById('prevActivityBtn');
const nextActivityBtn = document.getElementById('nextActivityBtn');

let validActivities = [];
let activityPopoverData = []

export function get_activity(){
    axios.get(activityUrl)
    .then((res) => {
        const { data } = res;
        let now = new Date();
        validActivities = data.filter((item) => {
            if (!item.Picture.PictureUrl1 || !item.Picture.PictureDescription1) {
            item.Picture.PictureUrl1 = defaultActivityPicture;
            item.Picture.PictureDescription1 = `活動示意圖片`;
            }
            return item.WebsiteUrl !== undefined && new Date(item.EndTime) - now > 0;
            
        });
        activityPopoverData = convertDataForm(getRandomAct(validActivities, 3));

        // render activiy cards
        activityPopoverData.forEach((item, index) => {
            render_ActivityCards({
                id: index,
                title: item.title,
                imgUrl: item.imgUrl,
                description: item.description,
                endDate: item.endDate,
                link: item.link,
            });
        });
        // add event listener
        activityControlPrev.addEventListener('click', function () {
            activityControls(-1);
            activityBtn(currentCardIndex);
            });
        activityControlNext.addEventListener('click', function () {
            activityControls(1);
            activityBtn(currentCardIndex);
        });
    });
}
//FIXME the card is overflow when resize
// Activity contorl
let currentCardIndex = 0;
function activityControls(index) {
    if (
    currentCardIndex < 0 ||
    currentCardIndex > activityPopoverData.length) {
    return;
    }
    let span = 382; // card width
    currentCardIndex += index;
    if (
        currentCardIndex >= activityPopoverData.length ||
        currentCardIndex < 0
    ) {
        currentCardIndex = 0;
    }
    if (window.innerWidth >= 1400) {
        span = 304;
    }
    let computed_left = -(currentCardIndex * span) + 'px';
    activityPopoverCard.style.left = computed_left;
}
function activityBtn(index) {
    if (
    currentCardIndex < 0 ||
    currentCardIndex > activityPopoverData.length
    ) {
    return;
    }
    if (index === 0) {
    prevActivityBtn.classList.toggle('invisible');
    } else if (index === activityPopoverData.length - 1) {
    nextActivityBtn.classList.toggle('invisible');
    } else {
    if (prevActivityBtn.getAttribute('class').indexOf('invisible') !== -1) {
        prevActivityBtn.classList.remove('invisible');
    }
    if (nextActivityBtn.getAttribute('class').indexOf('invisible') !== -1) {
        nextActivityBtn.classList.remove('invisible');
    }
    }
}
// Render activity cards
function render_ActivityCards({
    id,
    title,
    imgUrl,
    description,
    endDate,
    link,
    }) {
    let newCardItem = document.createElement('li');
    newCardItem.classList.add(
        'activity-popover-card-item',
        'mx-4',
        'mt-2',
        'mt-xxl-0'
    );
    newCardItem.setAttribute('data-id', `${id}`);
    let cardHtml = /*html*/ `
        <h3 class="fs-3 mb-3">${title}</h3>
        <div class="activity-popover-img rounded-m mb-3" style="background-image:url('${imgUrl}')"></div>
        <p class="mb-3 fw-3 ellipsis">${description}</p>
        <span class="d-block fs-5 fw-5">活動結束時間：${endDate}</span>
        <a class="d-inline fs-5 fw-5" href="${link}">活動連結</a>`;
    newCardItem.innerHTML = cardHtml;
    activityPopoverCard.appendChild(newCardItem);
    return activityPopoverCard;
    }
//random取得的活動陣列轉換成需要的資料格式
const convertDataForm = function (arr) {
    let dataArray = [];
    arr.forEach((item) => {
        let obj = {};
        const time = new Date(item.EndTime);
        obj['title'] = item.Name;
        obj['imgUrl'] = item.Picture.PictureUrl1;
        obj['description'] = item.Description;
        obj['endDate'] = `${time.getFullYear()}.${(time.getMonth() + 1).toString().padStart(2, '0')}.${time.getDate().toString().padStart(2, '0')}`;
        obj['link'] = item.WebsiteUrl;
        dataArray.push(obj);
    });
    return dataArray;
};
/*****取得隨機資料*****/
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomAct(arr, num) {
  //宣告一陣列數用來裝隨機產生的數字
    let randomActivities = [];
    let numArr = [];
    let n = 0;
    for (let i = 0; i < num; i++) {
        n = getRandomInt(arr.length);
        if (numArr.includes(n)) {
        //如果有出現過就重跑一次迴圈
        i -= 1;
        continue;
        } else {
        //沒出現過的話寫到陣列裡
        numArr.push(n);
        }
    }
    // console.log(num);
    numArr.forEach((item) => {
        randomActivities.push(arr[item]);
    });
    return randomActivities;
}
