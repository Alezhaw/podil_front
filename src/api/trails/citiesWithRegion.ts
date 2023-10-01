import axios from "../axios";
let controllerGetByRegion: AbortController | null = null;

export const getByRegion = async ({ region_id, country = "" }: { region_id: number; country: string }) => {
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
