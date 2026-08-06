export default function ReviewSearchStep({
  searchQuery,
  setSearchQuery,
  searchResults,
  selectedMusic,
  setSelectedMusic,
  isLoadingSearch,
  handleSearch,
  handleNextStep,
}) {
  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Digite o nome da música ou artista..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
        />
        <button type="submit" className="metro-button px-4 py-2 text-sm" disabled={isLoadingSearch}>
          {isLoadingSearch ? 'Buscando...' : 'Pesquisar'}
        </button>
      </form>

      <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
        {searchResults.map((music) => {
          const musicId = music.spotify_id || music.id;
          const isSelected = (selectedMusic?.spotify_id || selectedMusic?.id) === musicId;

          return (
            <div
              key={musicId}
              onClick={() => setSelectedMusic(music)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-amber-100/90 border-amber-500 shadow-sm'
                  : 'bg-white/50 border-transparent hover:bg-white/80'
              }`}
            >
              <img
                src={music.url_cover || 'https://via.placeholder.com/50'}
                alt={music.title || music.music_title}
                className="w-12 h-12 object-cover rounded shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{music.name || music.music_title}</p>
                <p className="text-xs text-gray-600 truncate">{music.artist}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-3 border-t border-black/10">
        <button
          type="button"
          onClick={handleNextStep}
          disabled={!selectedMusic}
          className={`metro-button px-5 py-2 text-sm ${
            !selectedMusic ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Avançar →
        </button>
      </div>
    </div>
  );
}
