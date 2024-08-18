import Main from "../pages/Main/Main";
import ControlledFormPage from "../pages/ControlledFormPage/ControlledFormPage";
import UncontrolledFormPage from "../pages/UncontrolledFormPage/UncontrolledFormPage";
import NavBar from "../components/NavBar/NavBar";

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
        <NavBar />
        404 not found
      </>
    ),
  },
];
