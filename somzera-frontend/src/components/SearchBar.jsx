import React, { useState } from 'react';

export default function SearchBar() {
  const [searchType, setSearchType] = useState('Artista');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-sz-purple aero-header px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <span className="font-bold text-lg italic text-sz-yellow drop-shadow-md whitespace-nowrap">
          descubra novas músicas! ➔
        </span>
        <div className="flex items-center h-6 shadow-retro-button rounded overflow-hidden">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 h-full text-xs outline-none w-32 sm:w-48 text-sz-dark" 
            placeholder="Buscar..."
          />
          <button className="bg-gradient-to-b from-gray-200 to-gray-400 border-l border-gray-400 px-3 h-full text-xs font-bold text-sz-dark hover:from-gray-100 hover:to-gray-300">
            search
          </button>
        </div>
      </div>
    </div>
  );
}