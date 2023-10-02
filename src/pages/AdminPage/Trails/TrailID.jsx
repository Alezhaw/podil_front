import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import Podzial from "../../../api/podzial";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import Forms from "../../../api/trails/forms";
import TrailTableID from "../components/TrailTableID";
import { socket } from "../../../App";

function TrailID({ country }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { user, locale } = useAppSelector((store) => store.user);
  const { trails, allDictionary, citiesWithRegions, allCitiesWithRegions, forms, allForms, trailsCountryForCheck } = useAppSelector((store) => store.trails);
  const [trail, setTrail] = useState({});

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      apply: locale["city_id_apply"],
      days_of_the_week: locale["days_of_the_week"],
      yes: locale["trails_yes"],
      no: locale["trails_no"],
      headers: {},
    };
  }, [locale]);

  async function createCity(trail, checked, key) {
    const statuses = {
      visible_in_podil: "sent_to_podil",
      visible_in_bases: "sent_to_bases",
      visible_in_speaker: "sent_to_speaker",
      visible_in_scenario: "sent_to_scenario",
    };
    let status = {};
    status[statuses[key]] = checked;
    let cities = getValueById(trail.presentation_time_id, "presentation_hour", allDictionary.presentationTimes) || [];
    cities = cities?.map((item) => {
      let city = {
        time: item,
        region: getValueById(trail.regionId, "region", allDictionary?.regions),
        city_lokal: getValueById(trail.city_id, "city_name", allCitiesWithRegions),
        adress: getValueById(trail.form_id, "address", forms) || getValueById(trail.form_id, "address", allForms),
        institution: getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms),
        date: trail.presentation_date,
        population: getValueById(trail.city_id, "population", citiesWithRegions) || getValueById(trail.city_id, "population", allCitiesWithRegions),
        project: getValueById(trail.project_sales_id, "name", allDictionary?.projectSales),
        present: getValueById(trail.project_concent_id, "name", allDictionary?.projectConcent),
        trailId: trail.id,
      };
      city[key] = checked;
      return city;
    });

    // console.log(1, status);
    const result = await Podzial.createCitiesByTrails({ cities, country, status });
    if (result[0]) {
      alert("Sucess");
    } else {
      if (result.updated[0]) return alert("Updated");
      if (result.not_id_for_base) return alert("Не указан id_for_base");
      alert("Something went wrong");
    }
  }

  function getValueById(id, key, array) {
    if (!id) {
      return "";
    }
    const item = array?.filter((item) => item.id === Number(id))[0];
    return item ? item[key] : "";
  }

  async function getTrail(id) {
    const data = await Trail.getTrailsById({ ids: [Number(id)], country });
    if (data) {
      dispatch({
        type: reducerTrailsTypes.GET_TRAILS,
        payload: { trails: data.trails, country },
      });
      getDictionary({ country, trails: data.trails });
    }
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

  async function getAllDictionary({ country }) {
    const allDictionary = await Trail.getAllDictionary({ country });
    if (allDictionary) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: { allDictionary, country },
      });
    }
  }

  async function getCitiesByRegion({ country, region_id }) {
    const allCitiesWithRegions = await CitiesWithRegions.getByRegion({ country, region_id });
    if (allCitiesWithRegions) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS,
        payload: { allCitiesWithRegions, country },
      });
    }
  }

  async function getFormsByCityAndName({ country, city_id, search }) {
    const allForms = await Forms.getByName({ country, city_id, search });
    if (allForms) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_FORMS,
        payload: { allForms, country },
      });
    }
  }

  async function updateTrail(trail) {
    // const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (!trail.autozonning) {
      return alert("Заполните autozonning");
    }
    const result = await Trail.updateTrail(trail, country);
    if (!result) {
      return alert("Error");
    }
    await getTrail(id);
    alert("Success");
  }

  useEffect(() => {
    socket.on("updateTrails", ({ data }) => {
      if (trailsCountryForCheck === data.country) {
        let updatedTrails = trails?.map((trail) => {
          const updatedTrail = data.trails.filter((el) => Number(el.id) === trail.id)[0];
          return updatedTrail ? updatedTrail : trail;
        });
        dispatch({
          type: reducerTrailsTypes.GET_TRAILS,
          payload: { trails: updatedTrails, country: data.country },
        });
      }
    });
    // eslint-disable-next-line
  }, [trails]);

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
    if (trail.regionId) {
      getCitiesByRegion({ country, region_id: trail.regionId });
    }
    // eslint-disable-next-line
  }, [trail.regionId, country]);

  useEffect(() => {
    getFormsByCityAndName({ country, city_id: trail.city_id, search: "" });
    // eslint-disable-next-line
  }, [trail.city_id, country]);

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

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
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ overflowX: "auto" }}>
              {/* <div onClick={() => console.log(1, trail)}>123</div> */}
              <TrailTableID messages={messages} country={country} trail={trail} setTrail={setTrail} getFormsByCityAndName={getFormsByCityAndName} getValueById={getValueById} createCity={createCity} />
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
