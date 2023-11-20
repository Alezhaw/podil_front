import * as React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { MenuItem, Checkbox, TextField, Button, FormControlLabel, Menu, MenuList } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Podzial from "../../api/podzial";
import CheckBaseTable from "../../components/forPages/CheckTable";
import { ContainerForTable } from "../../components/forPages/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import { allCitiesTableMock } from "../../components/mock/OutputMock";
import { getFormatTime } from "../../utils/utils";
import { PageContainer } from "../../components/Page.styled";
import PaginationBlock from "../../components/forPages/PaginationBlock";

function CheckScenario() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterDate, setFilterDate] = useState({});
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [filterColumns, setFilterColumns] = useState([]);
  const [sortId, setSortId] = useState(true);
  const { storedCities, user, locale, country, selectedLang } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const messages = useMemo(() => {
    return {
      search: locale["search"],
      title: locale["all_cities_title"],
      canceled: locale["canceled"],
      in_progress: locale["in_progress"],
      complete: locale["complete"],
      columns: locale["columns"],
      sort: locale["sort"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      citiesStatus: locale["cities_status"],
    };
  }, [locale]);

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, filterDate }) {
    setLoadingSpinner(false);
    const data = await Podzial.getFilteredCities({
      visibleInScenario: true,
      page: page + 1,
      pageSize: itemsPerPage,
      sort: !sortId,
      search,
      scenarioInProgress: filterInProgress,
      scenarioZamkniete: filterComplete,
      scenarioCanceled: filterCanceled,
      country,
      filterDate,
    });
    if (data) {
      setLoadingSpinner(true);
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: data.cities,
      });
    }
  }

  async function changeCheck(checked, id_for_base) {
    const checkConfirm = window.confirm("Are you sure?");
    if (!checkConfirm) return;
    const data = await Podzial.changeCheck(Number(id_for_base), null, country, null, null, checked);
    if (data) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, filterDate });
    } else {
      alert(`Something went wrong ${id_for_base}`);
    }
  }

  async function changeCitiesStatus(setChangeStatus, status, id_for_base) {
    setChangeStatus(true);
    const result = await Podzial.changeStatus(status, country, id_for_base);
    setChangeStatus(false);
    if (result) {
      //getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete });
    } else {
      alert(`Change status error, id: ${id_for_base}`);
    }
  }

  useEffect(() => {
    const savedFilterColumns = JSON.parse(localStorage.getItem(`filterColumnsCheckScenario ${selectedLang}`) || "[]");
    if (savedFilterColumns.length > 0) {
      const updatedFilterColumns = allCitiesTableMock(locale)
        ?.slice(0, 10)
        .map((el) => {
          const existingCheckValue = savedFilterColumns.find((cv) => cv.column === el.column);
          return existingCheckValue ? { ...el, value: existingCheckValue.value } : el;
        });
      setFilterColumns(updatedFilterColumns);
    } else {
      setFilterColumns(allCitiesTableMock(locale)?.slice(0, 10));
    }
  }, [locale, selectedLang]);

  useEffect(() => {
    setCities(
      storedCities
        .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
        ?.map((el) => storedCities?.filter((time) => time.id_for_base === el.id_for_base))
        ?.map((item) => item?.sort((a, b) => getFormatTime(a) - getFormatTime(b)))
    );
  }, [storedCities]);

  useEffect(() => {
    if (!storedCities[0]) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, filterDate });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, filterDate });
    // eslint-disable-next-line
  }, [page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, country, filterDate]);

  return (
    <PageContainer>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={messages?.from}
              onChange={(e) =>
                setFilterDate((prev) => {
                  let date = new Date(e);
                  date.setDate(date.getDate() + 1);
                  return { ...prev, dateFrom: date };
                })
              }
              slotProps={{
                textField: { size: "small" },
                actionBar: {
                  actions: ["clear"],
                },
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={messages?.to}
              onChange={(e) =>
                setFilterDate((prev) => {
                  let date = new Date(e);
                  date.setDate(date.getDate() + 1);
                  return { ...prev, dateTo: date };
                })
              }
              slotProps={{
                textField: { size: "small" },
                actionBar: {
                  actions: ["clear"],
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <div style={{ borderRadius: "5px", justifyContent: "space-between", alignItems: "center", display: "flex" }}>
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
                value={filterComplete}
                onChange={() => {
                  setPage(0);
                  setFilterComplete((prev) => !prev);
                }}
              />
            }
            label={messages.complete}
            sx={{ color: "text.primary" }}
          />

          <Button variant="outlined" id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
            {messages.columns}
          </Button>

          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              {filterColumns.map((el, index) => (
                <MenuItem
                  id={el.column}
                  key={index}
                  onClick={(e) => {
                    let updatedFilterColumns = [];
                    setFilterColumns((prev) => {
                      const newColumns = prev.map((fc) => {
                        if (fc.column === e.target.id) {
                          return { ...fc, value: !fc.value };
                        }
                        return fc;
                      });
                      updatedFilterColumns = newColumns;
                      return newColumns;
                    });
                    localStorage.setItem(`filterColumnsCheckScenario ${selectedLang}`, JSON.stringify(updatedFilterColumns));
                  }}
                >
                  <Checkbox checked={el.value} id={el.column} />
                  {el.column}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => setSortId((prev) => !prev)} endIcon={<ArrowDownwardIcon sx={{ transform: `rotate(${sortId ? 180 : 0}deg)` }} />}>
          {messages.sort}
        </Button>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <table>
              <thead className="tableHeader">
                <tr className="tableHeader">
                  <th className="tableHeader" style={{ minWidth: "70.8px" }}></th>
                  <th className="tableHeader" style={{ minWidth: "70.8px" }}>
                    ID
                  </th>

                  {filterColumns?.filter((el) => el.value).map((el) => el.header())}
                  <th className="tableHeader">{messages.complete}</th>
                </tr>
              </thead>
              <tbody>
                {cities?.map((item, index) => (
                  <CheckBaseTable
                    key={`CheckBaseTable-${item.id}`}
                    currentCities={item}
                    country={country}
                    checkKey={"check_scenario"}
                    changeCheck={changeCheck}
                    changeCitiesStatus={changeCitiesStatus}
                    filterColumns={filterColumns}
                    citiesStatus={messages?.citiesStatus}
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
      />
    </PageContainer>
  );
}

export default CheckScenario;
