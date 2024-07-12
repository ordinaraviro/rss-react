import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Main from "./Pages/Main/Main";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Pages/Page404/Page404";
import CardDetails from "./components/Gallery/CardDeatails";

export default function App() {
  return (
    <>
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
    </>
  );
}
