import axios from "../axios";
import { IPresentationTime } from "../../interfaces/trails/presentationTime";

let controllerGetById: AbortController | null = null;

export const getByIds = async ({ ids, country = "" }: { ids: number[]; country: string }) => {
  try {
    if (controllerGetById !== null) {
      controllerGetById.abort();
    }
    controllerGetById = new AbortController();
    const { data } = await axios.post("api/presentationTime/getByIds", { ids, country }, { signal: controllerGetById.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      return console.log("Request canceled", e.message);
    } else {
      return console.error(e);
    }
  }
};

export const update = async (presentationTime: any, country: string) => {
  try {
    const { data } = await axios.post("api/presentationTime/update", { country, presentationTime: { alternative: false, ...presentationTime } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (presentationTime: IPresentationTime, country: string) => {
  try {
    const { data } = await axios.post("api/presentationTime/remove", { country, presentationTime: { ...presentationTime, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (presentationTime: any, country: string) => {
  try {
    const { data } = await axios.post("api/presentationTime/create", { country, presentationTime: { alternative: false, ...presentationTime } });
    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  getByIds,
  update,
  remove,
  create,
};
