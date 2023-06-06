import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { Checkbox, Pagination, PaginationItem } from "@mui/material";
import { StyledInput } from "../../../style/styles";
import { axiosGetAllLogsBase } from "../../../api/logs";
import { ContainerForTable } from "./Logs.styled";
import LogsBasesTableRow from "../components/LogsBasesTableRow";

function LogsBases() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterUpdate, setFilterUpdate] = useState(true);
  const [filterCreate, setFilterCreate] = useState(true);
  const [filterDelete, setFilterDelete] = useState(true);
  const [filterPayed, setFilterPayed] = useState(true);
  const [filterArbitration, setFilterArbitration] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { user, logsBase } = useAppSelector((store) => store.user);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [country, setCountry] = useState("");
  const [countrySelectOptions, setCountrySelectOptions] = useState([]);

  async function getBasesLogs() {
    const data = await axiosGetAllLogsBase();
    if (data) {
      dispatch({
        type: reducerTypes.GET_LOGS_BASES,
        payload: data,
      });
    }
  }

  function getCorrectTime(element) {
    return element.time.split(".")[0]?.replace("T", " ") || element.time;
  }

  useEffect(() => {
    setLogs(
      logsBase
        ?.filter((log) => (country ? log.country === country : true))
        ?.filter((el, i, ar) => (search ? el?.base_id?.toLowerCase()?.includes(search) : true))
        ?.filter((checkbox) => (checkbox?.action === "update" && filterUpdate) || (checkbox?.action === "create" && filterCreate) || (checkbox?.action === "delete" && filterDelete))
        ?.sort((a, b) => Number(b.id) - Number(a.id))
    );
    setCountrySelectOptions(
      logsBase
        ?.filter((item, i, ar) => {
          return ar.map((el) => el.country).indexOf(item.country) === i;
        })
        ?.map((log) => log.country)
    );
  }, [logsBase, search, country, filterUpdate, filterDelete, filterPayed, filterCreate, filterArbitration, sortId]);

  useEffect(() => {
    if (!logsBase[0]) {
      getBasesLogs();
    }
    // eslint-disable-next-line
  }, [user, logsBase]);

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
                  <th className="default-col">Время</th>
                  <th className="default-col">Кто</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {logs?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
                  <LogsBasesTableRow item={item} key={item.id} getCorrectTime={getCorrectTime} />
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

export default LogsBases;
