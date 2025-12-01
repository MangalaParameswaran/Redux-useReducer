import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice'

export const store= configureStore({
    reducer: {
        reduxForm:  formReducer
    }
})