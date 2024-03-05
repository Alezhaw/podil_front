import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import Podzial from "../../../api/podzial";
import Lists from "../../../api/lists/lists";
import Departure from "../../../api/trails/departure";
import Blazor from "../../../api/blazor/blazor";
import Files from "../../../api/blazor/files";
import AllPotwTable from "./AllPotwTable";
import Trail from "../../../api/trails/trails";
import CreateCompanyQueue from "../../../api/createCompanyQueue";
import ServersQueue from "../../../api/serversQueue";
import GillieProfile from "../../../api/trails/gillieProfile";
import { getFormatTime } from "../../../utils/utils";
import { PageContainer } from "../../../components/Page.styled";
import PaginationBlock from "../../../components/forPages/PaginationBlock";
import { customAlert } from "../../../components/Alert/AlertFunction";
import MyDatePicker from "../../../components/forPages/MyDatePicker";

function AllPotw() {
  const dispatch = useDispatch();
  const [filterDate, setFilterDate] = useState("2024-08-02");
  const { storedCities, bases, user, locale, country, servers, instances, trailsForCampaign, departure } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [uniqueDepartureDateId, setUniqueDepartureDateId] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [zoom, setZoom] = useState(Number(localStorage.getItem("tableZoomPotw")) || 1);

  const messages = useMemo(() => {
    return {
      type: locale["type"],
      city: locale["logs_city"],
      time: locale["time"],
      consent: locale["consent"],
      another_city: locale["another_city"],
      import_csv: locale["import_csv"],
      items_per_page: locale["items_per_page"],
    };
  }, [locale]);

  async function getDeparture(storedCities) {
    const ids = storedCities
      ?.filter((item, i, ar) => ar.map((el) => el.departureId).indexOf(item.departureId) === i)
      ?.map((el) => el?.departureId)
      ?.filter((el) => !!el);
    if (!ids[0]) {
      return;
    }
    const result = await Departure.getById({ country, ids });
    if (result?.departures) {
      dispatch({
        type: reducerTypes.GET_DEPARTURE,
        payload: result?.departures,
      });
    } else {
      customAlert({ message: "Error getting departure list" });
    }
  }

  async function getFilteredCities({ page, itemsPerPage, country, filterDate }) {
    if (!filterDate) {
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: [],
      });
      return setLoadingSpinner(true);
    }
    setLoadingSpinner(false);
    const data = await Lists.getFiltered({
      visibleInPodil: true,
      page: page + 1,
      pageSize: itemsPerPage,
      sort: false,
      inProgress: true,
      zamkniete: true,
      canceled: false,
      country,
      filterDate: filterDate ? { dateFrom: filterDate, dateTo: filterDate } : {},
    });
    setLoadingSpinner(true);
    if (data) {
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: data.cities,
      });
      dispatch({
        type: reducerTypes.GET_LISTS,
        payload: data.lists,
      });
      dispatch({
        type: reducerTypes.GET_TRAILS_FOR_CAMPAIGN,
        payload: data.trails,
      });
    }
  }

  async function getBases(cities) {
    if (!cities || !cities[0]) {
      return;
    }

    const ids = cities?.map((el) => el?.id_for_base);
    const result = await Podzial?.getBasesByIdsForBase(ids, country);
    if (result?.bases) {
      dispatch({
        type: reducerTypes.GET_BASES,
        payload: result?.bases || [],
      });
    } else {
      customAlert({ message: `Error getting bases` });
    }
  }

  async function getServers() {
    try {
      const result = await Promise.all([await Blazor.getInstances(), await Blazor.getServer()]);
      let instances = result[0];
      let servers = result[1];
      dispatch({
        type: reducerTypes.GET_SERVER,
        payload: servers,
      });
      dispatch({
        type: reducerTypes.GET_INSTANCE,
        payload: instances,
      });
    } catch (e) {
      customAlert({ message: `Error getting server list` });
    }
  }

  const convertCSVToJson = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim();
      }

      result.push(obj);
    }

    return result;
  };

  async function getEUData(uniqueDepartureDateId, bases) {
    console.log("uniqueDepartureDateId", uniqueDepartureDateId);
    if (!uniqueDepartureDateId[0]) {
      customAlert({ message: `Cities not found` });
    }

    if (!bases[0]) {
      customAlert({ message: `Bases not found` });
    }
    let cityWithGenerationType = uniqueDepartureDateId?.map((array) => array?.map((el) => el?.filter((time) => !!time?.generationType)));
    cityWithGenerationType = cityWithGenerationType?.map((array) => array?.filter((el) => !!el[0]));
    cityWithGenerationType = cityWithGenerationType?.flat();
    const cityForPBX = cityWithGenerationType?.map((city) => city?.filter((time) => time?.generationType === "PBX"))?.filter((el) => !!el[0]);
    const cityForBot = cityWithGenerationType?.map((city) => city?.filter((time) => time?.generationType === "BOT"))?.filter((el) => !!el[0]);
    console.log("2", cityForPBX, cityForBot);
    setCreateLoading(true);
    const cityForBotResult = await Promise.all(
      cityForBot?.map(async (city) => {
        const firstTime = city[0];
        const cityData = {
          city: firstTime?.city_lokal,
          place: firstTime?.institution,
          date: new Date(firstTime?.date),
          address: firstTime?.adress,
          times: city?.map((el) => el?.time),
          campaigns: bases?.filter((base) => base?.id_for_base === firstTime?.id_for_base)?.map((base) => ({ serverId: base?.gazooServerId || "", campaignId: base?.gazooCampaignId || 0 })),
          timezone: firstTime?.timezone,
          dateForName: firstTime?.date,
          type: 1,
          id_for_base: firstTime?.id_for_base,
        };
        console.log("firstTime", {
          ...cityData,
          id_for_base: firstTime?.id_for_base,
        });
        const result = await Files.getEUData({
          ...cityData,
        });
        return { ...cityData, content: result };
      })
    );

    /* const cityForPBXResult = await Promise.all(
      cityForPBX?.map(async (city) => {
        const firstTime = city[0];
        const cityData = {
          city: firstTime?.city_lokal,
          place: firstTime?.institution,
          date: new Date(firstTime?.date),
          address: firstTime?.adress,
          times: city?.map((el) => el?.time),
          campaigns: bases?.filter((base) => base?.id_for_base === firstTime?.id_for_base)?.map((base) => ({ serverId: base?.gazooServerId || "", campaignId: base?.gazooCampaignId || 0 })),
          timezone: firstTime?.timezone,
          dateForName: firstTime?.date,
          type: 0,
        };
        console.log("firstTime", {
          ...cityData,
          id_for_base: firstTime?.id_for_base,
        });
        const result = await Files.getEUData({
          ...cityData,
        });
        return { ...cityData, content: result };
      })
    );*/
    const csvFiles = cityForBotResult[0]?.content?.data;
    const createCampaigns = await Promise.all(
      cityForBotResult?.map(async (item, index) => {
        const emptyServers = await getEmptyServer(servers);
        if (!emptyServers[0]) {
          return customAlert({ message: "All servers are busy" });
        }
        const currentServer = emptyServers[index % emptyServers?.length];
        return await createCampaignWithCustomServers({ item, emptyServer: currentServer, servers, instances });
      })
    );

    console.log("csvFile", csvFiles);
    //const cityArray = uniqueDepartureDateId?.
    //const result = Files.getEUData();
    //console.log('files', result)
    setCreateLoading(false);
  }

  async function createCampaignWithCustomServers({ item, emptyServer, servers, instances }) {
    if (!emptyServer) {
      return customAlert({ message: "All servers are busy" });
    }
    console.log("emptyServer", emptyServer);
    const result = await getParametersFromServer(emptyServer);
    if (!result) {
      return customAlert({ message: "Error get data from gazoo server" });
    }
    const { profiles, gears, gates, gifts } = result;
    const simulatedAgents = await Blazor.getSimulatedAgents(emptyServer, profiles[0]?.Id);
    if (!simulatedAgents || !simulatedAgents[0]) {
      return customAlert({ message: "Simulated agents not found" });
    }
    if (!profiles || !profiles[0]) {
      return customAlert({ message: "Error getting profiles" });
    }
    if (!gears || !gears[0]) {
      return customAlert({ message: "Gears not found" });
    }
    if (!gates || !gates[0]) {
      return customAlert({ message: "Gates not found" });
    }
    if (!gifts || !gifts[0]) {
      return customAlert({ message: "Gifts not found" });
    }
    // const newCampaing = {
    //   ExternalId: 2509,
    //   Id: 195333,
    //   InstanceId: 71,
    //   Name: `${getValueById(trail.regionId, "timezone", allDictionary?.regions)} ${getValueById(trail.city_id, "city_name", allCitiesWithRegions)} ${trail?.presentation_date} ${
    //     getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)
    //   }`,
    // };

    const newCampaing = await Blazor.createCampaing(`${item?.timezone} ${item?.city} ${item?.place} POTWIERDZENIA ${item?.dateForName}`, emptyServer?.instance?.Id, profiles[0]?.Id);
    if (!newCampaing?.Id) {
      return customAlert({ message: "Error creating campaign" });
    }
    await ServersQueue.increase({ count: 1, url: emptyServer?.url, country, name: emptyServer?.name });

    //import data

    if (item?.content?.data === '"Telefon;Kampania Godzina;Godzina;Imie;Nazwisko;Miejsce;Przekładka Godzinowa;Skrypt rozmowy;Inne Miasto\n"') {
      return customAlert({ message: `Zgody not found ${item?.city}/${item?.dateForName}/${item?.times?.join(",")}` });
    }
    const obtainedFile = await Files.obtainCsvFile(item?.content?.data, emptyServer?.id, String(newCampaing?.ExternalId));
    if (!obtainedFile) {
      return customAlert({ message: "Import CSV error" });
    }
    console.log("obtainedFile", obtainedFile);
    const importRecords = await Files.importRecords(obtainedFile?.data, emptyServer?.id, String(newCampaing?.ExternalId));
    if (!obtainedFile) {
      return customAlert({ message: "Import CSV error" });
    }
    console.log("importRecords", importRecords);
    //const importData = await Files.importCsv(item?.content?.data, emptyServer?.id, String(newCampaing?.ExternalId));

    let campaignWithProperty = await Blazor.getCampaign(emptyServer, newCampaing?.ExternalId);
    if (!campaignWithProperty) {
      return customAlert({ message: `Campaign to update settings not found, server: ${emptyServer?.instance?.Name || "Get server name error"}, id: ${newCampaing?.ExternalId}` });
    }

    campaignWithProperty = {
      ...campaignWithProperty,
      botCount: 20,
      date: item?.date,
      gates,
      dialerGearId: (gears?.find((el) => String(el?.name).toLowerCase() === "full conversation") || gears[0])?.id,
      simulatedAgents: [simulatedAgents[0]],
      gift: gifts[0],
      profileId: profiles[0]?.Id,
    };
    const updatedCompaign = await Blazor.updateCampaign(emptyServer, campaignWithProperty);

    const base = await Podzial.createBase(
      [
        {
          id_for_base: item?.id_for_base,
          podzial_id: `${newCampaing?.ExternalId} (${emptyServer?.name})`,
          type: "POTWIERDZENIA",
          gazooServerId: emptyServer?.id,
          gazooCampaignId: newCampaing?.ExternalId,
        },
      ],
      country
    );
    if (base?.bases && base?.bases[0]) {
      customAlert({ message: `Company added to podzial`, severity: "success" });
    } else {
      customAlert({ message: `Error adding company to podzial` });
    }
    if (!updatedCompaign) {
      customAlert({ message: `The company was created on the ${emptyServer?.instance?.Name || "Get server name error"} server, id: ${newCampaing?.ExternalId}`, severity: "success" });
    }
    console.log("created base", base);
    // const addCampaign = await Blazor.addCampaign(
    //   newCampaing?.ExternalId,
    //   emptyServer?.id,
    //   `${item?.timezone} ${item?.city} ${item?.dateForName} ${item?.place}`,
    //   item?.date
    // );
  }

  function setServersProorityProperties(servers, serversQueue, busy) {
    return servers?.map((el) => ({ ...el, count: serversQueue?.find((item) => item?.url === el?.url)?.companyCount || 0, busy }));
  }

  async function getEmptyServer(servers) {
    servers = servers?.map((el) => ({ ...el, instance: instances.find((item) => el?.url === item.ApiAddress) }))?.filter((el) => el.instance);
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
      const serversQueue = (await ServersQueue.getByCountry(country)) || [];
      emptyServers = setServersProorityProperties(emptyServers, serversQueue, false);
      busyServers = setServersProorityProperties(busyServers, serversQueue, true);
      emptyServers = [...emptyServers, ...busyServers]?.sort((a, b) => a.count - b.count || a.busy - b.busy || String(a?.name)?.localeCompare(String(b?.name)));
    }
    return emptyServers;
  }

  async function getParametersFromServer(emptyServer) {
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

    const gifts = await Blazor.getGifts(emptyServer);

    return { profiles, gears, gates, gifts };
  }

  function changeZoom(e, value) {
    localStorage.setItem("tableZoomPotw", value);
    setZoom(value);
  }

  useEffect(() => {
    getDeparture(storedCities);
    getBases(storedCities);
    const citiesWithoutTimes = storedCities
      .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
      ?.sort((a, b) => {
        const date = new Date(b?.date) - new Date(a?.date);
        const departure_date_id = b?.departure_date_id - a?.departure_date_id;
        const calling_scheme = a?.calling_scheme?.localeCompare(b?.calling_scheme);
        const city_local = a?.city_lokal?.localeCompare(b?.city_lokal);
        return date || departure_date_id || city_local || calling_scheme;
      });
    setUniqueDepartureDateId(
      citiesWithoutTimes
        ?.filter((item, i, ar) => ar.map((el) => el.departure_date_id).indexOf(item.departure_date_id) === i)
        ?.map((el) =>
          citiesWithoutTimes
            ?.filter((item) => item?.departure_date_id === el?.departure_date_id)
            ?.map((el) => storedCities?.filter((time) => time.id_for_base === el.id_for_base))
            ?.map((item) => item?.sort((a, b) => getFormatTime(a) - getFormatTime(b)))
        )
    );
    setCities(citiesWithoutTimes?.map((el) => storedCities?.filter((time) => time.id_for_base === el.id_for_base))?.map((item) => item?.sort((a, b) => getFormatTime(a) - getFormatTime(b))));
  }, [storedCities]);

  useEffect(() => {
    getFilteredCities({ page, itemsPerPage, country, filterDate });
    // eslint-disable-next-line
  }, [page, itemsPerPage, country, filterDate, user]);

  useEffect(() => {
    getServers();
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <MyDatePicker
            label={"Date"}
            onChange={(e) =>
              setFilterDate((prev) => {
                let date = new Date(e);
                date.setDate(date.getDate() + 1);
                let dateFrom;
                try {
                  dateFrom = date.toISOString().split("T")[0];
                } catch {
                  return prev;
                }
                if (!e) {
                  dateFrom = null;
                }
                return dateFrom;
              })
            }
          />
        </div>

        {loadingSpinner ? (
          <div className="scroll" style={{ overflowX: "auto", textAlign: "center" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, zoom }} aria-label="simple table" className="centerTable" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>{messages?.type}</TableCell>
                    <TableCell>{messages?.city}</TableCell>
                    <TableCell>{messages?.time}</TableCell>
                    <TableCell>{messages?.consent}</TableCell>
                    <TableCell>{messages?.another_city}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uniqueDepartureDateId?.map((el, departureIndex) =>
                    el?.map((item, index) => (
                      <AllPotwTable
                        key={`${item.id}-${index}`}
                        departureArray={el}
                        departureIndex={departureIndex}
                        departure={departure}
                        arrayIndex={index}
                        currentCities={item}
                        country={country}
                        trailsForCampaign={trailsForCampaign}
                        servers={servers}
                        instances={instances}
                        setUniqueDepartureDateId={setUniqueDepartureDateId}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
          </div>
        )}

        {!!uniqueDepartureDateId?.find((array) => !!array?.find((el) => !!el?.find((el) => !!el.generationType))) ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Button disabled={createLoading} variant="outlined" onClick={() => getEUData(uniqueDepartureDateId, bases)}>
              {messages?.import_csv}
            </Button>
          </div>
        ) : null}
        <PaginationBlock
          count={count}
          page={page}
          setPage={setPage}
          setItemsPerPage={setItemsPerPage}
          itemsPerPageForInput={itemsPerPageForInput}
          setItemsPerPageForInput={setItemsPerPageForInput}
          messages={messages}
          zoom={zoom}
          changeZoom={changeZoom}
        />
      </div>
    </PageContainer>
  );
}

export default AllPotw;
