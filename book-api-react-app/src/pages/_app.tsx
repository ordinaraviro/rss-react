import "../index.scss";
import { wrapper } from "../redux/store";
import { ThemeProvider } from "../components/ThemeContext/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
        <ThemeProvider>
         <Head>
      <title>Books Api App</title>
      </Head>
                  <Component {...props.pageProps} />
        </ThemeProvider>

    </Provider>
  );
};

export default MyApp;
