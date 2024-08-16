import { Link } from "react-router-dom";
import UncontrolledForm from "../components/UncontrolledForm/UncontrolledForm";

const UncontrolledFormPage = () => {
  return (
    <div>
      <h1>Uncontrolled Form</h1>
      <UncontrolledForm />
      <Link to="/">Main</Link>
      <Link to="/controlled-form">Controlled Form</Link>
    </div>
  );
};

export default UncontrolledFormPage;
