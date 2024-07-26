import { useDispatch, useSelector } from "react-redux";
import { BookInfo } from "../../api/books";
import LinkButton from "../LinkButton/LinkButton";
import { addItem, removeItem } from "../../redux/selectedItemsSlice";
import { RootState } from "../../redux/store";

interface Props {
  book: BookInfo;
  link: string;
}

export default function Card(props: Props) {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const handleCheckboxChange = (item: BookInfo, isChecked: boolean) => {
    if (isChecked) {
      dispatch(addItem(item));
    } else {
      dispatch(removeItem(item.key));
    }
  };

  return (
    <>
      <div className='card'>
        <LinkButton path={props.link}>Details</LinkButton>
        {props.book.cover_edition_key ? (
          <img
            src={`https://covers.openlibrary.org/b/olid/${props.book.cover_edition_key}-M.jpg`}
            alt={props.book.title}
          />
        ) : (
          <div className="no-img-title">{props.book.title}</div>
        )}

        <div className="card-body">
          <h5 className="card-title">{props.book.title}</h5>
          <p className="card-text">
            <small className="text-muted">
              {props.book.author_name ? props.book.author_name[0] : "Unknown"}
            </small>
          </p>
        </div>
        <label>
          <input
            type="checkbox"
            checked={selectedItems.some(
              (selectedItem) => selectedItem.key === props.book.key,
            )}
            onChange={(e) => handleCheckboxChange(props.book, e.target.checked)}
          />{" "}
          Add book
        </label>
      </div>
    </>
  );
}
