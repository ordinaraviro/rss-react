import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});

export function setupStore(
  preloadedState?: Partial<RootState>
): Store<RootState> {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
