//*TODO: add an alert to ensure user would select city before categories || only show the categories after users select a city option

//*TODO: intergrate resteraunt API into the page
// https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=30&$format=JSON

//*TODO: resteraunt toggle with scenicSpot?

//* ----- Authorisation ----- *//
const getAuthorisationHeader =()=> {
    //  填入自己 ID、KEY 開始
        let AppID = '9a39a027224b4cf6ab8546f4e39f95f0';
        let AppKey = 'z5nsCLInB74TT565xhsCwYEKOwg';
    //  填入自己 ID、KEY 結束
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}
//* ----- 定義區域和類別 ----- *//
const cityData = {
    region:{
        North:{
            cities:['Taipei','NewTaipei','Taoyuan','Keelung','Hsinchu','HsinchuCounty','YilanCounty'],
            categories:['自然風景類','遊憩類','古蹟類','廟宇類','生態類','文化類','小吃/特產類','藝術類','體育健身類','溫泉類','都會公園類','觀光工廠類','休閒農業類','國家風景區類','其他'],
        },
        Central:{
            cities:['MiaoliCounty','Taichung','ChanghuaCounty','NantouCounty','YunlinCounty'],
            categories:['自然風景類','遊憩類','觀光工廠類','體育健身類','休閒農業類','文化類','溫泉類','古蹟類','廟宇類','生態類','小吃/特產類','藝術類','國家風景區類','都會公園類','森林遊樂區類','其他'],
        },
        South:{
            cities:['ChiayiCounty','Chiayi','Tainan','Kaohsiung','PingtungCounty'],
            categories:['遊憩類','森林遊樂區類','文化類','自然風景類','體育健身類','觀光工廠類','國家風景區類','小吃/特產類','生態類','廟宇類','藝術類','古蹟類','休閒農業類','溫泉類','國家公園類','都會公園類','其他'],
        },
        East:{
            cities:['HualienCounty','TaitungCounty'],
            categories:['國家風景區類','文化類','觀光工廠類','遊憩類','溫泉類','都會公園類','體育健身類','自然風景類','其他'],
        },
        Islands:{
            cities:['KinmenCounty','PenghuCounty','LienchiangCounty'],
            categories:['自然風景類','文化類','遊憩類','古蹟類','藝術類','廟宇類','生態類','國家風景區類','觀光工廠類','其他'],
        }
    },
    categories:['自然風景類','遊憩類','古蹟廟宇類','藝術文化類','國家風景區','體育健身類','觀光工廠類','溫泉類','其他']
}
const northObj = cityData.region.North
const centralObj = cityData.region.Central
const southObj = cityData.region.South
const eastObj = cityData.region.East
const islandsObj = cityData.region.Islands

//* ----- Results shown on the left side ----- //
let scenicSpotData =[];
let resterauntData = [];
let _thisCity, _thisResteraunt; 

//* ----- Filters regions and cities ----- *//

const GetUserRegion = function(region){
this.region = region,
this.categories = [],
this.currentCitiesArr = []
}

// 綁定(bind) HTML的onclick event 去接收使用者的選擇區域，並且從自訂的Data裡面去找此區域有的城市，放在GetUserRegion的物件就能呈現不同市區選擇
GetUserRegion.prototype.getChosenData = function(){
    this.categories = cityData.categories
    switch(this.region){
        case "north":
            this.currentCitiesArr = northObj.cities
            
            break;
        case "central":
            this.currentCitiesArr = centralObj.cities
            
            break;
        case "south":
            this.currentCitiesArr = southObj.cities
            
            break;
        case "east":
            this.currentCitiesArr = eastObj.cities
            
            break;
        case "islands":
            this.currentCitiesArr = islandsObj.cities
            
            break;
    }
}
// 根據使用者選擇的區域，動態的將按鈕放上畫面
GetUserRegion.prototype.getHtml = function(){
    // 清空畫面
    $(".cities").html("")
    $(".categories").html("")
    $(".scenic-spot-cards").html("")
    $(".results").css("opacity","1")
    //  利用這個物件存取到的資料interate想要呈現的城市和類別 
    this.currentCitiesArr.forEach(city=>{
        let resultCities =`<div class="city">${city}</div>`
        let resultCitiesEl = $(resultCities)

        // 當使用者選擇的城市，這個功能會將從API收到的DATA呈現在畫面
        resultCitiesEl.click(function(){
            // 將選擇的城市造一個新的物件放在_thisCity裡面 (_thisCity是定義在最外層)
            _thisCity = new CityData(this.region,city,10)
            $(".selected-city").text(city)
            console.log(_thisCity)
        })
        $(".cities").append(resultCitiesEl)
    })
    this.categories.forEach((cate,index)=>{
        let resultCate = 
        `<div class="results-category-${index}" onclick="defineCate(${cate})">
            <label for="${cate}" name="city-category">${cate}
            <input id="${cate}" name="city-category" value="${cate}" type="radio" disabled></label>
        </div>`
        let resultCateEl = $(resultCate)
        $(".categories").append(resultCateEl)
    })
}

