import { FormEvent, useRef, useState } from "react";
import CountryAutocomplete from "../CountryAutocomplete/CountryAutocomplete";
import "./UncontrolledForm.scss";
import { useDispatch } from "react-redux";
import { addUncontrolledFormData } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import schema from "../../utils/validateSchema";
import { ValidationError } from "yup";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const reader = new FileReader();
    const file = inputImg.current?.files?.[0];

    reader.onloadend = async () => {
      const base64String = reader.result as string;

      const formData = {
        name: inputName.current?.value || "",
        age: inputAge.current?.value || "",
        email: inputEmail.current?.value || "",
        password: inputPassword.current?.value || "",
        repeatPassword: inputRepeatPassword.current?.value || "",
        gender: inputGender.current?.value || "",
        terms: !!inputTerm.current?.checked,
        picture: base64String || "",
        country: inputCountry.current?.value || "",
      };

      try {
        await schema.validate(formData, { abortEarly: false });
        setErrors({}); // Clear errors if validation passes
        // Proceed with form submission logic
        console.log("Form is valid:", formData);
        dispatch(addUncontrolledFormData(formData));
        navigate("/?new=uncontrol");
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          const formattedErrors = error.inner.reduce(
            (acc, err) => {
              if (err.path) {
                acc[err.path] = err.message;
              }
              return acc;
            },
            {} as Record<string, string>,
          );
          setErrors(formattedErrors);
        } else {
          console.error("Unexpected error:", error);
        }
      }

      // dispatch(
      //   addUncontrolledFormData({
      //     name: inputName.current?.value || "",
      //     age: inputAge.current?.value || "",
      //     email: inputEmail.current?.value || "",
      //     password: inputPassword.current?.value || "",
      //     repeatPassword: inputRepeatPassword.current?.value || "",
      //     gender: inputGender.current?.value || "",
      //     terms: !!inputTerm.current?.checked,
      //     picture: base64String || "",
      //     country: inputCountry.current?.value || "",
      //   }),
      // );
      // navigate("/");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      const formData = {
        name: inputName.current?.value || "",
        age: inputAge.current?.value || "",
        email: inputEmail.current?.value || "",
        password: inputPassword.current?.value || "",
        repeatPassword: inputRepeatPassword.current?.value || "",
        gender: inputGender.current?.value || "",
        terms: !!inputTerm.current?.checked,
        picture: "",
        country: inputCountry.current?.value || "",
      };

      try {
        await schema.validate(formData, { abortEarly: false });
        setErrors({}); // Clear errors if validation passes
        // Proceed with form submission logic
        console.log("Form is valid:", formData);
        dispatch(addUncontrolledFormData(formData));
        navigate("/?new=uncontrol");
      } catch (error: unknown) {
        if (error instanceof ValidationError) {
          const formattedErrors = error.inner.reduce(
            (acc, err) => {
              if (err.path) {
                acc[err.path] = err.message;
              }
              return acc;
            },
            {} as Record<string, string>,
          );
          setErrors(formattedErrors);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          inputName.current!.value = "Ivan";
          inputAge.current!.value = "22";
          inputEmail.current!.value = "mail@mail.com";
          inputPassword.current!.value = "123456";
          inputRepeatPassword.current!.value = "123456";
          inputGender.current!.value = "male";
          inputCountry.current!.value = "Us";
        }}
      >
        auto complete form
      </button>
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
          {errors.gender && <div className="error">{errors.gender}</div>}
        </label>
        <label>
          Terms :
          <input type="checkbox" ref={inputTerm} />
          {errors.terms && <div className="error">{errors.terms}</div>}
        </label>
        <label>
          File :
          <input type="file" ref={inputImg} placeholder="Choose image" />
          {errors.img && <div className="error">{errors.img}</div>}
        </label>
        <CountryAutocomplete func={inputCountry} />
        {errors.country && <div className="error">{errors.country}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
