import "./App.css";
import ErorrBoundary from "./components/ErrorBoundary/EroorBoundary";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <>
      <ErorrBoundary>
         <Main />
      </ErorrBoundary>

    </>
  );
}

export default App;
