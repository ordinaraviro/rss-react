import { FormData } from "../../redux/formSlice";
import "./FormDataTile.scss";

interface FormDataTileProps {
  data: FormData;
  highlightFlag?: boolean;
}

export const FormDataTile: React.FC<FormDataTileProps> = ({
  data,
  highlightFlag,
}) => {
  return (
    <div
      className={highlightFlag ? "form-data-tile highlight" : "form-data-tile"}
    >
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
          <div>Terms: {data.terms ? "accepted" : "not accepted"}</div>
          <div>Country: {data.country}</div>
        </div>
      </div>
    </div>
  );
};
