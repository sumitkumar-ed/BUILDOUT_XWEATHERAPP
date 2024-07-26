import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ title, value, unit }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{value} {unit}</p>
    </div>
  );
};

export default WeatherCard;
