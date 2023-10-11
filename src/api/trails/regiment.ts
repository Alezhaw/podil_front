import axios from "../axios";
import { IRegiment } from "../../interfaces/trails/regiment";

export const update = async (regiment: IRegiment, country: string) => {
  try {
    const { data } = await axios.post("api/regiment/update", { country, regiment });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (regiment: IRegiment, country: string) => {
  try {
    const { data } = await axios.post("api/regiment/remove", { country, regiment: { ...regiment, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (regiment: IRegiment, country: string) => {
  try {
    const { data } = await axios.post("api/regiment/create", { country, regiment });
    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  update,
  remove,
  create,
};
