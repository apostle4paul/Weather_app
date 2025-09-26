import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

//  Assets
import searchIcon from "../../assets/images/search.png";
import windIcon from "../../assets/images/wind.png";

//  Weather condition icons
import clearIcon from "../../assets/images/sun.webp";
import cloudyIcon from "../../assets/images/cloudy.webp";
import drizzleIcon from "../../assets/images/drizzle.png";
import rainIcon from "../../assets/images/rain.png";
import snowIcon from "../../assets/images/snow.png";
import windyIcon from "../../assets/images/wind.png";

//Map weather "main" condition to icons
const iconMap = {
  Clear: clearIcon,
  Clouds: cloudyIcon,
  Drizzle: drizzleIcon,
  Rain: rainIcon,
  Snow: snowIcon,
  Thunderstorm: rainIcon,
  Mist: windyIcon,
  Smoke: windyIcon,
  Haze: windyIcon,
  Dust: windyIcon,
  Fog: windyIcon,
  Sand: windyIcon,
  Ash: windyIcon,
  Squall: windyIcon,
  Tornado: windyIcon,
};

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  //Fetch weather data from OpenWeatherMap API
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      const weatherCondition = data.weather[0].main;
      const selectedIcon = iconMap[weatherCondition] || clearIcon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icon: selectedIcon,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherData(false);
    }
  };

  useEffect(() => {
    search("Addis Ababa");
  }, []);

  return (
    <div className="weather-card">
      {/*Search bar */}
      <div className="search-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city"
          onKeyDown={(e) => e.key === "Enter" && search(inputRef.current.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          className="search-button"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {/*Display weather data */}
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="weather-icon"
            className="weather-main-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="city-name">{weatherData.location}</p>
          <p className="weather-description">{weatherData.description}</p>

          {/*Extra weather info */}
          <div className="weather-info">
            <div className="weather-info-box">
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div className="weather-info-box">
              <img src={windIcon} alt="wind" className="info-icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
