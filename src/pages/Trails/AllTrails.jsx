import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { reducerTrailsTypes } from "../../store/Trails/trailsTypes";
import { TextField, Button, MenuItem, Select, FormControl } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyDatePicker from "../../components/forPages/MyDatePicker";
import Podzial from "../../api/podzial";
import Trail from "../../api/trails/trails";
import Form from "../../api/trails/forms";
import Departure from "../../api/trails/departure";
import { axiosGetAllUsers } from "../../api/user";
import { ContainerForTable } from "../../components/forPages/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import DepartureTable from "./Departure/Departure";
import CreateDeparture from "./Departure/CreateDeparture";
import CreateForm from "./Forms/CreateForm";
import { PageContainer } from "../../components/Page.styled";
import PaginationBlock from "../../components/forPages/PaginationBlock";
import { OtherStyle } from "../../components/Page.styled";
import { customAlert } from "../../components/Alert/AlertFunction";
import { getValueById } from "../../components/functions";

function AllTrails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [planningPersonIds, setPlanningPersonIds] = useState([]);
  const [sortId, setSortId] = useState(false);
  const { locale, allUsers, country } = useAppSelector((store) => store.user);
  const { trails, departure, departureDate, allDictionary } = useAppSelector((store) => store.trails);
  const [allTrails, setAllTrails] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteTrails, setDeleteTrails] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(5);
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [users, setUsersSelectOptions] = useState([]);
  const [planningPerson, setPlanningPerson] = useState("0");
  const [newDeparture, setNewDeparture] = useState({});
  const yesterday = new Date().setDate(new Date().getDate() - 1);
  let date = new Date();
  date.setDate(date.getDate() - 1);
  date = date.toISOString().split("T")[0];
  const [filterDate, setFilterDate] = useState({ dateFrom: date });
  const [form, setForm] = useState({
    telephone: [{ id: 0, tel: "+48" }],
    day: [{ id: 0, d: "" }],
    cost: [{ id: 0, c: 0 }],
    from: [{ id: 0, time: [] }],
    presentation_number: [{ id: 0, c: 0 }],
    presentation_time: [{ id: 0, time: null }],
    room_number: [{ id: 0, r: "" }],
    starting_price: [{ id: 0, c: 0 }],
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchLocations, setSearchLocations] = useState([]);
  const [zoom, setZoom] = useState(Number(localStorage.getItem("tableZoomTrails")) || 1);

  const messages = useMemo(() => {
    return {
      city_search: locale["trails_city"],
      route_search: locale["trails_route"],
      planning_person: locale["trails_planning_person"],
      date_scheduled: locale["trails_date_scheduled"],
      company: locale["trails_company"],
      city_type: locale["trails_city_type"],
      population: locale["trails_population"],
      departure_dates: locale["trails_departure_dates"],
      presentation_date: locale["trails_presentation_date"],
      presentation_hours: locale["trails_presentation_hours"],
      limit: locale["limit"],
      rental_hours: locale["trails_rental_hours"],
      timezone: locale["timezone"],
      region: locale["trails_region"],
      institution: locale["trails_institution"],
      address: locale["trails_address"],
      reservation_status: locale["trails_reservation_status"],
      alternative: locale["trails_alternative"],
      landmarks: locale["trails_landmarks"],
      telephone: locale["trails_relephone"],
      cost: locale["trails_cost"],
      payment_method: locale["trails_payment_method"],
      contract_status: locale["trails_contract_status"],
      contract_comment: locale["trails_contract_comment"],
      comment: locale["trails_comment"],
      send_to_podil: locale["trails_send_to_podil"],
      send_to_bases: locale["trails_send_to_bases"],
      send_to_speaker: locale["trails_send_to_speaker"],
      send_to_scenario: locale["trails_send_to_scenario"],
      autozonning: locale["trails_autozonning"],
      regionalization_comment: locale["trails_regionalization_comment"],
      date_of_previous_presentation: locale["trails_date_previous_presentation"],
      project_sales: locale["trails_project_sales"],
      project_concent: locale["trails_project_concent"],
      call_template: locale["trails_call_template"],
      hall: locale["trails_hall"],
      payment_notes: locale["trails_payment_notes"],
      free_parking: locale["trails_free_parking"],
      comments: locale["trails_comments"],
      create_trail: locale["trails_create_trail"],
      title: locale["trails_title"],
      all: locale["trails_all"],
      columns: locale["columns"],
      new_departure: locale["trails_new_departure"],
      sort: locale["sort"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      days_of_the_week: locale["days_of_the_week"],
      yes: locale["trails_yes"],
      no: locale["trails_no"],
      create: locale["trails_create"],
      apply: locale["city_id_apply"],
      new_institution: locale["forms_new_institution"],
      create_Institution: locale["forms_create_institution"],
      presentation_number: locale["forms_presentation_Number"],
      confirm: locale["forms_confirm"],
      email: locale["email"],
      day: locale["day"],
      time: locale["time"],
      room_number: locale["forms_room_number"],
      booker: locale["forms_booker"],
      starting_price: locale["forms_starting_price"],
      trade_group: locale["forms_trade_group"],
      edit: locale["trails_edit_departure"],
      halls: locale["halls"],
      team_number: locale["trails_team_number"],
      route_number: locale["trails_route_number"],
    };
  }, [locale]);

  const replaceDots = (date) => String(date)?.replaceAll("-", ".");

  async function getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country }) {
    setLoadingSpinner(false);
    const data = await Departure.getFiltered({
      search,
      planningPersonIds,
      ...filterDate,
      sort: !sortId,
      pageSize: itemsPerPage,
      page: page + 1,
      country,
    });
    setLoadingSpinner(true);
    dispatch({
      type: reducerTrailsTypes.GET_TRAILS,
      payload: data?.trails || [],
    });
    dispatch({
      type: reducerTrailsTypes.GET_DEPARTURE,
      payload: data?.departure || [],
    });
    dispatch({
      type: reducerTrailsTypes.GET_DEPARTURE_DATE,
      payload: data?.departureDate || [],
    });
    if (data) {
      setCount(data.count);
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

  async function getDictionary({ country, trails }) {
    if (!!trails[0]) {
      const data = await Trail.getDictionary({ country, trails });
      if (data) {
        const dictionary = [
          { reducer: reducerTrailsTypes.GET_CALL_TEMPLATES, key: "callTamplates" },
          { reducer: reducerTrailsTypes.GET_PRESENTATION_TIMES, key: "presentationTimes" },
          { reducer: reducerTrailsTypes.GET_FORMS, key: "forms" },
          { reducer: reducerTrailsTypes.GET_CITIES_WITH_REGIONS, key: "citiesWithRegions" },
          { reducer: reducerTrailsTypes.GET_PLANNING_PEOPLE, key: "planningPeople" },
          { reducer: reducerTrailsTypes.GET_PROJECT_SALES, key: "projectSales" },
          { reducer: reducerTrailsTypes.GET_PROJECT_CONCENT, key: "projectConcent" },
          { reducer: reducerTrailsTypes.GET_REGIMENTS, key: "regiments" },
          { reducer: reducerTrailsTypes.GET_REGIONS, key: "regions" },
          { reducer: reducerTrailsTypes.GET_RESERVATION_STATUSES, key: "reservationStatuses" },
        ];
        dictionary.map((item) => {
          dispatch({
            type: item.reducer,
            payload: data[item.key] || [],
          });
        });
      }
    }
    setAllTrails(trails || []);
  }

  async function getUsers() {
    const data = await axiosGetAllUsers();

    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_USERS,
        payload: data,
      });
    }
  }

  function changeDeleteTrails(checked, id) {
    if (checked) {
      setDeleteTrails((prev) => [...prev, id]);
    } else {
      setDeleteTrails((prev) => prev.filter((item) => item !== id));
    }
  }

  function getCorrectTime(date) {
    if (!date) return;
    let correctDate = new Date(date);
    correctDate.setDate(correctDate.getDate() + 1);
    correctDate.setHours(correctDate.getHours() + 2);
    return correctDate.toISOString().split("T")[1]?.split(":")?.slice(0, 2).join(":");
  }

  function changeZoom(e, value) {
    localStorage.setItem("tableZoomTrails", value);
    setZoom(value);
  }

  async function createForm({ form, setForm }) {
    const newForm = {
      ...form,
      telephone: form?.telephone?.map((el) => el?.tel)?.filter((el) => !!el),
      day: form?.day?.map((el) => el?.d)?.filter((el) => !!el),
      cost: form?.cost?.map((el) => el?.c)?.filter((el) => !!el),
      from: form?.from?.map((el) => el?.time?.map((el) => getCorrectTime(el))?.join("-"))?.filter((el) => !!el),
      presentation_number: form?.presentation_number?.map((el) => el?.c)?.filter((el) => !!el),
      presentation_time: form?.presentation_time?.map((el) => getCorrectTime(el?.time))?.filter((el) => !!el),
      room_number: form?.room_number?.map((el) => el?.r)?.filter((el) => !!el),
      starting_price: form?.starting_price?.map((el) => el?.c)?.filter((el) => !!el),
      voivodeship: country,
      relevance_status: true,
    };

    const result = await Form.create({ form: newForm, country });
    if (!result?.message) {
      setForm({
        telephone: [{ id: 0, tel: "" }],
        day: [{ id: 0, d: "" }],
        cost: [{ id: 0, c: 0 }],
        from: [{ id: 0, time: [] }],
        presentation_number: [{ id: 0, c: 0 }],
        presentation_time: [{ id: 0, time: null }],
        room_number: [{ id: 0, r: "" }],
        starting_price: [{ id: 0, c: 0 }],
      });
      customAlert({ message: "Sucess", severity: "success" });
    } else {
      customAlert({ message: result.message });
    }
  }

  async function createTrail({ newTrail, setNewTrail, setIsOpen }) {
    const trail = newTrail;
    const result = await Trail.createTrail(trail, country);
    if (result?.id) {
      getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
      customAlert({ message: "Sucess", severity: "success" });
      // setIsOpen(false);
    } else {
      getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country }); // вывести ошибку
      customAlert({ message: "Something went wrong" });
    }
  }

  async function createCity(trail, checked, key, calling_scheme = null, statusByTest = null, forUpdateTrail = null, allDictionary, departure, forms, citiesWithRegions) {
    const statuses = {
      visible_in_podil: "sent_to_podil",
      visible_in_bases: "sent_to_bases",
      visible_in_speaker: "sent_to_speaker",
      visible_in_scenario: "sent_to_scenario",
    };
    let status = {};
    if (!statusByTest) {
      status[statuses[key]] = checked;
    }

    let cities = getValueById(trail.presentation_time_id, "presentation_hour", allDictionary.presentationTimes) || [];
    cities = cities?.map((item, index) => {
      let city = {
        time: String(item)?.replaceAll("*", ""),
        calling_scheme,
        l_p_for_pl: country !== "PL" ? null : getValueById(getValueById(trail?.departure_id, "company_id", departure), "name", allDictionary?.regiments),
        region: getValueById(trail.regionId, "region", allDictionary?.regions),
        timezone: getValueById(trail.regionId, "timezone", allDictionary?.regions),
        city_lokal: getValueById(trail.city_id, "city_name", citiesWithRegions),
        adress: getValueById(trail.form_id, "address", forms),
        institution: getValueById(trail.form_id, "local", forms),
        date: trail.presentation_date,
        population: getValueById(trail.city_id, "population", citiesWithRegions),
        project: getValueById(trail.project_sales_id, "name", allDictionary?.projectSales),
        present: getValueById(trail.project_concent_id, "name", allDictionary?.projectConcent),
        trailId: trail.id,
        departureId: trail.departure_id,
        departure_date_id: trail.departure_date_id,
        limit: [trail?.limits]?.flat()[index] || 0,
        check_base: false,
        check_speaker: false,
        check_scenario: false,
      };
      if (!forUpdateTrail) {
        city.status = 3;
      }
      if (statusByTest) {
        city = { ...city, ...statusByTest };
      } else {
        city[key] = checked;
      }

      return city;
    });

    // console.log(1, status);
    const result = await Podzial.createCitiesByTrails({ cities, country, status });
    if (!forUpdateTrail) {
      if (result[0]) {
        customAlert({ message: "Success", severity: "success" });
      } else {
        if (result.updated[0]) return customAlert({ message: "Updated", severity: "success" });
        if (result.not_id_for_base) return customAlert({ message: "id_for_base not specified" });
        customAlert({ message: "Something went wrong" });
      }
    }
  }

  async function createDeparture({ newDeparture, setNewDeparture, setIsOpen }) {
    const departure = newDeparture;
    const checkDates = departure.dates ? departure.dates[0] : false;
    if (!checkDates) {
      customAlert({ message: "No dates" });
    }
    const result = await Departure.create(departure, country);
    if (result && !result?.message) {
      await getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
      customAlert({ message: "Sucess", severity: "success" });
      setNewDeparture({});
      setIsOpen(false);
    } else {
      await getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
      customAlert({ message: result.message });
    }
  }

  async function updateDeparture({ newDeparture, setIsOpen }) {
    const departure = newDeparture;
    if (!departure.dateTo || !departure.dateFrom) {
      return customAlert({ message: messages.update_error, severity: "success" });
    }
    const checkDates = departure.dates ? departure.dates[0] : false;
    if (!checkDates) {
      return customAlert({ message: messages.dates_error, severity: "success" });
    }
    const result = await Departure.update(departure, country);
    if (result && !result?.message) {
      await getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
      customAlert({ message: "Success", severity: "success" });
      setIsOpen(false);
    } else {
      await getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
      return customAlert({ message: result.message });
    }
  }

  useEffect(() => {
    getDictionary({ trails, country });
    // eslint-disable-next-line
  }, [trails, country]);

  useEffect(() => {
    setUsersSelectOptions(allUsers);
    // eslint-disable-next-line
  }, [allUsers]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, voivodeship: country }));
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
    // eslint-disable-next-line
  }, [search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country]);

  return (
    <OtherStyle>
      <PageContainer>
        <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: "80px", margin: 0 }} size="small">
              <Select
                style={{ textAlign: "center" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select-standard"
                value={planningPerson}
                onChange={(e) => {
                  const value = e.target.value;
                  setPage(0);
                  setPlanningPerson(value);
                  setPlanningPersonIds(value ? [Number(e.target.value)] : []);
                }}
              >
                <MenuItem value={"0"}>{messages.all}</MenuItem>
                {users.map((el, index) => (
                  <MenuItem value={el.id} key={index}>
                    {el.nickname?.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              label={messages.city_search}
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
              defaultValue={dayjs(yesterday)}
              label={messages?.from}
              onChange={(e) =>
                setFilterDate((prev) => {
                  let date = new Date(e);
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

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem" }}>
            <Button variant="outlined" onClick={() => setIsOpenForm(true)}>
              {messages.new_institution}
            </Button>

            <Button variant="outlined" onClick={() => setIsOpen(true)}>
              {messages.new_departure}
            </Button>

            <Button variant="outlined" onClick={() => navigate(`/trailsDepartureEdit`)}>
              {messages.edit}
            </Button>
          </div>
        </div>

        {isOpen ? (
          <CreateDeparture
            setIsOpen={setIsOpen}
            messages={messages}
            newDeparture={newDeparture}
            setNewDeparture={setNewDeparture}
            weekDays={messages.days_of_the_week}
            createDeparture={createDeparture}
            replaceDots={replaceDots}
          />
        ) : null}

        {isOpenForm ? (
          <CreateForm
            form={form}
            setForm={setForm}
            setIsOpen={setIsOpenForm}
            createForm={createForm}
            messages={messages}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            searchLocations={searchLocations}
            setSearchLocations={setSearchLocations}
          />
        ) : null}

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setSortId((prev) => !prev)} endIcon={<ArrowDownwardIcon sx={{ transform: `rotate(${sortId ? 180 : 0}deg)` }} />}>
            {messages.sort}
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                if (!deleteTrails[0]) {
                  return customAlert({ message: "Not trails for delete" });
                }
                await Promise.all(deleteTrails?.map(async (id) => await Trail.removeTrail(Number(id), country)));
                setDeleteTrails([]);
                await getFilteredTrails({ search, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
                customAlert({ message: "Sucess", severity: "success" });
              } catch (e) {
                customAlert({ message: "Something went wrong" });
              }
            }}
            hidden={!deleteTrails[0]}
          >
            <DeleteIcon />
          </Button>
        </div>

        {loadingSpinner ? (
          <div style={{ overflowX: "auto", textAlign: "center" }} className="scroll">
            <ContainerForTable>
              <table style={{ zoom }}>
                {/* <div style={{ display: "flex", gap: "2rem", position: "sticky", left: "13px", width: "calc(100vw - 100px)", alignItems: "center" }}> */}
                <thead className="tableHeader" style={{ position: "sticky", top: "0px", zIndex: "1" }}>
                  <tr style={{ background: "none" }}>
                    <th>{messages.route_search}</th>
                    <th>{messages.departure_dates}</th>
                    <th>ID</th>
                    <th>{messages.planning_person}</th>
                    <th>{messages.date_scheduled}</th>
                    <th>{messages.company}</th>
                    <th>{messages.city_type}</th>
                    <th>{messages.population}</th>
                    <th>{messages.presentation_date}</th>
                    <th>
                      {messages.presentation_hours} / {messages?.limit}
                    </th>
                    <th>{messages.rental_hours}</th>
                    <th>{messages.timezone}</th>
                    <th>{messages.region}</th>
                    <th>{messages.city_search}</th>
                    <th>{messages.institution}</th>
                    <th>{messages.address}</th>
                    <th>{messages.reservation_status}</th>
                    <th>{messages.landmarks}</th>
                    <th>{messages.telephone}</th>
                    <th>{messages.cost}</th>
                    <th>{messages.payment_method}</th>
                    <th>{messages.contract_status}</th>
                    <th>{messages.contract_comment}</th>
                    <th>{messages.comment}</th>
                    <th>{messages.send_to_podil}</th>
                    <th>{messages.send_to_bases}</th>
                    <th>{messages.send_to_speaker}</th>
                    <th>{messages.send_to_scenario}</th>
                    <th>{messages.autozonning}</th>
                    <th>{messages.regionalization_comment}</th>
                    <th>{messages.date_of_previous_presentation}</th>
                    <th>{messages.project_sales}</th>
                    <th>{messages.project_concent}</th>
                    <th>{messages.call_template}</th>
                    <th>{messages.hall}</th>
                    <th>{messages.payment_notes}</th>
                    <th>{messages.free_parking}</th>
                    <th>{messages.comments}</th>
                    <th>{messages.delete}</th>
                    {/* {filterColumns?.filter((el) => el.value).map((el) => el.header())} */}
                  </tr>
                </thead>
                <tbody>
                  {departure?.map((item) => (
                    <DepartureTable
                      key={item.id}
                      item={item}
                      departureDate={departureDate}
                      messages={messages}
                      allTrails={allTrails}
                      changeDeleteTrails={changeDeleteTrails}
                      weekDays={messages.days_of_the_week}
                      sort={sortId}
                      createTrail={createTrail}
                      search={search}
                      planningPersonIds={planningPersonIds}
                      zoom={zoom}
                      getDictionary={getDictionary}
                      createCity={createCity}
                      updateDeparture={updateDeparture}
                      {...filterDate}
                    />
                  ))}
                </tbody>
              </table>
            </ContainerForTable>
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
    </OtherStyle>
  );
}

export default AllTrails;
