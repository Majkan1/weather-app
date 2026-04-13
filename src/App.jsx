import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [city, setCity] = useState("");

  return (
    <div className="app">
      <div className="panel" aria-live="polite" aria-atomic="true">
        <Main city={city} setCity={setCity} />
        <WeatherCard city={city} />
      </div>
      
    </div>
  );
}

function Main({ city, setCity}) {
  return (
    <div className="main">
      <h1 className="title">Weather</h1>
      <p className="subtitle">Type a city to see current conditions.</p>
      <label htmlFor="city-input" className="sr-only">City name</label>
      <input
        className="search"
        type="text"
        value={city}
        placeholder="Write here the town"
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
}

function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null);

  function getIcon(current) {
    if (!current) return 'not-available.svg';
    if (current.wind_speed_10m >= 40) return 'wind.svg';
    
    const isDay = current.is_day ? '-day' : '-night';
    const code = current.weather_code;

    if (code === 0) return `clear${isDay}.svg`;
    if (code <= 3) return `overcast${isDay}.svg`;
    if (code === 45 || code === 48) return `fog${isDay}.svg`;
    if (code >= 51 && code <= 67) return 'rain.svg';
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow.svg';
    if (code >= 95 && code <= 99) return `thunderstorms${isDay}.svg`;
    
    return 'not-available.svg';
  }

  useEffect(() => {
    async function fetchWeather() {
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();
        const location = geoData.results?.[0];

        if (!location) {
          setWeather(null);
          return;
        }

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m,precipitation,weather_code,is_day&timezone=auto`);
        const weatherData = await weatherRes.json();

        setWeather({
          placeName: location.name,
          admin1: location.admin1,
          country: location.country,
          current: weatherData.current,
          units: weatherData.current_units
        });
      } catch (error) {
        console.error("Failed to fetch weather data", error);
        setWeather(null);
      }
    }

    const timeoutId = setTimeout(() => {
      if (!city) {
        setWeather(null);
      } else {
        fetchWeather();
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [city]);

  if (!city || !weather) return null;

  const iconUrl = new URL(`./assets/all/${getIcon(weather.current)}`, import.meta.url).href;
  const thermometerUrl = new URL('./assets/all/thermometer.svg', import.meta.url).href;
  const windUrl = new URL('./assets/all/wind.svg', import.meta.url).href;

  return (
    <section className="card" aria-label="Weather result">
      <div className="cardHeader">
        <img className="weatherIcon" src={iconUrl} alt={`Weather condition: ${getIcon(weather.current).replace('.svg','').replace(/-/g,' ')}`} />
        <div className="placeBlock">
          <div className="placeLabel">City</div>
          <div className="place">
            {[weather.placeName, weather.admin1, weather.country].filter(Boolean).join(", ")}
          </div>
        </div>
      </div>

      <dl className="metrics">
        <div className="metric">
          <img className="metricIcon" src={thermometerUrl} alt="temperature" />
          <dt className="metricLabel">Temperature</dt>
          <dd className="metricValue">
            {weather.current.temperature_2m}{weather.units.temperature_2m}
          </dd>
        </div>

        <dl className="metric">
          <img className="metricIcon" src={windUrl} alt="wind" />
          <dt className="metricLabel">Wind</dt>
          <dd className="metricValue">
            {weather.current.wind_speed_10m}{weather.units.wind_speed_10m}
          </dd>
        </dl>
      </dl>
    </section>
  );
}