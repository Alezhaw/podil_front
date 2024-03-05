import { reducerTypes } from "../../store/Users/types";
import { store } from "../../store/store";

export function customAlert(payload) {
  store.dispatch({ type: reducerTypes.GET_ALERT, payload });
}
