import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllCitiesRu, axiosCreateCitiesRu, axiosGetAllBasesRu, axiosCreateBaseRu } from "../../../api/podzialRu";
import { Container } from "@material-ui/core";
import CityTableID from "../components/CityTableID";
import Base from "../components/Base";

function CityIDRu() {
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
  const [isOpen, setIsOpen] = useState(false);

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

  async function createCity(firstTime, secondTime, thirdTime) {
    const city = [firstTime, secondTime, thirdTime].filter((el) => !!el.godzina);
    const result = await axiosCreateCitiesRu(city);
    if (!result.cities[0]) {
      getAllCities();
      if (result.updated[0]) return alert("Город обновлен");
      if (result.not_id_for_base) return alert("Не указан id_for_base");
    } else {
      alert("Что-то пошло не так");
    }
  }

  async function createBase(currentBases) {
    const result = await axiosCreateBaseRu(currentBases);
    console.log(result);
    if (result.update) {
      getAllBases();
      alert("Sucess");
    } else {
      if (result.notIdForBase) {
        return alert("Не указан id_for_base");
      }
      if (result.bases[0]) {
        getAllBases();
        return alert("Успешно создано");
      }
      alert("Что-то пошло не так");
    }
  }

  useEffect(() => {
    const temporaryCities = citiesRu?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryCities) {
      temporaryCities?.map((item, index) => setCity[index](item));
    }
    // eslint-disable-next-line
  }, [citiesRu]);

  useEffect(() => {
    const temporaryBases = basesRu?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryBases) {
      // setCurrentBases([...temporaryBases, ...temporaryBases])
      setCurrentBases(temporaryBases);
      console.log(1, temporaryBases);
    }
    // eslint-disable-next-line
  }, [basesRu]);

  useEffect(() => {
    if (user?.role === "USER" || user?.role === null || user?.role === "" || user?.role === undefined) {
      navigate("/");
    }
  }, [user?.role, navigate, user]);

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
            alignItems: "center",
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
              <CityTableID setCity={setCity} currentCities={currentCities} />
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
                <Container style={{ padding: "0px", marginTop: "20px" }}>
                  <table style={{ textAlign: "center" }}>
                    <tbody style={{ display: "flex", flexDirection: "row" }}>
                      {currentBases?.map((item) => (
                        <Base item={item} setCurrentBases={setCurrentBases} />
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
                }}
              >
                <div className="tabl-flex-admin-button-global" onClick={() => createBase(currentBases)}>
                  Внести изменения
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CityIDRu;
