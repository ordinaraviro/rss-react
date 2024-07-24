import React, { useState } from "react";
import "./SearchBar.scss";
import { useTheme } from "../ThemeContext/ThemeContext";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/searchTermSlice";

export default function SearchBar() {
  const { toggleTheme } = useTheme();

  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(setSearchTerm(localStorage.getItem("searchTerm") || ""));
  };

  const [inputValue, setInputValue] = useState(
    localStorage.getItem("searchTerm") || "",
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="search-bar">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <Button
        handleClick={() => {
          localStorage.setItem("searchTerm", inputValue);
          handleChange();
        }}
      >
        Search
      </Button>
      <Button handleClick={toggleTheme}>Toggle theme</Button>
    </div>
  );
}
