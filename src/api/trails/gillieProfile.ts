import axios from "../axios";
import { IGillieProfile } from "../../interfaces/trails/gillieProfile";

let controllerGetAllGillieProfile: AbortController | null = null;

export const getAll = async () => {
  try {
    if (controllerGetAllGillieProfile !== null) {
      controllerGetAllGillieProfile.abort();
    }
    controllerGetAllGillieProfile = new AbortController();
    const { data } = await axios.get("api/gillieProfile/getAll", { signal: controllerGetAllGillieProfile.signal });
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

export const update = async (profile: IGillieProfile) => {
  try {
    const { data } = await axios.post("api/gillieProfile/update", { profile });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (profile: IGillieProfile) => {
  try {
    const { data } = await axios.post("api/gillieProfile/remove", { profile: { ...profile, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (profile: IGillieProfile) => {
  try {
    const { data } = await axios.post("api/gillieProfile/create", { profile });
    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  getAll,
  update,
  remove,
  create,
};
