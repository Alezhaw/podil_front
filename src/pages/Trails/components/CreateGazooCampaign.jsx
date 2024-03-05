import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Autocomplete, TextField, Button, useTheme, Typography, IconButton, Checkbox, FormControlLabel, Select, MenuItem, InputLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import Blazor from "../../../api/blazor/blazor";
import Podzial from "../../../api/podzial";
import CreateCompanyQueue from "../../../api/createCompanyQueue";
import ServersQueue from "../../../api/serversQueue";
import GillieProfile from "../../../api/trails/gillieProfile";
import { getValueById } from "../../../components/functions";

import { customAlert } from "../../../components/Alert/AlertFunction";

function CreateGazooCampaign({ setIsOpen, trail, getTrail, trailId, allDictionary, allCitiesWithRegions, forms, allForms, createCity, messages }) {
  const theme = useTheme();
  const { country } = useAppSelector((store) => store.user);
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profilesLoading, setProfilesLoading] = useState(null);
  const [serverForGazooCompany, setServerForGazooCompany] = useState("");
  const [servers, setServers] = useState([]);
  const [instances, setInstances] = useState([]);
  const [allServers, setAllServers] = useState([]);
  const [serversLoading, setServersLoading] = useState(true);
  const [regionsIds, setRegionsIds] = useState([]);
  const [regionsIdsLoading, setRegionsIdsLoading] = useState(true);
  const [phoneGroupSets, setPhoneGroupSets] = useState(null);
  const [phoneGroupSetsLoading, setPhoneGroupSetsLoading] = useState(true);
  const [phoneGroup, setPhoneGroup] = useState(null);
  const [emptyServer, setEmptyServer] = useState(null);
  const [emptyServersList, setEmptyServersList] = useState([]);
  const [emptyServerLoading, setEmptyServerLoading] = useState(true);
  const [parametersFromServer, setParametersFromServer] = useState({});
  const [parametersFromServerLoading, setParametersFromServerLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [customGear, setCustomGear] = useState(null);
  const [customGift, setCustomGift] = useState(null);
  const [simulatedAgents, setSimulatedAgents] = useState([]);
  const [simulatedAgentsLoading, setSimulatedAgentsLoading] = useState(true);
  const [customProperty, setCustomProperty] = useState(false);

  function setServersProorityProperties(servers, serversQueue, busy) {
    return servers?.map((el) => ({ ...el, count: serversQueue?.find((item) => item?.url === el?.url)?.companyCount || 0, busy }));
  }

  async function getProfiles() {
    setProfilesLoading(true);
    const profiles = await GillieProfile.getAll();
    if (profiles && profiles[0]) {
      setProfiles(profiles);
      setCurrentProfile(profiles[0]);
      changeGillieProfile(profiles[0]);
    } else {
      customAlert({ message: "Profiles not found" });
    }
    setProfilesLoading(false);
  }

  async function changeGillieProfile(profile) {
    setCurrentProfile(profile);
    console.log("profile", profile);
    await getServer(profile);
  }

  async function getServer(profile) {
    setServersLoading(true);
    const result = await Promise.all([await Blazor.getInstances(), await Blazor.getServer()]);
    let instances = result[0];
    let tempServers = result[1];
    tempServers = tempServers?.map((el) => ({ ...el, instance: instances.find((item) => el?.url === item.ApiAddress) }))?.filter((el) => el.instance);
    tempServers = tempServers?.filter((el) => !!profile?.servers_url?.find((url) => url === el?.url));
    if (tempServers) {
      setServers(tempServers);
      setInstances(instances);
      setAllServers(result[1]);
      const serverForGazooCompany = result[1]?.find((el) => el?.id === trail?.gazooServerId);
      setServerForGazooCompany(instances?.find((el) => el?.ApiAddress === serverForGazooCompany?.url)?.Name);
      getEmptyServer(tempServers);
    } else {
      customAlert({ message: "Servers not found" });
      setIsOpen(false);
    }
    setServersLoading(false);
    return tempServers;
  }

  async function getEmptyServer(servers) {
    setEmptyServerLoading(true);
    let serversArray = [];
    const chunkSize = 10; //поставить 5-10
    for (let i = 0; i < servers.length; i += chunkSize) {
      const chunk = servers.slice(i, i + chunkSize);
      serversArray.push(chunk);
    }
    let emptyServers = [];
    let busyServers = [];
    for (let i = 0; i < serversArray.length; i++) {
      const result = await Promise.all(serversArray[i].map(async (el) => ({ ...el, filteredCampaigns: await Blazor.getFilteredCampaigns(el) })));
      const servers = result
        //?.filter((el) => el?.accountId === "65984c3c911d624fef981cdf")
        .filter((el) => !el?.filteredCampaigns?.responseData?.find((el) => el?.status === 1) && el?.filteredCampaigns?.responseData);
      const serversUrl = servers?.map((el) => el?.url);
      const serversWithCampaign = result.filter((el) => el?.filteredCampaigns?.responseData && !serversUrl?.includes(el.url));
      if (servers[0]) {
        emptyServers.push(...servers);
      }
      if (serversWithCampaign[0]) {
        busyServers.push(...serversWithCampaign);
      }
    }
    const serversQueue = (await ServersQueue.getByCountry(country)) || [];
    emptyServers = setServersProorityProperties(emptyServers, serversQueue, false);
    busyServers = setServersProorityProperties(busyServers, serversQueue, true);
    emptyServers = [...emptyServers, ...busyServers]?.sort((a, b) => a.count - b.count || a.busy - b.busy || String(a?.name)?.localeCompare(String(b?.name)));
    setEmptyServerLoading(false);
    setEmptyServersList(emptyServers);
    if (emptyServers[0]) {
      setEmptyServer(emptyServers[0]);
    } else {
      customAlert({ message: "All servers are busy" });
      setIsOpen(false);
    }
    console.log(1, emptyServers, busyServers);
    return emptyServers[0];
  }

  async function getRegionIds(trail) {
    const autozonningArray = getValueById(trail.city_id, "autozonning", allCitiesWithRegions);
    const cityName = getValueById(trail.city_id, "city_name", allCitiesWithRegions);
    if (autozonningArray && cityName) {
      const currentAutozonning = autozonningArray?.filter((el) => String(el).toLowerCase()?.includes(String(trail?.autozonning).toLowerCase()));
      let manyParts = currentAutozonning?.filter(
        (el) => String(el).toLowerCase()?.includes(String(trail?.autozonning).toLowerCase()) && String(el).toLowerCase() !== String(trail?.autozonning).toLowerCase()
      );
      const autozonningByCity = await Blazor.searchRegions(cityName);
      if (manyParts[0]) {
        setRegionsIdsLoading(true);
        manyParts = await Promise.all(manyParts?.map(async (el) => ({ name: el, autozonning: autozonningByCity })));
        setRegionsIdsLoading(false);
        if (manyParts && manyParts[0] && manyParts[0]?.autozonning?.TotalCount) {
          let regions = manyParts?.map((region) =>
            region?.autozonning?.Data?.find((el) => String(el?.RegionName)?.replaceAll("  ", " ").trim() === String(region?.name)?.replaceAll("  ", " ").trim())
          );
          if (!regions || !regions[0]) {
            return;
          }
          setRegionsIds(regions);
          console.log("regionIds many parts", regions); // в объекте - RegionName: "WARSZAWA - MIASTO I OKOLICA [1] P 1 CZĘŚĆ"
        }
        //получить несколько автозонингов по частям
      } else {
        console.log("regionIds current", currentAutozonning);
        setRegionsIdsLoading(true);
        let regions = autozonningByCity;
        setRegionsIdsLoading(false);
        if (!regions?.TotalCount) {
          return;
        }
        regions = regions?.Data?.find((el) => String(el?.RegionName)?.replaceAll("  ", " ").trim() === String(trail?.autozonning)?.replaceAll("  ", " ").trim());
        if (!regions) {
          return;
        }
        //setRegionsIds([regions?.Id]);
        setRegionsIds([regions]);

        return [regions?.Id];
      }
      console.log("regionIds", currentAutozonning, manyParts);
    } else {
      return customAlert({ message: "Get autozonning error" });
    }
  }

  async function getPhoneGroupSets() {
    setPhoneGroupSetsLoading(true);
    let phoneGroupSets = await Blazor.getPhoneGroupSets();
    setPhoneGroupSetsLoading(false);
    if (!phoneGroupSets) {
      return;
    }
    if (phoneGroupSets) {
      setPhoneGroupSets(phoneGroupSets);
    }
    return phoneGroupSets;
  }

  async function getParametersFromServer(emptyServer) {
    setParametersFromServerLoading(true);
    const profiles = await Blazor.getProfiles(emptyServer?.instance?.Id);

    let gears = await Blazor.getGears(emptyServer);
    if (!gears) {
      gears = [];
    }

    let gates = await Blazor.getGates(emptyServer);
    if (!gates) {
      gates = [];
    }
    gates = gates?.map((el) => el?.gateConfigurationModel?.gateId);
    console.log(profiles);
    const gifts = await Blazor.getGifts(emptyServer);
    setParametersFromServer({
      profiles,
      gears,
      gates,
      gifts,
    });
    setParametersFromServerLoading(false);

    return { profiles, gears, gates, gifts };
  }

  async function getSimulatedAgents(emptyServer, profiles, profile, currentProfile) {
    setSimulatedAgentsLoading(true);
    const simulatedAgents = await Blazor.getSimulatedAgents(
      emptyServer,
      (profile || profiles?.find((el) => String(el.Name).toLowerCase() === String(currentProfile?.profile_name)?.toLowerCase()) || profiles[0])?.Id
    );
    setSimulatedAgents(simulatedAgents);
    setSimulatedAgentsLoading(false);
    return simulatedAgents;
  }

  async function createGazooCampaign({ trail, servers, regionsIds, phoneGroupSets, emptyServer, profiles, gears, gates, gifts, simulatedAgents, currentProfile }) {
    if (!servers[0]) {
      return customAlert({ message: "Servers not found" });
    }
    if (!regionsIds[0]) {
      return customAlert({ message: "Autozonning not found" });
    }
    if (!phoneGroupSets[0]) {
      return customAlert({ message: "PhoneGroupSets not found" });
    }
    console.log("phoneGroupSets", phoneGroup, phoneGroupSets);

    if (regionsIds?.length > 1) {
      await Promise.all(
        regionsIds?.map(async (region, index) => {
          const currentServer = emptyServersList[index % emptyServersList?.length];
          await createCampaignWithCustomServers({ region, emptyServer: currentServer, trail, phoneGroupSets, currentProfile });
          console.log("indexes", index, currentServer);
        })
      );
    } else {
      await createCampaignWithCustomServers({ region: regionsIds[0], emptyServer, trail, phoneGroupSets, currentProfile });
    }
  }

  async function createCampaignWithCustomServers({ region, emptyServer, trail, phoneGroupSets, currentProfile }) {
    if (!emptyServer) {
      return customAlert({ message: "All servers are busy" });
    }
    const result = await getParametersFromServer(emptyServer);
    if (!result) {
      return customAlert({ message: "Error get data from gazoo server" });
    }
    const { profiles, gears, gates, gifts } = result;

    const simulatedAgents = await getSimulatedAgents(emptyServer, profiles, profile, currentProfile);

    if (!profiles && !profile) {
      return customAlert({ message: "Error getting profiles" });
    }
    if (!gears[0]) {
      return customAlert({ message: "Gears not found" });
    }
    if (!gates || !gates[0]) {
      return customAlert({ message: "Gates not found" });
    }
    if (!gifts) {
      return customAlert({ message: "Gifts not found" });
    }
    if (!simulatedAgents || !simulatedAgents[0]) {
      return customAlert({ message: "Simulated agents not found" });
    }

    // const newCampaing = {
    //   ExternalId: 2509,
    //   Id: 195333,
    //   InstanceId: 71,
    //   Name: `${getValueById(trail.regionId, "timezone", allDictionary?.regions)} ${getValueById(trail.city_id, "city_name", allCitiesWithRegions)} ${trail?.presentation_date} ${
    //     getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)
    //   }`,
    // };
    const newCampaing = await Blazor.createCampaing(
      `${getValueById(trail.regionId, "timezone", allDictionary?.regions)} ${getValueById(trail.city_id, "city_name", allCitiesWithRegions)} ${trail?.presentation_date} ${
        getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)
      }`,
      emptyServer?.instance?.Id,
      profile?.id || profiles?.find((el) => String(el?.Name).toLowerCase() === String(currentProfile?.profile_name).toLowerCase())?.id || profiles[0]?.Id
    );
    if (!newCampaing?.Id) {
      return customAlert({ message: "Error creating campaign" });
    }
    await ServersQueue.increase({ count: 1, url: emptyServer?.url, country, name: emptyServer?.name });
    console.log("newCampaing", newCampaing);

    const importData = await Blazor.importData(
      newCampaing?.InstanceId,
      newCampaing?.Id,
      (phoneGroup || phoneGroupSets?.find((el) => String(el?.Name).toLowerCase() === "cyrki pl od mm") || phoneGroupSets[0])?.PhoneGroupIds,
      [region?.Id]
    );
    console.log("importData", importData);

    let campaignWithProperty = await Blazor.getCampaign(emptyServer, newCampaing?.ExternalId);
    if (!campaignWithProperty) {
      return customAlert({ message: `Campaign to update settings not found, server: ${emptyServer?.instance?.Name || "Get server name error"}, id: ${newCampaing?.ExternalId}` });
    }
    const campaignDateArray = trail?.presentation_date?.split("-");
    const campaignDate = new Date(trail?.presentation_date);
    console.log("campaignDate", campaignDate, campaignDateArray);
    campaignWithProperty = {
      ...campaignWithProperty,
      botCount: currentProfile?.bots || 50,
      date: campaignDate || trail?.presentation_date,
      gates,
      dialerGearId: (
        customGear ||
        gears?.find((el) => String(el?.Name).toLowerCase() === String(currentProfile?.gears).toLowerCase()) ||
        gears?.find((el) => String(el?.name).toLowerCase() === "full conversation") ||
        gears[0]
      )?.id,
      simulatedAgents: simulatedAgents?.filter((el) => String(el).toLowerCase() === String(currentProfile?.simulated_agent).toLowerCase()),
      gift:
        customGift ||
        getValueById(trail.project_concent_id, "name", allDictionary?.projectConcent) ||
        gifts?.find((el) => String(el).toLowerCase() === String(currentProfile?.present).toLowerCase()) ||
        gifts[0],
      profileId: (profile || profiles?.find((el) => String(el?.Name).toLowerCase() === String(currentProfile?.profile_name).toLowerCase()) || profiles[0])?.Id,
    };
    const updatedCompaign = await Blazor.updateCampaign(emptyServer, campaignWithProperty);

    const resultUpdateTrail = await Trail.updateTrail({ ...trail, gazooServerId: emptyServer?.id, gazooCampaignId: newCampaing?.ExternalId }, country);
    if (!resultUpdateTrail) {
      customAlert({ message: "Error update trail company" });
    }
    await getTrail(trailId);

    const serverForGazooCompany = allServers?.find((el) => el?.id === emptyServer?.id);
    const serverNameWithCampaign = instances?.find((el) => el?.ApiAddress === serverForGazooCompany?.url)?.Name;
    const checkCity = await Podzial.getByTrail(trail?.id, null, country);
    if (!checkCity) {
      await createCity(trail, null, null, null, {}, true);
    }
    const base = await Podzial.createBaseByTrail(
      {
        podzial_id: `${newCampaing?.ExternalId} (${serverNameWithCampaign})`,
        type: region?.RegionName,
        gazooServerId: emptyServer?.id,
        gazooCampaignId: newCampaing?.ExternalId,
      },
      country,
      trail?.id
    );
    if (base?.bases && base?.bases[0]) {
      customAlert({ message: `Company added to podzial`, severity: "success" });
    } else {
      customAlert({ message: `Error adding company to podzial` });
    }
    console.log("created base", base);

    console.log(1, emptyServer, profiles, phoneGroupSets, campaignWithProperty, updatedCompaign);
    if (!updatedCompaign) {
      customAlert({ message: `The company was created on the ${emptyServer?.instance?.Name || "Get server name error"} server, id: ${newCampaing?.ExternalId}`, severity: "success" });
    }
    console.log("create company", `The company was created on the ${emptyServer?.instance?.Name || "Get server name error"} server, id: ${newCampaing?.ExternalId}`);
    let date = null;
    try {
      date = campaignDate?.toISOString()?.split("T")[0];
      date = date?.split("-");
      date = `${date[2]}.${date[1]}`;
    } catch (e) {
      console.log(e);
      date = trail?.presentation_date;
    }

    const addCampaign = await Blazor.addCampaign(
      newCampaing?.ExternalId,
      emptyServer?.id,
      `${getValueById(trail.regionId, "timezone", allDictionary?.regions)} ${getValueById(trail.city_id, "city_name", allCitiesWithRegions)} ${date} ${
        getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)
      }`,
      campaignDate || trail?.presentation_date
    );
  }

  useEffect(() => {
    getPhoneGroupSets();
    getProfiles();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (emptyServer) {
      getParametersFromServer(emptyServer);
    }
    // eslint-disable-next-line
  }, [emptyServer]);

  useEffect(() => {
    if (emptyServer && parametersFromServer?.profiles && currentProfile) {
      getSimulatedAgents(emptyServer, parametersFromServer?.profiles, profile, currentProfile);
    }
    // eslint-disable-next-line
  }, [emptyServer, parametersFromServer?.profiles, profile, currentProfile]);

  useEffect(() => {
    getRegionIds(trail);
    // eslint-disable-next-line
  }, [trail]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles styledScroll"
        style={{
          background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d",
          color: theme.palette.text.primary,
          alignItems: "baseline",
          position: "relative",
          maxHeight: "80vh",
          minWidth: "500px",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <div>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }}>
              <InputLabel>{`Gazoo ${messages?.profile}`}</InputLabel>
              <Select
                className="createSelect"
                label={`Gazoo ${messages?.profile}`}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={currentProfile || {}}
                onChange={(e) => changeGillieProfile(e?.target?.value)}
              >
                {profiles?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item?.country_name} {item?.profile_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {serversLoading || regionsIdsLoading || phoneGroupSetsLoading || emptyServerLoading || parametersFromServerLoading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Spinner />
              </div>
            ) : (
              <div className="createContainer" style={{ width: "100%", background: "transparent" }}>
                <div style={{ gap: "1rem" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={customProperty}
                        onChange={() => {
                          setCustomProperty((prev) => !prev);
                        }}
                      />
                    }
                    label={messages?.edit}
                    sx={{ color: "text.primary" }}
                  />
                  {customProperty ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }}>
                        <InputLabel>{messages?.profile}</InputLabel>
                        <Select
                          className="createSelect"
                          label={messages?.profile}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={
                            profile ||
                            parametersFromServer?.profiles?.find((el) => String(el?.Name).toLowerCase() === String(currentProfile?.profile_name).toLowerCase()) ||
                            parametersFromServer?.profiles[0]
                          }
                          onChange={(e) => setProfile(e?.target?.value)}
                        >
                          {parametersFromServer?.profiles?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item?.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }}>
                        <InputLabel>{"phoneGroupSets"}</InputLabel>
                        <Select
                          className="createSelect"
                          label={"phoneGroupSets"}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={phoneGroup || phoneGroupSets?.find((el) => String(el?.Name)?.toLowerCase() === "cyrki pl od mm")}
                          onChange={(e) => setPhoneGroup(e?.target?.value)}
                        >
                          {phoneGroupSets?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item?.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }}>
                        <InputLabel>{"Gifts"}</InputLabel>
                        <Select
                          className="createSelect"
                          label={"Gifts"}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={
                            customGift?.toLowerCase() ||
                            getValueById(trail.project_concent_id, "name", allDictionary?.projectConcent)?.toLowerCase() ||
                            parametersFromServer?.gifts?.find((el) => String(el).toLowerCase() === String(currentProfile?.present).toLowerCase())?.toLowerCase() ||
                            parametersFromServer?.gifts[0]?.toLowerCase()
                          }
                          onChange={(e) => setCustomGift(e?.target?.value)}
                        >
                          {parametersFromServer?.gifts?.map((item, index) => (
                            <MenuItem key={index} value={item?.toLowerCase()}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }}>
                        <InputLabel>{"Gears"}</InputLabel>
                        <Select
                          className="createSelect"
                          label={"Gears"}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={
                            customGear ||
                            parametersFromServer?.gears?.find((el) => String(el?.name).toLowerCase() === String(currentProfile?.gears).toLowerCase()) ||
                            parametersFromServer?.gears?.find((el) => String(el?.name).toLowerCase() === "full conversation")
                          }
                          onChange={(e) => setCustomGear(e?.target?.value)}
                        >
                          {parametersFromServer?.gears?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }}>
                        <InputLabel>{"Server"}</InputLabel>
                        <Select
                          className="createSelect"
                          label={"Server"}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={emptyServer || emptyServersList[0]}
                          onChange={(e) => setEmptyServer(e?.target?.value)}
                        >
                          {emptyServersList
                            ?.sort((a, b) => String(a?.name)?.localeCompare(String(b?.name)))
                            .map((item) => (
                              <MenuItem key={item?.id} value={item}>
                                {item?.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {trail?.gazooCampaignId ? `The company has already been created on ${serverForGazooCompany} id:${trail?.gazooCampaignId}` : null}
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem", justifyContent: "space-between" }}>
            <>
              <Button
                disabled={serversLoading || regionsIdsLoading || phoneGroupSetsLoading || emptyServerLoading || parametersFromServerLoading || simulatedAgentsLoading}
                variant="outlined"
                style={{ marginTop: "15px" }}
                onClick={() =>
                  createGazooCampaign({
                    trail,
                    servers,
                    regionsIds,
                    phoneGroupSets,
                    emptyServer,
                    ...parametersFromServer,
                    simulatedAgents,
                    currentProfile,
                  })
                }
              >
                {messages?.create}
              </Button>
              <Button
                variant="outlined"
                style={{ marginTop: "15px" }}
                onClick={async () => {
                  const campaignDate = new Date(trail?.presentation_date);
                  let date = null;
                  try {
                    date = campaignDate?.toISOString()?.split("T")[0];
                    date = date?.split("-");
                    date = `${date[2]}.${date[1]}`;
                  } catch (e) {
                    console.log(e);
                    date = trail?.presentation_date;
                  }
                  const result = await CreateCompanyQueue.create({
                    trailId: trail?.id,
                    country,
                    autozonning: trail?.autozonning,
                    date: trail?.presentation_date,
                    name: `${getValueById(trail.regionId, "timezone", allDictionary?.regions)} ${getValueById(trail.city_id, "city_name", allCitiesWithRegions)} ${date} ${
                      getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)
                    }`,
                    profileId: currentProfile?.id,
                  });
                  console.log(1, result);
                  if (!result?.message) {
                    customAlert({ message: "Sucess", severity: "success" });
                  } else {
                    customAlert({ message: `${result?.message || "Something went wrong"}` });
                  }
                }}
              >
                {messages?.queue}
              </Button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGazooCampaign;
