import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Main from "./Pages/Main/Main";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Pages/Page404/Page404";

function App() {
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
        />
        <Route
          path={"/search"}
          element={
            <ErrorBoundary>
              <Main />
            </ErrorBoundary>
          }
        />
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

export default App;
