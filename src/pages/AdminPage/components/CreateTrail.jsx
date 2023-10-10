import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, FormControl, Select, Autocomplete, TextField } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import Forms from "../../../api/trails/forms";
import TrailSelect from "./TrailSelect";

function CreateTrail({ country, setIsOpen, newTrail, setNewTrail, createTrail, messages }) {
  const dispatch = useDispatch();
  const { allDictionary, allCitiesWithRegions } = useAppSelector((store) => store.trails);

  function getValueById(id, key, array) {
    if (!id) {
      return "";
    }
    const item = array?.filter((item) => item.id === Number(id))[0];
    return item ? item[key] : "";
  }

  function getDayName(date) {
    if (!date) {
      return "";
    }
    if (!messages.days_of_the_week) {
      return "";
    }
    const d = new Date(date);
    return messages.days_of_the_week[d.getDay()];
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

  useEffect(() => {
    if (newTrail.regionId) {
      getCitiesByRegion({ country, region_id: newTrail.regionId });
    }
    // eslint-disable-next-line
  }, [newTrail.regionId, country]);

  useEffect(() => {
    getFormsByCityAndName({ country, city_id: newTrail.city_id, search: "" });
    // eslint-disable-next-line
  }, [newTrail.city_id, country]);

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles" style={{ background: "rgba(255, 255, 255, 0.95)", alignItems: "baseline", position: "relative" }}>
        <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "-50px", right: "0px" }}>
          <CloseIcon style={{ cursor: "pointer", marginBottom: "20px" }} onClick={() => setIsOpen(false)}></CloseIcon>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", background: "rgba(255, 255, 255, 0.1)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.planning_person}</h6>
              <TrailSelect forPlanningPerson valueKey="planning_person_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.planningPeople} arrayKey="name" />
            </div> */}
            {/* <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>Planning person</h6>
              <TrailSelect forPlanningPerson valueKey="planning_person_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.planningPeople} arrayKey="name" />
            </div> */}

            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.company}</h6>
              <TrailSelect valueKey="company_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.regiments} arrayKey="name" />
            </div>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.route_search}</h6>
              <input
                onChange={(e) => setNewTrail((prev) => ({ ...prev, route_number: Number(e.target.value) }))}
                className="tableInput"
                style={{ width: "auto" }}
                type="number"
                autoComplete="off"
                value={newTrail.route_number || 0}
              />
            </div>
            <div style={{ flexDirection: "column", zIndex: 1 }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.region}</h6>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                disableClearable
                options={allDictionary?.regions?.map((el) => ({ ...el, label: el.region }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setNewTrail((prev) => ({ ...prev, city_id: null }));
                  setNewTrail((prev) => ({ ...prev, regionId: Number(values?.id) }));
                }}
                renderInput={(params) => <TextField {...params} label="Region" variant="standard" />}
                value={getValueById(newTrail.regionId, "region", allDictionary?.regions)}
              />
            </div>
            {/* <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.departure_dates}</h6>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  style={{ padding: "0px 5px" }}
                  onChange={(e) => setNewTrail((prev) => ({ ...prev, departure_dates: [e.target.value, prev.departure_dates ? prev.departure_dates[1] : null].filter((el) => !!el) }))}
                  className="tableInput"
                  type="date"
                  value={[newTrail.departure_dates].flat()[0] || "0000-00-00"}
                />
                <input
                  style={{ padding: "0px 5px" }}
                  onChange={(e) =>
                    setNewTrail((prev) => ({
                      ...prev,
                      departure_dates: [prev.departure_dates ? prev.departure_dates[0] : null, e.target.value].filter((el) => !!el),
                    }))
                  }
                  className="tableInput"
                  type="date"
                  value={[newTrail.departure_dates].flat()[1] || "0000-00-00"}
                />
              </div>
            </div> */}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.date_scheduled}</h6>
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{newTrail.date_scheduled}</h6>
            </div> */}
            {/* <div style={{ flexDirection: "column", alignItems: "center", color: "black" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>{messages?.presentation_date}</h6>
              <input
                style={{ padding: "0px 5px" }}
                onChange={(e) => setNewTrail((prev) => ({ ...prev, presentation_date: e.target.value }))}
                className="tableInput"
                type="date"
                value={newTrail.presentation_date || "0000-00-00"}
              />
              {getDayName(newTrail.presentation_date)}
            </div> */}

            <div style={{ flexDirection: "column", zIndex: 1 }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.city_search}</h6>
              <Autocomplete
                disablePortal
                id="movie-customized-option-demo"
                disableClearable
                options={allCitiesWithRegions?.map((el) => ({ ...el, label: el.city_name }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setNewTrail((prev) => ({ ...prev, city_id: Number(values?.id) }));
                  setNewTrail((prev) => ({ ...prev, autozonning: values?.autozonning }));
                }}
                renderInput={(params) => <TextField {...params} label="City" variant="standard" />}
                value={getValueById(newTrail.city_id, "city_name", allCitiesWithRegions)}
              />
            </div>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.presentation_hours}</h6>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={newTrail.presentation_time_id || ""}
                  onChange={(e) => {
                    setNewTrail((prev) => ({ ...prev, presentation_time_id: e.target.value }));
                  }}
                  style={{ fontWeight: 700, fontSize: "16px" }}
                >
                  {allDictionary?.presentationTimes?.map((item, index) => (
                    <MenuItem key={index} value={item.id} style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid white" }}>
                      {(item.presentation_hour || []).map((time, index) => (
                        <div key={index}>{time}</div>
                      ))}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.rental_hours}</h6>
              <div className="tableInput">{getValueById(newTrail.presentation_time_id, "rental_hours", allDictionary?.presentationTimes)}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.project_sales}</h6>
              <TrailSelect valueKey="project_sales_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.projectSales} arrayKey="name" />
            </div>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.project_concent}</h6>
              <TrailSelect valueKey="project_concent_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.projectConcent} arrayKey="name" />
            </div>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.reservation_status}</h6>
              <TrailSelect valueKey="reservation_status_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.reservationStatuses} arrayKey="name" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.call_template}</h6>
              <TrailSelect valueKey="call_template_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.callTamplates} arrayKey="name" />
            </div>
            <div style={{ flexDirection: "column" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.autozonning}</h6>
              <textarea
                onChange={(e) => setNewTrail((prev) => ({ ...prev, autozonning: e.target.value }))}
                className="tableInput"
                style={{ width: "120px", height: "125px", padding: "10px" }}
                type="text"
                autoComplete="off"
                value={newTrail.autozonning || ""}
              />
            </div>
          </div>
        </div>

        <div className="tabl-flex-admin-button-global2" onClick={() => createTrail({ newTrail, setNewTrail })}>
          {messages?.create_trail}
        </div>
      </div>
    </div>
  );
}

export default CreateTrail;
