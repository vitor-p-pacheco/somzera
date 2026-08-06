import { useState } from 'react';
import api from '../services/api';

export default function useReviewModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [score, setScore] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleClose = () => {
    setStep(1);
    setSelectedMusic(null);
    setSearchQuery('');
    setSearchResults([]);
    setReviewTitle('');
    setDescription('');
    setScore(5);
    setSearchError(null);
    setSubmitError(null);
    onClose();
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    setIsLoadingSearch(true);
    setSearchError(null);

    try {
      const data = await api.get(`/musics/?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchError('Erro ao buscar músicas. Tente novamente.');
      setSearchResults([]);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const handleNextStep = () => {
    if (selectedMusic) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => setStep(1);

const handleSubmitReview = async (event) => {
    event.preventDefault();
    
    // 1. BLINDAGEM FRONT-END: Validação antes de gastar rede
    if (!reviewTitle.trim() || !description.trim()) {
      setSubmitError('O título e a review não podem estar vazios ou conter apenas espaços.');
      return;
    }

    if (score < 1 || score > 5) {
      setSubmitError('Avaliação inválida. A nota deve ser entre 1 e 5 estrelas.');
      return;
    }

    if (reviewTitle.length > 255) {
      setSubmitError('O título da review é muito longo (máximo 255 caracteres).');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      spotify_id: selectedMusic.spotify_id || selectedMusic.id,
      music_title: selectedMusic.name || selectedMusic.music_title,
      artist: selectedMusic.artist,
      url_cover: selectedMusic.url_cover,
      score: Number(score),
      review_title: reviewTitle.trim(),
      description: description.trim(),
      user: 'Heitor', // Ou o nome dinâmico do utilizador, se houver
    };

    try {
      await api.post('/ratings', payload);
      alert('Review enviada com sucesso! 🎵');
      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar review:', error);
      // 2. BLINDAGEM: Exibe exatamente o erro que veio do api.js (ou do Laravel)
      setSubmitError(error.message || 'Erro ao salvar review. Verifique os campos ou sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedMusic,
    setSelectedMusic,
    isLoadingSearch,
    searchError,
    score,
    setScore,
    reviewTitle,
    setReviewTitle,
    description,
    setDescription,
    isSubmitting,
    submitError,
    handleClose,
    handleSearch,
    handleNextStep,
    handlePreviousStep,
    handleSubmitReview,
  };
}
