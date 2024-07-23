import SearchBar from "../../components/SearchBar/SearchBar";
import Gallery from "../../components/Gallery/Gallery";
import './Main.scss';
import { useTheme } from "../../components/ThemeContext/ThemeContext";

export default function Main() {
  const { theme } = useTheme();

  return (
    <div className={ theme === "light" ? "main-page" : "main-page main-page-dark" }>
      <SearchBar />
      <Gallery />
    </div>
  );
}
