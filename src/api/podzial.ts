import axios from "./axios";
import { ICities } from "../interfaces/cities";
import { IBase } from "../interfaces/base";
let controllerGetAllCities: AbortController | null = null;
let controllerGetFilteredCities: AbortController | null = null;
let controllerGetAllBases: AbortController | null = null;

export const createCities = async (cities: ICities[]) => {
  try {
    const { data } = await axios.post("api/city/create", { data: cities });

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
  speakerZamkniete = true,
  speakerInProgress = true,
  speakerCanceled = true,
  scenarioZamkniete = true,
  scenarioInProgress = true,
  scenarioCanceled = true,
  baseZamkniete = true,
  baseInProgress = true,
  baseCanceled = true,
  zamkniete = true,
  inProgress = true,
  canceled = true,
  search = "",
  country = "",
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
  sort: boolean;
  country: string;
}) => {
  try {
    if (controllerGetFilteredCities !== null) {
      controllerGetFilteredCities.abort();
    }
    controllerGetFilteredCities = new AbortController();
    const { data } = await axios.post(
      "api/city/search",
      {
        pageSize,
        page,
        sort,
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
        search,
        country,
      },
      { signal: controllerGetFilteredCities.signal }
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

export const changeStatus = async (status: number, country: string, id_for_base?: number, id?: number) => {
  try {
    const { data } = await axios.post("api/city/changeStatus", { id_for_base, id, status, country });

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

export const createBase = async (bases: IBase[]) => {
  try {
    const { data } = await axios.post("api/base/create", { data: bases });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllBases = async () => {
  try {
    if (controllerGetAllBases !== null) {
      controllerGetAllBases.abort();
    }
    controllerGetAllBases = new AbortController();
    const { data } = await axios.get("api/base/get", { signal: controllerGetAllBases.signal });

    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const getBasesForCity = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/base/getForCity", { id_for_base });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getFilteredBases = async (search: string) => {
  try {
    const { data } = await axios.post("api/base/search", { search });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteBase = async (id?: number, base_id?: number) => {
  try {
    const { data } = await axios.post("api/base/deleteOne", { id, base_id });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  createCities,
  createBase,
  getAllCities,
  getFilteredCities,
  getFilteredBases,
  getBasesForCity,
  getAllBases,
  getOneCity,
  changeCheck,
  changeStatus,
  deleteCity,
  deleteTime,
  deleteBase,
};
