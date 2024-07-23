import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../services/books";
import { setupListeners } from "@reduxjs/toolkit/query";
import selectedItemsReducer from "./selectedItemsSlice";
import currentPageReducer from './currentPageSlice';

export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        selectedItems: selectedItemsReducer,
        currentPage: currentPageReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(booksApi.middleware),
})

setupListeners(store.dispatch)