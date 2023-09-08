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
import { getFormatTime } from "../../../utils/utils";

function CityID({ country }) {
  const { id_for_base } = useParams();
  const dispatch = useDispatch();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, storedCities, bases } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState({});
  const [secondTime, setSecondTime] = useState({});
  const [thirdTime, setThirdTime] = useState({});
  const setCity = [setFirstTime, setSecondTime, setThirdTime];
  const currentCities = [firstTime, secondTime, thirdTime].filter((el) => !!el?.id);
  const [currentBases, setCurrentBases] = useState([]);
  const [newBase, setNewBase] = useState({});
  const [deleteBases, setDeleteBases] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function getCity(id_for_base) {
    const data = await Podzial.getOneCity(Number(id_for_base) || 0, country);
    if (data) {
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: { cities: data, country },
      });
    }
  }

  async function getBasesForCity(id_for_base) {
    const data = await Podzial.getBasesForCity(Number(id_for_base) || 0, country);
    if (data) {
      dispatch({
        type: reducerTypes.GET_BASES,
        payload: { bases: data.sort((a, b) => a.id - b.id), country },
      });
    }
  }

  async function createCity(firstTime, secondTime, thirdTime) {
    const city = [firstTime, secondTime, thirdTime]?.filter((el) => !!el.time);
    const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    const result = await Podzial.createCities(city, country);
    await getCity(id_for_base);
    if (result[0]?.error) {
      return alert("Error");
    }
    alert("Success");
  }

  async function deleteTime(id, country) {
    const result = await Podzial.deleteTime(id, country);
    if (result) {
      await getCity(id_for_base);
      alert("Deleted");
    } else {
      alert("Something went wrong");
    }
  }

  async function createBase(currentBases) {
    const result = await Podzial.createBase(currentBases, country);
    if (result.update) {
      await getBasesForCity(id_for_base);
      alert("Updated");
    } else {
      if (result.notIdForBase) {
        return alert("Не указан id_for_base");
      }
      if (result.bases[0]) {
        await getBasesForCity(id_for_base);
        setNewBase({ id_for_base: currentCities[0]?.id_for_base });
        setIsOpen(false);
        return alert("Created");
      }
      alert("Something went wrong");
    }
  }

  async function deleteBase(deleteBases) {
    try {
      await Promise.all(deleteBases?.map(async (id) => await Podzial.deleteBase(country, Number(id))));
      setDeleteBases([]);
      await getBasesForCity(id_for_base);
      alert("Success");
    } catch (e) {
      alert("Something went wrong");
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
    const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryCities) {
      setCity.map((set) => set({}));
      temporaryCities
        ?.sort((a, b) => getFormatTime(a) - getFormatTime(b))
        ?.slice(0, 3)
        .map((item, index) => {
          setCity[index](item);
        });
      setNewBase((prev) => ({ ...prev, id_for_base: temporaryCities[0]?.id_for_base }));
    }
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    const temporaryBases = bases?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryBases) {
      // setCurrentBases([...temporaryBases, ...temporaryBases])
      setCurrentBases(temporaryBases);
    }
    // eslint-disable-next-line
  }, [bases]);

  useEffect(() => {
    if (user?.role === "USER") {
      alert("Нет доступа");
      navigate("/login");
    }
  }, [user?.role, navigate, user]);

  useEffect(() => {
    const checkCurrentCity = storedCities?.filter((el) => Number(el.id_for_base) === Number(id_for_base))[0];
    const checkCurrentBases = bases?.filter((el) => Number(el.id_for_base) === Number(id_for_base))[0];
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
              Return
            </div>
          </div>
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ overflowX: "auto" }}>
              <CityTableID setCity={setCity} currentCities={currentCities} deleteTime={deleteTime} country={country} />
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
                Apply changes
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
                    Apply changes for bases
                  </div>
                </div>
                <div style={{ minWidth: "50%", display: "flex", justifyContent: "flex-end" }}>
                  <div className="tabl-flex-admin-button-global" onClick={() => deleteBase(deleteBases)}>
                    Delete
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "40px" }}>
                <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
                  New Base
                </div>
              </div>
              {isOpen ? (
                <CreateBase
                  setIsOpen={setIsOpen}
                  newBase={newBase}
                  setNewBase={setNewBase}
                  createBase={createBase}
                  cities={storedCities}
                  bases={bases}
                  currentBases={currentBases}
                  getFilteredBases={Podzial.getFilteredBases}
                  country={country}
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
