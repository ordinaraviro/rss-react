import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookInfo } from "../api/api";

export interface SelectedItemsState {
  items: BookInfo[]; // or any other type based on your selected items
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BookInfo>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
