import { useForm } from "react-hook-form";
import "./ControlledForm.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../utils/validateSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addControlledFormData } from "../../redux/formSlice";
import CountryAutocomplete from "../CountryAutocomplete/CountryAutocomplete";
import { useState } from "react";

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
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    const reader = new FileReader();
    const file = data.picture[0];

    reader.onloadend = async () => {
      const base64String = reader.result as string;

      dispatch(
        addControlledFormData({
          name: data.name || "",
          age: data.age.toString() || "",
          email: data.email || "",
          password: data.password || "",
          repeatPassword: data.repeatPassword || "",
          gender: data.gender || "",
          terms: data.terms,
          picture: base64String || "",
          country: country || "",
        }),
      );
      navigate("/?new=control");
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      // Handle case where no file is selected
      dispatch(
        addControlledFormData({
          name: data.name || "",
          age: data.age.toString() || "",
          email: data.email || "",
          password: data.password || "",
          repeatPassword: data.repeatPassword || "",
          gender: data.gender || "",
          terms: data.terms,
          picture: "",
          country: country || "",
        }),
      );
      navigate("/?new=control");
    }
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
      <input {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Repeat password</label>
      <input {...register("repeatPassword")} />
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
          setValue("country", value);
        }}
      />
      {errors.country && <p>{errors.country.message}</p>}

      <input type="submit" value={"Submit"} />
    </form>
  );
};
