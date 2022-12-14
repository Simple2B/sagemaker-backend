import { combineReducers } from "redux";
import { reportReducer } from "./reportReducer";

export const rootReducer = combineReducers({
  form: reportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
