import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required().positive().integer(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat Password is required"),
  gender: Yup.string().required("Gender is required"),
  terms: Yup.boolean().required("You must accept the terms"),
  picture: Yup.mixed<FileList>().required("Picture is required"),
  country: Yup.string().required("Country is required"),
});

export default schema;
