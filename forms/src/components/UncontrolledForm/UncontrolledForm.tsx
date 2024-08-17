import { FormEvent, useRef } from "react";
import CountryAutocomplete from "../CountryAutocomplete/CountryAutocomplete";
import "./UncontrolledForm.scss";
import { useDispatch } from "react-redux";
import { addUncontrolledFormData } from "../../redux/formSlice";

function UncontrolledForm() {
  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputRepeatPassword = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputTerm = useRef<HTMLInputElement>(null);
  const inputImg = useRef<HTMLInputElement>(null);
  const inputCountry = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    alert(
      `Name: ${inputName.current?.value} Age: ${inputAge.current?.value} Email: ${inputEmail.current?.value} Password: ${inputPassword.current?.value} Gender: ${inputGender.current?.value}`,
    );

    const reader = new FileReader();
    const file = inputImg.current?.files?.[0];
    reader.onloadend = () => {
      const base64String = reader.result as string;

      dispatch(
        addUncontrolledFormData({
          name: inputName.current?.value || "",
          age: inputAge.current?.value || "",
          email: inputEmail.current?.value || "",
          password: inputPassword.current?.value || "",
          gender: inputGender.current?.value || "",
          terms: !!inputTerm.current?.checked,
          picture: base64String || "",
          country: inputCountry.current?.value || "",
        }),
      );
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      // Handle case where no file is selected
      dispatch(
        addUncontrolledFormData({
          name: inputName.current?.value || "",
          age: inputAge.current?.value || "",
          email: inputEmail.current?.value || "",
          password: inputPassword.current?.value || "",
          gender: inputGender.current?.value || "",
          terms: !!inputTerm.current?.checked,
          picture: "",
          country: inputCountry.current?.value || "",
        }),
      );
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name :
          <input type="text" ref={inputName} />
        </label>
        <label>
          Age :
          <input type="number" ref={inputAge} />
        </label>
        <label>
          Email :
          <input type="email" ref={inputEmail} />
        </label>
        <label>
          Password :
          <input type="password" ref={inputPassword} />
        </label>
        <label>
          Repeat Password :
          <input type="password" ref={inputRepeatPassword} />
        </label>
        <label>
          Gender:
          <input
            type="radio"
            ref={inputGender}
            name="gender"
            value="male"
          />{" "}
          Male
          <input
            type="radio"
            ref={inputGender}
            name="gender"
            value="female"
          />{" "}
          Female
        </label>
        <label>
          Terms :
          <input type="checkbox" ref={inputTerm} />
        </label>
        <label>
          File :
          <input type="file" ref={inputImg} placeholder="Choose image" />
        </label>
        <CountryAutocomplete func={inputCountry} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
