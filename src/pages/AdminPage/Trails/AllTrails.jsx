import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Trail from "../../../api/trails/trails";
import PlanningPeople from "../../../api/trails/planningPerson";
import { StyledInput } from "../../../style/styles";
import { StyledDivHeader } from "../Users/style";
import { ContainerForTable } from "../components/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import AllTrailsTable from "../components/AllTrailsTable";
import CreateTrail from "../components/CreateTrail";

function AllTrails({ country }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [searchRoute, setSearchRoute] = useState(null);
  const [searchRouteForInput, setSearchRouteForInput] = useState("");
  const [planningPersonIds, setPlanningPersonIds] = useState([]);
  const [filterDate, setFilterDate] = useState({});
  const [sortId, setSortId] = useState(true);
  const { user, locale } = useAppSelector((store) => store.user);
  const { trails, allPlanningPeople, allDictionary } = useAppSelector((store) => store.trails);
  const [allTrails, setAllTrails] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteTrails, setDeleteTrails] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [newTrail, setNewTrail] = useState({ reservation_status_id: 1 });
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [planningPersonSelectOptions, setPlanningPersonSelectOptions] = useState([]);
  const [planningPerson, setPlanningPerson] = useState("");

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
      rental_hours: locale["trails_rental_hours"],
      region: locale["trails_region"],
      institution: locale["trails_institution"],
      address: locale["trails_address"],
      reservation_status: locale["trails_reservation_status"],
      alternative: locale["trails_alternative"],
      telephone: locale["trails_relephone"],
      cost: locale["trails_cost"],
      payment_method: locale["trails_payment_method"],
      contract_status: locale["trails_contract_status"],
      comment: locale["trails_comment"],
      send_to_podil: locale["trails_send_to_podil"],
      send_to_bases: locale["trails_send_to_bases"],
      send_to_speaker: locale["trails_send_to_speaker"],
      send_to_scenario: locale["trails_send_to_scenario"],
      autozonning: locale["trails_autozonning"],
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
      new_trail: locale["trails_new_trail"],
      sort: locale["sort"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      days_of_the_week: locale["days_of_the_week"],
      yes: locale["trails_yes"],
      no: locale["trails_no"],
    };
  }, [locale]);

  async function getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country }) {
    setLoadingSpinner(false);
    const data = await Trail.getFilteredTrails({
      search,
      searchRoute,
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
      payload: { trails: data?.trails || [], country },
    });
    if (data) {
      setCount(data.count);
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
          let payload = {
            country,
          };
          payload[item.key] = data[item.key] || [];
          dispatch({
            type: item.reducer,
            payload: payload,
          });
        });
      }
    }
    setAllTrails(trails);
  }

  async function getPlanningPeople({ country }) {
    const data = await PlanningPeople.getAll({ country });
    if (data) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: { allDictionary: { ...allDictionary, planningPeople: data }, country },
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

  function changeTrailValues(key, value) {
    //const setCity = [setFirstTime, setSecondTime, setThirdTime];
    setNewTrail((prev) => ({ ...prev, [key]: value }));
  }

  async function createTrail({ newTrail, setNewTrail }) {
    const trail = newTrail;
    const result = await Trail.createTrail(trail, country);
    if (result?.id) {
      getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
      alert("Sucess");
      setNewTrail({});
      setIsOpen(false);
    } else {
      getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country }); // вывести ошибку
      //if (result.not_id_for_base) return alert("Не указан id_for_base");
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    getDictionary({ trails, country });
  }, [trails]);

  useEffect(() => {
    setPlanningPersonSelectOptions(allDictionary.planningPeople);
  }, [allDictionary.planningPeople]);

  useEffect(() => {
    if (!trails[0]) {
      getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
    }
    if (!allDictionary.planningPeople[0]) {
      getPlanningPeople({ country });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getPlanningPeople({ country });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
    // eslint-disable-next-line
  }, [search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1000 }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <StyledInput
            className="tabl-flex-admin-search"
            style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
            type="search"
            id="Search"
            value={searchForInput}
            placeholder={messages.city_search}
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
            autoComplete="off"
            required
          />
          <StyledInput
            className="tabl-flex-admin-search"
            style={{ color: "white", borderRadius: "5px", paddingLeft: "10px", width: "100px" }}
            type="number"
            id="Route search"
            value={searchRouteForInput}
            placeholder={messages.route_search}
            onChange={(e) => setSearchRouteForInput(e.target.value?.toLowerCase())}
            onBlur={(e) => {
              setPage(0);
              setSearchRoute(Number(e.target.value));
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setPage(0);
                setSearchRoute(Number(e.target.value));
              }
            }}
            autoComplete="off"
            required
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>
              {messages.from}{" "}
              <input
                onChange={(e) => setFilterDate((prev) => ({ ...prev, dateFrom: e.target.value }))}
                className="tableInput"
                style={{ color: "white", colorScheme: "dark" }}
                type="date"
                value={filterDate.dateFrom || undefined}
              />
            </span>

            <span>
              {messages.to}{" "}
              <input
                onChange={(e) => setFilterDate((prev) => ({ ...prev, dateTo: e.target.value }))}
                className="tableInput"
                style={{ color: "white", colorScheme: "dark" }}
                type="date"
                value={filterDate.dateTo || undefined}
              />
            </span>
          </div>
        </div>

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px", zIndex: 10 }}>
          <select
            onChange={(e) => {
              const value = e.currentTarget.value;
              setPage(0);
              setPlanningPerson(value);
              setPlanningPersonIds(value ? [Number(e.currentTarget.value)] : []);
            }}
            style={{ color: "white", borderRadius: "5px" }}
            className="tabl-flex-admin-user-scores "
            name="select"
            value={planningPerson}
          >
            <option value="">{messages.all}</option>
            {planningPersonSelectOptions.map((el, index) => (
              <option value={el.id} key={index}>
                {el.name?.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "40px" }}>
        <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
          {messages.new_trail}
        </div>
      </div>
      {isOpen ? <CreateTrail country={country} setIsOpen={setIsOpen} createTrail={createTrail} newTrail={newTrail} setNewTrail={setNewTrail} messages={messages} /> : null}

      <h3 style={{ textAlign: "center" }}>{messages.title}</h3>

      <div className="tabl-flex-admin" style={{ borderRadius: "5px" }}>
        <StyledDivHeader size="80px" style={{ cursor: "pointer" }} onClick={() => setSortId((prev) => !prev)}>
          {messages.sort}
        </StyledDivHeader>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <table>
              <thead style={{ background: "#5a5959" }}>
                <tr style={{ background: "none" }}>
                  <th className="basesTableCell">ID</th>
                  <th className="basesTableCell">{messages.planning_person}</th>
                  <th className="basesTableCell">{messages.date_scheduled}</th>
                  <th className="basesTableCell">{messages.company}</th>
                  <th className="basesTableCell">{messages.city_type}</th>
                  <th className="basesTableCell">{messages.population}</th>
                  <th className="basesTableCell">{messages.route_search}</th>
                  <th className="basesTableCell">{messages.departure_dates}</th>
                  <th className="basesTableCell">{messages.presentation_date}</th>
                  <th className="basesTableCell">{messages.presentation_hours}</th>
                  <th className="basesTableCell">{messages.rental_hours}</th>
                  <th className="basesTableCell">{messages.region}</th>
                  <th className="basesTableCell">{messages.city_search}</th>
                  <th className="basesTableCell">{messages.institution}</th>
                  <th className="basesTableCell">{messages.address}</th>
                  <th className="basesTableCell">{messages.reservation_status}</th>
                  <th className="basesTableCell">{messages.alternative}</th>
                  <th className="basesTableCell">{messages.telephone}</th>
                  <th className="basesTableCell">{messages.cost}</th>
                  <th className="basesTableCell">{messages.payment_method}</th>
                  <th className="basesTableCell">{messages.contract_status}</th>
                  <th className="basesTableCell">{messages.comment}</th>
                  <th className="basesTableCell">{messages.send_to_podil}</th>
                  <th className="basesTableCell">{messages.send_to_bases}</th>
                  <th className="basesTableCell">{messages.send_to_speaker}</th>
                  <th className="basesTableCell">{messages.send_to_scenario}</th>
                  <th className="basesTableCell">{messages.autozonning}</th>
                  <th className="basesTableCell">{messages.date_of_previous_presentation}</th>
                  <th className="basesTableCell">{messages.project_sales}</th>
                  <th className="basesTableCell">{messages.project_concent}</th>
                  <th className="basesTableCell">{messages.call_template}</th>
                  <th className="basesTableCell">{messages.hall}</th>
                  <th className="basesTableCell">{messages.payment_notes}</th>
                  <th className="basesTableCell">{messages.free_parking}</th>
                  <th className="basesTableCell">{messages.comments}</th>
                  <th className="basesTableCell">{messages.delete}</th>
                  {/* {filterColumns?.filter((el) => el.value).map((el) => el.header())} */}
                </tr>
              </thead>
              <AllTrailsTable messages={messages} allTrails={allTrails} country={country} changeDeleteTrails={changeDeleteTrails} weekDays={messages.days_of_the_week} getDictionary={getDictionary} />
            </table>
          </ContainerForTable>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
        <div
          className="tabl-flex-admin-button"
          onClick={async () => {
            try {
              if (!deleteTrails[0]) {
                return alert("Not trails for delete");
              }
              await Promise.all(deleteTrails?.map(async (id) => await Trail.removeTrail(Number(id), country)));
              setDeleteTrails([]);
              await getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
              alert("Success");
            } catch (e) {
              alert("Something went wrong");
            }
          }}
        >
          {messages.delete}
        </div>
      </div>

      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        count={count}
        shape="rounded"
        onChange={(e, value) => setPage(Number(value) - 1)}
        renderItem={(item) => <PaginationItem {...item} />}
        page={Number(page + 1)}
      />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <h6 style={{ margin: "0px", paddingRight: "10px" }}>{messages.items_per_page}</h6>
        <input
          className="tabl-flex-admin-pages"
          style={{ color: "white", borderRadius: "5px" }}
          type="number"
          name="name"
          value={itemsPerPageForInput}
          placeholder="Елементов на странице"
          // className={styles.input}
          onChange={(e) => setItemsPerPageForInput(Number(e.target.value))}
          onBlur={(e) => setItemsPerPage(Number(e.target.value))}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setPage(0);
              setItemsPerPage(Number(e.target.value));
            }
          }}
          autoComplete="off"
          required
        />
      </div>
    </>
  );
}

export default AllTrails;
