import { useEffect, useState } from 'react';
import { getMusicRatings } from '../services/musicService';

export default function useMusicRatings(music) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const musicId = music?.spotify_id || music?.id;

  useEffect(() => {
    let isCurrentRequest = true;

    if (!musicId) {
      setReviews([]);
      setIsLoading(false);
      return undefined;
    }

    const fetchRatings = async () => {
      setIsLoading(true);

      try {
        const ratings = await getMusicRatings(musicId);

        if (isCurrentRequest) {
          setReviews(ratings);
        }
      } catch (error) {
        console.error('Erro ao buscar reviews:', error);

        if (isCurrentRequest) {
          setReviews([]);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchRatings();

    return () => {
      isCurrentRequest = false;
    };
  }, [musicId]);

  return { reviews, isLoading };
}
