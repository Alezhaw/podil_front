import axios from "../axios";
import { IDepartureDate } from "../../interfaces/trails/departureDate";

let controllerGetDepartureDateById: AbortController | null = null;
let controllerGetByDepartureId: AbortController | null = null;

export const getById = async ({ ids, country = "" }: { ids: number[]; country: string }) => {
  try {
    if (controllerGetDepartureDateById !== null) {
      controllerGetDepartureDateById.abort();
    }
    controllerGetDepartureDateById = new AbortController();
    const { data } = await axios.post("api/departureDate/getByIds", { ids, country }, { signal: controllerGetDepartureDateById.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const getByDepartureId = async ({ ids, country = "" }: { ids: number[]; country: string }) => {
  try {
    if (controllerGetByDepartureId !== null) {
      controllerGetByDepartureId.abort();
    }
    controllerGetByDepartureId = new AbortController();
    const { data } = await axios.post("api/departureDate/getByDepartureIds", { ids, country }, { signal: controllerGetByDepartureId.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const create = async (departureDate: IDepartureDate, country: string) => {
  //отключить кнопку пока идет создание
  try {
    const { data } = await axios.post("api/departureDate/create", { country, departureDate });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const update = async (departureDate: IDepartureDate, country: string) => {
  try {
    const { data } = await axios.post("api/departureDate/update", { country, departureDate });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (id: number, country: string) => {
  try {
    const { data } = await axios.post("api/departureDate/remove", { id, country, relevance_status: false });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  getById,
  getByDepartureId,
  create,
  update,
  remove,
};
