import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addControlledFormData } from "../../redux/formSlice";
import CountryAutocomplete from "../CountryAutocomplete/CountryAutocomplete";
import schema from "../../utils/validateSchema";
import "./ControlledForm.scss";

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  terms: boolean;
  picture: FileList;
  country: string;
}

export const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: "onChange" });

  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileUpload = (file: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: IFormInput) => {
    const base64String = await handleFileUpload(data.picture[0]);
    const formData = {
      ...data,
      age: data.age.toString(),
      picture: base64String || "",
      country: country || "",
    };

    dispatch(addControlledFormData(formData));
    navigate("/?new=control");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <label>Age</label>
      <input type="number" {...register("age")} />
      {errors.age && <p>{errors.age.message}</p>}

      <label>E-mail</label>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Password</label>
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Repeat password</label>
      <input type="password" {...register("repeatPassword")} />
      {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

      <label>Gender</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <label>accept Terms and Conditions agreement</label>
      <input type="checkbox" {...register("terms")} />
      {errors.terms && <p>{errors.terms.message}</p>}

      <label>Picture</label>
      <input type="file" {...register("picture")} />
      {errors.picture && <p>{errors.picture.message}</p>}

      <CountryAutocomplete
        value={country}
        onChange={(value) => {
          setCountry(value);
          setValue("country", value, { shouldValidate: true });
        }}
      />
      {errors.country && <p>{errors.country.message}</p>}

      <input type="submit" value={"Submit"} disabled={!isValid} />
    </form>
  );
};
