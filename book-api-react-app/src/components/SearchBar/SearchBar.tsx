import React, { useState } from "react";
import "./SearchBar.scss";
import ErrorButton from "../ErrorBoundary/ErrorButton";
import { useTheme } from "../ThemeContext/ThemeContext";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );
  const { toggleTheme } = useTheme();

  const handleSearch = () => {
    localStorage.setItem("searchTerm", searchTerm);
    props.onSearch(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <ErrorButton errorText="Generate error" />
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}
