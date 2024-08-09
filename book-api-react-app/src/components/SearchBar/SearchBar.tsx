import React, { useEffect, useState } from "react";
import "./SearchBar.module.scss";
import { useTheme } from "../ThemeContext/useTheme";
import Button from "../Button/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  setLoading: (arg: boolean) => void;
}

export default function SearchBar({ setLoading }: SearchBarProps) {
  const { toggleTheme } = useTheme();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearchTerm = localStorage.getItem("searchTerm") || "";
      setInputValue(storedSearchTerm);
      if (
        !searchParams.get("q") ||
        searchParams.get("q") !== localStorage.getItem("searchTerm")
      )
        router.push(pathname + "?" + updateSearchParams(storedSearchTerm));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateSearchParams = (newTerm: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("q", newTerm);
    return newSearchParams.toString();
  };

  const handleSearch = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("searchTerm", inputValue);
      setLoading(true);
      router.push(pathname + "?" + updateSearchParams(inputValue));
    }
  };

  return (
    <div className="search-bar">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <Button handleClick={handleSearch}>Search</Button>
      <Button handleClick={toggleTheme}>Toggle theme</Button>
    </div>
  );
}
