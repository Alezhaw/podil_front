import axios from "../axios";
import { IContactStatus } from "../../interfaces/trails/contactStatus";

export const update = async (contactStatus: IContactStatus, country: string) => {
  try {
    const { data } = await axios.post("api/contactStatus/update", { country, contactStatus });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const remove = async (contactStatus: IContactStatus, country: string) => {
  try {
    const { data } = await axios.post("api/contactStatus/remove", { country, contactStatus: { ...contactStatus, relevance_status: false } });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const create = async (contactStatus: IContactStatus, country: string) => {
  try {
    const { data } = await axios.post("api/contactStatus/create", { country, contactStatus });
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
