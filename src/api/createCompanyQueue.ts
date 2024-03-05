import axios from "axios";
import { IcreateCompanyQueue } from "../interfaces/blazor/createCompanyQueue";

export const create = async (companyQueue: IcreateCompanyQueue) => {
  try {
    const { data } = await axios.post("api/queue/create", { data: companyQueue });

    return data;
  } catch (e: any) {
    console.error(e);
    return e?.response?.data;
  }
};
export default {
  create,
};
