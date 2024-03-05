import axios from "axios";
import { IServer } from "../../interfaces/blazor/server";
import { ICampaign } from "../../interfaces/blazor/campaign";
const blazorDefaultUrl = "https://10.41.4.199:5001/";

export const serviceServer = {
  id: "test",
  AccountId: "1",
  URL: "https://10.34.30.22:12000",
};

export const instance = axios.create({
  baseURL: blazorDefaultUrl,
  headers: { "Content-Type": "application/json", XApiKey: "3f961c47b5b49877fcadb1e8031857b0ce77eea655f5d3b33eea68faaf49c162" },
});

// CLIENTS

export const getServer = async () => {
  try {
    const { data } = await axios.get("api/blazor/getServers/");

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getInstances = async () => {
  try {
    const { data } = await axios.get("api/blazor/getInstances/");

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getProfiles = async (instanceId: number) => {
  try {
    const { data } = await axios.post(`api/blazor/getProfiles`, { instanceId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getPhoneGroupSets = async () => {
  try {
    const { data } = await axios.get(`api/blazor/getPhoneGroupSets`);

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const importData = async (instanceId: number, campaignId: number, phoneGroups: number[], regionsIds: number[]) => {
  try {
    const { data } = await axios.post("api/blazor/importData", {
      instanceId,
      campaignId,
      phoneGroups,
      regionsIds,
    });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const searchRegions = async (query: string) => {
  try {
    const { data } = await axios.post(`api/blazor/searchRegions`, { query });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createCampaing = async (campaignName: string, instanceId: number, profileId: number) => {
  try {
    const { data } = await axios.post(`api/blazor/createCampaing/`, { campaignName, instanceId, profileId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

//GAZOO

export const campaignCallingControl = async (server: IServer, campaignId: number, action: number) => {
  try {
    const { data } = await axios.post("api/blazor/campaignCallingControl/", { server, campaignId, action });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getFilteredCampaigns = async (server: IServer) => {
  try {
    const { data } = await axios.post("api/blazor/getFilteredCampaigns/", { server });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getGears = async (server: IServer) => {
  try {
    const { data } = await axios.post(`api/blazor/getGears`, { server });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getGifts = async (server: IServer) => {
  try {
    const { data } = await axios.post(`api/blazor/getGifts`, { server });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getSimulatedAgents = async (server: IServer, profileId: number) => {
  try {
    const { data } = await axios.post(`api/blazor/getSimulatedAgents`, { server, profileId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getGates = async (server: IServer) => {
  try {
    const { data } = await axios.post(`api/blazor/getGates`, { server });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getGazooProfiles = async (server: IServer) => {
  try {
    const { data } = await axios.post(`api/blazor/getGazooProfiles`, { server });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getCampaign = async (server: IServer, campaignId: number) => {
  try {
    const { data } = await axios.post(`api/blazor/getCampaign`, { server, campaignId });

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateCampaign = async (server: IServer, campaign: ICampaign) => {
  try {
    const { data } = await axios.post(`api/blazor/updateCampaign`, { server, campaign });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const addCampaign = async (campaignId: number, serverId: number, CampaignName: string, Date: any, LastAction?: string) => {
  try {
    console.log("campaignDate 2", Date);
    const { data } = await axios.post(`api/blazor/addCampaign`, { campaignId, serverId, LastAction: LastAction || "Podzial", CampaignName, Date });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default {
  getInstances,
  getServer,
  getProfiles,
  getPhoneGroupSets,
  importData,
  searchRegions,
  createCampaing,
  campaignCallingControl,
  getFilteredCampaigns,
  getGears,
  getGifts,
  getSimulatedAgents,
  getGates,
  getGazooProfiles,
  getCampaign,
  updateCampaign,
  addCampaign,
};
