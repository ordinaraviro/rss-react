import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearItems } from "../../redux/selectedItemsSlice";
import Button from "../Button/Button";
import { BookInfo } from "../../api/books";

export default function SelectedItemsFlyout() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const convertToCSV = (items: BookInfo[]) => {
    if (items.length === 0) return "";

    // Extract headers from the keys of the first item
    const headers = Object.keys(items[0]);

    // Create the header row
    const headerRow = headers.join(",") + "\n";

    // Create data rows
    const dataRows = items
      .map((item) => {
        return headers
          .map((header) => {
            const value = item[header as keyof BookInfo];
            // Check if the value is an array, and join it with commas
            if (Array.isArray(value)) {
              return `"${value.join(",")}"`;
            }
            return value !== null && value !== undefined
              ? `"${value.toString()}"`
              : "";
          })
          .join(",");
      })
      .join("\n");

    return headerRow + dataRows;
  };

  const downloadCSV = (csv: string, itemCount: number) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `selected_books_${itemCount}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const csv = convertToCSV(selectedItems);
    downloadCSV(csv, selectedItems.length);
  };

  if (!selectedItems.length) {
    return <></>;
  }
  return (
    <div>
      <div>{`${selectedItems.length} items are selected`}</div>
      <Button handleClick={handleUnselectAll}>Unselect all</Button>
      <Button handleClick={handleDownload}>Download</Button>
    </div>
  );
}
