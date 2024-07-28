import { describe, it, expect } from "vitest";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Gallery from "./Gallery";
import { renderWithProviders } from "../../tests/testReduxStore";

describe("Gallery", () => {
  it("renders Gallery component", () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Gallery />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
