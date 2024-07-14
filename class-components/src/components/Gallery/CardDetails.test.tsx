import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CardDetails from "./CardDetails";
import { describe, it, vi, expect } from "vitest";
import { fetchData } from "../../api/api";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mockBook } from "../../tests/mockData";

vi.mock("../../api/api", () => ({
  fetchData: vi.fn(),
}));

describe("CardDetails", () => {
  const mockBooksResponse = {
    numFound: 1,
    start: 0,
    numFoundExact: true,
    docs: [mockBook],
    q: "test",
    offset: false,
  };

  it("shows loading indicator while fetching data", async () => {
    (fetchData as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
        <Routes>
          <Route path="/details" element={<CardDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays the detailed card data correctly", async () => {
    (fetchData as jest.Mock).mockResolvedValue(mockBooksResponse);

    render(
      <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
        <Routes>
          <Route path="/details" element={<CardDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Title: The lord of the rings"),
      ).toBeInTheDocument();
      expect(screen.getByText("Author: J.R.R. Tolkien")).toBeInTheDocument();
    });
  });

  it("hides the component when clicking the close button", async () => {
    (fetchData as jest.Mock).mockResolvedValue(mockBooksResponse);

    render(
      <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
        <Routes>
          <Route path="/details" element={<CardDetails />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Title: The lord of the rings"),
      ).toBeInTheDocument();
    });

    const closeButton = screen.getByText("Close details");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Title: The lord of the rings"),
      ).not.toBeInTheDocument();
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
  });
});
