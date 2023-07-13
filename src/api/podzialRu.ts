import axios from "./axios";
import { getConfig } from "./axios";
import { ICitiesRu } from "../interfaces/citiesRu";
import { IBaseRu } from "../interfaces/baseRu";
let controllerGetAllCitiesRu: AbortController | null = null;
let controllerGetFilteredCitiesRu: AbortController | null = null;
let controllerGetAllBasesRu: AbortController | null = null;

export const axiosCreateCitiesRu = async (cities: ICitiesRu[]) => {
  try {
    const { data } = await axios.post("api/city/create", { data: cities }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetAllCitiesRu = async () => {
  try {
    if (controllerGetAllCitiesRu !== null) {
      controllerGetAllCitiesRu.abort();
    }
    controllerGetAllCitiesRu = new AbortController();
    const { data } = await axios.get("api/city/get", { ...getConfig(), signal: controllerGetAllCitiesRu.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetFilteredCitiesRu = async ({
  pageSize = 10,
  page = 1,
  sort = true,
  speakerZamkniete = true,
  speakerInProgress = true,
  scenarioZamkniete = true,
  scenarioInProgress = true,
  baseZamkniete = true,
  baseInProgress = true,
  zamkniete = true,
  inProgress = true,
  search = "",
}: {
  pageSize: number;
  page: number;
  scenarioInProgress: boolean;
  baseZamkniete: boolean;
  baseInProgress: boolean;
  zamkniete: boolean;
  inProgress: boolean;
  search: string;
  scenarioZamkniete: boolean;
  speakerInProgress: boolean;
  speakerZamkniete: boolean;
  sort: boolean;
}) => {
  try {
    if (controllerGetFilteredCitiesRu !== null) {
      controllerGetFilteredCitiesRu.abort();
    }
    controllerGetFilteredCitiesRu = new AbortController();
    const { data } = await axios.post(
      "api/city/search",
      { pageSize, page, sort, speakerZamkniete, speakerInProgress, scenarioZamkniete, scenarioInProgress, baseZamkniete, baseInProgress, zamkniete, inProgress, search },
      { ...getConfig(), signal: controllerGetFilteredCitiesRu.signal }
    );
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetOneCityRu = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/city/getOne", { id_for_base }, getConfig());
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeCheckRu = async (id_for_base?: number, id?: number, check_base?: boolean, check_speaker?: boolean, check_scenario?: boolean) => {
  try {
    const { data } = await axios.post("api/city/changeCheck", { id_for_base, id, check_base, check_speaker, check_scenario }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDeleteCityRu = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/city/deleteOne", { id_for_base }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDeleteTimeRu = async (id: number) => {
  try {
    const { data } = await axios.post("api/city/deleteTime", { id }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosCreateBaseRu = async (bases: IBaseRu[]) => {
  try {
    const { data } = await axios.post("api/base/create", { data: bases }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetAllBasesRu = async () => {
  try {
    if (controllerGetAllBasesRu !== null) {
      controllerGetAllBasesRu.abort();
    }
    controllerGetAllBasesRu = new AbortController();
    const { data } = await axios.get("api/base/get", { ...getConfig(), signal: controllerGetAllBasesRu.signal });

    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetBasesForCityRu = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/base/getForCity", { id_for_base }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetFilteredBasesRu = async (search: string) => {
  try {
    const { data } = await axios.post("api/base/search", { search }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDeleteBaseRu = async (id?: number, base_id?: number) => {
  try {
    const { data } = await axios.post("api/base/deleteOne", { id, base_id }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};
