import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

export const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  it("provides the default theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("toggles the theme", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeDisplay = screen.getByTestId("theme");
    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });

    // Initial theme should be light
    expect(themeDisplay).toHaveTextContent("light");

    // Toggle theme to dark
    await act(async () => {
      toggleButton.click();
    });

    await waitFor(() => expect(themeDisplay).toHaveTextContent("dark"));

    // Toggle theme back to light
    await act(async () => {
      toggleButton.click();
    });
    
    await waitFor(() => expect(themeDisplay).toHaveTextContent("light"));
  });
});
