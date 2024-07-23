import { useState, useEffect } from "react";

function useSearchQuery(key: string) {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(key) || "";
  });

  useEffect(() => {
    localStorage.setItem(key, searchTerm);
  }, [searchTerm, key]);

  return [searchTerm, setSearchTerm] as const;
}

export default useSearchQuery;
