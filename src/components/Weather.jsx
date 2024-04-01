// src/Weather.js
import { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric'); // default unit is metric (Celsius)
  const [loading, setLoading] = useState(false); // loading state for animations

  const API_KEY = '1d8a44ec9ec9c7fea79c6f2704eb39e7'; // Replace with your OpenWeatherMap API key

  const search = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${API_KEY}`
        );
        setWeather(response.data);
        setQuery('');
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false); // Set loading state back to false after fetching data
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className='flex justify-center items-center flex-col mt-10'>
        <input
          type="text"
          className="weather-input border p-2 rounded-md w-full max-w-md mb-4"
          placeholder="Enter a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        {weather.main && (
          <div className="bg-white p-8 rounded-md shadow-md text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="flex justify-center items-center">
              <span className="text-4xl mr-2">
                {Math.round(weather.main.temp)}
                {unit === 'metric' ? '°C' : '°F'}
              </span>
              <div>
                <button
                  className="text-blue-500 underline"
                  onClick={() =>
                    setUnit(unit === 'metric' ? 'imperial' : 'metric')
                  }
                >
                  {unit === 'metric' ? '°F' : '°C'}
                </button>
              </div>
            </div>
            <p className="text-lg">{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
