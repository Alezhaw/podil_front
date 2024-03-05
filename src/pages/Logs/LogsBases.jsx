import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { Checkbox, TextField, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { axiosGetFilteredLogsBases } from "../../api/logs";
import LogsBasesTableRow from "./LogsBasesTableRow";
import Spinner from "react-bootstrap/Spinner";
import { PageContainer } from "../../components/Page.styled";
import PaginationBlock from "../../components/forPages/PaginationBlock";

function LogsBases() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterUpdate, setFilterUpdate] = useState(true);
  const [filterCreate, setFilterCreate] = useState(true);
  const [filterDelete, setFilterDelete] = useState(true);
  const { user, logsBase, locale } = useAppSelector((store) => store.user);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [country, setCountry] = useState("");
  const [countrySelectOptions, setCountrySelectOptions] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const messages = useMemo(() => {
    return {
      search: locale["search"],
      title: locale["logs_title"],
      sort: locale["sort"],
      items_per_page: locale["items_per_page"],
      update: locale["logs_update"],
      create: locale["logs_create"],
      delete: locale["logs_delete"],
      all_country: locale["logs_all_country"],
      id: locale["logs_id"],
      id_city: locale["logs_id_city"],
      country: locale["logs_country"],
      action: locale["logs_action"],
      changes_amount: locale["logs_changes_amount"],
      time: locale["logs_time"],
      user: locale["logs_user"],
    };
  }, [locale]);

  async function getBasesLogs({ pageSize, page, search, country, updateFilter, createFilter, deleteFilter }) {
    setLoadingSpinner(false);
    const data = await axiosGetFilteredLogsBases({ pageSize, page: page + 1, search, country, updateFilter, createFilter, deleteFilter });
    if (data) {
      setLoadingSpinner(true);
      setCountrySelectOptions(data.countries);
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_LOGS_BASES,
        payload: data.logs,
      });
    }
  }

  function getCorrectTime(element) {
    return element.time.split(".")[0]?.replace("T", " ") || element.time;
  }

  useEffect(() => {
    setLogs(logsBase?.sort((a, b) => Number(b.id) - Number(a.id)));
  }, [logsBase]);

  useEffect(() => {
    if (!logsBase[0]) {
      getBasesLogs({ pageSize: itemsPerPage, page, search, country, updateFilter: filterUpdate, createFilter: filterCreate, deleteFilter: filterDelete });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getBasesLogs({ pageSize: itemsPerPage, page, search, country, updateFilter: filterUpdate, createFilter: filterCreate, deleteFilter: filterDelete });
    // eslint-disable-next-line
  }, [itemsPerPage, page, search, country, filterUpdate, filterCreate, filterDelete]);

  return (
    <PageContainer>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        <div style={{ borderRadius: "5px", justifyContent: "space-between", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={filterUpdate}
                onChange={() => {
                  setPage(0);
                  setFilterUpdate((prev) => !prev);
                }}
              />
            }
            label={messages.update}
            sx={{ color: "text.primary" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={filterCreate}
                onChange={() => {
                  setPage(0);
                  setFilterCreate((prev) => !prev);
                }}
              />
            }
            label={messages.create}
            sx={{ color: "text.primary" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                value={filterDelete}
                onChange={() => {
                  setPage(0);
                  setFilterDelete((prev) => !prev);
                }}
              />
            }
            label={messages.delete}
            sx={{ color: "text.primary" }}
          />
        </div>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="centerTable" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{messages.id}</TableCell>
                  <TableCell>{messages.id_city}</TableCell>
                  <TableCell>{messages.country}</TableCell>
                  <TableCell>{messages.action}</TableCell>
                  <TableCell>{messages.changes_amount}</TableCell>
                  <TableCell>{messages.time}</TableCell>
                  <TableCell>{messages.user}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs?.map((item, index) => (
                  <LogsBasesTableRow item={item} key={item.id} getCorrectTime={getCorrectTime} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/*style={{ width: "3500px", overflowY: "auto", height: "150vh" }} */}
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
        noZoom
      />
    </PageContainer>
  );
}

export default LogsBases;
