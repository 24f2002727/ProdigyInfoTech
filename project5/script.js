const apiKey = "apikey";;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const DEFAULT_CITY = "Delhi";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const locBtn = document.querySelector("#loc-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

window.addEventListener("load", () => {
    checkWeather(DEFAULT_CITY);
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", e => {
    if (e.key === "Enter") checkWeather(searchBox.value);
});

locBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(loadWeatherByLocation, locationError);
});

async function checkWeather(city) {
    if (!city.trim()) return showError("Enter a city name");

    try {
        showLoading(true);
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        updateUI(data);
        clearError();
    } catch (err) {
        showError(err.message);
        weatherDiv.style.display = "none";
    } finally {
        showLoading(false);
    }
}

function loadWeatherByLocation(position) {
    const { latitude, longitude } = position.coords;

    fetch(`${geoApiUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            updateUI(data);
            clearError();
        })
        .catch(() => showError("Location weather failed"));
}

function updateUI(data) {
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText =
        Math.round(data.wind.speed * 3.6) + " km/h";
    document.querySelector(".description").innerText =
        data.weather[0].description;

    const condition = data.weather[0].main.toLowerCase();
    const icons = {
        clouds: "cloud.png",
        clear: "clear.png",
        rain: "rain.png",
        drizzle: "drizzle.png",
        mist: "mist.png",
        snow: "snow.png",
        haze: "mist.png"
    };

    weatherIcon.src = `./images/${icons[condition] || "cloud.png"}`;
    weatherDiv.style.display = "block";
}

function showError(msg) {
    errorDiv.innerText = msg;
    errorDiv.style.display = "block";
}

function clearError() {
    errorDiv.style.display = "none";
}

function showLoading(state) {
    searchBtn.disabled = state;
    searchBtn.style.opacity = state ? "0.6" : "1";
}

function locationError() {
    showError("Location access denied");
}