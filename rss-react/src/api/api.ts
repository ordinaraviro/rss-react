interface BookInfo {
    author_key: string[];
    author_name: string[];
    cover_edition_key: string;
    edition_key: string[];
    ebook_access: string;
    first_publish_year: number;
    first_sentence: string[];
    lending_edition_s: string;
    publish_date: string[];
    publisher: string[];
    seed: string[];
    title: string;
    title_suggest: string;
    title_sort: string;
    type: string;
    subject: string[];
    time: string[];
    ratings_average: number;
  }
  
  interface BooksResponse {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: BookInfo[];
    q: string;
    offset: boolean;
  }
  
  async function fetchData(searchText: string, perPage: number): Promise<BooksResponse> {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${searchText}harry%20potter&fields=*,availability&limit=${perPage}`
    );
    const data = await response.json();
    return data;
  }
  
export { fetchData };
export type { BooksResponse };
