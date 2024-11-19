import React, { useState } from 'react';
import { Cloud } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const API_KEY = '5e24d322689ee413571a001cf9f8ae13';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'City not found');
      }
      
      setWeather({
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed
      });
    } catch (err: any) {
      console.error('Weather API Error:', err);
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = city 
    ? `https://source.unsplash.com/1600x900/?${encodeURIComponent(city)},cityscape`
    : 'https://source.unsplash.com/1600x900/?nature,weather';

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 gap-8 transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
      }}
    >
      <div className="flex flex-col items-center gap-6 fade-in">
        <div className="flex items-center gap-3 bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm">
          <Cloud className="text-white" size={40} />
          <h1 className="text-4xl font-bold text-white">Not your regular Weather App</h1>
        </div>
        <SearchBar 
          city={city} 
          setCity={setCity} 
          onSearch={fetchWeather} 
        />
      </div>

      {loading && (
        <div className="glass-effect text-gray-800 px-6 py-3 rounded-full font-medium fade-in">
          Loading...
        </div>
      )}

      {error && (
        <div className="bg-red-500/90 text-white px-6 py-3 rounded-full backdrop-blur-sm font-medium fade-in">
          {error}
        </div>
      )}

      {weather && !loading && (
        <WeatherCard weather={weather} cityName={city} />
      )}
    </div>
  );
}

export default App;