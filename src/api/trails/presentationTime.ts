import axios from "../axios";
import { IPresentationTime } from "../../interfaces/trails/presentationTime";

export const update = async (presentationTime: IPresentationTime, country: string) => {
  try {
    const { data } = await axios.post("api/presentationTime/update", { country, presentationTime });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const remove = async (presentationTime: IPresentationTime, country: string) => {
  try {
    const { data } = await axios.post("api/presentationTime/remove", { country, presentationTime: { ...presentationTime, relevance_status: false } });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const create = async (presentationTime: IPresentationTime, country: string) => {
  try {
    const { data } = await axios.post("api/presentationTime/create", { country, presentationTime });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  update,
  remove,
  create,
};
