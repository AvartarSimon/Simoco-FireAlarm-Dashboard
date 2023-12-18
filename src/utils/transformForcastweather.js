/*
Used for weather trend time plot
### Public method
return type: Array
[
  [ 1702774800, 18.01 ], [ 1702785600, 17.23 ],
  [ 1702796400, 16.59 ], [ 1702807200, 19.67 ],
]
*/
function transformWeatherResponseForWeatherTrendsInDays(fullDataInDays) {
  const transformedData = fullDataInDays.map(
    transformWeatherResponseToTimestampArrary
  );
  return transformedData;
}

/*
Used for weather 5 days forecast full report
### Public method 
expected input type: Array[ 
  {
    "dt": 1702814400,
    "main": {
      "temp": 18.01,
      "feels_like": 17.59,
      "temp_min": 16.92,
      "temp_max": 18.01,
      "pressure": 1014,
      "sea_level": 1014,
      "grnd_level": 1010,
      "humidity": 66,
      "temp_kf": 1.09
    },
    "weather": [
      { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }
    ],
    "clouds": { "all": 0 },
    "wind": { "speed": 1.99, "deg": 210, "gust": 2.5 },
    "visibility": 10000,
    "pop": 0,
    "sys": { "pod": "n" },
    "dt_txt": "2023-12-17 12:00:00"
  }, ......
] 

expected return type: Array [
  {
    day: 'Sun',
    icon: 'mdi-weather-sunny',
    temp: '18.01 / 16.92°C',
    temp_min: 16.92,
    temp_max: 18.01,
    weatherDescription: 'clear sky',
    weather: 'Clear'
  },
  ...
]
*/
function getWeatherForecastDataIndaysFromOriginResponse(fullDataInDays) {
  const maxMinTempBelongsToOneDay =
    findOutMaxMinTempBelongsToOneDay(fullDataInDays);
  return transformForecastData(maxMinTempBelongsToOneDay);
}

/*
Used for weather 5 days full report labels
### Public method 
expected input type: Array[ 
  {
    "dt": 1702814400,
    "main": {
      "temp": 18.01,
      "feels_like": 17.59,
      "temp_min": 16.92,
      "temp_max": 18.01,
      "pressure": 1014,
      "sea_level": 1014,
      "grnd_level": 1010,
      "humidity": 66,
      "temp_kf": 1.09
    },
    "weather": [
      { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }
    ],
    "clouds": { "all": 0 },
    "wind": { "speed": 1.99, "deg": 210, "gust": 2.5 },
    "visibility": 10000,
    "pop": 0,
    "sys": { "pod": "n" },
    "dt_txt": "2023-12-17 12:00:00"
  }, ......
] 
expected return type: Object{
      "0": "Sun",
      "1": "Mon",
      "2": "Tue",
      "3": "Wes",
      "4": "Thu",
      "5": "Fri"
    }
*/
function getWeatherLabelsForDifferentDays(fullDataInDays) {
  const weatherDataInObjectForEachDay =
    findOutMaxMinTempBelongsToOneDay(fullDataInDays);
  const labels = Object.keys(weatherDataInObjectForEachDay).reduce(
    (acc, day, currentIndex) => {
      acc[currentIndex] = day;
      return acc;
    },
    {}
  );
  return labels;
}

//Private method
function transformWeatherResponseToTimestampArrary(item) {
  const weatherDateTime = item.dt_txt;
  const weatherTimeStamp = new Date(weatherDateTime).valueOf() / 1000;
  const weatherTempFeelsLike = item.main.feels_like;
  const weatherTempMin = item.main.temp_min;
  const weatherTempMax = item.main.temp_max;
  const weatherTemp = item.main.temp;
  return [weatherTimeStamp, weatherTemp];
}

