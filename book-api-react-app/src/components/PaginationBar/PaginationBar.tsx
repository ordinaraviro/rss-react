import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../Button/Button";

export default function PaginationBar({
  handleClick,
}: {
  handleClick: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (direction: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentPage = +(searchParams.get("page") || "1");

    const newPage = direction === "Next" ? currentPage + 1 : currentPage - 1;

    newSearchParams.set("page", Math.max(newPage, 1).toString());
    return newSearchParams.toString();
  };

  return (
    <div className="pagination-bar">
      <Button
        handleClick={() => {
          handleClick();
          router.push(pathname + "?" + updateSearchParams("Previous"));
        }}
      >
        &larr; Previous page
      </Button>
      <Button
        handleClick={() => {
          router.push(pathname + "?" + updateSearchParams("Next"));
          handleClick();
        }}
      >
        Next page &rarr;
      </Button>
    </div>
  );
}
