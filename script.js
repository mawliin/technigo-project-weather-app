const container = document.getElementById("weather")
const container2 = document.getElementById("weather-message")
const container3 = document.getElementById("weather-weekdays")
const container4 = document.getElementById("city")

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4939da041e0da04e07cc610b31c51fd8")
.then((response) => response.json())
.then((json) => {
  const temp = json.list[0].main.temp;
  const weather = json.list[0].weather[0].main;
  const sunrise = new Date(json.city.sunrise * 1000).toLocaleTimeString("sv-SE");
  const sunset = new Date(json.city.sunset * 1000).toLocaleTimeString("sv-SE");
  const city = json.city.name;

  const weatherMessages = {
    Clear: `Get your sunnies out. ${city} is looking rather great today`,
    Rain: `Don't forget your umbrella. It's wet in ${city} today`,
    Clouds: `Light s fire and get cosy. ${city} is looking grey today.`
  };

  const weatherMessage = weatherMessages[weather] || "Ha en fin dag!";

  const weatherIcons = {
  Clear: "light_mode",
  Rain: "rainy",
  Clouds: "cloud",
  Snow: "ac_unit",
  Thunderstorm: "thunderstorm"
};

const weatherIcon = weatherIcons[weather] || "help";

    container4.innerHTML = `<h2>${city}</h2>`;

    container.innerHTML = `
    <div class="weather-row">
      <p> ${weather}</p>
      <p class="none-border"> ${temp} °C</p>
    </div>` + 
    `<p> Sunrise: ${sunrise}<p>` +
    `<p> Sunset: ${sunset}<p>` 

    container2.innerHTML = `
    <div class="weather-row">
      <span class="material-symbols-outlined weather-icon">
        ${weatherIcon}
      </span>
    </div>` + 
    `<h2 class="h2-text"> ${weatherMessage}<h2>`;

    const dailyForecasts = json.list.filter(item =>
    item.dt_txt.includes("12:00:00"))

    container3.innerHTML = dailyForecasts.map(item => {
      const date = new Date(item.dt_txt).toLocaleDateString("sv-SE", { weekday: "short" })
      const temp = item.main.temp.toFixed(1)

      return `
    <div class="weather-temp">
      <p> ${date}</p>
      <p> ${temp}</p>
    </div> 
    <hr>`
    }).join("")

})
.catch(error => {
    console.error('Fetch error:', error)
  })