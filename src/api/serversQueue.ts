import axios from "axios";
import { IServersQueue } from "../interfaces/blazor/serversQueue";

let controllerGetByCountry: AbortController | null = null;

export const getByCountry = async (country: string) => {
  try {
    if (controllerGetByCountry !== null) {
      controllerGetByCountry.abort();
    }
    controllerGetByCountry = new AbortController();
    const { data } = await axios.post("api/serverQueue/getByCountry", { country }, { signal: controllerGetByCountry.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const increase = async ({ id, count = 0, url, country, name }: { id: number; count: number; url: string; country: string; name: string }) => {
  try {
    const { data } = await axios.post("api/serverQueue/increase", { id, count, url, country, name });

    return data;
  } catch (e: any) {
    console.error(e);
    return e?.response?.data;
  }
};

export const create = async (serversQueue: IServersQueue) => {
  try {
    const { data } = await axios.post("api/serverQueue/create", { data: serversQueue });

    return data;
  } catch (e: any) {
    console.error(e);
    return e?.response?.data;
  }
};

export default {
  getByCountry,
  increase,
  create,
};
