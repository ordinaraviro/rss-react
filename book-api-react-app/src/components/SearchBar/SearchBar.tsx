import React, { useState } from "react";
import "./SearchBar.scss";
import ErrorButton from "../ErrorBoundary/ErrorButton";
import { useTheme } from "../ThemeContext/ThemeContext";
import useSearchQuery from "../../services/useSearchQuery";
import Button from "../Button/Button";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useSearchQuery("searchTerm");
  // const [searchTerm, setSearchTerm] = useState(
  //   localStorage.getItem("searchTerm") || "",
  // );
  const { toggleTheme } = useTheme();

  // const handleSearch = () => {
  //   localStorage.setItem("searchTerm", searchTerm);
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <Button handleClick={() => localStorage.setItem("searchTerm", searchTerm)}>Search</Button>
      <ErrorButton errorText="Generate error" />
      <Button handleClick={toggleTheme}>Toggle theme</Button>
    </div>
  );
}
