import { NavLink } from "react-router-dom";
import './NavBar.scss'

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/">Main</NavLink>
      <NavLink to="/uncontrolled-form">Uncontrolled Form</NavLink>
      <NavLink to="/controlled-form">Controlled Form</NavLink>
    </nav>
  );
};

export default NavBar;