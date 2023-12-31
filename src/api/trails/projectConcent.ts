import axios from "../axios";
import { IProjectConcent } from "../../interfaces/trails/projectConcent";
export const update = async (projectConcent: IProjectConcent, country: string) => {
  try {
    const { data } = await axios.post("api/projectConcent/update", { country, projectConcent });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (projectConcent: IProjectConcent, country: string) => {
  try {
    const { data } = await axios.post("api/projectConcent/remove", { country, projectConcent: { ...projectConcent, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (projectConcent: IProjectConcent, country: string) => {
  try {
    const { data } = await axios.post("api/projectConcent/create", { country, projectConcent });
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
