import React, { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, onSuccess }) {
  // Controle de Etapa (1 = Busca, 2 = Formulário de Review)
  const [step, setStep] = useState(1);

  // Estados da Busca (Etapa 1)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  // Estados do Formulário (Etapa 2)
  const [score, setScore] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('Vitor'); // Padrão ou pode vir de um estado de perfil
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Resetar campos ao fechar
  const handleClose = () => {
    setStep(1);
    setSelectedMusic(null);
    setSearchQuery('');
    setSearchResults([]);
    setReviewTitle('');
    setDescription('');
    setScore(5);
    onClose();
  };

  // 1. Busca na API via Backend (GET)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoadingSearch(true);
    try {
      const response = await fetch(`http://192.168.0.169/api/musics/?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  // 2. Transição para o Formulário de Review
  const handleNextStep = () => {
    if (selectedMusic) {
      setStep(2);
    }
  };

  // 3. Enviar a Review para o Backend (POST)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Payload estruturado exatamente como o Laravel espera
    const payload = {
      spotify_id: selectedMusic.spotify_id || selectedMusic.id,
      music_title: selectedMusic.name || selectedMusic.music_title,
      artist: selectedMusic.artist,
      url_cover: selectedMusic.url_cover,
      score: Number(score),
      review_title: reviewTitle,
      description: description,
      user: userName
    };

    try {
      const response = await fetch('http://192.168.0.169/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Review enviada com sucesso! 🎵');
        if (onSuccess) onSuccess(); // Recarrega a lista de reviews na tela principal se houver
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Erro retornado pelo backend:', errorData);
        alert('Erro ao salvar review. Verifique os campos enviados.');
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      alert('Erro de conexão com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className="aero-panel w-full max-w-xl text-sz-dark overflow-hidden shadow-2xl rounded-lg">
        
        {/* Cabeçalho Aero */}
        <div className="aero-header p-3 flex justify-between items-center border-b border-white/40">
          <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
            <span>💿</span> {step === 1 ? 'Buscar Música para Review' : 'Escrever Avaliação'}
          </h3>
          <button 
            onClick={handleClose} 
            className="text-gray-700 hover:text-red-600 font-bold text-base px-2 py-0.5 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-5">
          
          {/* ==================== ETAPA 1: BUSCA ==================== */}
          {step === 1 && (
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite o nome da música ou artista..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 p-2 rounded bg-white/80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <button type="submit" className="metro-button px-4 py-2 text-sm font-semibold">
                  {isLoadingSearch ? 'Buscando...' : 'Pesquisar'}
                </button>
              </form>

              {/* Lista de Resultados da Busca */}
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {searchResults.map((music) => {
                  const musicId = music.spotify_id || music.id;
                  const isSelected = (selectedMusic?.spotify_id || selectedMusic?.id) === musicId;
                  
                  return (
                    <div
                      key={musicId}
                      onClick={() => setSelectedMusic(music)}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all border ${
                        isSelected 
                          ? 'bg-amber-100/90 border-amber-500 shadow-sm' 
                          : 'bg-white/50 border-transparent hover:bg-white/80'
                      }`}
                    >
                      <img 
                        src={music.url_cover || 'https://via.placeholder.com/50'} 
                        alt={music.title || music.music_title} 
                        className="w-12 h-12 object-cover rounded shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{music.name || music.music_title}</p>
                        <p className="text-xs text-gray-600 truncate">{music.artist}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botão para Avançar */}
              <div className="flex justify-end pt-3 border-t border-black/10">
                <button
                  onClick={handleNextStep}
                  disabled={!selectedMusic}
                  className={`metro-button px-5 py-2 text-sm font-bold ${
                    !selectedMusic ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Avançar →
                </button>
              </div>
            </div>
          )}

          {/* ==================== ETAPA 2: FORMULÁRIO DE REVIEW ==================== */}
          {step === 2 && selectedMusic && (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Card da Música Selecionada com Capa na Lateral */}
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
                    onClick={() => setStep(1)} 
                    className="text-xs text-amber-800 underline hover:text-amber-900 mt-1 inline-block"
                  >
                    Trocar música
                  </button>
                </div>
              </div>

              {/* Nota (Score 1 a 5) */}
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

              {/* Título da Review */}
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

              {/* Descrição / Opinião */}
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

              {/* Botões de Ação */}
              <div className="flex justify-between items-center pt-3 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-xs text-gray-700 hover:underline"
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="metro-button px-6 py-2 text-sm font-bold"
                >
                  {isSubmitting ? 'Postando...' : 'Postar Review'}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}