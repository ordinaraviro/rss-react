import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BooksResponse } from "../api/api";

export interface SearchBooksParams {
  searchText: string | null;
  page: string | null;
}

export const booksApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/" }),
  endpoints: (builder) => ({
    getBooksBySearchText: builder.query<BooksResponse, SearchBooksParams>({
      query: ({ searchText, page }) =>
        `search.json?q=${searchText}&page=${page}&limit=10&fields=title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence,key`,
    }),
  }),
});

// export const { useGetBooksBySearchTextQuery } = booksApi;
