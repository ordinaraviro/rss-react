import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import CountryAutocomplete from "../CountryAutocomplete/CountryAutocomplete";
import { addUncontrolledFormData } from "../../redux/formSlice";
import schema from "../../utils/validateSchema";
import "./UncontrolledForm.scss";

export const UncontrolledForm: React.FC = () => {
  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const inputRepeatPassword = useRef<HTMLInputElement>(null);
  const inputGender = useRef<HTMLInputElement>(null);
  const inputTerm = useRef<HTMLInputElement>(null);
  const inputImg = useRef<HTMLInputElement>(null);
  const inputCountry = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatErrors = (error: ValidationError) => {
    return error.inner.reduce((acc, err) => {
      if (err.path) {
        acc[err.path] = err.message;
      }
      return acc;
    }, {} as Record<string, string>);
  };

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
  
    const files = inputImg.current?.files;
    const file = inputImg.current?.files?.[0];
    const formData = {
      name: inputName.current?.value || "",
      age: inputAge.current?.value || "",
      email: inputEmail.current?.value || "",
      password: inputPassword.current?.value || "",
      repeatPassword: inputRepeatPassword.current?.value || "",
      gender: inputGender.current?.value || "",
      terms: !!inputTerm.current?.checked,
      picture: files || "",
      country: inputCountry.current?.value || "",
    };
  
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log("Form is valid with raw file:", formData);
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const updatedFormData = { ...formData, picture: base64String };
  
          dispatch(addUncontrolledFormData(updatedFormData));
          navigate("/?new=uncontrol");
        };
        reader.readAsDataURL(file);
      } else {
        const updatedFormData = { ...formData, picture: '' };
        dispatch(addUncontrolledFormData(updatedFormData));
        navigate("/?new=uncontrol");
      }
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        setErrors(formatErrors(error));
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }, [dispatch, navigate]);
  
  const autoCompleteForm = () => {
    if (inputName.current) inputName.current.value = "Ivan";
    if (inputAge.current) inputAge.current.value = "22";
    if (inputEmail.current) inputEmail.current.value = "mail@mail.com";
    if (inputPassword.current) inputPassword.current.value = "Qwerty1!";
    if (inputRepeatPassword.current) inputRepeatPassword.current.value = "Qwerty1!";
    if (inputGender.current) inputGender.current.value = "male";
    if (inputCountry.current) inputCountry.current.value = "Us";
  };

  return (
    <div>
      <button
        onClick={autoCompleteForm}>auto complete form</button>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name :
          <input type="text" ref={inputName} />
          {errors.name && <div className="error">{errors.name}</div>}
        </label>
        <label>
          Age :
          <input type="number" ref={inputAge} />
          {errors.age && <div className="error">{errors.age}</div>}
        </label>
        <label>
          Email :
          <input type="email" ref={inputEmail} />
          {errors.email && <div className="error">{errors.email}</div>}
        </label>
        <label>
          Password :
          <input type="password" ref={inputPassword} />
          {errors.password && <div className="error">{errors.password}</div>}
        </label>
        <label>
          Repeat Password :
          <input type="password" ref={inputRepeatPassword} />
          {errors.repeatPassword && (
            <div className="error">{errors.repeatPassword}</div>
          )}
        </label>
        <label className="input-gender">
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
          <input
            type="radio"
            ref={inputGender}
            name="gender"
            value="other"
          />{" "}
          Other
          {errors.gender && <div className="error">{errors.gender}</div>}
        </label>
        <label>
          accept Terms and Conditions agreement :
          <input type="checkbox" ref={inputTerm} />
          {errors.terms && <div className="error">{errors.terms}</div>}
        </label>
        <label>
          File :
          <input type="file" ref={inputImg} placeholder="Choose image" />
          {errors.picture && <div className="error">{errors.picture}</div>}
        </label>
        <CountryAutocomplete func={inputCountry} />
        {errors.country && <div className="error">{errors.country}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
