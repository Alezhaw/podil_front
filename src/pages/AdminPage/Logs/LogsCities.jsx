import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { Checkbox, Pagination, PaginationItem } from "@mui/material";
import { StyledInput } from "../../../style/styles";
import { axiosGetAllLogsCity } from "../../../api/logs";
import { ContainerForTable } from "../components/Table.styled";
import LogsCitiesTableRow from "./LogsCitiesTableRow";

function LogsCities() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterUpdate, setFilterUpdate] = useState(true);
  const [filterCreate, setFilterCreate] = useState(true);
  const [filterDelete, setFilterDelete] = useState(true);
  const { user, logsCity } = useAppSelector((store) => store.user);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [country, setCountry] = useState("");
  const [countrySelectOptions, setCountrySelectOptions] = useState([]);

  async function getCitiesLogs() {
    const data = await axiosGetAllLogsCity();
    if (data) {
      dispatch({
        type: reducerTypes.GET_LOGS_CITIES,
        payload: data,
      });
    }
  }

  function getCorrectTime(element) {
    return element.time.split(".")[0]?.replace("T", " ") || element.time;
  }

  useEffect(() => {
    setLogs(
      logsCity
        ?.filter((log) => (country ? log.country === country : true))
        ?.filter((el, i, ar) => (search ? el?.miasto_lokal?.toLowerCase()?.includes(search) : true))
        ?.filter((item, i, ar) => {
          return ar.map((el) => `${el.miasto_lokal} ${getCorrectTime(el)}`).indexOf(`${item.miasto_lokal} ${getCorrectTime(item)}`) === i;
        })
        ?.filter((checkbox) => (checkbox?.action === "update" && filterUpdate) || (checkbox?.action === "create" && filterCreate) || (checkbox?.action === "delete" && filterDelete))
        ?.sort((a, b) => Number(b.id) - Number(a.id))
        ?.map((el) => logsCity?.filter((log) => log.miasto_lokal === el.miasto_lokal && getCorrectTime(log) === getCorrectTime(el)))
    );
    setCountrySelectOptions(
      logsCity
        ?.filter((item, i, ar) => {
          return ar.map((el) => el.country).indexOf(item.country) === i;
        })
        ?.map((log) => log.country)
    );
  }, [logsCity, search, country, filterUpdate, filterDelete, filterCreate]);

  useEffect(() => {
    if (!logsCity[0]) {
      getCitiesLogs();
    }
    // eslint-disable-next-line
  }, [user, logsCity]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StyledInput
          className="tabl-flex-admin-search"
          style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
          type="search"
          id="Search"
          value={search}
          placeholder="Поиск"
          onChange={(e) => setSearch(e.target.value?.toLowerCase())}
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

      <div style={{ overflowX: "auto", textAlign: "center" }}>
        <ContainerForTable>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="default-col">ID</th>
                  <th className="default-col">ID City</th>
                  <th className="default-col">Страна</th>
                  <th className="default-col">Действие</th>
                  <th className="default-col">Изменений</th>
                  <th className="miasto-col">Город</th>
                  <th className="default-col">Время</th>
                  <th className="default-col">Кто</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {logs?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
                  <LogsCitiesTableRow items={item} key={item[0].id} getCorrectTime={getCorrectTime} />
                ))}
              </tbody>
            </table>
          </div>
        </ContainerForTable>
        {/*style={{ width: "3500px", overflowY: "auto", height: "150vh" }} */}
      </div>

      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        count={Math.ceil(logs?.length / itemsPerPage)}
        shape="rounded"
        onChange={(e, value) => setPage(Number(value) - 1)}
        renderItem={(item) => <PaginationItem {...item} />}
      />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <h6 style={{ margin: "0px", paddingRight: "10px" }}>Кол-во</h6>
        <input
          className="tabl-flex-admin-pages"
          style={{ color: "white", borderRadius: "5px" }}
          type="number"
          name="name"
          value={itemsPerPage}
          placeholder="Елементов на странице"
          // className={styles.input}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          autoComplete="off"
          required
        />
      </div>
    </>
  );
}

export default LogsCities;
