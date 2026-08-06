import { useState } from 'react';

export default function MusicReviewList({ reviews, isLoading }) {
  // Estado para controlar qual review está aberta (pelo ID)
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col border border-gray-300 bg-white rounded shadow-inner">
      <div className="bg-gray-200 border-b border-gray-300 p-2 text-xs font-bold text-sz-dark shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
        Reviews da Comunidade
      </div>
      <div className="p-4 flex flex-col gap-3 min-h-[200px]">
        {isLoading ? (
          <p className="text-xs text-center text-gray-500">Carregando avaliações...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => {
            const isExpanded = expandedId === (review.id || index);
            
            return (
              <div
                key={review.id || index}
                onClick={() => toggleExpand(review.id || index)}
                className="border border-gray-300 bg-sz-light/10 p-3 rounded shadow-sm cursor-pointer transition-all hover:bg-sz-light/30"
              >
                <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                  <span className="text-xs font-bold text-sz-dark">{review.user || 'Anônimo'}</span>
                  <span className="text-xs text-amber-500 font-bold">★ {review.score}/5</span>
                </div>
                
                <h4 className={`text-sm font-bold text-sz-purple mb-1 break-words ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {review.review_title || review.title}
                </h4>
                
                <p className={`text-xs text-gray-700 break-words whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
                  {review.description}
                </p>
                
                {/* Mostra "Ler mais..." só se a review for grande e não estiver expandida */}
                {!isExpanded && review.description?.length > 100 && (
                  <span className="text-[10px] text-sz-blue font-bold mt-2 inline-block">
                    Ler mais...
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center opacity-50 py-10">
            <i className="fas fa-comment-slash text-3xl mb-2 text-sz-dark"></i>
            <p className="text-xs font-bold text-sz-dark">Nenhuma review encontrada para esta música.</p>
          </div>
        )}
      </div>
    </div>
  );
}