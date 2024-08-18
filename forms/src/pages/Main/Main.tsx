import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { RootState } from "../../redux/store";
import FormDataTile from "../../components/FormDataTile/FormDataTile";
import "./Main.scss";

const Main = () => {
  const data = useSelector((state: RootState) => state.form);
  return (
    <div>
      <NavBar />
      <div className="data-container">
        <div className="uncontrolled-data">
          Data form uncontrolled form
          {data.uncontrolledFormData.map((e, i) => {
            return <FormDataTile data={e} key={i} />;
          })}
        </div>
        <div className="uncontrolled-data">
          Data form controlled form
          {data.controlledFormData.map((e, i) => {
            return <FormDataTile data={e} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
