import React from 'react';

export default function MusicDetails({
  currentMusicView,
  setCurrentMusicView,
  musicReviews,
  isLoadingReviews
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between bg-header-gradient p-4 rounded-lg border border-sz-blue shadow-lg relative">
        <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none z-0"></div>
        <div className="relative z-10 flex gap-4 items-center w-full">
          <img 
            src={currentMusicView.url_cover} 
            alt={currentMusicView.name || currentMusicView.music_title} 
            className="w-32 h-32 object-cover rounded-md border-2 border-sz-yellow shadow-lg"
          />
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold text-sz-yellow tracking-wider" style={{ textShadow: '1px 1px 0px black' }}>
              {currentMusicView.name || currentMusicView.music_title}
            </h2>
            <p className="text-sm font-bold opacity-90">{currentMusicView.artist}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="bg-sz-dark text-sz-yellow px-2 py-1 rounded text-xs font-bold border border-gray-500">
                Score Médio: {
                  musicReviews.length > 0 
                    ? (musicReviews.reduce((acc, rev) => acc + Number(rev.score), 0) / musicReviews.length).toFixed(1)
                    : 'N/A'
                } / 5
              </span>
              <span className="text-xs opacity-80">{musicReviews.length} avaliações</span>
            </div>
          </div>
          <button 
            onClick={() => setCurrentMusicView(null)}
            className="text-white hover:text-sz-yellow text-xs font-bold bg-black/20 px-2 py-1 rounded border border-white/20"
          >
            ✕ FECHAR
          </button>
        </div>
      </div>

      <div className="flex flex-col border border-gray-300 bg-white rounded shadow-inner">
        <div className="bg-gray-200 border-b border-gray-300 p-2 text-xs font-bold text-sz-dark shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
          Reviews da Comunidade
        </div>
        <div className="p-4 flex flex-col gap-3 min-h-[200px]">
          {isLoadingReviews ? (
            <p className="text-xs text-center text-gray-500">Carregando avaliações...</p>
          ) : musicReviews.length > 0 ? (
            musicReviews.map((review, index) => (
              <div key={index} className="border border-gray-300 bg-sz-light/10 p-3 rounded shadow-sm">
                <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                  <span className="text-xs font-bold text-sz-dark">{review.user || 'Anônimo'}</span>
                  <span className="text-xs text-amber-500 font-bold">★ {review.score}/5</span>
                </div>
                <h4 className="text-sm font-bold text-sz-purple mb-1">{review.review_title}</h4>
                <p className="text-xs text-gray-700">{review.description}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center opacity-50 py-10">
              <i className="fas fa-comment-slash text-3xl mb-2 text-sz-dark"></i>
              <p className="text-xs font-bold text-sz-dark">Nenhuma review encontrada para esta música.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}