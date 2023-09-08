import axios from "axios";

let controllerGetAllTemplates: AbortController | null = null;
let controllerGetTypeTemplates: AbortController | null = null;
let controllerGetByTypeTemplates: AbortController | null = null;

export const createTemplates = async (name: string, type: number, text: string) => {
  try {
    const { data } = await axios.post("api/speakerTemplate/create", { name, type, text });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateTemplates = async (name: string, type: number, text: string, id: number) => {
  try {
    const { data } = await axios.post("api/speakerTemplate/update", { name, type, text, id });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllTemplates = async () => {
  try {
    if (controllerGetAllTemplates !== null) {
      controllerGetAllTemplates.abort();
    }
    controllerGetAllTemplates = new AbortController();
    const { data } = await axios.get("api/speakerTemplate/getAll", { signal: controllerGetAllTemplates.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const getTypeTemplates = async () => {
  try {
    if (controllerGetTypeTemplates !== null) {
      controllerGetTypeTemplates.abort();
    }
    controllerGetTypeTemplates = new AbortController();
    const { data } = await axios.get("api/speakerTemplate/getTypes", { signal: controllerGetTypeTemplates.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};

export const getByTypeTemplates = async (type: number) => {
  try {
    if (controllerGetByTypeTemplates !== null) {
      controllerGetByTypeTemplates.abort();
    }
    controllerGetByTypeTemplates = new AbortController();
    const { data } = await axios.post("api/speakerTemplate/getByType", { type }, { signal: controllerGetByTypeTemplates.signal });
    return data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      console.error(e);
    }
  }
};
