import React, { useState } from "react";
import "./SearchBar.scss";
import ErrorButton from "../ErrorBoundary/ErrorButton";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );

  const handleSearch = () => {
    localStorage.setItem("searchTerm", searchTerm);
    props.onSearch(searchTerm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      <ErrorButton errorText="Generate error" />
    </div>
  );
};

export default SearchBar;
