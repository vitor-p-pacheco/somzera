import MusicReviewList from './MusicReviewList';
import useMusicRatings from '../hooks/useMusicRatings';

function calculateAverageScore(reviews) {
  const scores = reviews
    .map((review) => Number(review.score))
    .filter(Number.isFinite);

  if (scores.length === 0) return 'N/A';

  const total = scores.reduce((sum, score) => sum + score, 0);
  return (total / scores.length).toFixed(1);
}

export default function MusicDetails({ music, onClose }) {
  const { reviews, isLoading } = useMusicRatings(music);
  const musicTitle = music.name || music.music_title;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between bg-header-gradient p-4 rounded-lg border border-sz-blue shadow-lg relative">
        <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none z-0"></div>
        <div className="relative z-10 flex gap-4 items-center w-full">
          <img
            src={music.url_cover}
            alt={musicTitle}
            className="w-32 h-32 object-cover rounded-md border-2 border-sz-yellow shadow-lg"
          />
          <div className="flex-1 text-white">
            <h2
              className="text-2xl font-bold text-sz-yellow tracking-wider"
              style={{ textShadow: '1px 1px 0px black' }}
            >
              {musicTitle}
            </h2>
            <p className="text-sm font-bold opacity-90">{music.artist}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="bg-sz-dark text-sz-yellow px-2 py-1 rounded text-xs font-bold border border-gray-500">
                Score Médio: {calculateAverageScore(reviews)} / 5
              </span>
              <span className="text-xs opacity-80">{reviews.length} avaliações</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-sz-yellow text-xs font-bold bg-black/20 px-2 py-1 rounded border border-white/20"
          >
            FECHAR
          </button>
        </div>
      </div>

      <MusicReviewList reviews={reviews} isLoading={isLoading} />
    </div>
  );
}
