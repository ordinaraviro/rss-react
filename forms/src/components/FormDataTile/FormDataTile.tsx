import { FormData } from '../../redux/formSlice';
import './FormDataTile.scss'

function FormDataTile({data}:{data:FormData}) {
  return (
    <div className="form-data-tile">
        <div>{data.name}</div>
        <div>{data.age}</div>
        <div>{data.email}</div>
        <div>{data.password}</div>
        <div>{data.gender}</div>
        <div>{data.terms}</div>
        <div>{data.picture}</div>
        <div>{data.country}</div>
    </div>
  );
}

export default FormDataTile;
