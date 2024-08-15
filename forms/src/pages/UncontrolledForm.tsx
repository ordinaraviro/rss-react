import { Link } from "react-router-dom";

const UncontrolledForm = () => {

  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <Link to="/">Main</Link>
      <Link to="/controlled-form">Controlled Form</Link>
    </div>
  );
};

export default UncontrolledForm;
