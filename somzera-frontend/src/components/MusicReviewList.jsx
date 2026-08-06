export default function MusicReviewList({ reviews, isLoading }) {
  return (
    <div className="flex flex-col border border-gray-300 bg-white rounded shadow-inner">
      <div className="bg-gray-200 border-b border-gray-300 p-2 text-xs font-bold text-sz-dark shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
        Reviews da Comunidade
      </div>
      <div className="p-4 flex flex-col gap-3 min-h-[200px]">
        {isLoading ? (
          <p className="text-xs text-center text-gray-500">Carregando avaliações...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="border border-gray-300 bg-sz-light/10 p-3 rounded shadow-sm"
            >
              <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                <span className="text-xs font-bold text-sz-dark">{review.user || 'Anônimo'}</span>
                <span className="text-xs text-amber-500 font-bold">★ {review.score}/5</span>
              </div>
              <h4 className="text-sm font-bold text-sz-purple mb-1">
                {review.review_title || review.title}
              </h4>
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
  );
}
