import { Link } from "react-router-dom";

const Main = () => {

  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
      <Link to="/controlled-form">Controlled Form</Link>
    </div>
  );
};

export default Main;
