import axios from "../axios";
import { IPlanningPeople } from "../../interfaces/trails/planningPeople";

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

export const update = async (planningPeople: IPlanningPeople, country: string) => {
  try {
    const { data } = await axios.post("api/planningPerson/update", { country, planningPeople });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const remove = async (planningPeople: IPlanningPeople, country: string) => {
  try {
    const { data } = await axios.post("api/planningPerson/remove", { country, planningPeople: { ...planningPeople, relevance_status: false } });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const create = async (planningPeople: IPlanningPeople, country: string) => {
  try {
    const { data } = await axios.post("api/planningPeople/create", { country, planningPeople });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  getAll,
  update,
  remove,
  create,
};
