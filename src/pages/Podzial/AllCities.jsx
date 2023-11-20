import * as React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { TextField, Checkbox, Button, FormControlLabel, Menu, MenuList, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Podzial from "../../api/podzial";
import AllCityTable from "./components/AllCityTable";
import { ContainerForTable } from "../../components/forPages/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import { allCitiesTableMock } from "../../components/mock/OutputMock";
import { getFormatTime } from "../../utils/utils";
import { PageContainer } from "../../components/Page.styled";
import PaginationBlock from "../../components/forPages/PaginationBlock";

function AllCities() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterDate, setFilterDate] = useState({});
  const [filterColumns, setFilterColumns] = useState([]);
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterZamkniete, setFilterZamkniete] = useState(true);
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [sortId, setSortId] = useState(true);
  const { storedCities, user, locale, country, selectedLang } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteCities, setDeleteCities] = useState([]);
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
      closed: locale["closed"],
      columns: locale["columns"],
      new_presentation: locale["all_cities_new_presentation"],
      sort: locale["sort"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      citiesStatus: locale["cities_status"],
    };
  }, [locale]);

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, filterDate }) {
    setLoadingSpinner(false);
    const data = await Podzial.getFilteredCities({
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
      setLoadingSpinner(true);
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: data.cities,
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
      //getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete });
    } else {
      alert(`Change status error, id: ${id_for_base}`);
    }
  }

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
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, filterDate });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, filterDate });
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

  return (
    <PageContainer>
      {/* <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1000 }}> */}
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1000 }}>
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
                      console.log(3, newColumns);
                      return newColumns;
                    });
                    localStorage.setItem(`filterColumns ${selectedLang}`, JSON.stringify(updatedFilterColumns));
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

      {/* <Typography variant="h4" component="h3" sx={{ textAlign: "center" }}>
        {messages.title}
      </Typography> */}
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => setSortId((prev) => !prev)} endIcon={<ArrowDownwardIcon sx={{ transform: `rotate(${sortId ? 180 : 0}deg)` }} />}>
          {messages.sort}
        </Button>
        <Button
          variant="outlined"
          onClick={async () => {
            try {
              await Promise.all(deleteCities?.map(async (id_for_base) => await Podzial.deleteCity(Number(id_for_base), country)));
              setDeleteCities([]);
              await Podzial.getFilteredCities({ page: page + 1, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled, country, filterDate });
              alert("Success");
            } catch (e) {
              alert("Something went wrong");
            }
          }}
          hidden={!deleteCities[0]}
        >
          <DeleteIcon />
        </Button>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <table>
              <thead className="tableHeader">
                <tr style={{ background: "none" }}>
                  <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                    ID
                  </th>
                  {filterColumns?.filter((el) => el.value).map((el) => el.header())}
                </tr>
              </thead>
              <tbody>
                {cities?.map((item, index) => (
                  <AllCityTable
                    key={`${item.id}-${index}`}
                    currentCities={item}
                    country={country}
                    changeDeleteCities={changeDeleteCities}
                    filterColumns={filterColumns}
                    changeCitiesStatus={changeCitiesStatus}
                    citiesStatus={messages?.citiesStatus}
                  />
                ))}
              </tbody>
            </table>
          </ContainerForTable>
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
      />
    </PageContainer>
  );
}

export default AllCities;
