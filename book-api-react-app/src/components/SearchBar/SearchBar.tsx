
import React, { useEffect, useState } from "react";
import "./SearchBar.module.scss";
import { useTheme } from "../ThemeContext/useTheme";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/searchTermSlice";

export default function SearchBar() {
  const { toggleTheme } = useTheme();

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearchTerm = localStorage.getItem("searchTerm") || "";
      setInputValue(storedSearchTerm);
      dispatch(setSearchTerm(storedSearchTerm));
    }
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("searchTerm", inputValue);
      dispatch(setSearchTerm(inputValue));
    }
  };

  return (
    <div className="search-bar">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <Button
        handleClick={handleSearch}
      >
        Search
      </Button>
      <Button handleClick={toggleTheme}>Toggle theme</Button>
    </div>
  );
}
