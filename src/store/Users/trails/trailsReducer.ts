import { ICallTemplate } from "../../../interfaces/trails/callTemplate";
import { ICitiesWithReg } from "../../../interfaces/trails/citiesWithReg";
import { IContactStatus } from "../../../interfaces/trails/contactStatus";
import { IForm } from "../../../interfaces/trails/form";
import { IPlanningPeople } from "../../../interfaces/trails/planningPeople";
import { IPresentationTime } from "../../../interfaces/trails/presentationTime";
import { IProjectConcent } from "../../../interfaces/trails/projectConcent";
import { IProjectSales } from "../../../interfaces/trails/projectSales";
import { IRegiment } from "../../../interfaces/trails/regiment";
import { IRegion } from "../../../interfaces/trails/regions";
import { IReservationStatus } from "../../../interfaces/trails/reservationStatus";
import { ITrails } from "../../../interfaces/trails/trails";
import { IAction } from "../../utils";
import { reducerTrailsTypes } from "./trailsTypes";

export interface ITrailsReducer {
  trailsCountryForCheck: string;
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
}

export const INITIAL: ITrailsReducer = {
  trailsCountryForCheck: "",
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
};

export const TrailsReducer = (state = INITIAL, { type, payload }: IAction) => {
  switch (type) {
    case reducerTrailsTypes.GET_CALL_TEMPLATES:
      return { ...state, callTamplates: payload.callTamplates, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_CITIES_WITH_REGIONS:
      return { ...state, citiesWithRegions: payload.citiesWithRegions, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_CONTRACT_STATUSES:
      return { ...state, contractStatuses: payload.contractStatuses, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_FORMS:
      return { ...state, forms: payload.forms, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_PLANNING_PEOPLE:
      return { ...state, planningPeople: payload.planningPeople, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_ALL_PLANNING_PEOPLE:
      return { ...state, allPlanningPeople: payload.allPlanningPeople, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_PRESENTATION_TIMES:
      return { ...state, presentationTimes: payload.presentationTimes, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_PROJECT_CONCENT:
      return { ...state, projectConcent: payload.projectConcent, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_PROJECT_SALES:
      return { ...state, projectSales: payload.projectSales, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_REGIMENTS:
      return { ...state, regiments: payload.regiments, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_REGIONS:
      return { ...state, regions: payload.regions, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_RESERVATION_STATUSES:
      return { ...state, reservationStatuses: payload.reservationStatuses, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_TRAILS:
      return { ...state, trails: payload.trails, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_ALL_DICTIONARY:
      return { ...state, allDictionary: payload.allDictionary, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS:
      return { ...state, allCitiesWithRegions: payload.allCitiesWithRegions, trailsCountryForCheck: payload.country };
    case reducerTrailsTypes.GET_ALL_FORMS:
      return { ...state, allForms: payload.allForms, trailsCountryForCheck: payload.country };
    default:
      return state;
  }
};
