import { useEffect, useState } from "react";
import { fetchData, BooksResponse } from "../../api/api";
import "./Gallery.scss";
import { useSearchParams } from "react-router-dom";
import PaginationBar from "../PaginationBar/PaginationBar";

interface Props {
  searchText: string;
  perPage: number;
}

export default function Gallery(props: Props) {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setData(null);
    const fetchDataAsync = async () => {
      const result = await fetchData(
        props.searchText,
        props.perPage,
        searchParams.get("page"),
      );
      setData(result);
    };

    fetchDataAsync();
  }, [props.searchText, props.perPage, searchParams]);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  if (!data.numFound) {
    return <div className="loading">Nothing found</div>;
  }

  const books = data.docs;

  return (
    <>
      <PaginationBar />
      <div className="gallery">
        {books.map((book, index) => (
          <div className="card" key={index}>
            {book.cover_edition_key ? (
              <img
                src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-img-title">{book.title}</div>
            )}

            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">
                <small className="text-muted">
                  {book.author_name ? book.author_name[0] : "Unknown"}
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
