import "../index.scss";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider } from "../components/ThemeContext/ThemeProvider";
import type { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
            <Head>
        <title>Books Api App</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function AppWrapper(props: AppProps) {
  return (
    <Provider store={store()}>
      <App {...props} />
    </Provider>
  );
}
