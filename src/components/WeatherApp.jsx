import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css"; // Import the CSS file

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "1d85068fd6cbd84deabcce5a18e403c6"; // Replace with your OpenWeatherMap API key

  const getWeather = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather data. Please check the city name.");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app-container">
      <div className="city_card">
        <h1 className="city-name">{weatherData?.name}</h1>
        <h2 className="country-name">{weatherData?.sys?.country}</h2>
        <p className="weather-date">
          {new Date(weatherData?.dt * 1000).toLocaleDateString()}
        </p>
      </div>
      <div className="card_container">
        <div className="card_item">
          {/* temeprature */}

          <h2 className="temperature">{weatherData?.main?.temp}°C</h2>
        </div>
        <div className="card_item">
          {/* humidity */}
          <h2 className="humidity">{weatherData?.main?.humidity}%</h2>
        </div>
        <div className="card_item">
          {/* wind speed */}
          <h2 className="wind-speed">{weatherData?.wind?.speed} m/s</h2>
        </div>
        <div className="card_item">
          {/* weather description */}
          <h2 className="weather-description">
            {weatherData?.weather[0]?.description}
          </h2>
        </div>
      </div>
      <div className="weather-app">
        <h1 className="app-title">Professional Weather App</h1>
        <form onSubmit={getWeather} className="weather-form">
          <input
            type="text"
            className="input-field"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            autoComplete="off"
            autoFocus
          />
          <button className="weather-button" type="submit">
            Get Weather
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <div className="weather-card">
            <div className="weather-icon">
              {/* Display weather icon */}
              <img src="../cloud.png" alt="data " />
            </div>
            <div className="weather-details">
              <h3 className="weather-city">{weatherData.name}</h3>
              <p className="weather-info">
                Temperature: {weatherData.main.temp}°C
              </p>
              <p className="weather-info">
                Condition: {weatherData.weather[0].description}
              </p>
              <p className="weather-info">
                Humidity: {weatherData.main.humidity}%
              </p>
              <p className="weather-info">
                Wind Speed: {weatherData.wind.speed} m/s
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
