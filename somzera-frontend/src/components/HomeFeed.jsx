import ReviewFeed from './ReviewFeed';
import VinylPlayer from './VinylPlayer';

export default function HomeFeed({ onReviewClick, reviews, isLoading, error }) {
  return (
    <>
      <VinylPlayer onReviewClick={onReviewClick} />

      <div className="flex flex-col flex-grow mt-2 border-b border-t border-gray-300 rounded-lg">
        <div className="bg-sz-light border-x border-gray-300 p-6 flex-grow shadow-inner overflow-y-auto flex flex-col gap-4 min-h-[150px]">
          <ReviewFeed
            reviews={reviews}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
}
