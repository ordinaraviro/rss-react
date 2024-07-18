import PaginationButton from "./PaginationButton";
import "./PaginationBar.scss";

export default function PaginationBar() {
  return (
    <div className="pagination-bar">
      <PaginationButton btnText="Previous page" direction="Previous" />
      <PaginationButton btnText="Next page" direction="Next" />
    </div>
  );
}
