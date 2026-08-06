import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import HomeFeed from './components/HomeFeed';
import MusicDetails from './components/MusicDetails';
import Sidebar from './components/Sidebar';
import ReviewModal from './components/ReviewModal';
import useRecentReviews from './hooks/useRecentReviews';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMusicView, setCurrentMusicView] = useState(null);
  const {
    recentReviews,
    isLoadingReviews,
    error,
    fetchRecentReviews,
  } = useRecentReviews();

  return (
    <div className="text-sz-dark h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-grow flex justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="aero-panel w-full max-w-6xl h-full min-h-[600px] flex flex-col overflow-hidden relative">
          <SearchBar onSelectMusic={setCurrentMusicView} />

          <div className="flex-grow flex flex-col md:flex-row bg-sz-light">
            <div className="flex-grow p-4 md:w-2/3 border-r border-gray-300 flex flex-col gap-4">
              {currentMusicView ? (
                <MusicDetails
                  music={currentMusicView}
                  onClose={() => setCurrentMusicView(null)}
                />
              ) : (
                <HomeFeed
                  onReviewClick={() => setIsModalOpen(true)}
                  reviews={recentReviews}
                  isLoading={isLoadingReviews}
                  error={error}
                />
              )}
            </div>
            
            <Sidebar />
          </div>

          <div className="bg-gray-300 border-t border-gray-400 h-6 flex items-center justify-between px-3 text-[10px] text-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,1)] z-10 relative mt-auto">
            <span className="font-bold text-sz-dark">Pronto</span>
          </div>
        </div>
      </main>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchRecentReviews}
      />
    </div>
  );
}
