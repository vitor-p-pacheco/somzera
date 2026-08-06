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
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      spotify_id: selectedMusic.spotify_id || selectedMusic.id,
      music_title: selectedMusic.name || selectedMusic.music_title,
      artist: selectedMusic.artist,
      url_cover: selectedMusic.url_cover,
      score: Number(score),
      review_title: reviewTitle,
      description,
      user: 'Vitor',
    };

    try {
      await api.post('/ratings', payload);
      alert('Review enviada com sucesso! 🎵');
      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar review:', error);
      setSubmitError(error.message || 'Erro ao salvar review. Verifique os campos.');
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
