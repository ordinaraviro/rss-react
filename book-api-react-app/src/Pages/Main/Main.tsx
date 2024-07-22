import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import Gallery from "../../components/Gallery/Gallery";
import './Main.scss';
import { useTheme } from "../../components/ThemeContext/ThemeContext";

export default function Main() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchTerm") || "",
  );

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className={ theme === "light" ? "main-page" : "main-page main-page-dark" }>
      <SearchBar onSearch={handleSearch} />
      <Gallery searchText={searchTerm} perPage={10} />
    </div>
  );
}
