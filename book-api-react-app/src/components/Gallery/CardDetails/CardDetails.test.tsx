import { screen } from "@testing-library/react";
import CardDetails from "./CardDetails";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../ThemeContext/ThemeProvider";
import { renderWithProviders } from "../../../tests/testReduxStore";

// export const handlers = [
//   http.get("https://openlibrary.org/search.json", async ({ request }) => {
//     const url = new URL(request.url);
//     const fields = url.searchParams.get("q");
//     // url.searchParams.set('fields', 'title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence,key')
//     // const proxyRequest = new Request(url, request)
//     // const originalResponse = await fetch(bypass(proxyRequest))
//     console.log(url.searchParams);
//     await delay(150);
//     console.log(fields);
//     return HttpResponse.json(mockData);
//   }),
// ];

// const server = setupServer(...handlers);
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

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
});
