import axios from "axios";

export const getEUData = async (requestData: any) => {
  try {
    const { data } = await axios.post(`api/files/getEUData`, { ...requestData });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const obtainCsvFile = async (content: any, serverId: any, campaignId: any) => {
  try {
    const { data } = await axios.post(`api/files/obtainCsvFile`, { content, serverId, campaignId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const importRecords = async (request: any, serverId: any, campaignId: any) => {
  try {
    const { data } = await axios.post(`api/files/importRecords`, { request, serverId, campaignId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const importCsv = async (content: any, serverId: any, campaignId: any) => {
  try {
    const { data } = await axios.post(`api/files/importCsv`, { content, serverId, campaignId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  getEUData,
  obtainCsvFile,
  importRecords,
  importCsv,
};