//* ---- City Data ---- //
const CityData = function(region,city,limitNum){
    this.region= region,
    this.city = city,
    this.limitNum = limitNum,
    this.keyword = '',
    this.selectedCate = []
    // !Test
    this.typeRestaurant = false
    // !Test END
}

// Intergrate API
CityData.prototype.sendGetRequest = async function(){
    let userUrl;
    // !Test
    if(!this.type){
        userUrl = `https://ptx.transportdata.tw/MOTC/v2/Restaurant/ScenicSpot/${this.city}?$top=${this.limitNum}&$format=JSON`
    }
    // !Test END
    // if)類別搜尋景點 || else)關鍵字搜尋景點
    if(this.selectedCate){
        let filterClass1, filterClass2;
        let selectedApi='$select=ID,Name,DescriptionDetail,Picture,OpenTime,Class1,Class2,Class3,Position&'
        filterClass1 = `$filter=Class1 eq '${this.selectedCate[0]}' or Class2 eq '${this.selectedCate[0]}' or Class3 eq '${this.selectedCate[0]}'`
        userUrl = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.city}?${selectedApi}${filterClass1}&$top=${this.limitNum}&$format=JSON`

        if(this.selectedCate.length===2){
            filterClass2 = `Class1 eq '${this.selectedCate[1]}' or Class2 eq '${this.selectedCate[1]}' or Class3 eq '${this.selectedCate[1]}'`
            userUrl = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.city}?${selectedApi}${filterClass1} or ${filterClass2}&$top=${this.limitNum}&$format=JSON`
        }

    }else{
        userUrl= `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.city}?${selectedApi}$filter=contains(Name,'${this.keyword}')&$top=${this.limitNum}&$format=JSON`
    }

    try{
        const resp = await axios.get(userUrl,{headers:getAuthorisationHeader()})
        scenicSpotData = resp.data
        addGeoData()
        get_leaflet()
        console.log(scenicSpotData)
        this.updateHtml()
        return scenicSpotData
    }
    catch(err){
        console.error(err)
    }
}

//* ---- Resteraunt Data ---- //
const ResterauntData = function(region,city,limitNum){
    this.region= region,
    this.city = city,
    this.limitNum = limitNum,
    this.keyword = '',
    this.selectedCate = []
}

