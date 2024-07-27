import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { AppStore, RootState, store } from "../redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  testStore?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    testStore = store(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={testStore}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    testStore,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
