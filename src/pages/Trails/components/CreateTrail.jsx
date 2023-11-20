import { FormControl, Autocomplete, TextField, Button, useTheme, Typography } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import Forms from "../../../api/trails/forms";
import TrailSelect from "./TrailSelect";
import "../../../components/forPages/input.css";

function CreateTrail({ setIsOpen, newTrail, setNewTrail, createTrail, messages }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const { country } = useAppSelector((store) => store.user);
  const { allDictionary, allCitiesWithRegions, forms, allForms } = useAppSelector((store) => store.trails);

  const [citiesForAutozoning, setCitiesForAutozoning] = useState([]);

  function getValueById(id, key, array) {
    if (!id) {
      return "";
    }
    const item = array?.filter((item) => item.id === Number(id))[0];
    return item ? item[key] : "";
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

  async function getCitiesForAutozoning({ country, region_id, city_name }) {
    const cities = await CitiesWithRegions.getByRegion({ country, region_id, city_name });
    if (cities) {
      setCitiesForAutozoning(cities);
    }
  }

  async function getFormsByCityAndName({ country, city_id, search }) {
    const data = await Forms.getByName({ country, city_id, search });
    if (data?.forms) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_FORMS,
        payload: data.forms.map((form) => {
          const city = data?.cities?.filter((city) => city.id === Number(form?.city_id))[0];
          const region = allDictionary?.regions?.filter((region) => region.id === city?.region_id)[0];
          return { ...form, region_id: region?.id, city_name: city?.city_name, region_name: region?.region };
        }),
      });
    }
    // if (data?.cities) {
    //   dispatch({
    //     type: reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS,
    //     payload: data.cities,
    //   });
    // }
  }

  useEffect(() => {
    if (newTrail.regionId) {
      getCitiesByRegion({ country, region_id: newTrail.regionId });
    }
    // eslint-disable-next-line
  }, [newTrail.regionId, country]);

  useEffect(() => {
    if (newTrail.regionId && newTrail.city_id) {
      getCitiesForAutozoning({ country, region_id: newTrail.regionId, city_name: getValueById(newTrail.city_id, "city_name", allCitiesWithRegions) });
      getFormsByCityAndName({ country, city_id: newTrail.city_id, search: "" });
    }
    // eslint-disable-next-line
  }, [newTrail.city_id, country]);

  // useEffect(() => {
  //   getFormsByCityAndName({ country, city_id: newTrail.city_id, search: "" });
  //   // eslint-disable-next-line
  // }, [newTrail.city_id, country]);

  useEffect(() => {
    getFormsByCityAndName({ country, city_id: newTrail.city_id, search: "" });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles styledScroll"
        style={{
          background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d",
          color: theme.palette.text.primary,
          alignItems: "baseline",
          position: "relative",
          maxHeight: "80vh",
          //width: "80vh",
          overflow: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.region}
            </Typography>
            <Autocomplete
              className="createSelect"
              disablePortal
              id="combo-box-demo"
              disableClearable
              options={allDictionary?.regions?.map((el) => ({ ...el, label: el.region }))}
              onChange={(e, values) => {
                setNewTrail((prev) => ({ ...prev, city_id: null, regionId: Number(values?.id) }));
              }}
              renderInput={(params) => <TextField {...params} label="Region" variant="standard" />}
              value={getValueById(newTrail.regionId, "region", allDictionary?.regions)}
            />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.city_search}
            </Typography>
            <Autocomplete
              className="createSelect"
              id="movie-customized-option-demo"
              disabled={!newTrail?.regionId}
              disablePortal
              disableClearable
              options={allCitiesWithRegions?.map((el) => ({ ...el, label: el.city_name }))}
              sx={{ width: 300 }}
              onChange={(e, values) => {
                setNewTrail((prev) => ({ ...prev, city_id: Number(values?.id) }));
                setNewTrail((prev) => ({ ...prev, autozonning: "" }));
              }}
              renderInput={(params) => <TextField {...params} label="City" variant="standard" />}
              value={getValueById(newTrail.city_id, "city_name", allCitiesWithRegions)}
              componentsProps={{
                popper: {
                  modifiers: [
                    {
                      name: "flip",
                      enabled: false,
                    },
                    {
                      name: "preventOverflow",
                      enabled: false,
                    },
                  ],
                },
              }}
            />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.institution}
            </Typography>
            <Autocomplete
              className="createSelect"
              disablePortal
              disableClearable
              disabled={!newTrail?.city_id}
              id="combo-box-demo"
              options={allForms
                // ?.filter((el) => el?.local?.toLowerCase()?.includes(search?.toLowerCase()))
                ?.map((el) => {
                  return { ...el, label: [el?.region_name, el?.city_name, el?.local, el.address, el.id].join(",") };
                  //return { ...el, label: `${el?.local}` };
                })}
              onChange={(e, values) => {
                setNewTrail((prev) => ({ ...prev, form_id: Number(values?.id) }));
                //setNewTrail((prev) => ({ ...prev, form_id: Number(values?.id), city_id: Number(values?.city_id), regionId: values?.region_id }));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Inctitution"
                  variant="standard"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    getFormsByCityAndName({ country, search: e.target.value });
                  }}
                  // onKeyUp={(e) => {
                  //   if (e.key === "Enter") {
                  //     getFormsByCityAndName({ country, search: e.target.value });
                  //     console.log(1, e.target.value);
                  //   }
                  // }}
                />
              )}
              value={getValueById(newTrail.form_id, "local", forms) || getValueById(newTrail.form_id, "local", allForms)}
            />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.company}
            </Typography>
            <TrailSelect className="createSelect" valueKey="company_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.regiments} label="Company" arrayKey="name" />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.route_search}
            </Typography>
            <TextField
              className="createSelect"
              variant="standard"
              onChange={(e) => setNewTrail((prev) => ({ ...prev, route_number: Number(e.target.value) }))}
              type="number"
              value={newTrail.route_number || 0}
            />
          </div>

          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.presentation_hours}
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Autocomplete
                className="createSelect"
                disablePortal
                id="movie-customized-option-demo"
                disableClearable
                options={allDictionary?.presentationTimes?.map((el) => ({ ...el, label: el.presentation_hour?.join(" ") }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setNewTrail((prev) => ({ ...prev, presentation_time_id: Number(values?.id) }));
                }}
                renderInput={(params) => <TextField {...params} label="Times" variant="standard" />}
                value={[getValueById(newTrail.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes)]?.flat()?.join(" ")}
              />
            </FormControl>
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.rental_hours}
            </Typography>
            <Typography className="createTitle" variant="body2" component="h2">
              {getValueById(newTrail.presentation_time_id, "rental_hours", allDictionary?.presentationTimes)}
            </Typography>
          </div>

          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.project_sales}
            </Typography>
            <TrailSelect className="createSelect" valueKey="project_sales_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.projectSales} label="Project sales" arrayKey="name" />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.project_concent}
            </Typography>
            <TrailSelect className="createSelect" valueKey="project_concent_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.projectConcent} label="Project concent" arrayKey="name" />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.reservation_status}
            </Typography>
            <TrailSelect className="createSelect" valueKey="reservation_status_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.reservationStatuses} arrayKey="name" />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.call_template}
            </Typography>
            <TrailSelect className="createSelect" valueKey="call_template_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.callTamplates} arrayKey="name" />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.autozonning}
            </Typography>
            <div style={{ flexDirection: "column", display: "flex" }}>
              <Autocomplete
                className="createSelect"
                disablePortal
                id="movie-customized-option-demo"
                disableClearable
                disabled={!newTrail.city_id}
                options={citiesForAutozoning?.map((el) => ({ ...el, label: el.autozonning }))}
                sx={{ width: 250 }}
                onChange={(e, values) => {
                  setNewTrail((prev) => ({ ...prev, autozonning: values?.autozonning }));
                }}
                renderInput={(params) => <TextField {...params} label="Autozonning" variant="standard" />}
                value={" "}
              />
              <TextField
                className="createSelect"
                rows={5}
                variant="standard"
                style={{ marginTop: "15px" }}
                onChange={(e) => setNewTrail((prev) => ({ ...prev, autozonning: e.target.value }))}
                type="text"
                value={newTrail.autozonning || ""}
              />
            </div>
          </div>
        </div>

        <Button variant="outlined" style={{ marginTop: "15px" }} onClick={() => createTrail({ newTrail, setNewTrail })}>
          {messages.create_trail}
        </Button>
      </div>
    </div>
  );
}

export default CreateTrail;
