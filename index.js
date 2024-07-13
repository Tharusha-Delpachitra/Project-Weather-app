const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".Weather-icon");
const errormsg = document.querySelector(".error");

const apiKey = "a5100a02b8c99bcbd2fc8e0c73f37833";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function weatherDetails(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidityValue").innerHTML = data.main.humidity + " %";
        document.querySelector(".windSpeed").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === 'Clouds') {
            weather.src = "assets/clouds.png";
        } else if (data.weather[0].main === 'Clear') {
            weather.src = "assets/clear.png";
        } else if (data.weather[0].main === 'Rain') {
            weather.src = "assets/rain.png";
        } else if (data.weather[0].main === 'Mist') {
            weather.src = "assets/mist.png";
        } else if (data.weather[0].main === 'Drizzle') {
            weather.src = "assets/drizzle.png";
        } else {
            weather.src = "assets/default.png";
        }

        document.querySelector(".weatherForcast").style.display = "block";
        errormsg.style.display = "none";

    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        errormsg.style.display = "block";
        document.querySelector(".weatherForcast").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        weatherDetails(city);
        console.log("Search button clicked.");
    } else {
        alert("Please enter a city name.");
    }
});
