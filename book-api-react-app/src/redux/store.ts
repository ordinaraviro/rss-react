import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../services/books";
import { setupListeners } from "@reduxjs/toolkit/query";
import selectedItemsReducer from "./selectedItemsSlice";
import searchTermReducer from "./searchTermSlice";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    selectedItems: selectedItemsReducer,
    searchTerm: searchTermReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
