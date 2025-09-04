async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = `<p style="color:red;">Please enter a city name</p>`;
    return;
  }

  try {
    const geoResp = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    const geoData = await geoResp.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found!");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherResp = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
    );
    const weatherData = await weatherResp.json();

    const { current_weather } = weatherData;
    if (!current_weather) {
      throw new Error("Weather data not available");
    }

    resultDiv.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>🌡️ Temperature: ${current_weather.temperature} °C</p>
      <p>⏰ Time: ${current_weather.time}</p>
      <p>🌦️ Weather Code: ${current_weather.weathercode}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
