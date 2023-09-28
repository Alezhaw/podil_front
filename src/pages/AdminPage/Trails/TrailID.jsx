import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import TrailTableID from "../components/TrailTableID";

function TrailID({ country }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, locale } = useAppSelector((store) => store.user);
  const { trails, callTamplates, citiesWithRegions, contractStatuses, forms, planningPeople, presentationTimes, projectConcent, projectSales, regiments, regions, reservationStatuses } =
    useAppSelector((store) => store.trails);
  const [trail, setTrail] = useState({});

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      apply: locale["city_id_apply"],
      days_of_the_week: locale["days_of_the_week"],
      headers: {},
    };
  }, [locale]);

  async function getTrail(id) {
    const data = await Trail.getTrailsById({ ids: [Number(id)], country });
    if (data) {
      dispatch({
        type: reducerTrailsTypes.GET_TRAILS,
        payload: { trails: data.trails, country },
      });
    }
    getDictionary({ country, trails: data.trails });
    return data.trails;
  }

  async function getDictionary({ country, trails }) {
    if (!!trails[0]) {
      const data = await Trail.getDictionary({ country, trails });
      if (data) {
        const dictionary = [
          { reducer: reducerTrailsTypes.GET_CALL_TEMPLATES, key: "callTamplates" },
          { reducer: reducerTrailsTypes.GET_PRESENTATION_TIMES, key: "presentationTimes" },
          { reducer: reducerTrailsTypes.GET_FORMS, key: "forms" },
          { reducer: reducerTrailsTypes.GET_CITIES_WITH_REGIONS, key: "citiesWithRegions" },
          { reducer: reducerTrailsTypes.GET_PLANNING_PEOPLE, key: "planningPeople" },
          { reducer: reducerTrailsTypes.GET_PROJECT_SALES, key: "projectSales" },
          { reducer: reducerTrailsTypes.GET_PROJECT_CONCENT, key: "projectConcent" },
          { reducer: reducerTrailsTypes.GET_REGIMENTS, key: "regiments" },
          { reducer: reducerTrailsTypes.GET_REGIONS, key: "regions" },
          { reducer: reducerTrailsTypes.GET_RESERVATION_STATUSES, key: "reservationStatuses" },
        ];
        dictionary.map((item) => {
          let payload = {
            country,
          };
          payload[item.key] = data[item.key] || [];
          dispatch({
            type: item.reducer,
            payload: payload,
          });
        });
      }
    }
    setTrail(trails[0]);
  }

  async function updateTrail(trail) {
    // const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    const result = await Trail.updateTrail(trail, country);
    if (!result) {
      return alert("Error");
    }
    await getTrail(id);
    alert("Success");
  }

  useEffect(() => {
    const temporaryTrails = trails?.filter((item) => Number(item?.id) === Number(id))[0];
    if (temporaryTrails) {
      setTrail(temporaryTrails);
    }
    // eslint-disable-next-line
  }, [trails]);

  useEffect(() => {
    if (user?.role === "USER") {
      alert("Нет доступа");
      navigate("/login");
    }
  }, [user?.role, navigate, user]);

  useEffect(() => {
    const checkCurrentTrail = trails?.filter((el) => Number(el.id) === Number(id))[0];
    if (!checkCurrentTrail) {
      getTrail(id);
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
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              color: "white",
            }}
          ></div> */}
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ overflowX: "auto" }}>
              {/* <div onClick={() => getTrail(id)}>123</div> */}
              <TrailTableID weekDays={messages.days_of_the_week} trail={trail} />
              {/* <CityTableID setCity={setCity} currentCities={currentCities} deleteTime={deleteTime} country={country} messages={messages.headers} /> */}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                <div className="tabl-flex-admin-button-global" onClick={() => updateTrail(trail)}>
                  {messages.apply}
                </div>
                <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2" style={{ textAlign: "center", padding: "0px 50px" }}>
                  {messages.return}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrailID;
