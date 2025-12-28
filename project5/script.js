const apiKey = "7f784361cec84053497f0936aff89f4a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const locBtn = document.querySelector("#loc-btn");

// Load weather based on location on page load
window.addEventListener("load", () => {
    askLocationPermission();
});

// function askLocationPermission() {
//     if (!navigator.geolocation) {
//         showError("Geolocation not supported. Loading Delhi...");
//         setTimeout(() => checkWeather("Delhi"), 1500);
//         return;
//     }

//     // insecure context check
//     if (location.protocol !== "https:" && location.hostname !== "localhost") {
//         showError("Location requires HTTPS or localhost. Loading Delhi...");
//         setTimeout(() => checkWeather("Delhi"), 1500);
//         return;
//     }

//     if (navigator.permissions) {
//         navigator.permissions.query({ name: "geolocation" }).then((perm) => {
//             if (perm.state === "granted") {
//                 navigator.geolocation.getCurrentPosition(
//                     (pos) => loadWeatherByLocation(pos),
//                     (err) => handleLocationError(err)
//                 );
//             } else if (perm.state === "prompt") {
//                 showError("📍 Click the location button to allow access");
//                 if (locBtn) locBtn.style.display = "inline-flex";
//             } else { // denied
//                 showError("📍 Location access denied. Loading Delhi...");
//                 setTimeout(() => checkWeather("Delhi"), 1500);
//             }
//         }).catch(() => {
//             if (locBtn) locBtn.style.display = "inline-flex";
//             showError("📍 Click the location button to allow access");
//         });
//     } else {
//         // no Permissions API — show manual button
//         if (locBtn) locBtn.style.display = "inline-flex";
//         showError("📍 Click the location button to allow access");
//     }
// }

// if (locBtn) {
//     locBtn.addEventListener("click", () => {
//         locBtn.disabled = true;
//         showLoadingState(true);
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 locBtn.style.display = "none";
//                 loadWeatherByLocation(position);
//                 showLoadingState(false);
//             },
//             (err) => {
//                 locBtn.disabled = false;
//                 showLoadingState(false);
//                 handleLocationError(err);
//             },
//             { timeout: 10000 }
//         );
//     });
// }

function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            showError("📍 Location access denied. Loading Delhi weather...");
            setTimeout(() => {
                checkWeather("Delhi");
            }, 2000);
            break;
        case error.POSITION_UNAVAILABLE:
            showError("📍 Location information unavailable. Loading Delhi weather...");
            setTimeout(() => {
                checkWeather("Delhi");
            }, 2000);
            break;
        case error.TIMEOUT:
            showError("📍 Location request timed out. Loading Delhi weather...");
            setTimeout(() => {
                checkWeather("Delhi");
            }, 2000);
            break;
        default:
            loadDefaultCity();
    }
}

function loadDefaultCity() {
    showError("Loading Delhi weather...");
    setTimeout(() => {
        checkWeather("Delhi");
    }, 1500);
}

function loadWeatherByLocation(position) {
    const { latitude, longitude } = position.coords;
    showLoadingState(true);
    
    fetch(`${geoApiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            updateWeatherDisplay(data);
            errorDiv.style.display = "none";
            showLoadingState(false);
        })
        .catch(error => {
            showError("Unable to fetch weather data. Loading Delhi...");
            setTimeout(() => {
                checkWeather("Delhi");
            }, 2000);
            showLoadingState(false);
        });
}

function showLoadingState(isLoading) {
    if (isLoading) {
        searchBtn.textContent = "⏳";
        searchBtn.disabled = true;
    } else {
        searchBtn.textContent = "🔍";
        searchBtn.disabled = false;
    }
}

async function checkWeather(city) {
    if (!city.trim()) {
        showError("Please enter a city name");
        return;
    }

    try {
        showLoadingState(true);

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateWeatherDisplay(data);
        errorDiv.style.display = "none";
        searchBox.value = "";

    } catch (error) {
        showError(error.message);
        document.querySelector(".weather").style.display = "none";
    } finally {
        showLoadingState(false);
    }
}

function updateWeatherDisplay(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
    
    const condition = data.weather[0].main.toLowerCase();
    document.querySelector(".description").innerHTML = data.weather[0].description;
    
    // Update weather card background
    const weatherElement = document.querySelector(".weather");
    weatherElement.className = `weather weather-${condition}`;
    
    const iconMap = {
        "clouds": "./images/cloud.png",
        "clear": "./images/clear.png",
        "rain": "./images/rain.png",
        "drizzle": "./images/drizzle.png",
        "mist": "./images/mist.png",
        "snow": "./images/snow.png",
        "thunderstorm": "./images/rain.png"
    };
    
    weatherIcon.src = iconMap[condition] || "./images/cloud.png";
    weatherElement.style.display = "block";
}

function showError(message) {
    errorDiv.innerHTML = `<p>${message}</p>`;
    errorDiv.style.display = "block";
}

// Enter key support
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});