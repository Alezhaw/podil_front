import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { axiosDeleteCityKz, axiosCreateCitiesKz, axiosGetFilteredCitiesKz, axiosChangeStatusKz } from "../../../api/podzialKz";
import { StyledInput } from "../../../style/styles";
import { StyledDivHeader } from "../Users/style";
import CreateCity from "../components/CreateCity";
import AllCityTable from "../components/AllCityTable";
import { ContainerForTable } from "../components/Table.styled";
import Spinner from "react-bootstrap/Spinner";
import { allCitiesTableMock } from "../../../components/mock/OutputMock";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function AllCitiesKz() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterColumns, setFilterColumns] = useState([]);
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterZamkniete, setFilterZamkniete] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { citiesKz, user } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteCities, setDeleteCities] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [firstTime, setFirstTime] = useState({});
  const [secondTime, setSecondTime] = useState({});
  const [thirdTime, setThirdTime] = useState({});
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled }) {
    setLoadingSpinner(false);
    const data = await axiosGetFilteredCitiesKz({ page: page + 1, pageSize: itemsPerPage, sort: !sortId, search, inProgress: filterInProgress, zamkniete: filterZamkniete, canceled: filterCanceled });
    setLoadingSpinner(true);
    if (data) {
      setCount(data.count);
      dispatch({
        type: reducerTypes.GET_CITIES_KZ,
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

  function changeCityValues(key, value) {
    const setCity = [setFirstTime, setSecondTime, setThirdTime];
    setCity.map((item) => item((prev) => ({ ...prev, [key]: value })));
  }

  async function createCity(firstTime, secondTime, thirdTime) {
    const city = [firstTime, secondTime, thirdTime].filter((el) => !!el.godzina);
    const result = await axiosCreateCitiesKz(city);
    if (result.cities[0]) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled });
      alert("Sucess");
      setFirstTime({});
      setSecondTime({});
      setThirdTime({});
      setIsOpen(false);
    } else {
      if (result.updated[0]) return alert("Город обновлен");
      if (result.not_id_for_base) return alert("Не указан id_for_base");
      alert("Что-то пошло не так");
    }
  }

  async function changeCitiesStatus(setChangeStatus, status, id_for_base) {
    setChangeStatus(true);
    const result = await axiosChangeStatusKz(status, id_for_base);
    setChangeStatus(false);
    if (result) {
      //getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete });
    } else {
      alert(`Ошибка смены статуса, id: ${id_for_base}`);
    }
  }

  useEffect(() => {
    setCities(
      citiesKz
        .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
        ?.map((el) => citiesKz?.filter((time) => time.id_for_base === el.id_for_base))
        ?.map((item) => item?.sort((a, b) => Number(a?.godzina?.split(":")[0]) - Number(b?.godzina?.split(":")[0])))
    );
  }, [citiesKz]);

  useEffect(() => {
    if (!citiesKz[0]) {
      getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled });
    // eslint-disable-next-line
  }, [page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled]);

  useEffect(() => {
    const savedFilterColumns = JSON.parse(localStorage.getItem("filterColumns") || "[]");
    if (savedFilterColumns.length > 0) {
      const updatedFilterColumns = allCitiesTableMock.map((el) => {
        const existingCheckValue = savedFilterColumns.find((cv) => cv.column === el.column);
        return existingCheckValue ? { ...el, value: existingCheckValue.value } : el;
      });
      setFilterColumns(updatedFilterColumns);
    } else {
      setFilterColumns(allCitiesTableMock);
    }
  }, [allCitiesTableMock]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StyledInput
          className="tabl-flex-admin-search"
          style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
          type="search"
          id="Search"
          value={searchForInput}
          placeholder="Поиск"
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

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px", zIndex: 10 }}>
          <h5 style={{ margin: "0" }}>Отменен</h5>{" "}
          <Checkbox
            value={filterCanceled}
            onChange={() => {
              setPage(0);
              setFilterCanceled((prev) => !prev);
            }}
            color="error"
          />
          <h5 style={{ margin: "0" }}>Не закрыт</h5>{" "}
          <Checkbox
            value={filterInProgress}
            defaultChecked
            onChange={() => {
              setPage(0);
              setFilterInProgress((prev) => !prev);
            }}
            color="error"
          />
          <h5 style={{ margin: "0" }}>Закрыт</h5>{" "}
          <Checkbox
            value={filterZamkniete}
            defaultChecked
            onChange={() => {
              setPage(0);
              setFilterZamkniete((prev) => !prev);
            }}
            color="error"
          />
          <DropdownButton id="dropdown-basic-button" title="Dropdown button" style={{ background: "transparent", border: "none" }} variant="secondary">
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
                  localStorage.setItem("filterColumns", JSON.stringify(updatedFilterColumns));
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

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "40px" }}>
        <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
          Новый зал
        </div>
      </div>
      {isOpen ? (
        <CreateCity
          setIsOpen={setIsOpen}
          firstTime={firstTime}
          setFirstTime={setFirstTime}
          secondTime={secondTime}
          setSecondTime={setSecondTime}
          thirdTime={thirdTime}
          setThirdTime={setThirdTime}
          changeCityValues={changeCityValues}
          createCity={createCity}
        />
      ) : (
        ""
      )}

      <h3 style={{ textAlign: "center" }}>Города</h3>

      <div className="tabl-flex-admin" style={{ borderRadius: "5px" }}>
        <StyledDivHeader size="80px" style={{ cursor: "pointer" }} onClick={() => setSortId((prev) => !prev)}>
          СОРТ
        </StyledDivHeader>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <table>
              <thead style={{ background: "#5a5959" }}>
                <tr style={{ background: "none" }}>
                  <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                    ID
                  </th>
                  {filterColumns?.filter((el) => el.value).map((el) => el.header())}
                </tr>
              </thead>
              <tbody>
                {/* {cities?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => ( */}
                {cities?.map((item, index) => (
                  <AllCityTable currentCities={item} country="cityKz" changeDeleteCities={changeDeleteCities} filterColumns={filterColumns} changeCitiesStatus={changeCitiesStatus} key={item.id} />
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
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
        <div
          className="tabl-flex-admin-button"
          onClick={async () => {
            try {
              await Promise.all(deleteCities?.map(async (id_for_base) => await axiosDeleteCityKz(Number(id_for_base))));
              setDeleteCities([]);
              await getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterZamkniete, filterCanceled });
              alert("Success");
            } catch (e) {
              alert("Что-то пошло не так");
            }
          }}
        >
          Удалить
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
        <h6 style={{ margin: "0px", paddingRight: "10px" }}>Кол-во</h6>
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

export default AllCitiesKz;
