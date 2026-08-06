import React from 'react';

export default function SearchBar({
  topSearchQuery,
  setTopSearchQuery,
  isTopSearching,
  handleTopSearch,
  topSearchResults,
  handleOpenMusicPage
}) {
  return (
    <div className="aero-header flex items-center h-6 shadow-retro-button rounded overflow-visible relative">
      <select className="bg-gray-100 border-r border-gray-400 text-xs px-2 h-full text-sz-dark outline-none cursor-pointer">
        <option>Artista</option>
        <option>Álbum</option>
        <option>Música</option>
      </select>
      <input 
        type="text" 
        value={topSearchQuery}
        onChange={(e) => setTopSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleTopSearch()}
        className="px-2 h-full text-xs outline-none w-32 sm:w-48 text-sz-dark" 
        placeholder="" 
      />
      <button 
        onClick={handleTopSearch}
        className="bg-gradient-to-b from-gray-200 to-gray-400 border-l border-gray-400 px-3 h-full text-xs font-bold text-sz-dark hover:from-gray-100 hover:to-gray-300"
      >
        {isTopSearching ? '...' : 'search'}
      </button>

      {/* Dropdown de Resultados */}
      {topSearchResults.length > 0 && (
        <div className="absolute top-7 left-0 w-full bg-white border border-gray-400 shadow-xl max-h-60 overflow-y-auto z-50 rounded-b">
          {topSearchResults.map((music) => (
            <div 
              key={music.spotify_id || music.id}
              onClick={() => handleOpenMusicPage(music)}
              className="flex items-center gap-2 p-2 border-b border-gray-200 hover:bg-sz-yellow cursor-pointer transition-colors text-sz-dark"
            >
              <img src={music.url_cover} alt={music.name || music.music_title} className="w-8 h-8 object-cover rounded shadow-sm" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[10px] truncate">{music.name || music.music_title}</p>
                <p className="text-[9px] truncate opacity-70">{music.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}