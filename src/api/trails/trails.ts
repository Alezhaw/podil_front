import axios from "../axios";
import { ITrails } from "../../interfaces/trails";

let controllerGetFilteredTrails: AbortController | null = null;

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
  createTrail,
  updateTrail,
  removeTrail,
};
