import { ICallTemplate } from "../../interfaces/trails/callTemplate";
import { ICitiesWithReg } from "../../interfaces/trails/citiesWithReg";
import { IContactStatus } from "../../interfaces/trails/contactStatus";
import { IForm } from "../../interfaces/trails/form";
import { IPlanningPeople } from "../../interfaces/trails/planningPeople";
import { IPresentationTime } from "../../interfaces/trails/presentationTime";
import { IProjectConcent } from "../../interfaces/trails/projectConcent";
import { IProjectSales } from "../../interfaces/trails/projectSales";
import { IRegiment } from "../../interfaces/trails/regiment";
import { IRegion } from "../../interfaces/trails/regions";
import { IReservationStatus } from "../../interfaces/trails/reservationStatus";
import { ITrails } from "../../interfaces/trails/trails";
import { IAction } from "../utils";
import { reducerTrailsTypes } from "./trailsTypes";
import { IDeparture } from "../../interfaces/trails/departure";
import { IDepartureDate } from "../../interfaces/trails/departureDate";

export interface ITrailsReducer {
  callTamplates: ICallTemplate[] | [];
  citiesWithRegions: ICitiesWithReg[] | [];
  contractStatuses: IContactStatus[] | [];
  forms: IForm[] | [];
  planningPeople: IPlanningPeople[] | [];
  allPlanningPeople: IPlanningPeople[] | [];
  presentationTimes: IPresentationTime[] | [];
  projectConcent: IProjectConcent[] | [];
  projectSales: IProjectSales[] | [];
  regiments: IRegiment[] | [];
  regions: IRegion[] | [];
  reservationStatuses: IReservationStatus[] | [];
  trails: ITrails[] | [];
  departure: IDeparture[] | [];
  departureDate: IDepartureDate[] | [];
  allDictionary: {
    callTamplates: ICallTemplate[] | [];
    contractStatuses: IContactStatus[] | [];
    planningPeople: IPlanningPeople[] | [];
    presentationTimes: IPresentationTime[] | [];
    projectConcent: IProjectConcent[] | [];
    projectSales: IProjectSales[] | [];
    regiments: IRegiment[] | [];
    regions: IRegion[] | [];
    reservationStatuses: IReservationStatus[] | [];
  };
  allCitiesWithRegions: ICitiesWithReg[] | [];
  allForms: IForm[] | [];
  allDeparture: IDeparture[] | [];
  allDepartureDate: IDepartureDate[] | [];
}

export const INITIAL: ITrailsReducer = {
  callTamplates: [],
  citiesWithRegions: [],
  contractStatuses: [],
  forms: [],
  planningPeople: [],
  allPlanningPeople: [],
  presentationTimes: [],
  projectConcent: [],
  projectSales: [],
  regiments: [],
  regions: [],
  reservationStatuses: [],
  trails: [],
  departure: [],
  departureDate: [],
  allDictionary: {
    callTamplates: [],
    contractStatuses: [],
    planningPeople: [],
    presentationTimes: [],
    projectConcent: [],
    projectSales: [],
    regiments: [],
    regions: [],
    reservationStatuses: [],
  },
  allCitiesWithRegions: [],
  allForms: [],
  allDeparture: [],
  allDepartureDate: [],
};

export const TrailsReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTrailsTypes.GET_CALL_TEMPLATES:
      return { ...state, callTamplates: payload };
    case reducerTrailsTypes.GET_CITIES_WITH_REGIONS:
      return { ...state, citiesWithRegions: payload };
    case reducerTrailsTypes.GET_CONTRACT_STATUSES:
      return { ...state, contractStatuses: payload };
    case reducerTrailsTypes.GET_FORMS:
      return { ...state, forms: payload };
    case reducerTrailsTypes.GET_PLANNING_PEOPLE:
      return { ...state, planningPeople: payload };
    case reducerTrailsTypes.GET_ALL_PLANNING_PEOPLE:
      return { ...state, allPlanningPeople: payload };
    case reducerTrailsTypes.GET_PRESENTATION_TIMES:
      return { ...state, presentationTimes: payload };
    case reducerTrailsTypes.GET_PROJECT_CONCENT:
      return { ...state, projectConcent: payload };
    case reducerTrailsTypes.GET_PROJECT_SALES:
      return { ...state, projectSales: payload };
    case reducerTrailsTypes.GET_REGIMENTS:
      return { ...state, regiments: payload };
    case reducerTrailsTypes.GET_REGIONS:
      return { ...state, regions: payload };
    case reducerTrailsTypes.GET_RESERVATION_STATUSES:
      return { ...state, reservationStatuses: payload };
    case reducerTrailsTypes.GET_TRAILS:
      return { ...state, trails: payload };
    case reducerTrailsTypes.GET_DEPARTURE:
      return { ...state, departure: payload };
    case reducerTrailsTypes.GET_DEPARTURE_DATE:
      return { ...state, departureDate: payload };
    case reducerTrailsTypes.GET_ALL_DICTIONARY:
      return { ...state, allDictionary: payload };
    case reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS:
      return { ...state, allCitiesWithRegions: payload };
    case reducerTrailsTypes.GET_ALL_FORMS:
      return { ...state, allForms: payload };
    case reducerTrailsTypes.GET_ALL_DEPARTURE:
      return { ...state, allDeparture: payload };
    case reducerTrailsTypes.GET_ALL_DEPARTURE_DATE:
      return { ...state, allDepartureDate: payload };
    default:
      return state;
  }
};
