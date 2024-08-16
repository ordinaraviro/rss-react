import { Link } from "react-router-dom";

const ControlledFormPage = () => {
  return (
    <div>
      <h1>Controlled Form</h1>
      <Link to="/">Main</Link>
      <Link to="/uncontrolled-form">Uncontrolled Form</Link>
    </div>
  );
};

export default ControlledFormPage;
