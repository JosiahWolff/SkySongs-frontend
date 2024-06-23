const latitude = 35.3859;
const longitude = -94.3986;
const apiKey = "a078f9d80de764ccaacf93aab6d75b5d";

/**
 * Checks the response status and returns the JSON data if successful, or a rejected promise if not.
 * @param {Response} res - The fetch response object.
 * @returns {Promise} - A promise resolving to the response JSON or rejecting with an error message.
 */
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

/**
 * Fetches the current weather data for the given latitude and longitude.
 * @returns {Promise<Object>} - A promise resolving to the weather data object.
 */
export function getForecastWeather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then(checkResponse)
    .then((data) => data)
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      throw error;
    });
}

/**
 * Extracts and returns the location name from the weather data object.
 * @param {Object} data - The weather data object.
 * @returns {string} - The location name.
 */
export function weatherLocation(data) {
  return data.name;
}

/**
 * Parses the weather data to determine the general weather condition.
 * @param {Object} data - The weather data object.
 * @returns {string} - A string representing the weather condition ('rainy', 'sunny', or 'unknown').
 */
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
    return "unknown";
  }
}