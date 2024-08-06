import { BookInfo } from "../../redux/books";
import PaginationBar from "../PaginationBar/PaginationBar";
import Card from "./Card/Card";
import { Loader } from "../Loader/Loader";
import { booksApi } from "../../redux/books";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SelectedItemsFlyout from "./SelectedItemsFlyout/SelectedItemsFlyout";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface GalleryProps {
  children: ReactNode;
}

export default function Gallery({ children }: GalleryProps) {
  const searchTerm = useSelector(
    (state: RootState) => state.searchTerm.searchTerm,
  );

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const { data, error, isFetching } = booksApi.useGetBooksBySearchTextQuery({
    searchText: searchTerm,
    page,
  });


  if (error) {
    return <div>There are some error</div>;
  }

  if (isFetching) {
    return <Loader />;
  }

  if (!data || !data.numFound) {
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

  const newPath = pathName.replace("details", "");

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
            href={`${newPath}?page=${searchParams.get("page")}`}
            onClick={handleClick}
          ></Link>
          {books.map(createCard)}
        </div>
        {children}
      </div>
      <SelectedItemsFlyout />
    </>
  );
}
