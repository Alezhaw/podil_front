import axios from "../axios";

let controllerGetAllPlanningPeople: AbortController | null = null;

export const getAll = async ({ country = "" }: { country: string }) => {
  try {
    if (controllerGetAllPlanningPeople !== null) {
      controllerGetAllPlanningPeople.abort();
    }
    controllerGetAllPlanningPeople = new AbortController();
    const { data } = await axios.post("api/planningPerson/getAll", { country }, { signal: controllerGetAllPlanningPeople.signal });
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
  getAll,
};
