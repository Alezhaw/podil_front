import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";
import { reducerTrailsTypes } from "../../store/Trails/trailsTypes";
import Trail from "../../api/trails/trails";
import Podzial from "../../api/podzial";
import CitiesWithRegions from "../../api/trails/citiesWithRegion";
import Forms from "../../api/trails/forms";
import TrailIDTable from "./components/TrailIDTable";
import { PageContainer } from "../../components/Page.styled";
import { Button } from "@mui/material";

function TrailID() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, locale, country } = useAppSelector((store) => store.user);
  const { trails, allDictionary, citiesWithRegions, allCitiesWithRegions, forms, allForms } = useAppSelector((store) => store.trails);
  const [trail, setTrail] = useState({});

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      apply: locale["city_id_apply"],
      days_of_the_week: locale["days_of_the_week"],
      yes: locale["trails_yes"],
      no: locale["trails_no"],
      city: locale["trails_city"],
      route: locale["trails_route"],
      planning_person: locale["trails_planning_person"],
      date_scheduled: locale["trails_date_scheduled"],
      company: locale["trails_company"],
      city_type: locale["trails_city_type"],
      population: locale["trails_population"],
      departure_dates: locale["trails_departure_dates"],
      presentation_date: locale["trails_presentation_date"],
      presentation_hours: locale["trails_presentation_hours"],
      rental_hours: locale["trails_rental_hours"],
      region: locale["trails_region"],
      institution: locale["trails_institution"],
      address: locale["trails_address"],
      reservation_status: locale["trails_reservation_status"],
      alternative: locale["trails_alternative"],
      telephone: locale["trails_relephone"],
      cost: locale["trails_cost"],
      payment_method: locale["trails_payment_method"],
      contract_status: locale["trails_contract_status"],
      comment: locale["trails_comment"],
      send_to_podil: locale["trails_send_to_podil"],
      send_to_bases: locale["trails_send_to_bases"],
      send_to_speaker: locale["trails_send_to_speaker"],
      send_to_scenario: locale["trails_send_to_scenario"],
      autozonning: locale["trails_autozonning"],
      date_of_previous_presentation: locale["trails_date_previous_presentation"],
      project_sales: locale["trails_project_sales"],
      project_concent: locale["trails_project_concent"],
      call_template: locale["trails_call_template"],
      hall: locale["trails_hall"],
      payment_notes: locale["trails_payment_notes"],
      free_parking: locale["trails_free_parking"],
      comments: locale["trails_comments"],
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
        payload: data.trails,
      });
      await getDictionary({ country, trails: data.trails });
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
          // let payload = {};
          // payload[item.key] = data[item.key] || [];
          dispatch({
            type: item.reducer,
            payload: data[item.key],
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
        payload: allDictionary,
      });
    }
  }

  async function getCitiesByRegion({ country, region_id }) {
    const allCitiesWithRegions = await CitiesWithRegions.getByRegion({ country, region_id });
    if (allCitiesWithRegions) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS,
        payload: allCitiesWithRegions,
      });
    }
  }

  async function getFormsByCityAndName({ country, city_id, search }) {
    const allForms = await Forms.getByName({ country, city_id, search });
    if (allForms?.forms) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_FORMS,
        payload: allForms.forms,
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
    <PageContainer>
      <div style={{ overflowX: "auto" }}>
        <TrailIDTable messages={messages} country={country} trail={trail} setTrail={setTrail} getFormsByCityAndName={getFormsByCityAndName} getValueById={getValueById} createCity={createCity} />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => updateTrail(trail)} variant="outlined">
          {messages.apply}
        </Button>
      </div>
    </PageContainer>
  );
}

export default TrailID;
