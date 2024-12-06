const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const weatherIcon = document.getElementById("weather-icon");

async function fetchWeather(city) {
  if (!city) {
    document.getElementById("error-message").style.display = "block";
    document.getElementById("weather-info").style.display = "none";
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.status === 404) {
      document.getElementById("error-message").style.display = "block";
      document.getElementById("weather-info").style.display = "none";
    } else {
      const data = await response.json();

      document.getElementById("city-name").innerText = data.name;
      document.getElementById("temperature").innerText =
        Math.round(data.main.temp) + "°C";
      document.getElementById("humidity-level").innerText =
        data.main.humidity + "%";
      document.getElementById("wind-speed").innerText =
        data.wind.speed + " km/h";

      const weatherCondition = data.weather[0].main;
      if (weatherCondition === "Clouds") {
        weatherIcon.src = "img/clouds.png";
      } else if (weatherCondition === "Clear") {
        weatherIcon.src = "img/clear.png";
      } else if (weatherCondition === "Rain") {
        weatherIcon.src = "img/rain.png";
      } else if (weatherCondition === "Drizzle") {
        weatherIcon.src = "img/drizzle.png";
      } else if (weatherCondition === "Mist") {
        weatherIcon.src = "img/mist.png";
      }

      document.getElementById("weather-info").style.display = "block";
      document.getElementById("error-message").style.display = "none";
    }
  } catch (error) {
    console.error("Network error:", error);
    document.getElementById("error-message").style.display = "block";
    document.getElementById("error-message").textContent = "Network error.";
    document.getElementById("weather-info").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  fetchWeather(searchInput.value.trim());
});
