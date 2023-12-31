import axios from "../axios";
import { IProjectSales } from "../../interfaces/trails/projectSales";

export const update = async (projectSales: IProjectSales, country: string) => {
  try {
    const { data } = await axios.post("api/projectSales/update", { country, projectSales });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (projectSales: IProjectSales, country: string) => {
  try {
    const { data } = await axios.post("api/projectSales/remove", { country, projectSales: { ...projectSales, relevance_status: false } });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const create = async (projectSales: IProjectSales, country: string) => {
  try {
    const { data } = await axios.post("api/projectSales/create", { country, projectSales });
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
