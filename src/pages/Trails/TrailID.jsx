import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppSelector } from "../../store/reduxHooks";
import { reducerTrailsTypes } from "../../store/Trails/trailsTypes";
import Trail from "../../api/trails/trails";
import Podzial from "../../api/podzial";
import CitiesWithRegions from "../../api/trails/citiesWithRegion";
import Forms from "../../api/trails/forms";
import Blazor from "../../api/blazor/blazor";
import TrailIDTable from "./components/TrailIDTable";
import { PageContainer } from "../../components/Page.styled";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetAllUsers } from "../../api/user";
import { customAlert } from "../../components/Alert/AlertFunction";
import { getValueById } from "../../components/functions";
import CreateCityForTest from "./components/CreateCityForTest";
import CreateGazooCampaign from "./components/CreateGazooCampaign";

function TrailID() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, locale, country, allUsers, servers, instances } = useAppSelector((store) => store.user);
  const { trails, allDictionary, citiesWithRegions, allCitiesWithRegions, forms, allForms, departure } = useAppSelector((store) => store.trails);
  const [trail, setTrail] = useState({});
  const [limits, setLimits] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateCampaign, setIsOpenCreateCampaign] = useState(false);

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      apply: locale["city_id_apply"],
      cancel: locale["cancel"],
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
      team_number: locale["trails_team_number"],
      departure_dates: locale["trails_departure_dates"],
      presentation_date: locale["trails_presentation_date"],
      presentation_hours: locale["trails_presentation_hours"],
      limit: locale["limit"],
      rental_hours: locale["trails_rental_hours"],
      timezone: locale["timezone"],
      region: locale["trails_region"],
      institution: locale["trails_institution"],
      address: locale["trails_address"],
      reservation_status: locale["trails_reservation_status"],
      alternative: locale["trails_alternative"],
      landmarks: locale["trails_landmarks"],
      telephone: locale["trails_relephone"],
      cost: locale["trails_cost"],
      payment_method: locale["trails_payment_method"],
      contract_status: locale["trails_contract_status"],
      contract_comment: locale["trails_contract_comment"],
      comment: locale["trails_comment"],
      send_to_podil: locale["trails_send_to_podil"],
      send_to_bases: locale["trails_send_to_bases"],
      send_to_speaker: locale["trails_send_to_speaker"],
      send_to_scenario: locale["trails_send_to_scenario"],
      create_city_for_test: locale["trail_create_city_for_test"],
      create_gazoo_campaign: locale["trail_create_gazoo_campaign"],
      create_city_title: locale["note"],
      create: locale["trails_create"],
      autozonning: locale["trails_autozonning"],
      regionalization_comment: locale["trails_regionalization_comment"],
      date_of_previous_presentation: locale["trails_date_previous_presentation"],
      project_sales: locale["trails_project_sales"],
      project_concent: locale["trails_project_concent"],
      call_template: locale["trails_call_template"],
      hall: locale["trails_hall"],
      payment_notes: locale["trails_payment_notes"],
      free_parking: locale["trails_free_parking"],
      comments: locale["trails_comments"],
      edit: locale["admin_panel_edit_trails_dictionary"],
      profile: locale["create_gazoo_campaign_profile"],
      queue: locale["create_gazoo_campaign_queue"],
    };
  }, [locale]);

  async function createCity(trail, checked, key, calling_scheme = null, statusByTest = null, forUpdateTrail = null) {
    const statuses = {
      visible_in_podil: "sent_to_podil",
      visible_in_bases: "sent_to_bases",
      visible_in_speaker: "sent_to_speaker",
      visible_in_scenario: "sent_to_scenario",
    };
    let status = {};
    if (!statusByTest) {
      status[statuses[key]] = checked;
    }

    let cities = getValueById(trail.presentation_time_id, "presentation_hour", allDictionary.presentationTimes) || [];
    cities = cities?.map((item) => {
      let city = {
        time: String(item)?.replaceAll("*", ""),
        calling_scheme,
        l_p_for_pl: country !== "PL" ? null : getValueById(getValueById(trail?.departure_id, "company_id", departure), "name", allDictionary?.regiments),
        region: getValueById(trail.regionId, "region", allDictionary?.regions),
        timezone: getValueById(trail.regionId, "timezone", allDictionary?.regions),
        city_lokal: getValueById(trail.city_id, "city_name", allCitiesWithRegions),
        adress: getValueById(trail.form_id, "address", forms) || getValueById(trail.form_id, "address", allForms),
        institution: getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms),
        date: trail.presentation_date,
        population: getValueById(trail.city_id, "population", citiesWithRegions) || getValueById(trail.city_id, "population", allCitiesWithRegions),
        project: getValueById(trail.project_sales_id, "name", allDictionary?.projectSales),
        present: getValueById(trail.project_concent_id, "name", allDictionary?.projectConcent),
        trailId: trail.id,
        departureId: trail.departure_id,
        departure_date_id: trail.departure_date_id,
        limit: limits?.find((el) => el.time === item)?.limit || 0,
        check_base: false,
        check_speaker: false,
        check_scenario: false,
      };
      if (!forUpdateTrail) {
        city.status = 3;
      }
      if (statusByTest) {
        city = { ...city, ...statusByTest };
      } else {
        city[key] = checked;
      }

      return city;
    });

    // console.log(1, status);
    const result = await Podzial.createCitiesByTrails({ cities, country, status });
    if (!forUpdateTrail) {
      if (result[0]) {
        customAlert({ message: "Success", severity: "success" });
      } else {
        if (result.updated[0]) return customAlert({ message: "Updated", severity: "success" });
        if (result.not_id_for_base) return customAlert({ message: "id_for_base not specified" });
        customAlert({ message: "Something went wrong" });
      }
    }
  }

  async function getServers() {
    try {
      const result = await Promise.all([await Blazor.getInstances(), await Blazor.getServer()]);
      let instances = result[0];
      let servers = result[1];
      dispatch({
        type: reducerTypes.GET_SERVER,
        payload: servers,
      });
      dispatch({
        type: reducerTypes.GET_INSTANCE,
        payload: instances,
      });
    } catch (e) {
      customAlert({ message: `Error getting server list` });
    }
  }

  async function cancelCity({ trail, servers, instances }) {
    const updateCityStatus = await Podzial.changeStatus(0, country, null, null, trail?.id);
    if (!updateCityStatus) {
      customAlert({ message: "Change city status error" });
    }
    const currentServer = (servers || [])?.find((el) => el.id === trail?.gazooServerId);
    if (currentServer) {
      const updatedGazooCampaign = await Blazor.campaignCallingControl(currentServer, trail?.gazooCampaignId, 0);
      console.log(123, updatedGazooCampaign);
    } else {
      customAlert({ message: "Company server not found" });
    }
    const campaignDate = new Date(trail?.presentation_date);
    let date = null;
    try {
      date = campaignDate?.toISOString()?.split("T")[0];
      date = date?.split("-");
      date = `${date[2]}.${date[1]}`;
    } catch (e) {
      console.log(e);
      date = trail?.presentation_date;
    }
    const addCampaign = await Blazor.addCampaign(
      trail?.gazooCampaignId,
      currentServer?.id,
      `${getValueById(trail.regionId, "timezone", allDictionary?.regions)} ${getValueById(trail.city_id, "city_name", allCitiesWithRegions)} ${date} ${
        getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)
      }`,
      campaignDate,
      "Cancel"
    );
    customAlert({ message: "Sucess", severity: "success" });
    console.log(1, servers, instances);
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
          { reducer: reducerTrailsTypes.GET_DEPARTURE, key: "departure" },
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

  async function updateTrail(trail, limits) {
    // const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (!trail.autozonning) {
      return customAlert({ message: "Fill out autozoning" });
    }
    trail = { ...trail, limits: limits?.map((el) => el.limit) };
    const result = await Trail.updateTrail(trail, country);
    if (!result) {
      return customAlert({ message: "Error" });
    }
    await getTrail(id);
    customAlert({ message: "Sucess", severity: "success" });
  }

  async function getUsers() {
    const data = await axiosGetAllUsers();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_USERS,
        payload: data,
      });
    }
  }

  useEffect(() => {
    const temporaryTrails = trails?.find((item) => Number(item?.id) === Number(id));
    if (temporaryTrails) {
      setTrail(temporaryTrails);
      const times = getValueById(temporaryTrails.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes);
      setLimits(times?.map((el, index) => ({ time: el, limit: [temporaryTrails?.limits]?.flat()[index] || 0 })));
    }
    // eslint-disable-next-line
  }, [trails, allDictionary]);

  useEffect(() => {
    if (trail) {
      const times = getValueById(trail.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes);
      if (times) {
        setLimits(times?.map((el, index) => ({ time: el, limit: [trail?.limits]?.flat()[index] || 0 })));
      }
    }
    // eslint-disable-next-line
  }, [trail?.presentation_time_id, allDictionary]);

  useEffect(() => {
    //setTrails(trails?.filter((el) => el.departure_date_id === trail.id));
    setRowNumber(
      trails
        ?.filter((el) => el.departure_date_id === trail.departure_date_id)
        ?.map((el) => getValueById(el.presentation_time_id, "presentation_hour", allDictionary.presentationTimes))
        ?.flat()?.length
    );

    // eslint-disable-next-line
  }, [trails, trail]);

  // useEffect(() => {
  //   const trail = trails?.find((item) => Number(item?.id) === Number(id));
  //   if (trail?.id && allDictionary?.presentationTimes) {
  //     const times = getValueById(trail.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes);
  //     if (!trail?.limits) {
  //       setTrail((prev) => ({ ...prev, limits: times?.map((el) => ({ time: el, limit: 0 })) }));
  //     } else {
  //       setTrail((prev) => ({ ...prev, limits: times?.map((el, index) => ({ time: el, limit: [trail?.limits]?.flat()[index] || 0 })) }));
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [trails, allDictionary]);

  useEffect(() => {
    if (user?.role === "USER") {
      customAlert({ message: "No access" });
      navigate("/login");
    }
    if (!allUsers[0]) {
      getUsers();
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

  useEffect(() => {
    getServers();
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      {isOpen ? <CreateCityForTest setIsOpen={setIsOpen} item={trail} createCity={createCity} messages={messages} /> : null}
      {isOpenCreateCampaign ? (
        <CreateGazooCampaign
          setIsOpen={setIsOpenCreateCampaign}
          trail={trail}
          getTrail={getTrail}
          trailId={id}
          allDictionary={allDictionary}
          allCitiesWithRegions={allCitiesWithRegions}
          forms={forms}
          allForms={allForms}
          createCity={createCity}
          messages={messages}
        />
      ) : null}
      <div style={{ overflowX: "auto" }}>
        <TrailIDTable
          messages={messages}
          country={country}
          trail={trail}
          limits={limits}
          setLimits={setLimits}
          setTrail={setTrail}
          getFormsByCityAndName={getFormsByCityAndName}
          createCity={createCity}
          rowNumber={rowNumber}
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Button
          onClick={() => {
            updateTrail(trail, limits);
            createCity(trail, null, null, null, {}, true);
          }}
          variant="outlined"
        >
          {messages.apply}
        </Button>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <Button onClick={() => cancelCity({ trail, servers, instances })} variant="outlined">
            {messages?.cancel}
          </Button>
          <Button onClick={() => setIsOpenCreateCampaign(true)} variant="outlined">
            {messages?.create_gazoo_campaign}
          </Button>

          <Button onClick={() => setIsOpen(true)} variant="outlined">
            {messages.create_city_for_test}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

export default TrailID;
