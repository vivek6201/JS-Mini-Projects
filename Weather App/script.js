const apiKey = "13a72ed90ca74ff884782119230203";

const tabContainer = document.querySelector(".tabContainer");
const tabs = document.querySelectorAll(".tabs");
const showWeather = document.querySelector(".showWeather");
const grantAccessContainer = document.querySelector(".grant-access");
const grantBtn = document.querySelector(".grantBtn")
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".search-btn");
const searchContainer = document.querySelector(".search-bar");
const renderError = document.querySelector(".render-error");

//default Tab
switchTabs(tabs[0]);

// shift tab
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabContainer.querySelector(".activeTab")?.classList.remove('activeTab');
        tab.classList.add("activeTab");
        switchTabs(tab);
    })
})

//function for Session storage
function sessionStorageChecker() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.style.display = "block";
        showWeather.style.display = "none";
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeather(coordinates);
    }
}

function switchTabs(currentTab) {
    grantAccessContainer.style.display = "none";
    showWeather.style.display = "none";
    searchContainer.style.display = "none";
    currentTab.classList.add("activeTab");
    if (currentTab.classList.contains("myWeather")) {
        sessionStorageChecker();
    }
    else {
        searchContainer.style.display = "block";
    }
}

//get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("geolocation api is not supported by your browser");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeather(userCoordinates);
}

//fetch User Weather
async function fetchUserWeather(userCoordinates) {
    try {
        const { lat, lon } = userCoordinates;
        grantAccessContainer.style.display = "none";

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)

        const data = await response.json();
        renderWeather(data);
        showWeather.style.display = "block";
    }
    catch (err) {
        console.log("cannot fetch data",err);
    }
}

//Fetch search weather 
async function fetchSearchWeather(city) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)

        const data = await response.json();
        renderWeather(data);
        showWeather.style.display = "block";
    }
    catch (err) {
        console.log(`Error Occurred ${err}`);
    }
}

//Render Weather
function renderWeather(data) {
    const cityName = document.querySelector(".cityName");
    const weatherState = document.querySelector(".weatherState");
    const weatherImg = document.querySelector(".weatherImg");
    const weatherTemp = document.querySelector(".weatherTemp");
    const windSpeed = document.querySelector(".wind-data");
    const humidity = document.querySelector(".humidity-data");
    const clouds = document.querySelector('.cloud-data');

    cityName.innerHTML = data?.location?.name;
    weatherState.innerHTML = data?.current?.condition?.text;
    weatherImg.src = data?.current?.condition?.icon;
    weatherTemp.innerHTML = `${data?.current?.temp_c} °C`;
    windSpeed.innerHTML = data?.current?.wind_kph.toFixed(2);
    humidity.innerHTML = data?.current?.humidity;
    clouds.innerHTML = data?.current?.cloud;
}

grantBtn.addEventListener("click", getLocation);
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let cityName = searchInput.value;

    if (cityName === "") return;
    fetchSearchWeather(cityName);
})
