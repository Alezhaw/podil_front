import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
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

function CheckBases({ country }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filterCanceled, setFilterCanceled] = useState(false);
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { storedCities, user } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageForInput, setItemsPerPageForInput] = useState(10);
  const [count, setCount] = useState(1);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  async function getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled }) {
    setLoadingSpinner(false);
    const data = await Podzial.getFilteredCities({
      page: page + 1,
      pageSize: itemsPerPage,
      sort: !sortId,
      search,
      baseInProgress: filterInProgress,
      baseZamkniete: filterComplete,
      baseCanceled: filterCanceled,
      country
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
    const checkConfirm = window.confirm("Вы уверены?");
    if (!checkConfirm) return;
    const data = await Podzial.changeCheck(Number(id_for_base), null, checked, country);
    if (data) {
      await getFilteredCities({ page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled });
    } else {
      alert(`Что-то пошло не так ${id_for_base}`);
    }
  }

  useEffect(() => {
    setCities(
      storedCities
        .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
        ?.map((el) => storedCities?.filter((time) => time.id_for_base === el.id_for_base))
        ?.map((item) => item?.sort((a, b) => Number(a?.godzina?.split(":")[0]) - Number(b?.godzina?.split(":")[0])))
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
  }, [page, itemsPerPage, sortId, search, filterInProgress, filterComplete, filterCanceled]);

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
            if (e.key === "Enter") {
              setPage(0);
              setSearch(e.target.value?.toLowerCase()?.trim());
            }
          }}
          autoComplete="off"
          required
        />

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px" }}>
          <h5 style={{ margin: "0" }}>Отменен</h5>{" "}
          <Checkbox
            value={filterCanceled}
            onChange={() => {
              setPage(0);
              setFilterCanceled((prev) => !prev);
            }}
            color="error"
          />
          <h5 style={{ margin: "0" }}>In progress</h5>{" "}
          <Checkbox
            value={filterInProgress}
            defaultChecked
            onChange={() => {
              setPage(0);
              setFilterInProgress((prev) => !prev);
            }}
            color="error"
          />
          <h5 style={{ margin: "0" }}>Complete</h5>{" "}
          <Checkbox
            value={filterComplete}
            defaultChecked
            onChange={() => {
              setPage(0);
              setFilterComplete((prev) => !prev);
            }}
            color="error"
          />
        </div>
      </div>

      <h3 style={{ textAlign: "center" }}>Города</h3>

      <div className="tabl-flex-admin" style={{ borderRadius: "5px" }}>
        <StyledDivHeader size="80px" style={{ cursor: "pointer" }} onClick={() => setSortId((prev) => !prev)}>
          СОРТ
        </StyledDivHeader>
      </div>

      {loadingSpinner ? (
        <div style={{ overflowX: "auto", textAlign: "center" }}>
          <ContainerForTable>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="default-col"> ID</th>
                    <th className="default-col">L.p</th>
                    <th className="default-col">Godzina</th>
                    <th className="default-col">Приход всего</th>
                    <th className="default-col">Пар всего</th>
                    <th className="coming-col">Проверка прихода</th>
                    <th className="default-col">КР</th>
                    <th className="miasto-col">Miasto / Lokal</th>
                    <th className="timezone-col">Часовой Пояс</th>
                    <th className="default-col">Лимит</th>
                    <th className="default-col">Готово</th>
                  </tr>
                </thead>
                <tbody>
                  {cities?.map((item, index) => (
                    <CheckBaseTable key={`CheckBaseTable-${item.id}`} currentCities={item} country={country} checkKey={"check_base"} changeCheck={Podzial.changeCheck} />
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

export default CheckBases;
