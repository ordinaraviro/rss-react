import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearItems } from "../../redux/selectedItemsSlice";
import Button from "../Button/Button";

export default function SelectedItemsFlyout() {
    const dispatch = useDispatch();
  const selectedItems = useSelector((state:RootState)=> state.selectedItems.items);

  const handleUnselectAll = () => {
      dispatch(clearItems());
  };
  
  if(!selectedItems.length) {
    return (<></>)
  }
  return (
    <div>
        <div>{`${selectedItems.length} items are selected`}</div>
        <Button handleClick={handleUnselectAll}>Unselect all</Button>
        <Button handleClick={()=> console.log('dowload func')}>Download</Button>
    </div>
  );
}
