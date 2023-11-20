import axios from "../axios";
import { ICitiesWithReg } from "../../interfaces/trails/citiesWithReg";
let controllerGetByRegion: AbortController | null = null;

export const getByRegion = async ({ region_id, country = "", city_name = "" }: { region_id: number; country: string; city_name: string }) => {
  try {
    if (!region_id) {
      return;
    }
    if (controllerGetByRegion !== null) {
      controllerGetByRegion.abort();
    }
    controllerGetByRegion = new AbortController();
    const { data } = await axios.post(
      "api/cityWithReg/getByRegion",
      {
        region_id,
        country,
        city_name,
      },
      { signal: controllerGetByRegion.signal }
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
  getByRegion,
};
