import { useForm } from "react-hook-form";
import "./ControlledForm.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../utils/validateSchema";

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
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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

      <label>Terms</label>
      <input type="checkbox" {...register("terms")} />
      {errors.terms && <p>{errors.terms.message}</p>}

      <label>Picture</label>
      <input type="file" {...register("picture")} />
      {errors.picture && <p>{errors.picture.message}</p>}

      <label>Country</label>
      <input {...register("country")} />
      {errors.country && <p>{errors.country.message}</p>}

      <input type="submit" />
    </form>
  );
};
