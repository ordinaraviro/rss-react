import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "./selectedItemsSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
