import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export default function useRecentReviews() {
  const [recentReviews, setRecentReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    setError(null);

    try {
      const data = await api.get('/ratings');
      setRecentReviews(Array.isArray(data) ? data : []);
    } catch (requestError) {
      console.error('Erro ao buscar reviews da timeline:', requestError);
      setError('Não foi possível carregar as reviews. Tente novamente mais tarde.');
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentReviews();
  }, [fetchRecentReviews]);

  return {
    recentReviews,
    isLoadingReviews,
    error,
    fetchRecentReviews,
  };
}
