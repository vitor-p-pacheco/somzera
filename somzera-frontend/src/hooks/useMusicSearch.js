import { useCallback, useRef, useState } from 'react';
import { searchMusics } from '../services/musicService';

export default function useMusicSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const currentRequest = useRef(0);

  const handleSearch = useCallback(async () => {
    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const requestId = ++currentRequest.current;
    setIsSearching(true);

    try {
      const results = await searchMusics(query);

      if (requestId === currentRequest.current) {
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Erro na busca:', error);

      if (requestId === currentRequest.current) {
        setSearchResults([]);
      }
    } finally {
      if (requestId === currentRequest.current) {
        setIsSearching(false);
      }
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    currentRequest.current += 1;
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch,
  };
}
