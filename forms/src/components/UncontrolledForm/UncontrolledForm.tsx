import { useRef } from "react";
import CountryAutocomplete from "../CountryAutocomplete/CountryAutocomplete";

function UncontrolledForm() {
  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputRepeatPassword = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputTerm = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    alert(
      `Name: ${inputName.current?.value} Age: ${inputAge.current?.value} Email: ${inputEmail.current?.value} Password: ${inputPassword.current?.value} Gender: ${inputGender.current?.value}`,
    );
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
        <CountryAutocomplete />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
