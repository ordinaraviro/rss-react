import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <>
      <SearchBar onSearch={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      <Gallery searchText={"sun"} perPage={10} />
    </>
  );
}

export default App;
