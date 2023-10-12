import axios from "../axios";
import { IDeparture } from "../../interfaces/trails/departure";

let controllerGetDepartureById: AbortController | null = null;
let controllerGetFiltered: AbortController | null = null;
let controllerGetForEditing: AbortController | null = null;

export const getById = async ({ ids, country = "" }: { ids: number[]; country: string }) => {
  try {
    if (controllerGetDepartureById !== null) {
      controllerGetDepartureById.abort();
    }
    controllerGetDepartureById = new AbortController();
    const { data } = await axios.post("api/departure/getByIds", { ids, country }, { signal: controllerGetDepartureById.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const getForEditing = async ({ sort = true, pageSize = 5, page = 0, country = "" }: { sort: boolean; pageSize: number; page: number; country: string }) => {
  try {
    if (controllerGetForEditing !== null) {
      controllerGetForEditing.abort();
    }
    controllerGetForEditing = new AbortController();
    const { data } = await axios.post("api/departure/getForEditing", { sort, pageSize, page, country }, { signal: controllerGetForEditing.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const getFiltered = async ({
  search = "",
  planningPersonIds = [],
  dateTo,
  dateFrom,
  sort = true,
  pageSize = 5,
  page = 0,
  country = "",
}: {
  search: string;
  planningPersonIds: number[];
  dateTo: string;
  dateFrom: string;
  sort: boolean;
  pageSize: number;
  page: number;
  country: string;
}) => {
  try {
    if (controllerGetFiltered !== null) {
      controllerGetFiltered.abort();
    }
    controllerGetFiltered = new AbortController();
    const { data } = await axios.post("api/departure/search", { search, planningPersonIds, dateTo, dateFrom, sort, pageSize, page, country }, { signal: controllerGetFiltered.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const create = async (departure: IDeparture, country: string) => {
  //отключить кнопку пока идет создание
  try {
    const { data } = await axios.post("api/departure/create", { country, departure });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const update = async (departure: IDeparture, country: string) => {
  try {
    const { data } = await axios.post("api/departure/update", { country, departure });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (id: number, country: string) => {
  try {
    const { data } = await axios.post("api/departure/remove", { id, country, relevance_status: false });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  getById,
  getForEditing,
  getFiltered,
  create,
  update,
  remove,
};
