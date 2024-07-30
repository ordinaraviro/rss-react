import "./App.scss";
// import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
// import Main from "./pages/main";
// import { Routes, Route } from "react-router-dom";
// import Page404 from "./pages/Page404/Page404";
// import CardDetails from "./components/Gallery/CardDetails/CardDetails";
// import { ThemeProvider } from "./components/ThemeContext/ThemeProvider";
// import image from '../public/vite.svg'

export default function App() {
  return (
    <>
    {/* <img src={image}></img> */}
      {/* <ThemeProvider>
        <Routes>
          <Route
            path={"/"}
            element={
              <ErrorBoundary>
                <Main />
              </ErrorBoundary>
            }
          >
            <Route path="details" element={<CardDetails />} />
          </Route>
          <Route
            path="*"
            element={
              <ErrorBoundary>
                <Page404 />
              </ErrorBoundary>
            }
          />
        </Routes>
      </ThemeProvider> */}
      Hello World
    </>
  );
}
