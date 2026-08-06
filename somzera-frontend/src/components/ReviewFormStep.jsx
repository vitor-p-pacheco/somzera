export default function ReviewFormStep({
  selectedMusic,
  score,
  setScore,
  reviewTitle,
  setReviewTitle,
  description,
  setDescription,
  isSubmitting,
  handleSubmitReview,
  handlePreviousStep,
}) {
  return (
    <form onSubmit={handleSubmitReview} className="space-y-4">
      <div className="flex gap-4 items-center bg-white/60 p-3 rounded-lg border border-white/60 shadow-inner">
        <img
          src={selectedMusic.url_cover || 'https://via.placeholder.com/80'}
          alt={selectedMusic.name || selectedMusic.music_title}
          className="w-20 h-20 object-cover rounded-md shadow"
        />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Música Selecionada</span>
          <h4 className="font-bold text-base truncate leading-tight">
            {selectedMusic.name || selectedMusic.music_title}
          </h4>
          <p className="text-sm text-gray-700 truncate">{selectedMusic.artist}</p>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="text-xs text-amber-800 underline hover:text-amber-900 mt-1 inline-block"
          >
            Trocar música
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          Nota (1 a 5 Estrelas)
        </label>
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setScore(star)}
              className={`text-2xl transition-transform hover:scale-110 ${
                star <= score ? 'text-amber-500' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm font-bold bg-amber-200/60 px-2 py-0.5 rounded border border-amber-300">
            {score} / 5
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          Título da Review
        </label>
        <input
          type="text"
          required
          placeholder="Ex: Fudido de bom"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className="w-full p-2 rounded bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          Sua Opinião / Review
        </label>
        <textarea
          required
          rows="3"
          placeholder="Ex: melhor musica que existe"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
        ></textarea>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-black/10">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="px-3 py-1.5 text-xs text-gray-700 hover:underline"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="metro-button px-6 py-2 text-sm"
        >
          {isSubmitting ? 'Postando...' : 'Postar Review'}
        </button>
      </div>
    </form>
  );
}
