// *** DOM Selections
const currentPLace = document.querySelector(".current-place");
const currentTemp = document.querySelector(".temp-nr");
// *****

// These variables are for saving the latitude && longitude
let latitude;
let longitude;

// This function is for getting the user's position and then use the
// geoapify API to get the name of the country and city
export function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getCurrentTemp(latitude, longitude);

        const API_KEY = "e0194524daa54c88b96d3ff8797d83cc";
        const API_URL = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=sv&apiKey=${API_KEY}`;

        fetch(API_URL)
          .then((response) => response.json())
          .then((data) => {
            const city = data.features[0].properties.city;
            const country = data.features[0].properties.country;
            currentPLace.textContent = `${city}, ${country}`;
          })
          .catch((error) => console.log(error));
      },
      (error) => {
        console.error("Error getting the user Location", error);
      }
    );
  } else {
    console.log("GeoLocation is not supported by this browser");
    currentPLace.textContent = "Unknown";
  }
}
// This function is for getting the user's position and then use the
// openweathermap API to get the current temperature based on the latitude and longitude of the user
function getCurrentTemp(lat, long) {
  const API_KEY = `64eda751657841e56332c0e524e654b6`;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const tempCelsius = `${temperature}`.split(".")[0];
      currentTemp.textContent = `${tempCelsius}`;
    })
    .catch((error) => {
      console.log("Error fetching weather date: ", error);
      currentTemp.textContent = "Unknown";
    });
}
