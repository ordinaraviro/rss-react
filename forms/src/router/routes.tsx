import { Link } from "react-router-dom";
import Main from "../pages/Main/Main";
import ControlledFormPage from "../pages/ControlledFormPage/ControlledFormPage";
import UncontrolledFormPage from "../pages/UncontrolledFormPage/UncontrolledFormPage";

export const routes = [
  {
    name: "Main",
    path: "/",
    element: <Main />,
  },
  {
    name: "Uncontrolled Form",
    path: "/uncontrolled-form",
    element: <UncontrolledFormPage />,
  },
  {
    name: "Controlled Form",
    path: "/controlled-form",
    element: <ControlledFormPage />,
  },
  {
    name: "404",
    path: "/*",
    element: (
      <>
        404 not found<Link to={"/"}>main</Link>
      </>
    ),
  },
];
