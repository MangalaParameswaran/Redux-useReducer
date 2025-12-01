import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

export interface FormState {
  name: string;
  email: string;
  password: string;
  gender: string;
  courses: string[];
  country: string;
}

const initialState = {
    name: '',
    email: '',
    password: '',
    gender: '',
    courses: [],
    country: ''
}

const formSlice = createSlice({
    name: 'redux-form',
    initialState,
    reducers: {
        setField: (state, action: PayloadAction<{ field: keyof FormState; value: any }>) => {
            state[action.payload.field]= action.payload.value;
        },
        resetField: () => initialState
    }
})

export const { setField, resetField } = formSlice.actions;
export default formSlice.reducer;