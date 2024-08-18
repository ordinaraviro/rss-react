import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function Router() {
  return (
    <Routes>
      {routes.map((item) => (
        <Route key={item.name} path={item.path} element={item.element}></Route>
      ))}
    </Routes>
  );
}

export default Router;
