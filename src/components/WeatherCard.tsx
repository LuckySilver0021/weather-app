import React from 'react';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherCardProps {
  weather: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    description: string;
    windSpeed: number;
  };
  cityName: string;
}

export default function WeatherCard({ weather, cityName }: WeatherCardProps) {
  return (
    <div className="glass-effect weather-card rounded-3xl p-8 shadow-xl w-full max-w-md fade-in">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 capitalize mb-2">{cityName}</h2>
          <p className="text-xl text-gray-600 capitalize">{weather.description}</p>
        </div>
        
        <div className="flex justify-center items-center gap-2">
          <Cloud className="text-blue-500" size={40} />
          <div className="text-6xl font-bold text-gray-800">
            {Math.round(weather.temp)}°C
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
            <Thermometer className="text-red-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Max</p>
              <p className="font-semibold text-lg">{Math.round(weather.temp_max)}°C</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
            <Thermometer className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Min</p>
              <p className="font-semibold text-lg">{Math.round(weather.temp_min)}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
            <Droplets className="text-blue-400" size={24} />
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold text-lg">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
            <Wind className="text-gray-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Wind</p>
              <p className="font-semibold text-lg">{weather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}