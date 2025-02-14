import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BookInfo {
  author_name: string[];
  cover_edition_key: string;
  edition_key: string[];
  first_publish_year: number;
  first_sentence: string[];
  title: string;
  key: string;
}

export interface BooksResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: BookInfo[];
  q: string;
  offset: boolean;
}

export interface SearchBooksParams {
  searchText: string | null;
  page: string | null;
}

export const booksApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    getBooksBySearchText: builder.query<BooksResponse, SearchBooksParams>({
      query: ({ searchText, page }) =>
        `search.json?q=${searchText}&page=${page}&limit=10&fields=title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence,key`,
    }),
  }),
});
