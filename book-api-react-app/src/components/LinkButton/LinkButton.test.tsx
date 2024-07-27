import { describe, it, expect } from "vitest";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";
import { render, screen } from "@testing-library/react";
import LinkButton from "./LinkButton";
import { MemoryRouter } from "react-router-dom";

describe("LinkButton", () => {
  it("renders LinkButton component", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <LinkButton path="/">test</LinkButton>
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
