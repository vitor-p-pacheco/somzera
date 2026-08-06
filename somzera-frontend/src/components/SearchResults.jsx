export default function SearchResults({ results, onSelectMusic }) {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-7 left-0 w-full bg-white border border-gray-400 shadow-xl max-h-60 overflow-y-auto z-50 rounded-b">
      {results.map((music) => (
        <div
          key={music.spotify_id || music.id}
          onClick={() => onSelectMusic(music)}
          className="flex items-center gap-2 p-2 border-b border-gray-200 hover:bg-sz-yellow cursor-pointer transition-colors text-sz-dark"
        >
          <img
            src={music.url_cover}
            alt={music.name || music.music_title}
            className="w-8 h-8 object-cover rounded shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[10px] truncate">{music.name || music.music_title}</p>
            <p className="text-[9px] truncate opacity-70">{music.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
