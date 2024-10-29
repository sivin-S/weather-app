// text style
{
  /* <h2 class="text-[1.8rem] roboto-black my-[1em] text-[var(--colorFour)]">Weather App</h2> */
}

const API_KEY = "88266b22c7794d92c3ca67d03e2fc369";
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

//before
loading();

document.addEventListener("DOMContentLoaded", function () {
  // after
  loadingRemove();
  const searchButton = document.querySelector("button");
  const resultInsertContainer = document.getElementById(
    "resultInsertContainer"
  );
  // const containerOne = document.querySelector('.container');
  // const loadingContainer = document.querySelector('.loadingContainer');
  let click = false;

  if (!click) {
    const currentLocation = document.getElementById("currentLocation");
    currentLocation.addEventListener("click", function (e) {
      loading();
      e.preventDefault();
      e.stopPropagation();
      getCurrentLocation()
        .then(function (response) {
          const lat = response.latitude;
          const lon = response.longitude;
          // console.log(response);
          getCurrentLocationWeather(lat, lon);
        })
        .catch(function (err) {
          showError(err);
        });
    });
  } else {
    showError("wait you already pressed !!!");
  }

  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    click = true;
    // inputBox -> city
    const inputBoxValueTrim = document.getElementById("inputBox").value.trim();
    if (!inputBoxValueTrim) return showError("enter city name");
    const encodedInput = encodeURIComponent(inputBoxValueTrim);
    fetchData(encodedInput);
    loading();
  });
});

function showData(...data) {
  const resultInsertContainer = document.getElementById(
    "resultInsertContainer"
  );

  loadingRemove();

  // temp value is kelvin value
  //    kelvin  (273.15 k) value to degree  converting   (temp - 273.15) result celsius
  const kelvinValue = 273.15;
  const celsius = Math.round(data[0]?.main?.temp - kelvinValue);
  const windSpeed = Math.round(data[0]?.wind?.speed);

  resultInsertContainer.children[0].children[1].innerText = celsius
    ? `${celsius} \u00B0C`
    : `....`;
  resultInsertContainer.children[1].children[1].innerText = data[0]
    ? `${data[0].name}`
    : `......`;
  resultInsertContainer.children[2].children[1].innerText = windSpeed
    ? `${windSpeed} \u006d\u002f\u0073`
    : `.....`;
}

async function fetchData(cityName) {
  document.getElementById("inputBox").value = "";
  const response = await fetch(
    `${BASE_URL_WEATHER}?q=${cityName}&appId=${API_KEY}`
  );
  //  if(!response.ok) throw new Error("Response Error:");
  if (!response.ok) return showError("Response Error");
  const data = await response.json();
  return showData(data);
}

function showError(err) {
  alert(err);
}

function getCurrentLocation() {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        function (err) {
          let errorMessage;
          switch (err.code) {
            case 0:
              errorMessage = "An unknown error occurred";
              break;
            case 1:
              errorMessage = "User denied the request for Geolocation";
              break;
            case 2:
              errorMessage = "Location information is unavailable";
              break;
            case 3:
              errorMessage = "The request to get user location timed out";
              break;
            default:
              errorMessage = "An unexpected error occurred";
          }
          reject({ code: err.code, message: errorMessage });
        }
      );
    } else {
      reject({
        code: -1,
        message: `Geolocation isn't supported by this browser`,
      });
    }
  });
}

async function getCurrentLocationWeather(lat, lon) {
  const response = await fetch(
    `${BASE_URL_WEATHER}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) showError("Response error get");
  const data = await response.json();

  // console.log(data);

  return showData(data);
}

// loading
function loading() {
  const containerOne = document.querySelector(".container");
  const loadingContainer = document.querySelector(".loadingContainer");
  console.log(containerOne);
  console.log(loadingContainer);

  containerOne.classList.remove("flex");
  containerOne.classList.add("hidden");
  loadingContainer.classList.remove("hidden");
  loadingContainer.classList.add("flex");
}

// loading remove
function loadingRemove() {
  const containerOne = document.querySelector(".container");
  const loadingContainer = document.querySelector(".loadingContainer");

  console.log(containerOne);
  console.log(loadingContainer);
  console.log(containerOne);
  loadingContainer.classList.remove("flex");
  loadingContainer.classList.add("hidden");
  containerOne.classList.add("flex");
  containerOne.classList.remove("hidden");
}

// notes
// navigator.geolocation
`
1.  0 (UNKNOWN_ERROR): An unknown error occurred. This is a generic error that doesn't fit into other categories.

2.  1 (PERMISSION_DENIED): The user denied the request for Geolocation. This means the user explicitly refused to share their location.

3. 2 (POSITION_UNAVAILABLE): The location information is unavailable. This can happen if the location service is turned off or if the device cannot determine its position (for example, if there is no GPS signal).

4.  3 (TIMEOUT): The request to get the user’s location timed out. This can occur if the location service takes too long to return a position.

`;
//
