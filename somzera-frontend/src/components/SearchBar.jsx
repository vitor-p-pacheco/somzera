import SearchResults from './SearchResults';
import useMusicSearch from '../hooks/useMusicSearch';

export default function SearchBar({ onSelectMusic }) {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
  } = useMusicSearch();

  const handleSelectMusic = (music) => {
    clearSearch();
    onSelectMusic(music);
  };

  return (
    <div className="bg-sz-purple aero-header px-4 py-2 flex flex-col md:flex-row justify-between items-center border-b border-sz-purple shadow-sm gap-2">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <span className="font-bold text-lg italic text-sz-yellow drop-shadow-md whitespace-nowrap">
          descubra novas músicas! ➔
        </span>
        <div className="flex items-center h-7 shadow-retro-button bg-white rounded overflow-visible relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // BLINDAGEM 1: Só permite dar 'Enter' se NÃO estiver buscando atualmente
            onKeyDown={(e) => e.key === 'Enter' && !isSearching && handleSearch()}
            className="px-2 h-full text-xs outline-none w-32 sm:w-48 text-sz-dark disabled:opacity-70" 
            placeholder=""
            // BLINDAGEM 2: Trava a digitação enquanto busca (opcional, mas recomendado)
            disabled={isSearching}
          />
          <button
            type="button"
            onClick={handleSearch}
            // BLINDAGEM 3: Desativa o botão fisicamente no HTML
            disabled={isSearching}
            // BLINDAGEM 4: Muda o CSS para deixar claro que está inativo
            className={`metro-button border-l border-gray-400 px-3 h-full text-xs font-bold text-sz-dark ${
              isSearching 
                ? 'opacity-50 cursor-not-allowed bg-gray-300' 
                : 'hover:from-gray-100 hover:to-gray-300'
            }`}
          >
            {isSearching ? '...' : 'search'}
          </button>

          <SearchResults
            results={searchResults}
            onSelectMusic={handleSelectMusic}
          />
        </div>
      </div>

      <div className="hidden md:flex text-xs items-center gap-3">
        <span className="text-white text-[9px] opacity-70 tracking-wider">HOW FREE SOMZERA WORKS ➔</span>
        <button className="bg-gray-200 border border-gray-400 text-sz-dark px-3 py-1 rounded shadow-retro-button hover:bg-gray-100 flex items-center gap-1 font-bold">
          browse music <i className="fas fa-caret-down"></i>
        </button>
      </div>
    </div>
  );
}
