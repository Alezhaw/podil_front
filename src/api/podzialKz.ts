import axios from "./axios";
import { getConfig } from "./axios";
import { ICitiesKz } from "../interfaces/citiesKz";
import { IBaseKz } from "../interfaces/baseKz";
let controllerGetAllCitiesKz: AbortController | null = null;
let controllerGetFilteredCitiesKz: AbortController | null = null;
let controllerGetAllBasesKz: AbortController | null = null;
let controllerGetFilteredBasesKz: AbortController | null = null;

export const axiosCreateCitiesKz = async (cities: ICitiesKz[]) => {
  try {
    const { data } = await axios.post("api/citykz/create", { data: cities }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetAllCitiesKz = async () => {
  try {
    if (controllerGetAllCitiesKz !== null) {
      controllerGetAllCitiesKz.abort();
    }
    controllerGetAllCitiesKz = new AbortController();
    const { data } = await axios.get("api/citykz/get", { ...getConfig(), signal: controllerGetAllCitiesKz.signal });

    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetFilteredCitiesKz = async ({
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
    if (controllerGetFilteredCitiesKz !== null) {
      controllerGetFilteredCitiesKz.abort();
    }
    controllerGetFilteredCitiesKz = new AbortController();
    const { data } = await axios.post(
      "api/citykz/search",
      { pageSize, page, sort, speakerZamkniete, speakerInProgress, scenarioZamkniete, scenarioInProgress, baseZamkniete, baseInProgress, zamkniete, inProgress, search },
      { ...getConfig(), signal: controllerGetFilteredCitiesKz.signal }
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

export const axiosGetOneCityKz = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/citykz/getOne", { id_for_base }, getConfig());
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeCityKz = async (city: ICitiesKz) => {
  try {
    const { data } = await axios.post("api/citykz/changeOne", { ...city }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeCheckKz = async (id_for_base?: number, id?: number, check_base?: boolean, check_speaker?: boolean, check_scenario?: boolean) => {
  try {
    const { data } = await axios.post("api/citykz/changeCheck", { id_for_base, id, check_base, check_speaker, check_scenario }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDeleteCityKz = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/citykz/deleteOne", { id_for_base }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDeleteTimeKz = async (id: number) => {
  try {
    const { data } = await axios.post("api/citykz/deleteTime", { id }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosCreateBaseKz = async (bases: IBaseKz[]) => {
  try {
    const { data } = await axios.post("api/basekz/create", { data: bases }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetAllBasesKz = async () => {
  try {
    if (controllerGetAllBasesKz !== null) {
      controllerGetAllBasesKz.abort();
    }
    controllerGetAllBasesKz = new AbortController();
    const { data } = await axios.get("api/basekz/get", { ...getConfig(), signal: controllerGetAllBasesKz.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetBasesForCityKz = async (id_for_base: number) => {
  try {
    const { data } = await axios.post("api/basekz/getForCity", { id_for_base }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosGetFilteredBasesKz = async (search: string) => {
  try {
    const { data } = await axios.post("api/basekz/search", { search }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosChangeBaseKz = async (base: IBaseKz) => {
  try {
    const { data } = await axios.post("api/basekz/changeOne", { ...base }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const axiosDeleteBaseKz = async (id?: number, base_id?: number) => {
  try {
    const { data } = await axios.post("api/basekz/deleteOne", { id, base_id }, getConfig());

    return data;
  } catch (e) {
    console.error(e);
  }
};
