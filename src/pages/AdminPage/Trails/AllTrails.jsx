import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Trail from "../../../api/trails/trails";
import PlanningPeople from "../../../api/trails/planningPerson";
import { StyledInput } from "../../../style/styles";
import { StyledDivHeader } from "../Users/style";
import { ContainerForTable } from "../components/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AllTrailsTable from "../components/AllTrailsTable";

function AllTrails({ country }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [searchRoute, setSearchRoute] = useState(null);
  const [searchRouteForInput, setSearchRouteForInput] = useState("");
  const [planningPersonIds, setPlanningPersonIds] = useState([]);
  const [filterDate, setFilterDate] = useState({});
  const [sortId, setSortId] = useState(true);
  const { trails, planningPeople, user, locale } = useAppSelector((store) => store.user);
  const [allTrails, setAllTrails] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteTrails, setDeleteTrails] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [newTrail, setNewTrail] = useState({});
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [planningPersonSelectOptions, setPlanningPersonSelectOptions] = useState([]);
  const [planningPerson, setPlanningPerson] = useState("");

  const messages = useMemo(() => {
    return {
      city_search: locale["trails_city"],
      route_search: locale["trails_route"],
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
    if (data) {
      setLoadingSpinner(true);
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_TRAILS,
        payload: { trails: data.trails, country },
      });
    }
  }

  async function getPlanningPeople({ country }) {
    const data = await PlanningPeople.getAll({ country });
    if (data) {
      setPlanningPersonSelectOptions(data);
      dispatch({
        type: reducerTypes.GET_PLANNING_PEOPLE,
        payload: { planningPeople: data, country },
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

  async function createCity(newTrail, setNewTrail) {
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
    setAllTrails(trails);
  }, [trails]);

  useEffect(() => {
    if (!trails[0]) {
      getFilteredTrails({ search, searchRoute, planningPersonIds, filterDate, sortId, itemsPerPage, page, country });
    }
    if (!planningPeople[0]) {
      getPlanningPeople({ country });
    }
    // eslint-disable-next-line
  }, [user]);

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
                value={filterDate.dateFrom || "0000-00-00"}
              />
            </span>

            <span>
              {messages.to}{" "}
              <input
                onChange={(e) => setFilterDate((prev) => ({ ...prev, dateTo: e.target.value }))}
                className="tableInput"
                style={{ color: "white", colorScheme: "dark" }}
                type="date"
                value={filterDate.dateTo || "0000-00-00"}
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
      {isOpen ? <div>Страница новой трассы</div> : ""}

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
                  <th className="basesTableCell">Planning person</th>
                  <th className="basesTableCell">Date scheduled</th>
                  <th className="basesTableCell">Company</th>
                  <th className="basesTableCell">City type</th>
                  <th className="basesTableCell">Population</th>
                  <th className="basesTableCell">Route №</th>
                  <th className="basesTableCell">Departure dates</th>
                  <th className="basesTableCell">Presentation date</th>
                  <th className="basesTableCell">Presentation hours</th>
                  <th className="basesTableCell">Rental hours</th>
                  <th className="basesTableCell">Region</th>
                  <th className="basesTableCell">City</th>
                  <th className="basesTableCell">Institution</th>
                  <th className="basesTableCell">Address</th>
                  <th className="basesTableCell">Reservation status</th>
                  <th className="basesTableCell">Alternative</th>
                  <th className="basesTableCell">Telephone</th>
                  <th className="basesTableCell">Cost</th>
                  <th className="basesTableCell">Payment method</th>
                  <th className="basesTableCell">Contract status</th>
                  <th className="basesTableCell">Comment</th>
                  <th className="basesTableCell">Send to Podil</th>
                  <th className="basesTableCell">Send to Bases</th>
                  <th className="basesTableCell">Send to speaker</th>
                  <th className="basesTableCell">Send to Scenario</th>
                  <th className="basesTableCell">Autozonning</th>
                  <th className="basesTableCell">Date of the previous presentation</th>
                  <th className="basesTableCell">Project sales</th>
                  <th className="basesTableCell">Project concent</th>
                  <th className="basesTableCell">Call template</th>
                  {/* {filterColumns?.filter((el) => el.value).map((el) => el.header())} */}
                </tr>
              </thead>
              <AllTrailsTable allTrails={allTrails} country={country} changeDeleteTrails={changeDeleteTrails} weekDays={messages.days_of_the_week} />
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