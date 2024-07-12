import { useEffect, useState } from "react";
import { fetchData, BooksResponse } from "../../api/api";
import "./Gallery.scss";
import { useSearchParams } from "react-router-dom";

export default function CardDetails() {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(
    localStorage.getItem("searchTerm") || "",
  );

  useEffect(() => {
    setData(null);
    const fetchDataAsync = async () => {
      const result = await fetchData(searchTerm, 10, searchParams.get("page"));
      setData(result);
    };

    fetchDataAsync();
  }, [searchTerm, searchParams]);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  if (!data.numFound) {
    return <div className="loading">Nothing found</div>;
  }

  const book = data.docs[0];

  return (
    <>
      <div className="card">
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
    </>
  );
}
