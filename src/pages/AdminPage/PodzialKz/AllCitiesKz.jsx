import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { axiosGetAllCitiesKz, axiosDeleteCityKz, axiosCreateCitiesKz, axiosGetAllBasesKz } from "../../../api/podzialKz";
import { StyledInput } from "../../../style/styles";
import { useNavigate } from "react-router-dom";
import { StyledDiv, StyledDivHeader } from "../Users/style";
import CreateCity from "../components/CreateCity";

function CitiesKz() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterInProgress, setFilterInProgress] = useState(true);
  const [filterZamkniete, setFilterZamkniete] = useState(true);
  const [filterPayed, setFilterPayed] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterArbitration, setFilterArbitration] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { citiesKz, basesKz, user } = useAppSelector((store) => store.user);
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteCities, setDeleteCities] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [firstTime, setFirstTime] = useState({});
  const [secondTime, setSecondTime] = useState({});
  const [thirdTime, setThirdTime] = useState({});

  async function getAllCities() {
    const data = await axiosGetAllCitiesKz();
    if (data) {
      dispatch({
        type: reducerTypes.GET_CITIES_KZ,
        payload: data,
      });
    }
  }

  async function getAllBases() {
    const data = await axiosGetAllBasesKz();
    if (data) {
      dispatch({
        type: reducerTypes.GET_BASES_KZ,
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
    const result = await axiosCreateCitiesKz(city);
    if (result) {
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
      citiesKz
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
        ?.sort((a, b) => (sortId ? Number(b.id_for_base) - Number(a.id_for_base) : Number(a.id_for_base) - Number(b.id_for_base)))
    );
  }, [citiesKz, search, filterInProgress, filterZamkniete, filterPayed, filterComplete, filterArbitration, sortId]);

  useEffect(() => {
    if (!citiesKz[0]) {
      getAllCities();
    }
    if (!basesKz[0]) {
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
          onChange={(e) => setSearch(e.target.value?.toLowerCase())}
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
          ID{" "}
        </StyledDivHeader>
        <StyledDivHeader size="324px">Город</StyledDivHeader>
        <StyledDivHeader size="80px">Закрыт</StyledDivHeader>
        <StyledDivHeader size="210px">В току</StyledDivHeader>
        <StyledDivHeader size="80px">Удалить</StyledDivHeader>
      </div>

      {cities?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
        <div style={{ marginTop: "5px", borderRadius: "5px" }} className="tabl-flex-admin-user" key={item?.id}>
          <StyledDiv size="80px" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/cityKz/${item?.id_for_base}`)}>
            {item?.id_for_base}
          </StyledDiv>
          <StyledDiv size="324px" style={{ height: "auto" }}>
            {item?.miasto_lokal}
          </StyledDiv>
          <StyledDiv size="80px">{item?.zamkniete ? <>Да</> : <>Нет</>}</StyledDiv>
          <StyledDiv size="210px">{item?.w_toku ? <>Да</> : <>Нет</>}</StyledDiv>
          <StyledDiv size="80px" onChange={(e) => changeDeleteCities(e.target.checked, item?.id_for_base)}>
            <Checkbox color="error" />
          </StyledDiv>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
        <div
          className="tabl-flex-admin-button"
          onClick={async () => {
            try {
              await Promise.all(deleteCities?.map(async (id_for_base) => await axiosDeleteCityKz(Number(id_for_base))));
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

export default CitiesKz;
