import axios from "../axios";
import { ICallTemplate } from "../../interfaces/trails/callTemplate";

export const update = async (callTemplate: ICallTemplate, country: string) => {
  try {
    const { data } = await axios.post("api/callTemplates/update", { country, callTemplate });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (callTemplate: ICallTemplate, country: string) => {
  try {
    const { data } = await axios.post("api/callTemplates/remove", { country, callTemplate: { ...callTemplate, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (callTemplate: ICallTemplate, country: string) => {
  try {
    const { data } = await axios.post("api/callTemplates/create", { country, callTemplate });
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
