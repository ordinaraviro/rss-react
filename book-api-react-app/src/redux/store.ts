import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { booksApi } from "./books";
import selectedItemsReducer from "./selectedItemsSlice";
import searchTermReducer from "./searchTermSlice";
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer,
  selectedItems: selectedItemsReducer,
  searchTerm: searchTermReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(booksApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
