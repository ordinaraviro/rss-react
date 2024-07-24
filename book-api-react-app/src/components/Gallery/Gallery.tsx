import { BookInfo } from "../../api/api";
import "./Gallery.scss";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import PaginationBar from "../PaginationBar/PaginationBar";
import Card from "./Card";
import { Loader } from "../Loader/Loader";
import { booksApi } from "../../services/books";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../Button/Button";

export default function Gallery() {
  const selectedItems = useSelector((state:RootState)=> state.selectedItems.items);
  const searchTerm = useSelector(
    (state: RootState) => state.searchTerm.searchTerm,
  );

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const { data, error, isFetching } =
    booksApi.endpoints.getBooksBySearchText.useQuery<BookInfo | any>({
      searchText: searchTerm,
      page,
    });

  if (error) {
    return <div>There are some error: {error.message}</div>;
  }

  if (isFetching) {
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
      <Button handleClick={()=>console.log({selectedItems})}>console items</Button>
    </>
  );
}
