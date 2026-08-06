import React from 'react';

export default function ReviewFeed({ reviews, isLoading, error }) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-2xl mb-2"></i>
        <p className="text-sm font-bold text-red-700">Erro ao carregar reviews</p>
        <p className="text-xs text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-sz-dark text-center flex flex-col items-center justify-center m-auto py-10">
        <i className="fas fa-compact-disc text-4xl mb-3 opacity-50 animate-[spin_1s_linear_infinite]"></i>
        <p className="text-sm font-bold">Carregando timeline...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-sz-dark text-center flex flex-col items-center justify-center m-auto py-10">
        <i className="fas fa-compact-disc text-4xl mb-3 opacity-50 animate-[spin_4s_linear_infinite]"></i>
        <p className="text-sm font-bold text-sz-dark">Nenhuma review carregada na sua timeline.</p>
        <p className="text-xs mt-1">Seja o primeiro a avaliar um álbum hoje clicando no botão acima!</p>
      </div>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="bg-white/80 p-3 rounded-md shadow-sm border border-gray-300 flex gap-4 items-start hover:bg-white transition-colors cursor-pointer"
        >
          <img 
            src={review.music?.url_cover || 'https://via.placeholder.com/80'} 
            alt={review.music?.title} 
            className="w-16 h-16 object-cover rounded shadow border border-gray-300 shrink-0" 
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sz-dark text-sm truncate pr-2">{review.music?.title}</h4>
              <span className="text-xs font-bold text-sz-dark bg-amber-200 px-1.5 py-0.5 rounded border border-amber-400 shadow-sm whitespace-nowrap">
                ★ {review.score}/5
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-2 truncate">{review.music?.artist}</p>
            <p className="text-sm font-bold text-sz-purple italic truncate">"{review.title}"</p>
            {review.description && (
              <p className="text-xs text-gray-700 mt-1 line-clamp-2">{review.description}</p>
            )}
            <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-wider text-right border-t border-gray-200 pt-1">
              Review por <span className="text-sz-blue">{review.user}</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}