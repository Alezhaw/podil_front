import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { TextField, Checkbox, Button, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Spinner from "react-bootstrap/Spinner";
import { useAppSelector } from "../../store/reduxHooks";
import { reducerTypes } from "../../store/Users/types";
import { reducerTrailsTypes } from "../../store/Trails/trailsTypes";
import Podzial from "../../api/podzial";
import Trail from "../../api/trails/trails";
import Lists from "../../api/lists/lists";
import Departure from "../../api/trails/departure";
import Blazor from "../../api/blazor/blazor";
import AllCityTable from "./components/AllCityTable";
import { ContainerForTable } from "../../components/forPages/Table.styled";
import { allCitiesTableMock } from "../../components/mock/OutputMock";
import { getFormatTime } from "../../utils/utils";
import { PageContainer } from "../../components/Page.styled";
import PaginationBlock from "../../components/forPages/PaginationBlock";
import Columns from "./components/Columns";
import ListsTable from "./Lists/ListsTable";
import { customAlert } from "../../components/Alert/AlertFunction";
import MyDatePicker from "../../components/forPages/MyDatePicker";

function AllCities({ variant }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterDate, setFilterDate] = useState({});
  const [filterColumns, setFilterColumns] = useState([]);
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterZamkniete, setFilterZamkniete] = useState(true);
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [sortId, setSortId] = useState(true);
  const { storedCities, user, locale, country, selectedLang, lists, servers, instances, trailsForCampaign, departure } = useAppSelector((store) => store.user);
  const { allDictionary } = useAppSelector((store) => store.trails);
  const [cities, setCities] = useState([]);
  const [uniqueDepartureDateId, setUniqueDepartureDateId] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteCities, setDeleteCities] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [zoom, setZoom] = useState(Number(localStorage.getItem(variant === "podil" ? "tableZoomCities" : "tableZoomLists")) || 1);

  const messages = useMemo(() => {
    return {
      trail: locale["trails_name"],
      search: locale["search"],
      title: locale["all_cities_title"],
      canceled: locale["canceled"],
      in_progress: locale["in_progress"],
      closed: locale["closed"],
      columns: locale["columns"],
      new_presentation: locale["all_cities_new_presentation"],
      sort: locale["sort"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      citiesStatus: locale["cities_status"],
      update_bases: locale["city_id_update_bases"],
    };
  }, [locale]);

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, country, filterDate }) {
    setLoadingSpinner(false);
    const data = await Lists.getFiltered({
      visibleInPodil: true,
      page: page + 1,
      pageSize: itemsPerPage,
      sort: !sortId,
      search,
      inProgress: filterInProgress,
      zamkniete: filterZamkniete,
      canceled: filterCanceled,
      country,
      filterDate,
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

  function changeDeleteCities(checked, id_for_base) {
    if (checked) {
      setDeleteCities((prev) => [...prev, id_for_base]);
    } else {
      setDeleteCities((prev) => prev.filter((item) => item !== id_for_base));
    }
  }

  async function changeCitiesStatus(setChangeStatus, status, id_for_base) {
    setChangeStatus(true);
    const result = await Podzial.changeStatus(status, country, id_for_base);
    setChangeStatus(false);
    if (result) {
      //getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete,country });
    } else {
      customAlert({ message: `Change status error, id: ${id_for_base}` });
    }
  }

  async function updateBase({ country, id_for_bases }) {
    const result = await Podzial.updateBaseByGazoo(country, id_for_bases);
    if (result) {
      customAlert({ message: "Success", severity: "success" });
    } else {
      customAlert({ message: "Something went wrong" });
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

  async function getAllDictionary({ country }) {
    const allDictionary = await Trail.getAllDictionary({ country });
    if (allDictionary) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: allDictionary,
      });
    }
  }

  function changeZoom(e, value) {
    localStorage.setItem(variant === "podil" ? "tableZoomCities" : "tableZoomLists", value);
    setZoom(value);
  }

  useEffect(() => {
    setZoom(Number(localStorage.getItem(variant === "podil" ? "tableZoomCities" : "tableZoomLists")) || 1);
  }, [variant]);

  useEffect(() => {
    getDeparture(storedCities);
    const citiesWithoutTimes = storedCities
      .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
      ?.sort((a, b) => {
        const date = sortId ? new Date(b?.date) - new Date(a?.date) : new Date(a?.date) - new Date(b?.date);
        const departure_date_id = b?.departure_date_id - a?.departure_date_id;
        const calling_scheme = a?.calling_scheme?.localeCompare(b?.calling_scheme);
        const city_local = a?.city_lokal?.localeCompare(b?.city_lokal);
        const time = a?.time?.localeCompare(b?.time);
        return date || departure_date_id || time || city_local || calling_scheme;
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
    if (!storedCities || !storedCities[0] || !lists || !lists[0]) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, country, filterDate });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, country, filterDate });
    // eslint-disable-next-line
  }, [page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, country, filterDate]);

  useEffect(() => {
    const savedFilterColumns = JSON.parse(localStorage.getItem(`filterColumns ${selectedLang}`) || "[]");
    if (savedFilterColumns.length > 0) {
      const updatedFilterColumns = allCitiesTableMock(locale).map((el) => {
        const existingCheckValue = savedFilterColumns.find((cv) => cv.column === el.column);
        return existingCheckValue ? { ...el, value: existingCheckValue.value } : el;
      });
      setFilterColumns(updatedFilterColumns);
    } else {
      setFilterColumns(allCitiesTableMock(locale));
    }
  }, [locale, selectedLang]);

  useEffect(() => {
    getServers();
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      {/* <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1000 }}> */}
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1000, gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <TextField
            size="small"
            label={messages.search}
            variant="outlined"
            id="Search"
            value={searchForInput}
            onChange={(e) => setSearchForInput(e.target.value?.toLowerCase())}
            onBlur={(e) => {
              setPage(0);
              setSearch(e.target.value?.toLowerCase()?.trim());
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setPage(0);
                setSearch(e.target.value?.toLowerCase()?.trim());
              }
            }}
          />

          <MyDatePicker
            label={messages?.from}
            onChange={(e) =>
              setFilterDate((prev) => {
                let date = new Date(e);
                date.setDate(date.getDate() + 1);
                let dateFrom = null;
                try {
                  dateFrom = date.toISOString().split("T")[0];
                } catch {
                  return prev;
                }
                if (!e) {
                  dateFrom = null;
                }
                return { ...prev, dateFrom };
              })
            }
          />
          <MyDatePicker
            label={messages?.to}
            onChange={(e) =>
              setFilterDate((prev) => {
                let date = new Date(e);
                date.setDate(date.getDate() + 1);
                let dateTo = null;
                try {
                  dateTo = date.toISOString().split("T")[0];
                } catch {
                  return prev;
                }
                if (!e) {
                  dateTo = null;
                }
                return { ...prev, dateTo };
              })
            }
          />
        </div>

        <div style={{ borderRadius: "5px", zIndex: 10, justifyContent: "space-between", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                value={filterCanceled}
                onChange={() => {
                  setPage(0);
                  setFilterCanceled((prev) => !prev);
                }}
              />
            }
            label={messages.canceled}
            sx={{ color: "text.primary" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={filterInProgress}
                onChange={() => {
                  setPage(0);
                  setFilterInProgress((prev) => !prev);
                }}
              />
            }
            label={messages.in_progress}
            sx={{ color: "text.primary" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={filterZamkniete}
                onChange={() => {
                  setPage(0);
                  setFilterZamkniete((prev) => !prev);
                }}
              />
            }
            label={messages.closed}
            sx={{ color: "text.primary" }}
          />

          {variant === "podil" ? <Columns messages={messages} filterColumns={filterColumns} setFilterColumns={setFilterColumns} selectedLang={selectedLang} /> : null}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <Button variant="outlined" onClick={() => setSortId((prev) => !prev)} endIcon={<ArrowDownwardIcon sx={{ transform: `rotate(${sortId ? 180 : 0}deg)` }} />}>
            {messages.sort}
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              updateBase({
                country,
                id_for_bases: uniqueDepartureDateId
                  ?.flat()
                  ?.flat()
                  ?.map((el) => el?.id_for_base),
              })
            }
          >
            {messages?.update_bases}
          </Button>
        </div>
        <Button
          variant="outlined"
          onClick={async () => {
            try {
              await Promise.all(deleteCities?.map(async (id_for_base) => await Podzial.deleteCity(Number(id_for_base), country)));
              setDeleteCities([]);
              await Podzial.getFilteredCities({ page: page + 1, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, country, filterDate });
              customAlert({ message: "Success", severity: "success" });
            } catch (e) {
              customAlert({ message: "Something went wrong" });
            }
          }}
          hidden={!deleteCities[0]}
        >
          <DeleteIcon />
        </Button>
      </div>

      {loadingSpinner ? (
        <div className="scroll" style={{ overflowX: "auto", textAlign: "center" }}>
          {variant === "podil" ? (
            <ContainerForTable>
              <table style={{ zoom }}>
                <thead className="tableHeader" style={{ position: "sticky", top: "-1px", zIndex: "1" }}>
                  <tr style={{ background: "none" }}>
                    <th className="basesTableCell noBorder" style={{ minWidth: "70.8px" }}>
                      {messages?.trail}
                    </th>
                    <th className="basesTableCell noBorder" style={{ minWidth: "70.8px" }}>
                      ID
                    </th>
                    {filterColumns
                      ?.filter((el) => el.value)
                      .map((el, index) => (
                        <React.Fragment key={index}>{el.header()}</React.Fragment>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {uniqueDepartureDateId?.map((el, departureIndex) =>
                    el?.map((item, index) => (
                      <AllCityTable
                        key={`${item.id}-${index}-${departureIndex}`}
                        departureArray={el}
                        departureIndex={departureIndex}
                        departure={departure}
                        arrayIndex={index}
                        currentCities={item}
                        country={country}
                        changeDeleteCities={changeDeleteCities}
                        filterColumns={filterColumns}
                        changeCitiesStatus={changeCitiesStatus}
                        citiesStatus={messages?.citiesStatus}
                        trailsForCampaign={trailsForCampaign}
                        allDictionary={allDictionary}
                        servers={servers}
                        instances={instances}
                      />
                    ))
                  )}
                  {/* {cities?.map((item, index) => (
                    
                  ))} */}
                </tbody>
              </table>
            </ContainerForTable>
          ) : (
            <ListsTable cities={cities} zoom={zoom} />
          )}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
        </div>
      )}

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
    </PageContainer>
  );
}

export default AllCities;
