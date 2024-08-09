import { BookInfo, BooksResponse } from "../../redux/books";
import PaginationBar from "../PaginationBar/PaginationBar";
import Card from "./Card/Card";
import { Loader } from "../Loader/Loader";
import SelectedItemsFlyout from "./SelectedItemsFlyout/SelectedItemsFlyout";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

interface GalleryProps {
  data: BooksResponse;
  children: ReactNode;
  loading: boolean;
  setLoading: (arg: boolean) => void;
}

export default function Gallery({
  data,
  children,
  loading,
  setLoading,
}: GalleryProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? searchParams.get("page") : "1";
  const q = searchParams.get("q") ? searchParams.get("q") : "publish_year%2024";

  const [loadingDetails, setLoadingDetails] = useState(false);

  const detailsFlag = () => {
    setLoadingDetails(true);
  };

  const handleStart = () => {
    setLoading(true);
  };
  const handleComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (data) handleComplete();
    // if (data) setLoadingDetails(false);

    return () => {};
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!searchParams.get("bookId")) {
      e.preventDefault;
    }
  };

  function createCard(book: BookInfo, index: number) {
    return (
      <Card
        link={`/details?page=${page}&bookId=${index}&q=${q}`}
        key={index}
        book={book}
        onClick={detailsFlag}
      />
    );
  }

  const newPath = pathName.replace("details", "");

  return (
    <>
      <PaginationBar handleClick={handleStart} />
      <div className="callery-wrapper">
        <div className="gallery">
          <Link
            className={
              searchParams.get("bookId")
                ? "gallery-shut-details"
                : "gallery-shut-details gallery-shut-details_hide"
            }
            href={`${newPath}?page=${searchParams.get("page")}&q=${searchParams.get("q")}`}
            onClick={handleClick}
          ></Link>
          {data.docs.map(createCard)}
        </div>
        {loadingDetails && <Loader />}
        {children}
      </div>
      <SelectedItemsFlyout />
    </>
  );
}
