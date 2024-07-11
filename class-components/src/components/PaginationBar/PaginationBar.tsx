import PaginationButton from "../PaginationButton/PaginationButton";

export default function PaginationBar() {
  return (
    <div className="pagination-bar">
      <PaginationButton btnText="Previous page" direction="Previous" />
      <PaginationButton btnText="Next page" direction="Next" />
    </div>
  );
}
