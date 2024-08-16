import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

interface FormState {
  data: FormData[];
  countries: string[];
}

const initialState: FormState = {
  data: [],
  countries: ["USA", "Canada", "UK"],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;

export default formSlice.reducer;
