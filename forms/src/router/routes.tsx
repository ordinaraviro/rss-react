import { Link } from "react-router-dom";

export const routes = [
    {
      name: 'Home',
      path: '/',
      element: <>home<Link to={"/Form"}>form</Link><Link to={"/ReactHookForm"}>React Hook Form</Link></>,
    },
    {
      name: 'Form',
      path: '/Form',
      element: <>form<Link to={"/"}>main</Link></>,
    },
    {
      name: 'React Hook Form',
      path: '/ReactHookForm',
      element: <>React Hook Form<Link to={"/"}>main</Link></>,
    },
    {
      name: '404',
      path: '/*',
      element: <>404 not found<Link to={"/"}>main</Link></>,
    },
  ];