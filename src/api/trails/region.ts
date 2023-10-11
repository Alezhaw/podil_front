import axios from "../axios";
import { IRegion } from "../../interfaces/trails/regions";

export const update = async (region: IRegion, country: string) => {
  try {
    const { data } = await axios.post("api/region/update", { country, region });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (region: IRegion, country: string) => {
  try {
    const { data } = await axios.post("api/region/remove", { country, region: { ...region, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (region: IRegion, country: string) => {
  try {
    const { data } = await axios.post("api/region/create", { country, region });
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
