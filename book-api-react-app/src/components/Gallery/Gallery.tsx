import { BookInfo } from "../../api/api";
import "./Gallery.scss";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import PaginationBar from "../PaginationBar/PaginationBar";
import Card from "./Card";
import { Loader } from "../Loader/Loader";
import { booksApi } from "../../services/books";

interface Props {
  searchText: string;
  perPage: number;
}

export default function Gallery(props: Props) {

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const { data, error, isLoading } = booksApi.endpoints.getBooksBySearchText.useQuery<BookInfo | any>({searchText:props.searchText, page});

  if (error) {
    return <>There are some error: {error.status}</>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data.numFound) {
    return <div className="loading">Nothing found</div>;
  }

  const books = data.docs;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!searchParams.get("bookId")) {
      e.preventDefault;
    }
  };

  function createCard(book: BookInfo, index: number) {
    return (
      <Card
        link={`/details?page=${page}&bookId=${index}`}
        key={index}
        book={book}
      />
    );
  }

  const newPath = location.pathname.replace("details", "");

  return (
    <>
      <PaginationBar />
      <div className="callery-wrapper">
        <div className="gallery">
          <Link
            className={
              searchParams.get("bookId")
                ? "gallery-shut-details"
                : "gallery-shut-details gallery-shut-details_hide"
            }
            to={`${newPath}?page=${searchParams.get("page")}`}
            onClick={handleClick}
          ></Link>
          {books.map(createCard)}
        </div>
        <Outlet />
      </div>
    </>
  );
}
