import axios from "./axios";
import { ICities } from "../interfaces/cities";
import { IBase } from "../interfaces/base";

let controllerGetAllCities: AbortController | null = null;
let controllerGetFilteredCities: AbortController | null = null;
let controllerGetAllBases: AbortController | null = null;
let controllerBasesByIds: AbortController | null = null;

export const createCities = async (cities: ICities[], country: string) => {
  try {
    const { data } = await axios.post("api/city/create", { data: cities, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createCitiesByTrails = async ({ cities, country, status }: { cities: ICities[]; country: string; status: any }) => {
  try {
    const { data } = await axios.post("api/city/createByTrail", { data: cities, country, status });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllCities = async () => {
  try {
    if (controllerGetAllCities !== null) {
      controllerGetAllCities.abort();
    }
    controllerGetAllCities = new AbortController();
    const { data } = await axios.get("api/city/get", { signal: controllerGetAllCities.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const getFilteredCities = async ({
  pageSize = 10,
  page = 0,
  sort = true,
  speakerZamkniete,
  speakerInProgress,
  speakerCanceled,
  scenarioZamkniete,
  scenarioInProgress,
  scenarioCanceled,
  baseZamkniete,
  baseInProgress,
  baseCanceled,
  zamkniete,
  inProgress,
  canceled,
  visibleInPodil,
  visibleInBases,
  visibleInSpeaker,
  visibleInScenario,
  search = "",
  country = "",
  filterDate,
}: {
  pageSize: number;
  page: number;
  baseZamkniete: boolean;
  baseInProgress: boolean;
  baseCanceled: boolean;
  canceled: boolean;
  zamkniete: boolean;
  inProgress: boolean;
  search: string;
  scenarioInProgress: boolean;
  scenarioZamkniete: boolean;
  scenarioCanceled: boolean;
  speakerInProgress: boolean;
  speakerZamkniete: boolean;
  speakerCanceled: boolean;
  visibleInPodil: boolean;
  visibleInBases: boolean;
  visibleInSpeaker: boolean;
  visibleInScenario: boolean;
  sort: boolean;
  country: string;
  filterDate: { dateFrom: string; dateTo: string } | {};
}) => {
  try {
    if (controllerGetFilteredCities !== null) {
      controllerGetFilteredCities.abort();
    }
    controllerGetFilteredCities = new AbortController();
    const result = await axios.post(
      "api/city/search",
      {
        pageSize,
        page,
        sort,
        filter: {
          speakerZamkniete,
          speakerInProgress,
          speakerCanceled,
          scenarioZamkniete,
          scenarioInProgress,
          scenarioCanceled,
          baseZamkniete,
          baseInProgress,
          baseCanceled,
          zamkniete,
          inProgress,
          canceled,
          visibleInPodil,
          visibleInBases,
          visibleInSpeaker,
          visibleInScenario,
          ...filterDate,
        },
        search,
        country,
      },
      { signal: controllerGetFilteredCities.signal }
    );
    const data = result?.data;
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

export const getByTrail = async (trailId: number, calling_scheme: string, country: string) => {
  try {
    const { data } = await axios.post("api/city/getByTrail", { trailId, calling_scheme, country });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getOneCity = async (id_for_base: number, country: string) => {
  try {
    const { data } = await axios.post("api/city/getOne", { id_for_base, country });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const changeCheck = async (id_for_base?: number, id?: number, country?: string, check_base?: boolean, check_speaker?: boolean, check_scenario?: boolean) => {
  try {
    const { data } = await axios.post("api/city/changeCheck", { id_for_base, id, check_base, check_speaker, check_scenario, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const changeStatus = async (status: number, country: string, id_for_base?: number, id?: number, trailId?: number) => {
  try {
    const { data } = await axios.post("api/city/changeStatus", { id_for_base, id, trailId, status, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteCity = async (id_for_base: number, country: string) => {
  try {
    const { data } = await axios.post("api/city/deleteOne", { id_for_base, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTime = async (id: number, country: string) => {
  try {
    const { data } = await axios.post("api/city/deleteTime", { id, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createBase = async (bases: IBase[], country: string) => {
  try {
    const { data } = await axios.post("api/base/create", { data: bases, country });

    return data.result;
  } catch (e) {
    console.error(e);
  }
};

export const createBaseByTrail = async (base: IBase, country: string, trailId: number) => {
  try {
    const { data } = await axios.post("api/base/createByTrail", { base, country, trailId });

    return data.result;
  } catch (e) {
    console.error(e);
  }
};

export const updateBaseByGazoo = async (country: string, id_for_bases: number[]) => {
  try {
    const { data } = await axios.post("api/base/updateByGazoo", { country, id_for_bases });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllBases = async (country: string) => {
  try {
    if (controllerGetAllBases !== null) {
      controllerGetAllBases.abort();
    }
    controllerGetAllBases = new AbortController();
    const { data } = await axios.post("api/base/get", { country }, { signal: controllerGetAllBases.signal });

    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const getBasesForCity = async (id_for_base: number, country: string) => {
  try {
    const { data } = await axios.post("api/base/getForCity", { id_for_base, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getBasesByIdsForBase = async (ids: number[], country: string) => {
  try {
    if (controllerBasesByIds !== null) {
      controllerBasesByIds.abort();
    }
    controllerBasesByIds = new AbortController();
    const { data } = await axios.post("api/base/getByIds", { ids, country }, { signal: controllerBasesByIds.signal });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getFilteredBases = async (search: string, country: string) => {
  try {
    const { data } = await axios.post("api/base/search", { search, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteBase = async (country: string, id?: number, podzial_id?: number) => {
  try {
    const { data } = await axios.post("api/base/deleteOne", { id, podzial_id, country });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  createCities,
  createCitiesByTrails,
  createBase,
  createBaseByTrail,
  updateBaseByGazoo,
  getAllCities,
  getFilteredCities,
  getFilteredBases,
  getBasesForCity,
  getBasesByIdsForBase,
  getAllBases,
  getByTrail,
  getOneCity,
  changeCheck,
  changeStatus,
  deleteCity,
  deleteTime,
  deleteBase,
};
function async(
  arg0: { cities: any; country: any; statuses: { sent_to_podil: number; sent_to_bases: number; sent_to_speaker: number; sent_to_scenario: number }[]; trailId: any },
  arg1: { cities: any; country: any; statuses: { sent_to_podil: number; sent_to_bases: number; sent_to_speaker: number; sent_to_scenario: number }[]; trailId: any }
) {
  throw new Error("Function not implemented.");
}
