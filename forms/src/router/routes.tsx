import { Link } from "react-router-dom";
import Main from "../pages/Main";
import UncontrolledForm from "../pages/UncontrolledForm";
import ControlledForm from "../pages/ControlledForm";

export const routes = [
    {
      name: 'Main',
      path: '/',
      element: <Main/>,
    },
    {
      name: 'Uncontrolled Form',
      path: '/uncontrolled-form',
      element: <UncontrolledForm/>,
    },
    {
      name: 'Controlled Form',
      path: '/controlled-form',
      element: <ControlledForm/>,
    },
    {
      name: '404',
      path: '/*',
      element: <>404 not found<Link to={"/"}>main</Link></>,
    },
  ];