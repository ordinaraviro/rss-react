import { useState, useEffect, SetStateAction, Dispatch } from "react";

export default function useSearchQuery(
  key: string,
): [string, Dispatch<SetStateAction<string>>] {
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem(key) || "",
  );

  useEffect(() => {
    const storedQuery = localStorage.getItem(key);
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, [key]);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, searchQuery);
    };
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery];
}
