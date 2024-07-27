import { render, screen } from "@testing-library/react";
import CardDetails from "./CardDetails";
import { describe, it, vi, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../ThemeContext/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

vi.mock("../../api/api", () => ({
  fetchData: vi.fn(),
}));

describe("CardDetails", () => {
  it("shows loading indicator while fetching data", async () => {
    render(
      <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
        <Provider store={store()}>
          <ThemeProvider>
            <Routes>
              <Route path="/details" element={<CardDetails />} />
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  // it("displays the detailed card data correctly", async () => {
  //   (fetchData as jest.Mock).mockResolvedValue(mockBooksResponse);

  //   render(
  //     <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
  //       <ThemeProvider>
  //                 <Routes>
  //         <Route path="/details" element={<CardDetails />} />
  //       </Routes>
  //       </ThemeProvider>

  //     </MemoryRouter>,
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Title: The lord of the rings"),
  //     ).toBeInTheDocument();
  //     expect(screen.getByText("Author: J.R.R. Tolkien")).toBeInTheDocument();
  //   });
  // });

  // it("hides the component when clicking the close button", async () => {
  //   (fetchData as jest.Mock).mockResolvedValue(mockBooksResponse);

  //   render(
  //     <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
  //       <ThemeProvider>
  //                 <Routes>
  //         <Route path="/details" element={<CardDetails />} />
  //         <Route path="/" element={<div>Home Page</div>} />
  //       </Routes>
  //       </ThemeProvider>

  //     </MemoryRouter>,
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Title: The lord of the rings"),
  //     ).toBeInTheDocument();
  //   });

  //   const closeButton = screen.getByText("Close details");
  //   fireEvent.click(closeButton);

  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText("Title: The lord of the rings"),
  //     ).not.toBeInTheDocument();
  //     expect(screen.getByText("Home Page")).toBeInTheDocument();
  //   });
  // });
});
