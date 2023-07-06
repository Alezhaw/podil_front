import axios from "./axios";
import { getConfig } from "./axios";
import { ILogsCity } from "../interfaces/logsCity";
let controllerGetAllLogsCity: AbortController | null = null;
let controllerGetFilteredLogsCity: AbortController | null = null;
let controllerGetAllLogsBase: AbortController | null = null;
let controllerGetFilteredLogsBase: AbortController | null = null;

export const axiosGetAllLogsCity = async () => {
  try {
    if (controllerGetAllLogsCity !== null) {
      controllerGetAllLogsCity.abort();
    }
    controllerGetAllLogsCity = new AbortController();
    const { data } = await axios.get("api/log/getCities", { ...getConfig(), signal: controllerGetAllLogsCity.signal });
    return data.map((item: any) => {
      const differences = JSON.parse(item?.differences)?.filter((el: any) => !!el[0] && (el[1] != null || el[2] != null)) || [];
      return { ...item, differences: differences, differencesLength: differences.length };
    });
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetFilteredLogsCity = async ({
  pageSize = 10,
  page = 1,
  search = "",
  country = "",
  updateFilter = true,
  createFilter = true,
  deleteFilter = true,
}: {
  pageSize: number;
  page: number;
  search: string;
  country: string;
  updateFilter: boolean;
  createFilter: boolean;
  deleteFilter: boolean;
}) => {
  try {
    if (controllerGetFilteredLogsCity !== null) {
      controllerGetFilteredLogsCity.abort();
    }
    controllerGetFilteredLogsCity = new AbortController();
    const { data } = await axios.post(
      "api/log/searchCity",
      { pageSize, page, search, country, updateFilter, createFilter, deleteFilter },
      { ...getConfig(), signal: controllerGetFilteredLogsCity.signal }
    );
    return {
      ...data,
      logs: data.logs?.map((item: any) => {
        const differences = JSON.parse(item?.differences)?.filter((el: any) => !!el[0] && (el[1] != null || el[2] != null)) || [];
        return { ...item, differences: differences, differencesLength: differences.length };
      }),
    };
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetAllLogsBase = async () => {
  try {
    if (controllerGetAllLogsBase !== null) {
      controllerGetAllLogsBase.abort();
    }
    controllerGetAllLogsBase = new AbortController();
    const { data } = await axios.get("api/log/getBases", { ...getConfig(), signal: controllerGetAllLogsBase.signal });
    return data.map((item: any) => {
      const differences = JSON.parse(item?.differences)?.filter((el: any) => !!el[0] && (el[1] != null || el[2] != null)) || [];
      return { ...item, differences: differences, differencesLength: differences.length };
    });
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const axiosGetFilteredLogsBases = async ({
  pageSize = 10,
  page = 1,
  search = "",
  country = "",
  updateFilter = true,
  createFilter = true,
  deleteFilter = true,
}: {
  pageSize: number;
  page: number;
  search: string;
  country: string;
  updateFilter: boolean;
  createFilter: boolean;
  deleteFilter: boolean;
}) => {
  try {
    if (controllerGetFilteredLogsBase !== null) {
      controllerGetFilteredLogsBase.abort();
    }
    controllerGetFilteredLogsBase = new AbortController();
    const { data } = await axios.post(
      "api/log/searchBase",
      { pageSize, page, search, country, updateFilter, createFilter, deleteFilter },
      { ...getConfig(), signal: controllerGetFilteredLogsBase.signal }
    );
    return {
      ...data,
      logs: data.logs.map((item: any) => {
        const differences = JSON.parse(item?.differences)?.filter((el: any) => !!el[0] && (el[1] != null || el[2] != null)) || [];
        return { ...item, differences: differences, differencesLength: differences.length };
      }),
    };
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};
