const latitude = 35.3859;
const longitude = -94.3986;
const apiKey = "a078f9d80de764ccaacf93aab6d75b5d";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export function getForecastWeather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function weatherLocation(data) {
  const local = data.name;

  return local;
}

export function parseWeatherData(data) {
  const weather = data.weather;

  if (!weather || weather.length === 0) {
    // Handle case where weather data is not available
    return "unknown";
  }

  const weatherMain = weather[0].main.toLowerCase();

  if (weatherMain.includes("rain")) {
    return "rainy";
  } else if (weatherMain.includes("clear") || weatherMain.includes("sun")) {
    return "sunny";
  } else {
    return "cold";
  }
}
