import { useEffect, useState } from "react";
import { fetchData, BooksResponse } from "../../api/api";
import "./Gallery.scss";

interface Props {
  searchText: string;
  perPage: number;
}

const Gallery = (props: Props) => {
  const [data, setData] = useState<BooksResponse | null>(null);

  useEffect(() => {
    setData(null);
    const fetchDataAsync = async () => {
      const result = await fetchData(props.searchText, props.perPage);
      setData(result);
    };

    fetchDataAsync();
  }, [props.searchText, props.perPage]);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  if (!data.numFound) {
    return <div className="loading">Nothing found</div>;
  }

  const books = data.docs;

  return (
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
  );
}

export default Gallery;
