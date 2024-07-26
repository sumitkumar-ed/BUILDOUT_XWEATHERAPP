import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import './Home.css';

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className="home">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard title="Temperature" value={weatherData.current.temp_c} unit="°C" />
          <WeatherCard title="Humidity" value={weatherData.current.humidity} unit="%" />
          <WeatherCard title="Condition" value={weatherData.current.condition.text} unit="" />
          <WeatherCard title="Wind Speed" value={weatherData.current.wind_kph} unit="kph" />
        </div>
      )}
    </div>
  );
};

export default Home;
