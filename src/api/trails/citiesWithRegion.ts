import axios from "../axios";
import { ICitiesWithReg } from "../../interfaces/trails/citiesWithReg";
let controllerGetByRegion: AbortController | null = null;
let controllerGetByName: AbortController | null = null;

export const getAll = async (country: string) => {
  try {
    const { data } = await axios.post("api/cityWithReg/getAll", { country });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const update = async (city: ICitiesWithReg, country: string) => {
  try {
    const { data } = await axios.post("api/cityWithReg/update", { country, city });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (city: ICitiesWithReg, country: string) => {
  try {
    const { data } = await axios.post("api/cityWithReg/remove", { country, city: { ...city, relevance_status: false } });

    return { data };
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (city: ICitiesWithReg, country: string) => {
  try {
    const { data } = await axios.post("api/cityWithReg/create", { country, city });
    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const getByRegion = async ({ region_id, country = "", city_name = "" }: { region_id: number; country: string; city_name: string }) => {
  try {
    if (!region_id) {
      return;
    }
    if (controllerGetByRegion !== null) {
      controllerGetByRegion.abort();
    }
    controllerGetByRegion = new AbortController();
    const { data } = await axios.post(
      "api/cityWithReg/getByRegion",
      {
        region_id,
        country,
        city_name,
      },
      { signal: controllerGetByRegion.signal }
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

export const getByName = async ({ country = "", search = "" }: { country: string; search: string }) => {
  try {
    if (controllerGetByName !== null) {
      controllerGetByName.abort();
    }
    controllerGetByName = new AbortController();
    const { data } = await axios.post(
      "api/cityWithReg/getByName",
      {
        country,
        search,
      },
      { signal: controllerGetByName.signal }
    );
    return data?.cities || [];
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

export default {
  getAll,
  create,
  update,
  remove,
  getByRegion,
  getByName,
};
