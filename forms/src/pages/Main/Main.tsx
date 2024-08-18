import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { RootState } from "../../redux/store";
import FormDataTile from "../../components/FormDataTile/FormDataTile";
import "./Main.scss";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  const data = useSelector((state: RootState) => state.form);
  const [searchParams] = useSearchParams();
  const isHighlight = searchParams.get("new") === "uncontrol";

  return (
    <div>
      <NavBar />
      <div className="data-container">
        <div className="uncontrolled-data">
          Data from uncontrolled form
          {data.uncontrolledFormData
            .slice()
            .reverse()
            .map((e, i) => {
              return (
                <FormDataTile
                  data={e}
                  key={i}
                  highlightFlag={isHighlight && i == 0 ? true : false}
                />
              );
            })}
        </div>
        <div className="uncontrolled-data">
          Data from controlled form
          {data.controlledFormData
            .slice()
            .reverse()
            .map((e, i) => {
              return (
                <FormDataTile
                  data={e}
                  key={i}
                  highlightFlag={
                    searchParams.get("new") === "control" && i == 0
                      ? true
                      : false
                  }
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Main;
