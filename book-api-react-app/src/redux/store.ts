import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./books";
import selectedItemsReducer from "./selectedItemsSlice";
import searchTermReducer from "./searchTermSlice";

const rootReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer,
  selectedItems: selectedItemsReducer,
  searchTerm: searchTermReducer,
});

export function store(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(booksApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
