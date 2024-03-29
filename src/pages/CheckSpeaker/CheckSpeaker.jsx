import * as React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import Podzial from "../../api/podzial";
import CheckBaseTable from "../../components/forPages/CheckTable";
import { ContainerForTable } from "../../components/forPages/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import { allCitiesTableMock, forSpeakerMock } from "../../components/mock/OutputMock";
import { getFormatTime } from "../../utils/utils";
import { InputLabel, MenuItem, FormControl, Checkbox, TextField, Button, FormControlLabel, Menu, MenuList, Select } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PageContainer } from "../../components/Page.styled";
import PaginationBlock from "../../components/forPages/PaginationBlock";
import { customAlert } from "../../components/Alert/AlertFunction";
import MyDatePicker from "../../components/forPages/MyDatePicker";

function CheckSpeaker() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterDate, setFilterDate] = useState({});
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [filterSpeaker, setFilterSpeaker] = useState([]);
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
  const [zoom, setZoom] = useState(Number(localStorage.getItem("tableZoomSpeaker")) || 1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function changeZoom(e, value) {
    localStorage.setItem("tableZoomSpeaker", value);
    setZoom(value);
  }

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

  const handleChangeFilterColumns = (e) => {
    const updatedFilterColumns = filterColumns.map((fc) => {
      if (fc.column === e.target.id) {
        return { ...fc, value: !fc.value };
      }
      return fc;
    });
    setFilterColumns(updatedFilterColumns);
    localStorage.setItem("filterColumnsCheckSpeaker", JSON.stringify(updatedFilterColumns));
    e.stopPropagation();
  };

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, filterDate }) {
    setLoadingSpinner(false);
    const data = await Podzial.getFilteredCities({
      visibleInSpeaker: true,
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
    const data = await Podzial.changeCheck(Number(id_for_base), null, country, null, checked);
    if (data) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, filterDate });
    } else {
      customAlert({ message: `Something went wrong ${id_for_base}` });
    }
  }

  async function changeCitiesStatus(setChangeStatus, status, id_for_base) {
    setChangeStatus(true);
    const result = await Podzial.changeStatus(status, country, id_for_base);
    setChangeStatus(false);
    if (result) {
      //getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete });
    } else {
      customAlert({ message: `Change status error, id: ${id_for_base}` });
    }
  }

  useEffect(() => {
    const savedFilterSpeaker = JSON.parse(localStorage.getItem("filterSpeaker") || "[]");
    if (savedFilterSpeaker.length > 0) {
      setFilterSpeaker(savedFilterSpeaker);
    } else {
      setFilterColumns(forSpeakerMock);
    }
  }, []);

  useEffect(() => {
    const savedFilterColumns = JSON.parse(localStorage.getItem(`filterColumnsCheckSpeaker ${selectedLang}`) || "[]");
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
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, gap: "1rem" }}>
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
          <FormControl variant="outlined" sx={{ m: 1, minWidth: "100px" }} size="small">
            <InputLabel>Тип прозвона</InputLabel>
            <Select
              label="Тип прозвона"
              defaultValue={10}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <MenuItem value={10}>Holodka</MenuItem>
              <MenuItem value={20}>Podtw</MenuItem>
            </Select>
          </FormControl>
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
                    localStorage.setItem(`filterColumnsCheckSpeaker ${selectedLang}`, JSON.stringify(updatedFilterColumns));
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
            <table style={{ zoom }}>
              <thead className="tableHeader">
                <tr className="tableHeader">
                  <th className="tableHeader" style={{ minWidth: "70.8px", border: "1px solid black" }}></th>
                  <th className="tableHeader" style={{ minWidth: "70.8px", border: "1px solid black" }}>
                    ID
                  </th>

                  {filterColumns?.filter((el) => el.value).map((el) => el.header())}
                  <th className="tableHeader" style={{ border: "1px solid black" }}>
                    {messages.complete}
                  </th>
                </tr>
              </thead>
              <tbody>
                {cities?.map((item, index) => (
                  <CheckBaseTable
                    key={`CheckBaseTable-${item.id}`}
                    currentCities={item}
                    country={country}
                    checkKey={"check_speaker"}
                    changeCheck={changeCheck}
                    filterSpeaker={filterSpeaker}
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
        zoom={zoom}
        changeZoom={changeZoom}
      />
    </PageContainer>
  );
}

export default CheckSpeaker;
