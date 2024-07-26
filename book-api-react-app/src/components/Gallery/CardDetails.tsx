import { useState } from "react";
import { BookInfo } from "../../api/books";
import "./Gallery.scss";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { booksApi } from "../../api/books";

export default function CardDetails() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchTerm] = useState(localStorage.getItem("searchTerm") || "");

  const { data, error, isFetching } =
    booksApi.endpoints.getBooksBySearchText.useQuery<BookInfo | any>({
      searchText: searchTerm,
      page: searchParams.get("page"),
    });
  if (error) {
    return <>There are some error: {error.message}</>;
  }

  if (isFetching) {
    return <Loader />;
  }

  if (!data.numFound) {
    return <div className="loading">Nothing found</div>;
  }

  const book = data.docs[parseInt(searchParams.get("bookId")!)];
  const newPath = location.pathname.replace("details", "");

  return (
    <>
      <div className="card-detail">
        <Link
          className="card-details-close-btn"
          to={`${newPath}?page=${searchParams.get("page")}`}
        >
          Close details
        </Link>
        {book && book.cover_edition_key ? (
          <img
            src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
            alt={book.title}
          />
        ) : (
          <div className="no-img-title">
            {book && book.title ? book.title : "No title"}
          </div>
        )}

        <div className="card-body">
          <h5 className="card-title">Title: {book.title}</h5>
          <p className="card-details-text">
            <small className="text-muted">
              Author: {book.author_name ? book.author_name[0] : "Unknown"}
            </small>
            <small className="text-muted">
              Publish year:{" "}
              {book.first_publish_year ? book.first_publish_year : "Unknown"}
            </small>
            <small className="text-muted">
              First sentence:{" "}
              {book.first_sentence ? book.first_sentence : "No text info"}
            </small>
          </p>
        </div>
      </div>
    </>
  );
}