/*
Private method
expect input type: FullDataInDays

expected return type:
Object {
  Sun: {
    max: 18.01,
    min: 16.92,
    weather: "Clear",
    weatherDescription: "clear sky",
    weatherDateTime: "2023-12-17 12:00:00z"
  },
  Mon: {
    max: 31.17,
    min: 15.68,
    weather: "Clouds",
    weatherDescription: "scattered clouds",
    weatherDateTime: "2023-12-17 15:00:00z"
  }
};
*/
function findOutMaxMinTempBelongsToOneDay(fullDataInDays) {
  const daysMapping = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  const dataGroupInDifferentDays = fullDataInDays.reduce((acc, item) => {
    //add timezone to date
    const weatherDateTime = item.dt_txt + "z";
    const weatherDayInNumber = new Date(weatherDateTime).getDay();
    const dayName = daysMapping[weatherDayInNumber];
    if (acc[dayName] === undefined) {
      acc[dayName] = {
        max: item.main.temp_max,
        min: item.main.temp_min,
        weather: item.weather[0].main,
        weatherDescription: item.weather[0].description,
        weatherDateTime,
      };
    } else {
      if (item.main.temp_max > acc[dayName].max) {
        acc[dayName].max = item.main.temp_max;
      }

      if (item.main.temp_min < acc[dayName].min) {
        acc[dayName].min = item.main.temp_min;
      }
    }
    return acc;
  }, {});

  return dataGroupInDifferentDays;
}

//Private method
function customWeatherIcon(weather) {
  let weatherIcon = "";
  switch (weather) {
    case "Clouds":
      weatherIcon = "mdi-weather-cloudy";
      break;
    case "Snow":
      weatherIcon = "mdi-weather-snowy";
      break;
    case "Rain":
      weatherIcon = "mdi-weather-rainy";
      break;
    case "Clear":
      weatherIcon = "mdi-weather-sunny";
      break;
    case "Wind":
      weatherIcon = "mdi-weather-windy";
      break;
    default:
      weatherIcon = "mdi-weather-sunny";
  }
  return weatherIcon;
}

/*
//Private method
expected input type: Object {
  Sun: {
    max: 18.01,
    min: 16.92,
    weather: "Clear",
    weatherDescription: "clear sky",
    weatherDateTime: "2023-12-17 12:00:00z"
  } ....
} 

expected return type: Array [
  {
    day: 'Sun',
    icon: 'mdi-weather-sunny',
    temp: '18.01 / 16.92°C',
    temp_min: 16.92,
    temp_max: 18.01,
    weatherDescription: 'clear sky',
    weather: 'Clear'
  },
  {
    day: 'Mon',
    icon: 'mdi-weather-cloudy',
    temp: '31.17 / 15.68°C',
    temp_min: 15.68,
    temp_max: 31.17,
    weatherDescription: 'scattered clouds',
    weather: 'Clouds'
  }
]
*/
function transformForecastData(originalTempDataWithMinMax) {
  return Object.keys(originalTempDataWithMinMax).map((day) => {
    const icon = customWeatherIcon(originalTempDataWithMinMax[day].weather);
    const temp_min = originalTempDataWithMinMax[day].min;
    const temp_max = originalTempDataWithMinMax[day].max;
    const temp = temp_max + " / " + temp_min + "\u00B0C";
    return {
      day,
      icon,
      temp,
      temp_min,
      temp_max,
      weatherDescription: originalTempDataWithMinMax[day].weatherDescription,
      weather: originalTempDataWithMinMax[day].weather,
    };
  });
}

/*
Node-Red specific code
const fullDataInDays = msg.payload;
*/
const fullDataInDays = msg.payload;
// const fullDataInDays = fiveDaysMelboure;
const weatherSeriesData =
  transformWeatherResponseForWeatherTrendsInDays(fullDataInDays);
const weatherFullReportInDays =
  getWeatherForecastDataIndaysFromOriginResponse(fullDataInDays);

const weatherFullReportLabels =
  getWeatherLabelsForDifferentDays(fullDataInDays);

console.log("weatherSeriesData", weatherSeriesData);
console.log("weatherFullReportInDays", weatherFullReportInDays);
console.log("weatherFullReportLabels", weatherFullReportLabels);

/*
Node-Red specific code
*/
msg = {
  payload: {
    weatherSeriesData,
    weatherFullReportInDays,
    weatherFullReportLabels,
  },
  city: msg.data.city.name,
};
return msg;
