const apiKey = "a316287e85c481f6944f371e017412d9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");

const weatherIcons = {
    "clouds": "cloudy.png",
    "rain": "storm.png",
    "drizzle": "storm.png",
    "thunderstorm": "storm.png",
    "snow": "snow.png",
    "mist": "fog.png",
    "fog": "fog.png",
    "haze": "fog.png",
    "clear": "sun.png",
    "wind": "wind.png"
};

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            alert("City not found!");
            return;
        }
        const data = await response.json();

        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
        document.querySelector(".wind").innerText = `${data.wind.speed} kmph`;

        const weatherCondition = data.weather[0].main.toLowerCase();
        console.log("Weather Condition:", weatherCondition); // Debugging log

        // Fix: Handle "light snow", "heavy snow", etc.
        if (weatherCondition.includes("snow")) {
            weatherIcon.src = "snow.png";
        } else {
            const matchedCondition = Object.keys(weatherIcons).find(key => weatherCondition.includes(key));
            weatherIcon.src = matchedCondition ? weatherIcons[matchedCondition] : "weather.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Load default city weather (e.g., New York)
checkWeather("New York");
