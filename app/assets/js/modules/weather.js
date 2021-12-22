export const fetchWeatherData = async (city) => {
  let weatherElements;
  try {
    const res = await axios.get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-6F1E1543-0A14-4188-A039-BA97AEEAF3FF&locationName=${city}`
    );
    const locationData = res.data.records.location[0];
    weatherElements = locationData.weatherElement.reduce(
      (neededElements, item) => {
        if (['Wx', 'PoP', 'MinT', 'MaxT', 'time'].includes(item.elementName)) {
          neededElements[item.elementName] =
            item.time[0].parameter['parameterName'];
          neededElements['startTime'] = new Date(
            item.time[0].startTime
          ).getHours();
          const timePriod =
            neededElements['startTime'] >= 0 &&
            neededElements['startTime'] <= 11
              ? `今天早上`
              : `今天晚上`;
          neededElements['timePriod'] = timePriod;
          neededElements['weatherStatusNum'] =
            neededElements['time'][0].parameter['parameterValue'];
          neededElements['temperature'] = Math.round(
            (Number(neededElements['MaxT']) + Number(neededElements['MinT'])) /
              2
          );
          neededElements['weatherDescription'] =
            neededElements['time'][0].parameter['parameterName'];
          neededElements['locationName'] = locationData.locationName;
        }
        return setWeatherIcon(neededElements);
      }
    );
    return weatherElements;
  } catch (error) {
    console.error(error);
  }
};
const setWeatherIcon = (weatherObj) => {
  const weatherStatusNumber = Number(weatherObj['weatherStatusNum']);
  const weatherMap = new Map(
    Object.entries({
      大太陽: [1],
      多雲: [4, 5, 6, 7],
      多雲有太陽: [3, 2],
      多雲有雨: [8, 9, 10, 11, 12, 13, 14, 20, 29, 30, 31],
      雷雨多雲: [15, 16, 17, 18, 22],
      晴有雨: [19],
      晴有雷雨: [21],
      有霧: [24, 25, 26, 27, 28],
    })
  );
  let result = '';
  for (let [key, valueList] of weatherMap) {
    if (valueList.includes(weatherStatusNumber)) {
      result = key;
      break;
    }
  }
  weatherObj['iconName'] = result;
  return weatherObj;
};
