import axios from "../axios";
import { IRegion } from "../../interfaces/trails/regions";

export const update = async (region: IRegion, country: string) => {
  try {
    const { data } = await axios.post("api/region/update", { country, region: { ...region, timezone: Number(region?.timezone) || 0 } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (region: IRegion, country: string) => {
  try {
    const { data } = await axios.post("api/region/remove", { country, region: { ...region, relevance_status: false } });

    const removeCitiesResponse = await axios.post("api/cityWithReg/removeByRegion", {
      country,
      region_id: region.id,
      relevance_status: false,
    });
    return { data, removeCitiesResponse };
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (region: IRegion, country: string) => {
  try {
    const { data } = await axios.post("api/region/create", { country, region: { ...region, timezone: Number(region?.timezone) || 0 } });
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
