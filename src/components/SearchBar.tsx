import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md fade-in">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city name..."
        className="w-full px-4 py-3 pl-12 rounded-xl glass-effect search-input shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={20} 
      />
      <button
        onClick={onSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors search-button font-medium"
      >
        Search
      </button>
    </div>
  );
}