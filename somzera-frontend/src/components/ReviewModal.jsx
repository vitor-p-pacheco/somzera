import ReviewFormStep from './ReviewFormStep';
import ReviewSearchStep from './ReviewSearchStep';
import useReviewModal from '../hooks/useReviewModal';

export default function ReviewModal({ isOpen, onClose, onSuccess }) {
  const reviewModal = useReviewModal({ onClose, onSuccess });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="aero-panel w-full max-w-xl text-sz-dark overflow-hidden">
        <div className="aero-header p-3 flex justify-between items-center">
          <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
            <span>💿</span> {reviewModal.step === 1 ? 'Buscar Música para Review' : 'Escrever Avaliação'}
          </h3>
          <button
            onClick={reviewModal.handleClose}
            className="text-gray-700 hover:text-red-600 font-bold text-base px-2 py-0.5 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {reviewModal.searchError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700">
              {reviewModal.searchError}
            </div>
          )}

          {reviewModal.submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-700">
              {reviewModal.submitError}
            </div>
          )}

          {reviewModal.step === 1 && <ReviewSearchStep {...reviewModal} />}

          {reviewModal.step === 2 && reviewModal.selectedMusic && (
            <ReviewFormStep {...reviewModal} />
          )}
        </div>
      </div>
    </div>
  );
}
