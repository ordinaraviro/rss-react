import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { booksApi } from "./books";
import selectedItemsReducer from "./selectedItemsSlice";
import searchTermReducer from "./searchTermSlice";
import { RootState } from "./store";

const combinedReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer,
  selectedItems: selectedItemsReducer,
  searchTerm: searchTermReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction): RootState => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
