import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { Checkbox, Pagination, PaginationItem } from "@mui/material";
import { StyledInput } from "../../../style/styles";
import { axiosGetFilteredLogsCity } from "../../../api/logs";
import { ContainerForTable } from "../components/Table.styled";
import LogsCitiesTableRow from "./LogsCitiesTableRow";
import Spinner from "react-bootstrap/Spinner";

function LogsCities() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterUpdate, setFilterUpdate] = useState(true);
  const [filterCreate, setFilterCreate] = useState(true);
  const [filterDelete, setFilterDelete] = useState(true);
  const { user, logsCity } = useAppSelector((store) => store.user);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [country, setCountry] = useState("");
  const [countrySelectOptions, setCountrySelectOptions] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  async function getCitiesLogs({ pageSize, page, search, country, updateFilter, createFilter, deleteFilter }) {
    setLoadingSpinner(false);
    const data = await axiosGetFilteredLogsCity({ pageSize, page: page + 1, search, country, updateFilter, createFilter, deleteFilter });
    if (data) {
      setLoadingSpinner(true);
      setCountrySelectOptions(data.countries);
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_LOGS_CITIES,
        payload: data.logs,
      });
    }
  }

  function getCorrectTime(element) {
    return element.time.split(".")[0]?.replace("T", " ") || element.time;
  }

  useEffect(() => {
    setLogs(
      logsCity
        ?.filter((item, i, ar) => {
          return ar.map((el) => `${el.miasto_lokal} ${getCorrectTime(el)}`).indexOf(`${item.miasto_lokal} ${getCorrectTime(item)}`) === i;
        })
        ?.map((el) => logsCity?.filter((log) => log.miasto_lokal === el.miasto_lokal && getCorrectTime(log) === getCorrectTime(el)))
    );
  }, [logsCity]);

  useEffect(() => {
    if (!logsCity[0]) {
      getCitiesLogs({ pageSize: itemsPerPage, page, search, country, updateFilter: filterUpdate, createFilter: filterCreate, deleteFilter: filterDelete });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getCitiesLogs({ pageSize: itemsPerPage, page, search, country, updateFilter: filterUpdate, createFilter: filterCreate, deleteFilter: filterDelete });
    // eslint-disable-next-line
  }, [itemsPerPage, page, search, country, filterUpdate, filterCreate, filterDelete]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StyledInput
          className="tabl-flex-admin-search"
          style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
          type="search"
          id="Search"
          value={searchForInput}
          placeholder="Search"
          onChange={(e) => setSearchForInput(e.target.value?.toLowerCase())}
          onBlur={(e) => {
            setPage(0);
            setSearch(e.target.value?.toLowerCase()?.trim());
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              setPage(0);
              setSearch(e.target.value?.toLowerCase()?.trim());
            }
          }}
          autoComplete="off"
          required
        />

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px" }}>
          <select onChange={(e) => setCountry(e.currentTarget.value)} style={{ color: "white", borderRadius: "5px" }} className="tabl-flex-admin-user-scores " name="select" value={country}>
            <option value="">Все</option>
            {countrySelectOptions.map((el, index) => (
              <option value={el} key={index}>
                {el?.toUpperCase()}
              </option>
            ))}
          </select>
          <h5 style={{ margin: "0" }}>Update</h5> <Checkbox value={filterUpdate} defaultChecked onChange={() => setFilterUpdate((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>Create</h5> <Checkbox value={filterCreate} defaultChecked onChange={() => setFilterCreate((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>Delete</h5> <Checkbox value={filterDelete} defaultChecked onChange={() => setFilterDelete((prev) => !prev)} color="error" />
        </div>
      </div>

      <h3 style={{ textAlign: "center" }}>Логи</h3>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="default-col">ID</th>
                    <th className="default-col">ID City</th>
                    <th className="default-col">Country</th>
                    <th className="default-col">Action</th>
                    <th className="default-col">Changes amount</th>
                    <th className="miasto-col">City</th>
                    <th className="default-col">Time</th>
                    <th className="default-col">User</th>
                  </tr>
                </thead>
                <tbody style={{}}>
                  {logs?.map((item, index) => (
                    <LogsCitiesTableRow items={item} key={item[0].id} getCorrectTime={getCorrectTime} />
                  ))}
                </tbody>
              </table>
            </div>
          </ContainerForTable>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status" style={{ height: "200px", width: "200px" }}></Spinner>
        </div>
      )}

      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        count={count}
        shape="rounded"
        onChange={(e, value) => setPage(Number(value) - 1)}
        renderItem={(item) => <PaginationItem {...item} />}
        page={Number(page + 1)}
      />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <h6 style={{ margin: "0px", paddingRight: "10px" }}>Items per page</h6>
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
            if (e.keyCode === 13) {
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

export default LogsCities;
