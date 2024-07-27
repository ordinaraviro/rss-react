import { describe, it, expect } from "vitest";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";
import { render, screen } from "@testing-library/react";
import PaginationBar from "./PaginationBar";
import { MemoryRouter } from "react-router-dom";

describe("PaginationBar", () => {
  it("renders PaginationBar component", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <PaginationBar />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText("Next page →")).toBeInTheDocument();
    expect(screen.getByText("← Previous page")).toBeInTheDocument();
  });
});
