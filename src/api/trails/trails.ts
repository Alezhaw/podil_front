import axios from "../axios";
import { ITrails } from "../../interfaces/trails/trails";

let controllerGetFilteredTrails: AbortController | null = null;
let controllerGetTrailsById: AbortController | null = null;
let controllerGetDictionaryByTrails: AbortController | null = null;

export const getFilteredTrails = async ({
  search = "",
  searchRoute,
  planningPersonIds = [],
  dateTo,
  dateFrom,
  sort = true,
  pageSize = 10,
  page = 0,
  country = "",
}: {
  search: string;
  searchRoute: number;
  planningPersonIds: number[];
  dateTo: string;
  dateFrom: string;
  sort: boolean;
  pageSize: number;
  page: number;
  country: string;
}) => {
  try {
    if (controllerGetFilteredTrails !== null) {
      controllerGetFilteredTrails.abort();
    }
    controllerGetFilteredTrails = new AbortController();
    const { data } = await axios.post(
      "api/trail/search",
      {
        search,
        searchRoute,
        planningPersonIds,
        dateTo,
        dateFrom,
        sort,
        pageSize,
        page,
        country,
      },
      { signal: controllerGetFilteredTrails.signal }
    );
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
      return null;
    } else {
      console.error(e);
      return null;
    }
  }
};

export const getTrailsById = async ({ ids, country = "" }: { ids: number[]; country: string }) => {
  try {
    if (controllerGetTrailsById !== null) {
      controllerGetTrailsById.abort();
    }
    controllerGetTrailsById = new AbortController();
    const { data } = await axios.post("api/trail/getByIds", { ids, country }, { signal: controllerGetTrailsById.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const getDictionary = async ({ trails, country = "" }: { trails: ITrails[]; country: string }) => {
  try {
    if (!trails[0]) {
      return;
    }
    if (controllerGetDictionaryByTrails !== null) {
      controllerGetDictionaryByTrails.abort();
    }
    controllerGetDictionaryByTrails = new AbortController();
    const { data } = await axios.post(
      "api/trail/getDictionaries",
      {
        trails,
        country,
      },
      { signal: controllerGetDictionaryByTrails.signal }
    );
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
      return null;
    } else {
      console.error(e);
      return null;
    }
  }
};

export const createTrail = async (trail: ITrails, country: string) => {
  //отключить кнопку пока идет создание
  try {
    const { data } = await axios.post("api/trail/create", { country, trail });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateTrail = async (trail: ITrails, country: string) => {
  try {
    const { data } = await axios.post("api/trail/update", { country, trail });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const removeTrail = async (id: number, country: string) => {
  try {
    const { data } = await axios.post("api/trail/remove", { id, country, relevance_status: false });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  getFilteredTrails,
  getTrailsById,
  getDictionary,
  createTrail,
  updateTrail,
  removeTrail,
};
