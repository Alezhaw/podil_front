import axios from "../axios";
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

export default {
  getByName,
};
