import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required")
    .test(
      "is-first-letter-uppercase",
      "The first letter must be uppercase",
      (value) => /^[\p{Lu}]/u.test(value),
    ),
  age: Yup.number().required().positive().integer(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Must Contain minimum 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
    )
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat Password is required"),
  gender: Yup.string().required("Gender is required"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
  picture: Yup.mixed<FileList>()
    .required()
    .test(
      "fileRequired",
      "Please, choose the image file (less than 2MB, JPEG or PNG)",
      (value) => {
        if (value && value[0]) {
          return true;
        } else {
          return false;
        }
      },
    )
    .test("fileSize", "File too large, it should be less than 2MB", (value) => {
      if (value && value[0]) {
        return value[0].size <= FILE_SIZE_LIMIT;
      } else {
        return true;
      }
    })
    .test(
      "fileFormat",
      "Unsupported format, only JPEG and PNG are allowed",
      (value) => {
        if (value && value[0]) {
          return SUPPORTED_FORMATS.includes(value[0].type);
        } else {
          return true;
        }
      },
    ),
  country: Yup.string().required("Country is required"),
});

export default schema;
