import SearchBar from "../components/SearchBar/SearchBar";
import "./Main.module.scss";
import { useTheme } from "../components/ThemeContext/useTheme";
import Gallery from "../components/Gallery/Gallery";
import CardDetails from "../components/Gallery/CardDetails/CardDetails";

export default function Main() {
  const { theme } = useTheme();

  return (
    <div
      className={theme === "light" ? "main-page" : "main-page main-page-dark"}
    >
      <SearchBar />
      <Gallery><CardDetails/></Gallery>
      
    </div>
  );
}