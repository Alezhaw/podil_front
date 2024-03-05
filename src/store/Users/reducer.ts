import { IAction } from "../utils";
import { reducerTypes } from "./types";
import { IUser } from "../../interfaces/users";
import { ICities } from "../../interfaces/cities";
import { IBase } from "../../interfaces/base";
import { ILogsCity } from "../../interfaces/logsCity";
import { ILogsBase } from "../../interfaces/logsBase";
import { ISpeakerTemplates } from "../../interfaces/speakerTemplates";
import { IList } from "../../interfaces/lists/list";
import { IInstance } from "../../interfaces/blazor/instance";
import { IServer } from "../../interfaces/blazor/server";
import { ITrails } from "../../interfaces/trails/trails";
import { IDeparture } from "../../interfaces/trails/departure";

function getAlertValue(state: IUsersReducer, payload: any) {
  if (payload.message) {
    return [...state.alert, { message: payload.message, id: new Date().getTime(), severity: payload?.severity }];
  } else {
    return state.alert.filter((el) => el.id !== payload.id);
  }
}

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
  alert: { id: number; message: string }[];
  speakerTemplates: ISpeakerTemplates[] | [];
  lists: IList[] | [];
  servers: IServer[] | [];
  instances: IInstance[] | [];
  trailsForCampaign: ITrails[] | [];
  departure: IDeparture[] | [];
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
  alert: [],
  speakerTemplates: [],
  lists: [],
  servers: [],
  instances: [],
  trailsForCampaign: [],
  departure: [],
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
    case reducerTypes.GET_ALERT:
      return { ...state, alert: getAlertValue(state, payload) };
    case reducerTypes.GET_SPEAKER_TEMPLATES:
      return { ...state, speakerTemplates: payload };
    case reducerTypes.GET_LISTS:
      return { ...state, lists: payload };
    case reducerTypes.GET_SERVER:
      return { ...state, servers: payload };
    case reducerTypes.GET_INSTANCE:
      return { ...state, instances: payload };
    case reducerTypes.GET_TRAILS_FOR_CAMPAIGN:
      return { ...state, trailsForCampaign: payload };
    case reducerTypes.GET_DEPARTURE:
      return { ...state, departure: payload };
    default:
      return state;
  }
};
