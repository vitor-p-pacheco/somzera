import { useState } from 'react';
import ReviewModal from './components/ReviewModal.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para a barra de pesquisa superior
  const [topSearchQuery, setTopSearchQuery] = useState('');
  const [topSearchResults, setTopSearchResults] = useState([]);
  const [isTopSearching, setIsTopSearching] = useState(false);

  // Estados para a "Página" da Música
  const [currentMusicView, setCurrentMusicView] = useState(null);
  const [musicReviews, setMusicReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Função de busca na barra superior
  const handleTopSearch = async () => {
    if (!topSearchQuery.trim()) return;
    setIsTopSearching(true);
    try {
      const response = await fetch(`http://192.168.0.169/api/musics/?q=${encodeURIComponent(topSearchQuery)}`);
      const data = await response.json();
      setTopSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro na busca:', error);
      setTopSearchResults([]);
    } finally {
      setIsTopSearching(false);
    }
  };

  // Função para abrir a "Página" da música e buscar suas reviews
  const handleOpenMusicPage = async (music) => {
    setTopSearchResults([]); // Fecha o dropdown
    setTopSearchQuery('');
    setCurrentMusicView(music);
    setIsLoadingReviews(true);

    const musicId = music.spotify_id || music.id;

    try {
      const response = await fetch(`http://192.168.0.169/api/musics/${musicId}/ratings`);
      const data = await response.json();
      setMusicReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar reviews:', error);
      setMusicReviews([]);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  return (
    <div className="text-sz-dark h-screen flex flex-col overflow-x-hidden">
      <header className="bg-sz-dark text-sz-light h-16 flex items-center justify-between px-6 shadow-md border-b-4 border-sz-yellow relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-inner border-sz-yellow overflow-auto">
            <img src="/logo.png" alt="Logo Somzera" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-sz-yellow italic">SOMZERA</h1>
          <span className="text-xs ml-2 text-sz-yellow align-bottom mt-2 font-bold bg-sz-blue px-1 rounded shadow-sm">SALVE BONECOS E BONECAS</span>
        </div>

        <div className="text-sm flex gap-4 text-gray-300 hidden sm:flex">
          <a href="#" className="hover:text-sz-yellow hover:underline transition-colors">Sign In ➔</a>
          <a href="#" className="hover:text-sz-yellow hover:underline transition-colors">Register ➔</a>
          <a href="#" className="hover:text-sz-yellow hover:underline transition-colors">FAQ ➔</a>
        </div>
      </header>

      <nav className="bg-nav-gradient h-8 flex items-center px-4 border-b border-gray-400 shadow-sm text-xs text-gray-800 font-bold z-10 relative overflow-x-auto">
        <ul className="flex gap-6 w-full max-w-6xl mx-auto min-w-max">
          <li className="flex items-center gap-1 cursor-pointer text-sz-dark bg-sz-yellow px-2 h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            <i className="fas fa-home text-sz-dark"></i> home
          </li>
          <li className="cursor-pointer hover:text-sz-blue flex items-center h-full px-2">new releases ▸</li>
          <li className="cursor-pointer hover:text-sz-blue flex items-center h-full px-2">reviews ▸</li>
          <li className="cursor-pointer hover:text-sz-blue flex items-center h-full px-2">lists ▸</li>
          <li className="cursor-pointer hover:text-sz-blue flex items-center h-full px-2">community ▸</li>
        </ul>
      </nav>

      <main className="flex-grow flex justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="aero-panel w-full max-w-6xl h-full min-h-[600px] flex flex-col overflow-hidden relative">
          {/* Barra superior Aero */}
          <div className="bg-sz-purple aero-header px-4 py-2 flex flex-col md:flex-row justify-between items-center border-b border-sz-purple shadow-sm gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="font-bold text-lg italic text-sz-yellow drop-shadow-md whitespace-nowrap">descubra novas músicas! ➔</span>
              
              {/* Container de Busca Atualizado */}
              <div className="flex items-center h-7 shadow-retro-button bg-white rounded overflow-visible relative">
                <input 
                  type="text" 
                  value={topSearchQuery}
                  onChange={(e) => setTopSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTopSearch()}
                  className="px-2 h-full text-xs outline-none w-32 sm:w-48 text-sz-dark" 
                  placeholder="" 
                />
                <button 
                  onClick={handleTopSearch}
                  className="metro-button border-l border-gray-400 px-3 h-full text-xs font-bold text-sz-dark hover:from-gray-100 hover:to-gray-300"
                >
                  {isTopSearching ? '...' : 'search'}
                </button>

                {/* Dropdown de Resultados */}
                {topSearchResults.length > 0 && (
                  <div className="absolute top-7 left-0 w-full bg-white border border-gray-400 shadow-xl max-h-60 overflow-y-auto z-50 rounded-b">
                    {topSearchResults.map((music) => (
                      <div 
                        key={music.spotify_id || music.id}
                        onClick={() => handleOpenMusicPage(music)}
                        className="flex items-center gap-2 p-2 border-b border-gray-200 hover:bg-sz-yellow cursor-pointer transition-colors text-sz-dark"
                      >
                        <img src={music.url_cover} alt={music.name || music.music_title} className="w-8 h-8 object-cover rounded shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[10px] truncate">{music.name || music.music_title}</p>
                          <p className="text-[9px] truncate opacity-70">{music.artist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:flex text-xs items-center gap-3">
              <span className="text-white text-[9px] opacity-70 tracking-wider">HOW FREE SOMZERA WORKS ➔</span>
              <button className="bg-gray-200 border border-gray-400 text-sz-dark px-3 py-1 rounded shadow-retro-button hover:bg-gray-100 flex items-center gap-1 font-bold">
                browse music <i className="fas fa-caret-down"></i>
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col md:flex-row bg-sz-light">
            {/* Coluna Principal */}
            <div className="flex-grow p-4 md:w-2/3 border-r border-gray-300 flex flex-col gap-4 overflow-y-auto">
              {currentMusicView ? (
                /* ========== VISUALIZAÇÃO DA MÚSICA ========== */
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between bg-header-gradient p-4 rounded-lg border border-sz-blue shadow-lg relative">
                    <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none z-0"></div>
                    <div className="relative z-10 flex gap-4 items-center w-full">
                      <img 
                        src={currentMusicView.url_cover} 
                        alt={currentMusicView.name || currentMusicView.music_title} 
                        className="w-32 h-32 object-cover rounded-md border-2 border-sz-yellow shadow-lg"
                      />
                      <div className="flex-1 text-white">
                        <h2 className="text-2xl font-bold text-sz-yellow tracking-wider" style={{ textShadow: '1px 1px 0px black' }}>
                          {currentMusicView.name || currentMusicView.music_title}
                        </h2>
                        <p className="text-sm font-bold opacity-90">{currentMusicView.artist}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="bg-sz-dark text-sz-yellow px-2 py-1 rounded text-xs font-bold border border-gray-500">
                            Score Médio: {
                              musicReviews.length > 0 
                                ? (musicReviews.reduce((acc, rev) => acc + Number(rev.score), 0) / musicReviews.length).toFixed(1)
                                : 'N/A'
                            } / 5
                          </span>
                          <span className="text-xs opacity-80">{musicReviews.length} avaliações</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setCurrentMusicView(null)}
                        className="text-white hover:text-sz-yellow text-xs font-bold bg-black/20 px-2 py-1 rounded border border-white/20"
                      >
                        FECHAR
                      </button>
                    </div>
                  </div>

                  {/* Lista de Reviews */}
                  <div className="flex flex-col border border-gray-300 bg-white rounded shadow-inner">
                    <div className="bg-gray-200 border-b border-gray-300 p-2 text-xs font-bold text-sz-dark shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
                      Reviews da Comunidade
                    </div>
                    <div className="p-4 flex flex-col gap-3 min-h-[200px]">
                      {isLoadingReviews ? (
                        <p className="text-xs text-center text-gray-500">Carregando avaliações...</p>
                      ) : musicReviews.length > 0 ? (
                        musicReviews.map((review, index) => (
                          <div key={index} className="border border-gray-300 bg-sz-light/10 p-3 rounded shadow-sm">
                            <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                              <span className="text-xs font-bold text-sz-dark">{review.user || 'Anônimo'}</span>
                              <span className="text-xs text-amber-500 font-bold">★ {review.score}/5</span>
                            </div>
                            <h4 className="text-sm font-bold text-sz-purple mb-1">{review.review_title}</h4>
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
                </div>
              ) : (
                /* ========== VISUALIZAÇÃO PADRÃO (O que você está ouvindo?) ========== */
                <>
                  <div className="bg-header-gradient p-2 rounded-lg border border-sz-blue shadow-lg relative overflow-hidden flex flex-col items-center justify-center py-10 group">
                    <div className="absolute inset-0 bg-glass-gradient opacity-30 pointer-events-none z-0"></div>
                    <h2 className="relative z-10 text-2xl md:text-3xl font-extrabold text-sz-yellow mb-6 tracking-wider text-center" style={{ textShadow: '2px 2px 0px black' }}>
                      O que você está ouvindo?
                    </h2>

                    <div className="relative z-10 w-64 h-64 bg-gradient-to-b from-sz-dark to-gray-500 rounded-xl border-4 border-sz-yellow shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.9)] p-3 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-[0_15px_30px_rgba(255,190,11,0.5)]">
                      <div className="relative shrink-0 w-40 h-40 bg-[#1a1a1a] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.2)] border-4 border-[#333] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out mt-1">
                        <div className="absolute inset-1 bg-gradient-to-br from-[#4a4a4a] to-[#111] rounded-full shadow-inner"></div>
                        <div className="absolute inset-[10px] bg-[radial-gradient(circle_at_center,#999_0%,#444_50%,#111_100%)] rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
                          <div className="absolute w-28 h-28 rounded-full border border-black/20"></div>
                          <div className="absolute w-20 h-20 rounded-full border border-black/30"></div>
                          <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#666] to-[#111] rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.8),inset_0_1px_3px_rgba(255,255,255,0.3)] border border-[#222]"></div>
                        </div>
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#888] rounded-full shadow-sm"></div>
                      </div>

                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="metro-button w-full py-2 text-sm rounded flex items-center justify-center gap-2 transform active:scale-95 font-extrabold tracking-widest shadow-lg mb-1"
                      >
                        <i className="fas fa-plus-circle text-lg"></i>
                        ESCREVER REVIEW
                      </button>
                      
                      <div className="absolute -top-3 -right-3 bg-sz-yellow text-sz-dark text-xs font-bold px-3 py-1 rounded shadow-md border border-yellow-600 z-10 rotate-12">
                        SOMZERA!!
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow mt-2">
                    <div className="flex border-b border-gray-300 px-2 overflow-x-auto">
                      <div className="retro-tab active px-4 py-1 text-xs cursor-default whitespace-nowrap">Reviews Populares</div>
                      <div className="retro-tab px-4 py-1 text-xs text-gray-600 hover:text-sz-dark cursor-pointer whitespace-nowrap">Atividade Recente</div>
                      <div className="retro-tab px-4 py-1 text-xs text-gray-600 hover:text-sz-dark cursor-pointer whitespace-nowrap">Listas</div>
                    </div>

                    <div className="bg-sz-light border-x border-b border-gray-300 p-6 flex-grow shadow-inner overflow-y-auto flex flex-col items-center justify-center min-h-[150px]">
                      <div className="text-sz-dark text-center flex flex-col items-center">
                        <i className="fas fa-compact-disc text-4xl mb-3 opacity-50 animate-[spin_4s_linear_infinite]"></i>
                        <p className="text-sm font-bold text-sz-dark">Nenhuma review carregada na sua timeline.</p>
                        <p className="text-xs mt-1">Seja o primeiro a avaliar um álbum hoje clicando no botão acima!</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="w-full md:w-1/3 p-4 flex flex-col gap-6 bg-gray-200 shadow-[inset_2px_0_5px_rgba(0,0,0,0.05)] border-l border-white">
              <div className="bg-white w-full border-2 border-dotted border-sz-light shadow-sm rounded-md overflow-hidden">
                <div className="bg-gradient-to-r from-sz-blue to-sz-purple text-white text-xs font-bold p-2 border-b border-gray-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                  Browse Genres
                </div>
                <ul className="text-xs p-2 flex flex-col gap-1 text-sz-dark bg-white bg-opacity-70">
                  <li className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-100"><i className="fas fa-compact-disc text-sz-blue"></i> Alternative</li>
                  <li className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-100"><i className="fas fa-compact-disc text-sz-purple"></i> Electronic</li>
                  <li className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-100"><i className="fas fa-compact-disc text-sz-blue"></i> Hip Hop</li>
                  <li className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-100"><i className="fas fa-compact-disc text-sz-dark"></i> Indie Rock</li>
                  <li className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-100"><i className="fas fa-compact-disc text-sz-light"></i> Pop</li>
                  <li className="hover:bg-sz-yellow hover:text-sz-dark p-1.5 rounded cursor-pointer flex items-center gap-2 transition-colors"><i className="fas fa-compact-disc text-sz-purple"></i> R&B</li>
                </ul>
              </div>
              
              <div className="bg-sz-dark text-sz-light p-4 rounded-md border-2 border-sz-yellow shadow-lg flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-glass-gradient opacity-20"></div>
                <div className="relative z-10 flex items-center gap-2 mb-1 border-b border-gray-600 pb-2">
                  <i className="fas fa-share-alt text-sz-yellow drop-shadow-md text-lg"></i>
                  <span className="font-bold text-sm text-sz-yellow">somzera.links</span>
                </div>
                <p className="relative z-10 text-xs text-gray-200 mt-1">Compartilhe suas reviews em qualquer lugar da web com SomzeraLinks.</p>
                <ul className="relative z-10 text-[10px] text-gray-400 mt-1 list-disc pl-4">
                  <li>Blogs</li>
                  <li>Fóruns VBulletin</li>
                  <li>MSN Messenger</li>
                </ul>
                <button className="relative z-10 bg-sz-blue hover:bg-sz-purple text-white text-xs py-2 px-2 mt-2 rounded border border-sz-light shadow-sm transition-colors font-bold flex justify-between items-center">
                  Gerar Link <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Status Bar da Janela Aero */}
          <div className="bg-gray-300 border-t border-gray-400 h-6 flex items-center justify-between px-3 text-[10px] text-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,1)] z-10 relative mt-auto">
            <span className="font-bold text-sz-dark">Pronto</span>
          </div>
        </div>
      </main>
      {/* Renderização condicional do Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> 
    </div>
  );
}