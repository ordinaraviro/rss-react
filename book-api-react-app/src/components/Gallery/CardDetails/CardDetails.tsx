import { useState } from "react";
import { BooksResponse } from "../../../redux/books";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CardDetails({ data }: { data: BooksResponse }) {
  const location = usePathname();
  const searchParams = useSearchParams();

  const [showFlag, setShowFlag] = useState(true);

  function handleClose() {
    setShowFlag(false);
  }

  const book = data.docs[parseInt(searchParams.get("bookId")!)];
  const newPath = location.replace("details", "");

  if (!showFlag) return "";

  return (
    <>
      <div className="card-detail">
        <Link
          className="card-details-close-btn"
          href={`${newPath}?page=${searchParams.get("page")}&q=${searchParams.get("q")}`}
          onClick={handleClose}
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
