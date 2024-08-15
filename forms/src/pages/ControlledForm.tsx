import { Link } from "react-router-dom";

const ControlledForm = () => {

  return (
    <div>
      <h1>Controlled Form</h1>
      <Link to="/">Main</Link>
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
    </div>
  );
};

export default ControlledForm;
