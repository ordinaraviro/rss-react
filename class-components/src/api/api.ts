export interface BookInfo {
  author_name: string[];
  cover_edition_key: string;
  edition_key: string[];
  first_publish_year: number;
  first_sentence: string[];
  title: string;
}

interface BooksResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: BookInfo[];
  q: string;
  offset: boolean;
}

async function fetchData(
  searchText: string,
  perPage: number,
  pageNum: string | null,
): Promise<BooksResponse> {
  if (!searchText) searchText = "publish_year%2024";
  if (!pageNum) pageNum = "1";
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${searchText}&page=${pageNum}&limit=${perPage}&fields=title,author_name,cover_edition_key,edition_key,first_publish_year,first_sentence`,
  );
  const data = await response.json();
  return data;
}

export { fetchData };
export type { BooksResponse };
