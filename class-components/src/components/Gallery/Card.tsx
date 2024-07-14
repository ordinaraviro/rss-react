import { Link } from "react-router-dom";
import { BookInfo } from "../../api/api";

interface Props {
  book: BookInfo;
  link: string;
}

export default function Card(props: Props) {
  return (
    <>
      <Link className="card" to={props.link}>
        {props.book.cover_edition_key ? (
          <img
            src={`https://covers.openlibrary.org/b/olid/${props.book.cover_edition_key}-M.jpg`}
            alt={props.book.title}
          />
        ) : (
          <div className="no-img-title">{props.book.title}</div>
        )}

        <div className="card-body">
          <h5 className="card-title">{props.book.title}</h5>
          <p className="card-text">
            <small className="text-muted">
              {props.book.author_name ? props.book.author_name[0] : "Unknown"}
            </small>
          </p>
        </div>
      </Link>
    </>
  );
}
