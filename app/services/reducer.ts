export const initialState = {
  name: "",
  email: "",
  password: "",
  gender: "",
  courses: [],
  country: "",
};

export function formReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "RESET":
      console.log('cmg-----',);
      
      return initialState;

    default:
      return state;
  }
}
