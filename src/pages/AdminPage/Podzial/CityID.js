import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import Podzial from "../../../api/podzial";
import { Container } from "@material-ui/core";
import CityTableID from "../components/CityTableID";
import Base from "../components/Base";
import CreateBase from "../components/CreateBase";

function CityID() {
  const { id_for_base } = useParams();
  const dispatch = useDispatch();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, citiesRu, basesRu } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState({});
  const [secondTime, setSecondTime] = useState({});
  const [thirdTime, setThirdTime] = useState({});
  const setCity = [setFirstTime, setSecondTime, setThirdTime];
  const currentCities = [firstTime, secondTime, thirdTime]?.filter((el) => !!el?.godzina);
  const [currentBases, setCurrentBases] = useState([]);
  const [newBase, setNewBase] = useState({});
  const [deleteBases, setDeleteBases] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function getCity(id_for_base) {
    const data = await Podzial.getOneCity(Number(id_for_base) || 0);
    if (data) {
      dispatch({
        type: reducerTypes.GET_CITIES_RU,
        payload: data,
      });
    }
  }

  async function getBasesForCity(id_for_base) {
    const data = await Podzial.getBasesForCity(Number(id_for_base) || 0);
    if (data) {
      dispatch({
        type: reducerTypes.GET_BASES_RU,
        payload: data.sort((a, b) => a.id - b.id),
      });
    }
  }

  async function createCity(firstTime, secondTime, thirdTime) {
    const city = [firstTime, secondTime, thirdTime].filter((el) => !!el.godzina);
    const result = await Podzial.createCities(city);
    await getCity(id_for_base);
    if (result.updated[0]) return alert("Город обновлен");
    if (result.not_id_for_base) return alert("Не указан id_for_base");
    if (result.cities[0]) return alert("Сохранено");
    alert("Что-то пошло не так");
  }

  async function deleteTime(id) {
    const result = await Podzial.deleteTime(id);
    if (result) {
      await getCity(id_for_base);
      alert("Удалено");
    } else {
      alert("Что-то пошло не так");
    }
  }

  async function createBase(currentBases) {
    const result = await Podzial.CreateBase(currentBases);
    if (result.update) {
      await getBasesForCity(id_for_base);
      alert("Обновлено");
    } else {
      if (result.notIdForBase) {
        return alert("Не указан id_for_base");
      }
      if (result.bases[0]) {
        await getBasesForCity(id_for_base);
        setNewBase({ id_for_base: currentCities[0]?.id_for_base });
        setIsOpen(false);
        return alert("Успешно создано");
      }
      alert("Что-то пошло не так");
    }
  }

  async function deleteBase(deleteBases) {
    try {
      await Promise.all(deleteBases?.map(async (id) => await Podzial.deleteBaseRu(Number(id))));
      setDeleteBases([]);
      await getBasesForCity(id_for_base);
      alert("Success");
    } catch (e) {
      alert("Что-то пошло не так");
    }
  }

  function changeDeleteBases(checked, id) {
    if (checked) {
      setDeleteBases((prev) => [...prev, id]);
    } else {
      setDeleteBases((prev) => prev.filter((item) => item !== id));
    }
  }

  useEffect(() => {
    const temporaryCities = citiesRu?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryCities) {
      setCity.map((set) => set({}));
      temporaryCities?.sort((a, b) => Number(a?.godzina?.split(":")[0]) - Number(b?.godzina?.split(":")[0]))?.map((item, index) => setCity[index](item));
      setNewBase((prev) => ({ ...prev, id_for_base: temporaryCities[0]?.id_for_base }));
    }
    // eslint-disable-next-line
  }, [citiesRu]);

  useEffect(() => {
    const temporaryBases = basesRu?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryBases) {
      // setCurrentBases([...temporaryBases, ...temporaryBases])
      setCurrentBases(temporaryBases);
    }
    // eslint-disable-next-line
  }, [basesRu]);

  useEffect(() => {
    if (user?.role === "USER") {
      alert("Нет доступа");
      navigate("/login");
    }
  }, [user?.role, navigate, user]);

  useEffect(() => {
    const checkCurrentCity = citiesRu?.filter((el) => Number(el.id_for_base) === Number(id_for_base))[0];
    const checkCurrentBases = basesRu?.filter((el) => Number(el.id_for_base) === Number(id_for_base))[0];
    if (!checkCurrentCity) {
      getCity(id_for_base);
    }
    if (!checkCurrentBases) {
      getBasesForCity(id_for_base);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
        className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "0px 50px",
            background: "rgba(17, 17, 18, 0.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              color: "white",
            }}
          >
            <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2">
              Вернуться назад
            </div>
          </div>
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ overflowX: "auto" }}>
              <CityTableID setCity={setCity} currentCities={currentCities} deleteTime={deleteTime} />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <div className="tabl-flex-admin-button-global" onClick={() => createCity(firstTime, secondTime, thirdTime)}>
                Внести изменения
              </div>
            </div>
            <div>
              {/* <div style={{ overflowX: 'auto', padding: '0px 25px', marginTop: '25px' }}> */}
              <div style={{ overflow: "auto" }}>
                {/* <table style={{ minWidth: `${currentBases?.length * 358}px`, textAlign: 'center' }}> */}
                <Container style={{ padding: "0px", margin: "20px 0px 0px" }}>
                  <table style={{ textAlign: "center" }}>
                    <tbody style={{ display: "flex", flexDirection: "row" }}>
                      {currentBases?.map((item) => (
                        <Base item={item} setCurrentBases={setCurrentBases} changeDeleteBases={changeDeleteBases} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </Container>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "20px",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <div style={{ minWidth: "50%", display: "flex", justifyContent: "flex-end" }}>
                  <div className="tabl-flex-admin-button-global" onClick={() => createBase(currentBases)}>
                    Внести изменения
                  </div>
                </div>
                <div style={{ minWidth: "50%", display: "flex", justifyContent: "flex-end" }}>
                  <div className="tabl-flex-admin-button-global" onClick={() => deleteBase(deleteBases)}>
                    Удалить
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "40px" }}>
                <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
                  Новая База
                </div>
              </div>
              {isOpen ? (
                <CreateBase
                  setIsOpen={setIsOpen}
                  newBase={newBase}
                  setNewBase={setNewBase}
                  createBase={createBase}
                  cities={citiesRu}
                  bases={basesRu}
                  currentBases={currentBases}
                  getFilteredBases={Podzial.getFilteredBases}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CityID;
