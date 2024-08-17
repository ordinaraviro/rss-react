import { FormData } from "../../redux/formSlice";
import "./FormDataTile.scss";

function FormDataTile({ data }: { data: FormData }) {
  return (
    <div className="form-data-tile">
      <div className="form-data-container">
        <div>
          {data.picture && (
            <img className="data-img" src={data.picture} alt="Uploaded" />
          )}
        </div>
        <div className="data-info">
          <div>Name: {data.name}</div>
          <div>Age: {data.age}</div>
          <div>E-mail: {data.email}</div>
          <div>Password: {data.password}</div>
          <div>Gender: {data.gender}</div>
          <div>Terms: {data.terms}</div>

          <div>Country: {data.country}</div>
        </div>
      </div>
    </div>
  );
}

export default FormDataTile;
