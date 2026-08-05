import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VinylPlayer from './components/VinylPlayer';
import ReviewFeed from './components/ReviewFeed';
import Sidebar from './components/Sidebar';
import ReviewModal from './components/ReviewModal';
import api from './services/api';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentReviews = async () => {
    setIsLoadingReviews(true);
    setError(null);
    
    try {
      const data = await api.get('/ratings');
      
      if (Array.isArray(data)) {
        setRecentReviews(data);
      } else {
        setRecentReviews([]);
      }
    } catch (error) {
      console.error('Erro ao buscar reviews da timeline:', error);
      setError('Não foi possível carregar as reviews. Tente novamente mais tarde.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchRecentReviews();
  }, []);  

  return (
    <div className="text-sz-dark h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-grow flex justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="aero-panel w-full max-w-6xl h-full min-h-[600px] flex flex-col overflow-hidden relative">
          <SearchBar />

          <div className="flex-grow flex flex-col md:flex-row bg-sz-light">
            <div className="flex-grow p-4 md:w-2/3 border-r border-gray-300 flex flex-col gap-4">
              <VinylPlayer onReviewClick={() => setIsModalOpen(true)} />

              <div className="flex flex-col flex-grow mt-2 border-b border-t border-gray-300 rounded-lg">
                <div className="bg-sz-light border-x border-gray-300 p-6 flex-grow shadow-inner overflow-y-auto flex flex-col gap-4 min-h-[150px]">
                  <ReviewFeed 
                    reviews={recentReviews} 
                    isLoading={isLoadingReviews}
                    error={error}
                  />
                </div>
              </div>
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