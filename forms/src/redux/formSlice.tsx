import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { countries } from "./countriesData";

export interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

export interface FormState {
  uncontrolledFormData: FormData[];
  controlledFormData: FormData[];
  countries: string[];
}

const initialState: FormState = {
  uncontrolledFormData: [],
  controlledFormData: [],
  countries: countries,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledFormData.push(action.payload);
    },
    addControlledFormData: (state, action: PayloadAction<FormData>) => {
      state.controlledFormData.push(action.payload);
    },
  },
});

export const { addUncontrolledFormData, addControlledFormData } =
  formSlice.actions;

export default formSlice.reducer;