ResterauntData.prototype.getRequest = async function(){
    let resterUrl;
    resterUrl = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=30&$format=JSON`
}


//* ----- Update HTML for cards section----- *//
CityData.prototype.updateHtml = function(){
    $(".scenic-spot-cards").html("")
    $(".search").css("opacity",1)
    if(scenicSpotData.length ==0){
        $(".scenic-spot-cards").text("oooooOOOOoops! 這裡好像沒有你要的結果...")
        return
    }
    scenicSpotData.forEach(item=>{
        let cardClose = true;
        let imgUrl='';
        let detailDescription = item.DescriptionDetail
        let shortDescription = item.DescriptionDetail.substring(0,50) + "...";
        let cardTags = [];
        checkingImgSrc(item)

        let _thisCard = `
        <div class="scenic-spot-card" data-id="${item.ID}">
                <div class="imgbox">
                    <div class="imgbox-fit-inner">
                        <div class="imgbox-fit">
                            <img src="${imgUrl}" alt="景點照片:${item.Picture.PictureDescription1}">
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <h2 class="card-title">${item.Name}</h2>
                    <p class="card-description">${shortDescription}</p>
                    <div class="open-time">
                        <h4 class="label">開放時間:</h4>
                        <p>${item.OpenTime}</p>
                    </div>
                    <div class="tags">
                        <div class="tag type">景點</div>
                    </div>
                </div>
            </div>`
            let _thisCardEl = $(_thisCard)
            //點擊卡片之後會放大能看到詳細內容 >> //*TODO:CSS需要修，讓卡片一直是固定大小
            _thisCardEl.click(function(){
                cardClose = !cardClose
                let _thisCardDescription = $(this).find("p.card-description")
                if(!cardClose){
                    displayDescription = detailDescription
                }else{
                    displayDescription = shortDescription
                }
                _thisCardDescription.text(displayDescription)
            })
        $(".scenic-spot-cards").append(_thisCardEl)
        checkingTags(item)
        cardTags.length=0

      // Adding Tags automatically for each card 
        function checkingTags(item){
            if(!item.Class1){
            cardTags.push("其他")
            return
            }
            cardTags.push(item.Class1)
            if(item.Class2 && cardTags.indexOf(item.Class2) == -1){
            cardTags.push(item.Class2)
            if(item.Class3&& cardTags.indexOf(item.Class3) == -1){
                cardTags.push(item.Class3)
            }
            }
            
            //redering to html
                cardTags.forEach(tag=>{
            let classTag =`<div class="tag tag-categories">${tag}</div>`
            let _thisCardTags = _thisCardEl.find(".tags")
            _thisCardTags.append(classTag)
            })
        }

      // Checking image for cards //
        function checkingImgSrc(item){
            if(!item.Picture.PictureUrl1){
    //  default imgage if no image is provided
            imgUrl = './assets/taiwan-default-image.jpg'
            return
            }
            imgUrl = item.Picture.PictureUrl1           
        }
    })

}


//*  ---- Funtion to get Data ---- //
// 使用者選取地區
function getUserData(r){
    let region = new GetUserRegion(r)
    region.getChosenData()
    region.getHtml()
    console.log(region)
}
// 使用者以關鍵字搜尋
function searchKeyword(){
    if($(".search-bar").val() == ''){
        alert('請輸入關鍵字')
        return
    }
    _thisCity.keyword = $(".search-bar").val()
    _thisCity.selectedCate = ''
    _thisCity.sendGetRequest()
    _thisCity.updateHtml()
    $(".current-search-hint .keywords").text(_thisCity.keyword)
}
// 使用者以類別搜尋
function defineCate(val){
    // 清空之前點選類別的紀錄
    _thisCity.selectedCate.length = 0
    // 將合併的類別定義分開以搜尋API裡的結果
    switch(val.id){
        case '自然風景類':
            _thisCity.selectedCate = ['自然風景類','生態類'];
            break;
        case '遊憩類':
            _thisCity.selectedCate = ['遊憩類','都會公園類'];
            break;
        case '古蹟廟宇類':
            _thisCity.selectedCate = ['古蹟類','廟宇類'];
            break;
        case '藝術文化類':
            _thisCity.selectedCate = ['藝術類','文化類'];
            break;
        default:
            _thisCity.selectedCate.push(val.id)
    }
    _thisCity.sendGetRequest()
    _thisCity.updateHtml()
    $(".current-search-hint .keywords").text(val.id)
}

//***  ===================== ***//
// * -------  Utility ------- *//
//***  =================== ***//

//*  ---- Clear text input for better UX---- //
function clearInput(item){
    document.querySelector(item).value = ''
}



//***  ===================== ***//
// * -----  Leaflet Map ----- *//
//***  =================== ***//

let mapData =[];
function addGeoData(){
    scenicSpotData.forEach(i=>{
        let tempGeoData = {}
        tempGeoData.lat = i.Position.PositionLat
        tempGeoData.lon = i.Position.PositionLon
        tempGeoData.name=i.Name
        mapData.push(tempGeoData)
        return mapData
    })
    console.log(mapData)
}
function get_leaflet(){
    let map = new L.Map('map', {
    preferCanvas:true,
    center: [mapData[0].lat,mapData[0].lon],
    zoom: 15,
    zoomSnap:0.25,
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // add markers for each card
    for(var i =0;i<mapData.length;i++){
    let tempMark = L.marker([mapData[i].lat,mapData[i].lon]).addTo(map).bindPopup(`${mapData[i].name}`);
    }
}

function resterauntToggle(){
    console.log('fooooood!')
    // $(".resteraunt-cards").css("display","block")
    // $(".scenic-spot-cards").css("display","none")
}
//*TODO: re-rendering the map is weird
//  solution 1: remove it, before re-rednering
    // map.off();
    // map.remove()
    


