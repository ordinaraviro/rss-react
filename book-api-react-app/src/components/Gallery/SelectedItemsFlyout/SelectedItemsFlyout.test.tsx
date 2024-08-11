import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SelectedItemsFlyout from "./SelectedItemsFlyout";
import { ThemeProvider } from "../../ThemeContext/ThemeProvider";
import { renderWithProviders } from "../../../tests/testReduxStore";
import { mockBook } from "../../../tests/mockData";
import Card from "../Card/Card";

describe("SelectedItemsFlyout", () => {
  it("renders SelectedItemsFlyout component", () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Card
            book={mockBook}
            link={""}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          ></Card>
          <SelectedItemsFlyout />
        </ThemeProvider>
      </MemoryRouter>,
    );
    const firstCardLink = screen.getByRole("checkbox");

    fireEvent.click(firstCardLink!);

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

  it("remove SelectedItemsFlyout component", () => {
    renderWithProviders(
      <MemoryRouter>
        <ThemeProvider>
          <Card
            book={mockBook}
            link={""}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          ></Card>
          <SelectedItemsFlyout />
        </ThemeProvider>
      </MemoryRouter>,
    );
    const firstCardLink = screen.getByRole("checkbox");

    fireEvent.click(firstCardLink!);
    expect(screen.getByText("1 items are selected")).toBeInTheDocument();
    expect(screen.getByText("Unselect all")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Unselect all"));
    expect(screen.queryByText("Unselect all")).not.toBeInTheDocument();
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
  });
});
