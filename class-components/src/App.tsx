import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </>
  );
}

export default App;
