import { describe, it, expect } from "vitest";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";
import { screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { renderWithProviders } from "../../tests/testReduxStore";

describe("SearchBar", () => {
  it("renders SearchBar component", () => {
    renderWithProviders(
      <ThemeProvider>
        <SearchBar />
      </ThemeProvider>,
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });
});
