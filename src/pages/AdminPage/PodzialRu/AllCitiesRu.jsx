import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { axiosGetAllCitiesRu, axiosDeleteCityRu, axiosCreateCitiesRu, axiosGetAllBasesRu } from "../../../api/podzialRu";
import { StyledInput } from "../../../style/styles";
import { useNavigate } from "react-router-dom";
import { StyledDivHeader } from "../Users/style";
import CreateCity from "../components/CreateCity";
import AllCityTable from "../components/AllCityTable";
import { Container } from "@material-ui/core";
import { ContainerForTable } from "../components/Table.styled";

function AllCitiesRu() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterZamkniete, setFilterZamkniete] = useState(true);
  const [filterPayed, setFilterPayed] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterArbitration, setFilterArbitration] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { citiesRu, basesRu, user } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteCities, setDeleteCities] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [firstTime, setFirstTime] = useState({});
  const [secondTime, setSecondTime] = useState({});
  const [thirdTime, setThirdTime] = useState({});

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
    const result = await axiosCreateCitiesRu(city);
    if (result.cities[0]) {
      getAllCities();
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

  useEffect(() => {
    setCities(
      citiesRu
        ?.filter((el, i, ar) => (search ? el?.miasto_lokal?.toLowerCase()?.includes(search) : true))
        .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
        ?.filter(
          (checkbox) =>
            (!checkbox?.zamkniete && filterInProgress) ||
            (!!checkbox?.zamkniete && filterZamkniete) ||
            (checkbox?.status === 3 && filterPayed) ||
            (checkbox?.status === 4 && filterComplete) ||
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
          <h5 style={{ margin: "0" }}>Не закрыт</h5> <Checkbox value={filterInProgress} defaultChecked onChange={() => setFilterInProgress((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>Закрыт</h5> <Checkbox value={filterZamkniete} defaultChecked onChange={() => setFilterZamkniete((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>...</h5> <Checkbox value={filterPayed} defaultChecked onChange={() => setFilterPayed((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>...</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" />
          <h5 style={{ margin: "0" }}>...</h5> <Checkbox value={filterArbitration} defaultChecked onChange={() => setFilterArbitration((prev) => !prev)} color="error" />
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

      <div style={{ overflowX: "auto", textAlign: "center" }}>
        <ContainerForTable>
          <table>
            <thead style={{ background: "#5a5959" }}>
              <tr style={{ background: "none" }}>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  ID
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  L.p
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  Godzina
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  Приход всего
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  Пар всего
                </th>
                <th className="basesTableCell" style={{ minWidth: "86px" }}>
                  Проверка прихода
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  КР
                </th>
                <th className="basesTableCell" style={{ minWidth: "250px" }}>
                  Miasto / Lokal
                </th>
                <th className="basesTableCell" style={{ minWidth: "78px" }}>
                  Часовой Пояс
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  Лимит
                </th>
                <th className="basesTableCell" style={{ minWidth: "85px" }}>
                  W toku
                </th>
                <th className="basesTableCell" style={{ minWidth: "85px", maxWidth: "85px" }}>
                  Zamkniete
                </th>
                <th className="basesTableCell" style={{ minWidth: "140px" }}>
                  Dodawanie rekordów
                </th>
                <th className="basesTableCell" style={{ minWidth: "97.5px" }}>
                  Scenariusze
                </th>
                <th className="basesTableCell" style={{ minWidth: "94px" }}>
                  Weryfikacja DKJ
                </th>
                <th className="basesTableCell" style={{ minWidth: "96px" }}>
                  Podpinanie scenariuszy
                </th>
                <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
                  Limit regalo
                </th>
                <th className="basesTableCell" style={{ minWidth: "78.4px" }}>
                  Rekodow na 1 zgode
                </th>
                <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
                  WB 1
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  WB 2
                </th>
                <th className="basesTableCell" style={{ minWidth: "87px" }}>
                  Ilość Zaproszeń
                </th>
                <th className="basesTableCell" style={{ minWidth: "70.8px", background: "#c8ff03", color: "black" }}>
                  Zgody inne miasto
                </th>
                <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px" }}>
                  <tr style={{ background: "none" }}>
                    <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
                    <th>Aktualna ilość zaproszeń</th>
                  </tr>
                  <tr style={{ background: "none" }}>
                    <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
                      1 dzień
                    </th>
                  </tr>
                </th>
                <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px" }}>
                  <tr style={{ background: "none" }}>
                    <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
                    <th>Aktualna ilość zaproszeń</th>
                  </tr>
                  <tr style={{ background: "none" }}>
                    <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
                      2 dzień
                    </th>
                  </tr>
                </th>
                <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px" }}>
                  <tr style={{ background: "none" }}>
                    <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
                    <th>Aktualna ilość zaproszeń</th>
                  </tr>
                  <tr style={{ background: "none" }}>
                    <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
                      3 dzień
                    </th>
                  </tr>
                </th>
                <th colSpan="6" style={{ border: "1px solid black" }}>
                  <th colSpan="6" style={{ width: "335px", borderBottom: "1px solid black", height: "75px" }}>
                    VIP
                  </th>
                  <tr style={{ height: "55px", background: "none" }}>
                    <th style={{ borderRight: "1px solid black", minWidth: "100.8px" }}>ID</th>
                    <th style={{ borderRight: "1px solid black", minWidth: "100.8px" }}>Формат</th>
                    <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>Лимит</th>
                    <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>Приход</th>
                    <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>Пар всего</th>
                    <th style={{ minWidth: "70.8px" }}>%, прихода</th>
                  </tr>
                </th>
                <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
                  ЗАМЕТКА
                </th>
                <th colSpan="3" style={{ border: "1px solid black" }}>
                  <th colSpan="3" style={{ borderBottom: "1px solid black", height: "75px" }}>
                    WYNIKI POTWIERDZEŃ
                  </th>
                  <tr style={{ background: "none" }}>
                    <th style={{ borderRight: "1px solid black", minWidth: "68.8px", height: "55px" }}>Zgoda</th>
                    <th style={{ borderRight: "1px solid black", minWidth: "68.8px" }}>Odmowy</th>
                    <th style={{ minWidth: "68.8px" }}>Kropki</th>
                  </tr>
                </th>
                <th colSpan="2" style={{ border: "1px solid black" }}>
                  <th colSpan="2" style={{ borderBottom: "1px solid black", height: "75px" }}>
                    SMS
                  </th>
                  <tr style={{ background: "none" }}>
                    <th style={{ borderRight: "1px solid black", maxWidth: "70.8px", height: "55px" }}>Umawianie</th>
                    <th style={{ maxWidth: "95px" }}>Potwierdzanie</th>
                  </tr>
                </th>
                <th className="basesTableCell" style={{ maxWidth: "75px" }}>
                  Удалить
                </th>
              </tr>
            </thead>
            <tbody>
              {cities?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
                <AllCityTable currentCities={item} country="cityRu" changeDeleteCities={changeDeleteCities} key={index} />
              ))}
            </tbody>
          </table>
        </ContainerForTable>
        {/*style={{ width: "3500px", overflowY: "auto", height: "150vh" }} */}
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
        <div
          className="tabl-flex-admin-button"
          onClick={async () => {
            try {
              await Promise.all(deleteCities?.map(async (id_for_base) => await axiosDeleteCityRu(Number(id_for_base))));
              setDeleteCities([]);
              await getAllCities();
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

export default AllCitiesRu;
