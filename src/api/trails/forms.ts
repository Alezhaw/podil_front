import axios from "../axios";
import { IForm } from "../../interfaces/trails/form";

let controllerGetByName: AbortController | null = null;

export const getByName = async ({ city_id, search = "", country = "" }: { city_id: number; search: string; country: string }) => {
  try {
    if (controllerGetByName !== null) {
      controllerGetByName.abort();
    }
    controllerGetByName = new AbortController();
    const { data } = await axios.post(
      "api/form/getByName",
      {
        city_id,
        search,
        country,
      },
      { signal: controllerGetByName.signal }
    );
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

export const create = async (form: IForm, country: string) => {
  //отключить кнопку пока идет создание
  try {
    const { data } = await axios.post("api/form/create", { country, form });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  getByName,
  create,
};
