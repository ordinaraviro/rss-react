import { ReactNode, useState } from "react";
import { BooksResponse } from "../../redux/books";
import { useTheme } from "../ThemeContext/useTheme";
import SearchBar from "../SearchBar/SearchBar";
import Gallery from "../Gallery/Gallery";

interface LayoutProps {
  data: BooksResponse;
  children: ReactNode;
}

export default function Layout({ data, children }: LayoutProps) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={theme === "light" ? "main-page" : "main-page main-page-dark"}
    >
      <SearchBar setLoading={setLoading} />
      <Gallery data={data} loading={loading} setLoading={setLoading}>
        {children}
      </Gallery>
    </div>
  );
}
