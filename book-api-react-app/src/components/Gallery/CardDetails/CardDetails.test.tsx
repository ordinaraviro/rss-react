import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import CardDetails from "./CardDetails";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../ThemeContext/ThemeProvider";
import { renderWithProviders } from "../../../tests/testReduxStore";
import { mockData } from "../../../tests/mockData";

export const handlers = [
  http.get("https://openlibrary.org/search.json", async () => {
    await delay(150);
    return HttpResponse.json(mockData);
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CardDetails", () => {
  it("shows loading indicator while fetching data", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
        <ThemeProvider>
          <Routes>
            <Route path="/details" element={<CardDetails />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("shows loading indicator while fetching data", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/details?page=1&bookId=0"]}>
        <ThemeProvider>
          <Routes>
            <Route path="/details" element={<CardDetails />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Author: Brian Sibley")).toBeInTheDocument();
    });
  });
});
