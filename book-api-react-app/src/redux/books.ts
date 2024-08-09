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
