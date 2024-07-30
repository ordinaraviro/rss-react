import { useSearchParams } from "react-router-dom";
import Button from "../Button/Button";

export default function PaginationBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (direction: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentPage = +(searchParams.get("page") || "1");

    const newPage = direction === "Next" ? currentPage + 1 : currentPage - 1;

    newSearchParams.set("page", Math.max(newPage, 1).toString());
    setSearchParams(newSearchParams);
  };

  return (
    <div className="pagination-bar">
      <Button handleClick={() => updateSearchParams("Previous")}>
        &larr; Previous page
      </Button>
      <Button handleClick={() => updateSearchParams("Next")}>
        Next page &rarr;
      </Button>
    </div>
  );
}
