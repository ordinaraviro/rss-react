import { useEffect, useState } from "react";
import { fetchData, BooksResponse, BookInfo } from "../../api/api";
import "./Gallery.scss";
import { Outlet, useSearchParams } from "react-router-dom";
import PaginationBar from "../PaginationBar/PaginationBar";
import Card from "./Card";

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

  function createCard(book: BookInfo, index: number) {
    return <Card key={index} book={book} />;
  }

  return (
    <>
      <PaginationBar />
      <div className="callery-wrapper">
        <div className="gallery">{books.map(createCard)}</div>
        <Outlet />
      </div>
    </>
  );
}
