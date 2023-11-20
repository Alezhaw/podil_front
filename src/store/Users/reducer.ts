import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";
import { ICities } from "../../interfaces/cities";
import { IBase } from "../../interfaces/base";
import { ILogsCity } from "../../interfaces/logsCity";
import { ILogsBase } from "../../interfaces/logsBase";
import { ISpeakerTemplates } from "../../interfaces/speakerTemplates";

export interface IUsersReducer {
  user: IUser | {};
  allUsers: IUser[] | [];
  citiesRu: ICities[] | [];
  storedCities: ICities[] | [];
  citiesKz: ICities[] | [];
  bases: IBase[] | [];
  logsCity: ILogsCity[] | [];
  logsBase: ILogsBase[] | [];
  selectedLang: string;
  country: string;
  locale: { [key: string]: string };
  speakerTemplates: ISpeakerTemplates[] | [];
}

export const INITIAL: IUsersReducer = {
  user: {},
  allUsers: [],
  citiesRu: [],
  storedCities: [],
  citiesKz: [],
  bases: [],
  logsCity: [],
  logsBase: [],
  selectedLang: localStorage.getItem("selected-lang") || "EN",
  country: localStorage.getItem("country") || "PL",
  locale: {},
  speakerTemplates: [],
};

export const UserReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTypes.GET_USER:
      return { ...state, user: payload };
    case reducerTypes.GET_ALL_USERS:
      return { ...state, allUsers: payload };
    case reducerTypes.GET_CITIES:
      return { ...state, storedCities: payload };
    case reducerTypes.GET_BASES:
      return { ...state, bases: payload };
    case reducerTypes.GET_LOGS_CITIES:
      return { ...state, logsCity: payload };
    case reducerTypes.GET_LOGS_BASES:
      return { ...state, logsBase: payload };
    case reducerTypes.GET_SELECTED_LANG:
      return { ...state, selectedLang: payload };
    case reducerTypes.GET_COUNTRY:
      return { ...state, country: payload };
    case reducerTypes.GET_SELECTED_LOCALE:
      return { ...state, locale: payload };
    case reducerTypes.GET_SPEAKER_TEMPLATES:
      return { ...state, speakerTemplates: payload };
    default:
      return state;
  }
};
