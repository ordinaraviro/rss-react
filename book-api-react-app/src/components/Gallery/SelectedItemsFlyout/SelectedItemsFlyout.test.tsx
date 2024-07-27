import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SelectedItemsFlyout from "./SelectedItemsFlyout";
import { ThemeProvider } from "../../ThemeContext/ThemeProvider";
import { renderWithProviders } from "../../../tests/testReduxStore";
import { mockBook } from "../../../tests/mockData";

describe("SelectedItemsFlyout", () => {
  const initialState = { items: [mockBook] };
  it("renders SelectedItemsFlyout component", () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <SelectedItemsFlyout />
        </ThemeProvider>
      </MemoryRouter>,
      {
        preloadedState: {
          selectedItems: initialState,
        },
      },
    );
    expect(screen.getByText("1 items are selected")).toBeInTheDocument();
    expect(screen.getByText("Unselect all")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });
  it("not renders SelectedItemsFlyout component with empty store", () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <SelectedItemsFlyout />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(screen.queryByText("Unselect all")).not.toBeInTheDocument();
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
  });
});
