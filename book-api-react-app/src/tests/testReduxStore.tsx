import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { AppStore, RootState, makeStore } from "../redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  testStore?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const { testStore = makeStore(), ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={testStore}>{children}</Provider>
  );

  return {
    makeStore,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
