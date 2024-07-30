import SearchBar from "../components/SearchBar/SearchBar";
import Gallery from "../components/Gallery/Gallery";
import "./Main.scss";
import { useTheme } from "../components/ThemeContext/useTheme";
import { ThemeProvider } from "../components/ThemeContext/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Main() {
  const { theme } = useTheme();

  return (
    <Provider store={store()}>
<ThemeProvider>
      <div
      className={theme === "light" ? "main-page" : "main-page main-page-dark"}
    >
      <SearchBar />
      <Gallery />
    </div>
</ThemeProvider>
  </Provider>

  );
}
