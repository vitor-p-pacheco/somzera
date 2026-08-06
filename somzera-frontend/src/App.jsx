import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VinylPlayer from './components/VinylPlayer';
import ReviewFeed from './components/ReviewFeed';
import Sidebar from './components/Sidebar';
import ReviewModal from './components/ReviewModal';
import MusicDetails from './components/MusicDetails';
import api from './services/api';

export default function App() {
  // === ESTADOS DA TIMELINE GERAL ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(true); // Renomeado para não conflitar
  const [error, setError] = useState(null);

  // === ESTADOS DA NOVA BARRA DE PESQUISA ===
  const [topSearchQuery, setTopSearchQuery] = useState('');
  const [topSearchResults, setTopSearchResults] = useState([]);
  const [isTopSearching, setIsTopSearching] = useState(false);

  // === ESTADOS DA "PÁGINA" DA MÚSICA (MusicDetails) ===
  const [currentMusicView, setCurrentMusicView] = useState(null);
  const [musicReviews, setMusicReviews] = useState([]);
  const [isLoadingMusicReviews, setIsLoadingMusicReviews] = useState(false); // Renomeado

  // --- FUNÇÕES DA TIMELINE ---
  const fetchRecentReviews = async () => {
    setIsLoadingTimeline(true);
    setError(null);
    try {
      const data = await api.get('/ratings');
      setRecentReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar reviews da timeline:', error);
      setError('Não foi possível carregar as reviews. Tente novamente mais tarde.');
    } finally {
      setIsLoadingTimeline(false);
    }
  };

  useEffect(() => {
    fetchRecentReviews();
  }, []);

  // --- FUNÇÕES DA PESQUISA (Agora usando o services/api.js) ---
  const handleTopSearch = async () => {
    if (!topSearchQuery.trim()) return;
    setIsTopSearching(true);
    try {
      // Usando api.get em vez de fetch manual com IP
      const data = await api.get(`/musics/?q=${encodeURIComponent(topSearchQuery)}`);
      setTopSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro na busca:', error);
      setTopSearchResults([]);
    } finally {
      setIsTopSearching(false);
    }
  };

  const handleOpenMusicPage = async (music) => {
    setTopSearchResults([]); 
    setTopSearchQuery('');
    setCurrentMusicView(music);
    setIsLoadingMusicReviews(true);

    const musicId = music.spotify_id || music.id;

    try {
      // Usando api.get em vez de fetch manual com IP
      const data = await api.get(`/musics/${musicId}/ratings`);
      setMusicReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar reviews da música:', error);
      setMusicReviews([]);
    } finally {
      setIsLoadingMusicReviews(false);
    }
  };

  return (
    <div className="text-sz-dark h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-grow flex justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="aero-panel w-full max-w-6xl h-full min-h-[600px] flex flex-col overflow-hidden relative">
          
          {/* Nova SearchBar recebendo as props */}
          <SearchBar 
            topSearchQuery={topSearchQuery}
            setTopSearchQuery={setTopSearchQuery}
            isTopSearching={isTopSearching}
            handleTopSearch={handleTopSearch}
            topSearchResults={topSearchResults}
            handleOpenMusicPage={handleOpenMusicPage}
          />

          <div className="flex-grow flex flex-col md:flex-row bg-sz-light">
            <div className="flex-grow p-4 md:w-2/3 border-r border-gray-300 flex flex-col gap-4">
              
              {/* RENDERIZAÇÃO CONDICIONAL: Mostra detalhes da música OU a timeline principal */}
              {currentMusicView ? (
                <MusicDetails 
                  currentMusicView={currentMusicView}
                  setCurrentMusicView={setCurrentMusicView} // Permite fechar a música e voltar à timeline
                  musicReviews={musicReviews}
                  isLoadingReviews={isLoadingMusicReviews}
                />
              ) : (
                <>
                  <VinylPlayer onReviewClick={() => setIsModalOpen(true)} />
                  <div className="flex flex-col flex-grow mt-2 border-b border-t border-gray-300 rounded-lg">
                    <div className="bg-sz-light border-x border-gray-300 p-6 flex-grow shadow-inner overflow-y-auto flex flex-col gap-4 min-h-[150px]">
                      <ReviewFeed 
                        reviews={recentReviews} 
                        isLoading={isLoadingTimeline}
                        error={error}
                      />
                    </div>
                  </div>
                </>
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