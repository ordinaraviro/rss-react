// 'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchTermState {
  searchTerm: string;
}

const initialState: SearchTermState = {
  // searchTerm: localStorage.getItem("searchTerm") || "",
  searchTerm: "",
};

const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
