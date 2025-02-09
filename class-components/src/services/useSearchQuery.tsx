import { useState, useEffect } from 'react';

function useSearchQuery(key: string) {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchTerm);
    };
  }, [searchTerm, key]);

  return [searchTerm, setSearchTerm];
}

export default useSearchQuery;
