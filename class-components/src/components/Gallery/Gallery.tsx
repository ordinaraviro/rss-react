import { useEffect, useState } from "react";
import { fetchData, BooksResponse, BookInfo } from "../../api/api";
import "./Gallery.scss";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import PaginationBar from "../PaginationBar/PaginationBar";
import Card from "./Card";

interface Props {
  searchText: string;
  perPage: number;
}

export default function Gallery(props: Props) {
  const [data, setData] = useState<BooksResponse | null>(null);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    setData(null);
    const fetchDataAsync = async () => {
      const result = await fetchData(
        props.searchText,
        props.perPage,
        page,
      );
      setData(result);
    };

    fetchDataAsync();
  }, [props.searchText, props.perPage, page]);

  if (!data) {
    return <div className="loading">Loading...</div>;
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
        link={`/details?page=${searchParams.get("page")}&bookId=${index}`}
        key={index}
        book={book}
      />
    );
  }

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
            to="/"
            onClick={handleClick}
          ></Link>
          {books.map(createCard)}
        </div>
        <Outlet />
      </div>
    </>
  );
}
