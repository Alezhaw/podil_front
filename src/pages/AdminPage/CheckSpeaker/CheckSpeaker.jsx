import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Podzial from "../../../api/podzial";
import { StyledInput } from "../../../style/styles";
import { StyledDivHeader } from "../Users/style";
import CheckBaseTable from "../components/CheckBaseTable";
import { ContainerForTable } from "../components/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import { allCitiesTableMock, forSpeakerMock } from "../../../components/mock/OutputMock";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { getFormatTime } from "../../../utils/utils";

function CheckScenario({ country }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [filterSpeaker, setFilterSpeaker] = useState([]);
  const [filterColumns, setFilterColumns] = useState([]);
  const [sortId, setSortId] = useState(true);
  const { storedCities, user, locale } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

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
    };
  }, [locale]);

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled }) {
    setLoadingSpinner(false);
    const data = await Podzial.getFilteredCities({
      page: page + 1,
      pageSize: itemsPerPage,
      sort: !sortId,
      search,
      scenarioInProgress: filterInProgress,
      scenarioZamkniete: filterComplete,
      scenarioCanceled: filterCanceled,
      country,
    });
    if (data) {
      setLoadingSpinner(true);
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: { cities: data.cities, country },
      });
    }
  }

  async function changeCheck(checked, id_for_base) {
    const checkConfirm = window.confirm("Are you sure?");
    if (!checkConfirm) return;
    const data = await Podzial.changeCheck(Number(id_for_base), null, country, null, checked);
    if (data) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled });
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
    const savedFilterSpeaker = JSON.parse(localStorage.getItem("filterSpeaker") || "[]");
    if (savedFilterSpeaker.length > 0) {
      setFilterSpeaker(savedFilterSpeaker);
    } else {
      setFilterColumns(forSpeakerMock);
    }
  }, [forSpeakerMock]);

  useEffect(() => {
    const savedFilterColumns = JSON.parse(localStorage.getItem("filterColumnsCheck") || "[]");
    if (savedFilterColumns.length > 0) {
      const updatedFilterColumns = [...allCitiesTableMock?.slice(0, 10)].map((el) => {
        const existingCheckValue = savedFilterColumns.find((cv) => cv.column === el.column);
        return existingCheckValue ? { ...el, value: existingCheckValue.value } : el;
      });
      setFilterColumns(updatedFilterColumns);
    } else {
      setFilterColumns(allCitiesTableMock?.slice(0, 10));
    }
  }, [allCitiesTableMock]);

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
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled });
    // eslint-disable-next-line
  }, [page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled, country]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1000 }}>
        <StyledInput
          className="tabl-flex-admin-search"
          style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
          type="search"
          id="Search"
          value={searchForInput}
          placeholder={messages.search}
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

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px", position: "relative", zIndex: 1000 }}>
          <h5 style={{ margin: "0" }}>{messages.canceled}</h5>{" "}
          <Checkbox
            value={filterCanceled}
            onChange={() => {
              setPage(0);
              setFilterCanceled((prev) => !prev);
            }}
            color="error"
          />
          <h5 style={{ margin: "0" }}>{messages.in_progress}</h5>{" "}
          <Checkbox
            value={filterInProgress}
            defaultChecked
            onChange={() => {
              setPage(0);
              setFilterInProgress((prev) => !prev);
            }}
            color="error"
          />
          <h5 style={{ margin: "0" }}>{messages.complete}</h5>{" "}
          <Checkbox
            value={filterComplete}
            defaultChecked
            onChange={() => {
              setPage(0);
              setFilterComplete((prev) => !prev);
            }}
            color="error"
          />
          <DropdownButton id="dropdown-basic-button" title="For Speaker" style={{ background: "transparent", border: "none" }} variant="secondary">
            <Dropdown.Item
              onClick={(e) => {
                let updatedFilterSpeaker = forSpeakerMock.filter((el) => el.id === "1");
                setFilterSpeaker(updatedFilterSpeaker);
                localStorage.setItem("filterSpeaker", JSON.stringify(updatedFilterSpeaker));
              }}
            >
              1{" "}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                let updatedFilterSpeaker = forSpeakerMock.filter((el) => el.id === "2");
                setFilterSpeaker(updatedFilterSpeaker);
                localStorage.setItem("filterSpeaker", JSON.stringify(updatedFilterSpeaker));
              }}
            >
              2{" "}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                const updatedFilterSpeaker = forSpeakerMock.filter((el) => el.id === "3");
                setFilterSpeaker(updatedFilterSpeaker);
                localStorage.setItem("filterSpeaker", JSON.stringify(updatedFilterSpeaker));
              }}
            >
              3{" "}
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title={messages.columns} style={{ background: "transparent", border: "none" }} variant="secondary">
            {filterColumns.map((el, index) => (
              <Dropdown.Item
                onClick={(e) => {
                  const updatedFilterColumns = filterColumns.map((fc) => {
                    if (fc.column === e.target.id) {
                      return { ...fc, value: !fc.value };
                    }
                    return fc;
                  });
                  setFilterColumns(updatedFilterColumns);
                  localStorage.setItem("filterColumnsCheck", JSON.stringify(updatedFilterColumns));
                  e.stopPropagation();
                }}
                href=""
                key={index}
              >
                <div id={el.column}>
                  <Checkbox checked={el.value} id={el.column} />
                  {el.column}
                </div>
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>

      <h3 style={{ textAlign: "center" }}>{messages.title}</h3>

      <div className="tabl-flex-admin" style={{ borderRadius: "5px" }}>
        <StyledDivHeader size="80px" style={{ cursor: "pointer" }} onClick={() => setSortId((prev) => !prev)}>
          {messages.sort}
        </StyledDivHeader>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th style={{ minWidth: "70.8px" }}></th>
                    <th className="speakerTableCell" style={{ minWidth: "70.8px" }}>
                      ID
                    </th>

                    {filterColumns?.filter((el) => el.value).map((el) => el.header())}
                    <th className="default-col">{messages.complete}</th>
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
                    />
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

export default CheckScenario;
