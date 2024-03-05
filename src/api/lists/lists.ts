import axios from "../axios";
import { IList } from "../../interfaces/lists/list";

let controllerGetFiltered: AbortController | null = null;
let controllerGetByIds: AbortController | null = null;
let controllerGetByIdsForBase: AbortController | null = null;

export const getFiltered = async ({
  pageSize = 10,
  page = 0,
  sort = true,
  speakerZamkniete,
  speakerInProgress,
  speakerCanceled,
  scenarioZamkniete,
  scenarioInProgress,
  scenarioCanceled,
  baseZamkniete,
  baseInProgress,
  baseCanceled,
  zamkniete,
  inProgress,
  canceled,
  visibleInPodil,
  visibleInBases,
  visibleInSpeaker,
  visibleInScenario,
  search = "",
  country = "",
  filterDate,
}: {
  pageSize: number;
  page: number;
  baseZamkniete: boolean;
  baseInProgress: boolean;
  baseCanceled: boolean;
  canceled: boolean;
  zamkniete: boolean;
  inProgress: boolean;
  search: string;
  scenarioInProgress: boolean;
  scenarioZamkniete: boolean;
  scenarioCanceled: boolean;
  speakerInProgress: boolean;
  speakerZamkniete: boolean;
  speakerCanceled: boolean;
  visibleInPodil: boolean;
  visibleInBases: boolean;
  visibleInSpeaker: boolean;
  visibleInScenario: boolean;
  sort: boolean;
  country: string;
  filterDate: { dateFrom: string; dateTo: string } | {};
}) => {
  try {
    if (controllerGetFiltered !== null) {
      controllerGetFiltered.abort();
    }
    controllerGetFiltered = new AbortController();
    const result = await axios.post(
      "api/list/getFiltered",
      {
        pageSize,
        page,
        sort,
        filter: {
          speakerZamkniete,
          speakerInProgress,
          speakerCanceled,
          scenarioZamkniete,
          scenarioInProgress,
          scenarioCanceled,
          baseZamkniete,
          baseInProgress,
          baseCanceled,
          zamkniete,
          inProgress,
          canceled,
          visibleInPodil,
          visibleInBases,
          visibleInSpeaker,
          visibleInScenario,
          ...filterDate,
        },
        search,
        country,
      },
      { signal: controllerGetFiltered.signal }
    );
    const data = result?.data;
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

export const getByIds = async ({ ids, country }: { ids: number[]; country: string }) => {
  try {
    if (controllerGetByIds !== null) {
      controllerGetByIds.abort();
    }
    controllerGetByIds = new AbortController();
    const { data } = await axios.post(
      "api/list/getByIds",
      {
        ids,
        country,
      },
      { signal: controllerGetByIds.signal }
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

export const getByIdsForBase = async ({ idsForBase, country, search, page, pageSize }: { idsForBase: number[]; country: string; search: string; page: number; pageSize: number }) => {
  try {
    if (controllerGetByIdsForBase !== null) {
      controllerGetByIdsForBase.abort();
    }
    controllerGetByIdsForBase = new AbortController();
    const { data } = await axios.post(
      "api/list/getByIdsForBase",
      {
        idsForBase,
        country,
        search,
        page,
        pageSize,
      },
      { signal: controllerGetByIdsForBase.signal }
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

export const getFromTable = async ({ key, range, apiKey }: { key: string; range: string; apiKey: string }) => {
  if (!key || !range || !apiKey) return alert("Maintain all data");
  try {
    const { values }: { values: any } = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${key}/values/${range}?key=${apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });

    return values;
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export const create = async (country: string, id_for_base: number, tableKey: string, range: string) => {
  try {
    const { data } = await axios.post("api/list/create", { country, id_for_base, tableKey, range });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const update = async (list: IList, country: string) => {
  try {
    const { data } = await axios.post("api/list/update", { country, list });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export const remove = async (ids: number[], country: string, relevance_status: boolean) => {
  try {
    const { data } = await axios.post("api/list/remove", { country, ids, relevance_status });

    return data;
  } catch (e: any) {
    return e?.response?.data;
  }
};

export default {
  getFiltered,
  getByIds,
  getByIdsForBase,
  getFromTable,
  create,
  update,
  remove,
};
