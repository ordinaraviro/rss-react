import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import Gallery from "../../components/Gallery/Gallery";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchTerm") || "",
  );

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Gallery searchText={searchTerm} perPage={10} />
    </div>
  );
};

export default Main;
