import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";

export const getUsersAction = (data: IUser[]) => ({
  type: reducerTypes.GET_USER,
  payload: data,
});
