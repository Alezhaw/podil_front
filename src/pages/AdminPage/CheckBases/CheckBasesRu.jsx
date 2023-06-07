import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { axiosGetAllCitiesRu, axiosGetAllBasesRu, axiosChangeCheckRu } from "../../../api/podzialRu";
import { StyledInput } from "../../../style/styles";
import { StyledDivHeader } from "../Users/style";
import CheckBaseTable from "../components/CheckBaseTable";
import { ContainerForTable } from "../components/Table.styled";

function CheckBasesRu() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterZamkniete, setFilterZamkniete] = useState(true);
  const [filterPayed, setFilterPayed] = useState(true);
  const [filterArbitration, setFilterArbitration] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { citiesRu, basesRu, user } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  async function getAllCities() {
    const data = await axiosGetAllCitiesRu();
    if (data) {
      dispatch({
        type: reducerTypes.GET_CITIES_RU,
        payload: data,
      });
    }
  }

  async function getAllBases() {
    const data = await axiosGetAllBasesRu();
    if (data) {
      dispatch({
        type: reducerTypes.GET_BASES_RU,
        payload: data,
      });
    }
  }

  async function changeCheckRu(checked, id_for_base) {
    const checkConfirm = window.confirm("Вы уверены?");
    if (!checkConfirm) return;
    const data = await axiosChangeCheckRu(Number(id_for_base), null, checked);
    if (data) {
      dispatch({
        type: reducerTypes.GET_CITIES_RU,
        payload: data,
      });
    } else {
      alert(`Что-то пошло не так ${id_for_base}`);
    }
  }

  useEffect(() => {
    setCities(
      citiesRu
        ?.filter((el, i, ar) => (search ? el?.miasto_lokal?.toLowerCase()?.includes(search) : true))
        .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
        ?.filter(
          (checkbox) =>
            (!checkbox?.check_base && filterInProgress) ||
            (!!checkbox?.check_base && filterComplete) ||
            (checkbox?.status === 4 && filterZamkniete) ||
            (checkbox?.status === 3 && filterPayed) ||
            (checkbox?.status === 5 && filterArbitration)
        )
        ?.map((el) => citiesRu?.filter((time) => time.id_for_base === el.id_for_base))
        ?.sort((a, b) => (sortId ? Number(b[0].id_for_base) - Number(a[0].id_for_base) : Number(a[0].id_for_base) - Number(b[0].id_for_base)))
        ?.map((item) => item?.sort((a, b) => Number(a?.godzina?.split(":")[0]) - Number(b?.godzina?.split(":")[0])))
    );
  }, [citiesRu, search, filterInProgress, filterZamkniete, filterPayed, filterComplete, filterArbitration, sortId]);

  useEffect(() => {
    if (!citiesRu[0]) {
      getAllCities();
    }
    if (!basesRu[0]) {
      getAllBases();
    }
    // eslint-disable-next-line
  }, [user]);

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
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value?.toLowerCase());
          }}
          autoComplete="off"
          required
        />

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px" }}>
          <h5 style={{ margin: "0" }}>In progress</h5> <Checkbox value={filterInProgress} defaultChecked onChange={() => setFilterInProgress((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>Complete</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>...</h5> <Checkbox value={filterZamkniete} defaultChecked onChange={() => setFilterZamkniete((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>...</h5> <Checkbox value={filterPayed} defaultChecked onChange={() => setFilterPayed((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>...</h5> <Checkbox value={filterArbitration} defaultChecked onChange={() => setFilterArbitration((prev) => !prev)} color="error" />
        </div>
      </div>

      <h3 style={{ textAlign: "center" }}>Города</h3>

      <div className="tabl-flex-admin" style={{ borderRadius: "5px" }}>
        <StyledDivHeader size="80px" style={{ cursor: "pointer" }} onClick={() => setSortId((prev) => !prev)}>
          СОРТ
        </StyledDivHeader>
      </div>

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
                {cities?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
                  <CheckBaseTable currentCities={item} country="cityRu" checkKey={"check_base"} changeCheck={changeCheckRu} />
                ))}
              </tbody>
            </table>
          </div>
        </ContainerForTable>
      </div>

      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        count={Math.ceil(cities?.length / itemsPerPage)}
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

export default CheckBasesRu;
