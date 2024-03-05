import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, Select, MenuItem, Autocomplete, TextField, Button, useTheme, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import Forms from "../../../api/trails/forms";
import CallTemplate from "../../../api/trails/callTemplate";
import ContactStatus from "../../../api/trails/contactStatus";
import PresentationTime from "../../../api/trails/presentationTime";
import ProjectConcent from "../../../api/trails/projectConcent";
import ProjectSales from "../../../api/trails/projectSales";
import Regiment from "../../../api/trails/regiment";
import Region from "../../../api/trails/region";
import TrailSelect from "./TrailSelect";
import EditDictionaryButton from "./EditDictionaryButton";
import { customAlert } from "../../../components/Alert/AlertFunction";
import CreateForm from "../Forms/CreateForm";
import "../../../components/forPages/input.css";
import { sortPresentationHour, getValueById } from "../../../components/functions";

function CreateTrail({ setIsOpen, newTrail, setNewTrail, createTrail, rowNumber, messages }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const { country } = useAppSelector((store) => store.user);
  const { allDictionary, allCitiesWithRegions, forms, allForms } = useAppSelector((store) => store.trails);
  const [citiesForAutozoning, setCitiesForAutozoning] = useState([]);
  const [dictionary, setDictionary] = useState({});
  const [isOpenDictionary, setIsOpenDictionary] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchInstitution, setSearchInstitution] = useState(null);
  const [form, setForm] = useState({
    telephone: [{ id: 0, tel: "+48" }],
    day: [{ id: 0, d: "" }],
    cost: [{ id: 0, c: 0 }],
    from: [{ id: 0, time: [] }],
    presentation_number: [{ id: 0, c: 0 }],
    presentation_time: [{ id: 0, time: null }],
    room_number: [{ id: 0, r: "" }],
    starting_price: [{ id: 0, c: 0 }],
  });
  const [formAddress, setFormAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchLocations, setSearchLocations] = useState([]);

  function getCorrectTime(date) {
    if (!date) return;
    let correctDate = new Date(date);
    correctDate.setDate(correctDate.getDate() + 1);
    correctDate.setHours(correctDate.getHours() + 2);
    return correctDate.toISOString().split("T")[1]?.split(":")?.slice(0, 2).join(":");
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

  // async function getCitiesByRegion({ country, region_id }) {
  //   const allCitiesWithRegions = await CitiesWithRegions.getByRegion({ country, region_id });
  //   if (allCitiesWithRegions) {
  //     dispatch({
  //       type: reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS,
  //       payload: allCitiesWithRegions,
  //     });
  //   }
  // }

  async function getCitiesByName({ country, search = "" }) {
    const allCitiesWithRegions = await CitiesWithRegions.getByName({ country, search });
    if (allCitiesWithRegions) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS,
        payload: allCitiesWithRegions,
      });
    }
  }

  // async function getCitiesForAutozoning({ country, region_id, city_name }) {
  //   const cities = await CitiesWithRegions.getByRegion({ country, region_id, city_name });
  //   if (cities) {
  //     setCitiesForAutozoning(cities);
  //   }
  // }

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

  async function createForm({ form, setForm }) {
    const newForm = {
      ...form,
      telephone: form?.telephone?.map((el) => el?.tel)?.filter((el) => !!el),
      day: form?.day?.map((el) => el?.d)?.filter((el) => !!el),
      cost: form?.cost?.map((el) => el?.c)?.filter((el) => !!el),
      from: form?.from?.map((el) => el?.time?.map((el) => getCorrectTime(el))?.join("-"))?.filter((el) => !!el),
      presentation_number: form?.presentation_number?.map((el) => el?.c)?.filter((el) => !!el),
      presentation_time: form?.presentation_time?.map((el) => getCorrectTime(el?.time))?.filter((el) => !!el),
      room_number: form?.room_number?.map((el) => el?.r)?.filter((el) => !!el),
      starting_price: form?.starting_price?.map((el) => el?.c)?.filter((el) => !!el),
      voivodeship: country,
      relevance_status: true,
    };

    const result = await Forms.create({ form: newForm, country });
    if (!result?.message) {
      await getFormsByCityAndName({ country, city_id: newForm.city_id, search: "" });
      setForm({
        telephone: [{ id: 0, tel: "" }],
        day: [{ id: 0, d: "" }],
        cost: [{ id: 0, c: 0 }],
        from: [{ id: 0, time: [] }],
        presentation_number: [{ id: 0, c: 0 }],
        presentation_time: [{ id: 0, time: null }],
        room_number: [{ id: 0, r: "" }],
        starting_price: [{ id: 0, c: 0 }],
      });
      customAlert({ message: "Sucess", severity: "success" });
      setIsOpenForm(false);
    } else {
      customAlert({ message: result.message });
    }
  }

  async function updateForm({ formId, forms, allForms, formAddress, country }) {
    const form = forms?.find((el) => el.id === formId) || allForms?.find((el) => el.id === formId);
    if (formAddress === form?.address) {
      return customAlert({ message: `The addresses are the same` });
    }
    console.log(1, formId, forms, form);
    const newForm = { ...form, address: formAddress };
    const result = await Forms.update(newForm, country);

    if (!result?.message) {
      await getFormsByCityAndName({ country, city_id: newForm.city_id, search: "" });
      customAlert({ message: "Sucess", severity: "success" });
    } else {
      customAlert({ message: result.message });
    }
  }

  useEffect(() => {
    if (newTrail.regionId && newTrail.city_id) {
      //getCitiesForAutozoning({ country, region_id: newTrail.regionId, city_name: getValueById(newTrail.city_id, "city_name", allCitiesWithRegions) });
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
    setForm((prev) => ({ ...prev, voivodeship: country }));
    getAllDictionary({ country });
    getCitiesByName({ country });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    setDictionary({
      callTamplates: {
        array: allDictionary?.callTamplates,
        title: messages?.trails_call_template,
        keyName: "callTamplates",
        key: "name",
        update: CallTemplate.update,
        remove: CallTemplate.remove,
        create: CallTemplate.create,
      },
      contractStatuses: {
        array: allDictionary?.contractStatuses,
        title: messages?.trails_contract_status,
        keyName: "contractStatuses",
        key: "name",
        update: ContactStatus.update,
        remove: ContactStatus.remove,
        create: ContactStatus.create,
      },
      presentationTimes: {
        array: allDictionary?.presentationTimes,
        title: messages?.trails_presentation_time,
        keyName: "presentationTimes",
        key: "presentation_hour",
        update: PresentationTime.update,
        remove: PresentationTime.remove,
        create: PresentationTime.create,
      },
      projectConcent: {
        array: allDictionary?.projectConcent,
        title: messages?.trails_project_concent,
        keyName: "projectConcent",
        key: "name",
        update: ProjectConcent.update,
        remove: ProjectConcent.remove,
        create: ProjectConcent.create,
      },
      projectSales: {
        array: allDictionary?.projectSales,
        title: messages?.trails_project_sales,
        keyName: "projectSales",
        key: "name",
        update: ProjectSales.update,
        remove: ProjectSales.remove,
        create: ProjectSales.create,
      },
      regiments: { array: allDictionary?.regiments, title: messages?.trails_regiment, keyName: "regiments", key: "name", update: Regiment.update, remove: Regiment.remove, create: Regiment.create },
      regions: { array: allDictionary?.regions, title: messages?.trails_region, keyName: "regions", key: "region", update: Region.update, remove: Region.remove, create: Region.create },
      citiesWithRegions: {
        array: allCitiesWithRegions,
        title: messages?.city_search,
        keyName: "citiesWithRegions",
        key: "city_name",
        update: CitiesWithRegions.update,
        remove: CitiesWithRegions.remove,
        create: CitiesWithRegions.create,
      },
    });
  }, [allDictionary, messages]);

  useEffect(() => {
    setDictionary((prev) => ({
      ...prev,
      citiesWithRegions: {
        ...prev.citiesWithRegions,
        array: allCitiesWithRegions,
      },
    }));
    // eslint-disable-next-line
  }, [allCitiesWithRegions]);

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
              disabled
              className="createSelect"
              style={{ margin: "8px" }}
              disablePortal
              id="combo-box-demo"
              disableClearable
              options={allDictionary?.regions?.map((el) => ({ ...el, label: el?.region }))}
              onChange={(e, values) => {
                setNewTrail((prev) => ({ ...prev, city_id: null, regionId: Number(values?.id) }));
              }}
              renderInput={(params) => <TextField {...params} label="Region" variant="standard" />}
              value={getValueById(newTrail.regionId, "region", allDictionary?.regions)}
            />
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="regions" country={country} item={dictionary.regions} />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.city_search}
            </Typography>
            <Autocomplete
              className="createSelect"
              style={{ margin: "8px" }}
              id="movie-customized-option-demo"
              // disabled={!newTrail?.regionId}
              disablePortal
              disableClearable
              options={allCitiesWithRegions?.map((el) => ({ ...el, label: `${el.city_name} (${allDictionary?.regions?.find((region) => region.id === el?.region_id)?.region})` }))}
              sx={{ width: 300 }}
              onChange={(e, values) => {
                setNewTrail((prev) => ({ ...prev, city_id: Number(values?.id), autozonning: [values?.autozonning].flat()[0], regionId: values?.region_id }));
                setFormAddress("");
                setForm((prev) => ({
                  ...prev,
                  city_id: Number(values?.id),
                  region_id: values?.region_id,
                  town: values.city_name,
                  county: getValueById(values?.region_id, "region", allDictionary?.regions),
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => {
                    setNewTrail((prev) => ({ ...prev, city_id: null, regionId: null }));
                    getCitiesByName({ country, search: e.target.value });
                  }}
                  label="City"
                  variant="standard"
                />
              )}
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
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="citiesWithReg" country={country} item={dictionary.citiesWithRegions} />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.institution}
            </Typography>
            <Autocomplete
              className="createSelect"
              style={{ margin: "8px", textAlign: "left" }}
              disablePortal
              disableClearable
              disabled={!newTrail?.city_id}
              id="combo-box-demo"
              options={
                searchInstitution
                  ? allForms?.map((el) => ({ ...el, label: [el?.local, el.address].join(", ") })).filter((el) => el.label.toLowerCase().includes(searchInstitution))
                  : allForms?.map((el) => ({ ...el, label: [el?.local, el.address].join(", ") }))
              }
              onChange={(e, values) => {
                setFormAddress(values?.address);
                setNewTrail((prev) => ({ ...prev, form_id: Number(values?.id) }));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Institution"
                  variant="standard"
                  onChange={(e) => {
                    setSearchInstitution(e.target.value.toLocaleLowerCase());
                    //getFormsByCityAndName({ country, search: e.target.value });
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
            <IconButton onClick={() => setIsOpenForm(true)}>
              <AddIcon />
            </IconButton>
            {isOpenForm && (
              <CreateForm
                form={form}
                setForm={setForm}
                setIsOpen={setIsOpenForm}
                createForm={createForm}
                messages={messages}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                searchLocations={searchLocations}
                setSearchLocations={setSearchLocations}
              />
            )}
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.address}:
            </Typography>
            <TextField style={{ margin: "0 8px" }} className="createSelect" variant="standard" onChange={(e) => setFormAddress(e.target.value)} type="text" value={formAddress} />
            {/* {newTrail.form_id ? getValueById(newTrail.form_id, "address", forms) || getValueById(newTrail.form_id, "address", allForms) : "Not Found"} */}
            <IconButton onClick={() => updateForm({ formId: newTrail.form_id, forms, allForms, formAddress, country })}>
              <SaveIcon />
            </IconButton>
          </div>

          {/* <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.company}
            </Typography>
            <TrailSelect className="createSelect" valueKey="company_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.regiments} label="Company" arrayKey="name" />
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="regiments" country={country} item={dictionary.regiments} />
          </div> */}
          {/* <div className="createBlock">
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
          </div> */}

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
                options={sortPresentationHour(allDictionary?.presentationTimes)
                  //?.filter((el) => el?.presentation_hour?.length <= 3 - rowNumber)
                  ?.map((el) => ({ ...el, label: `${el.presentation_hour?.join(" ")} ${el?.alternative ? messages?.alternative : ""}` }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setNewTrail((prev) => ({ ...prev, presentation_time_id: Number(values?.id) }));
                }}
                renderInput={(params) => <TextField {...params} label="Times" variant="standard" />}
                value={`${[getValueById(newTrail.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes)]?.flat()?.join(" ")} ${
                  getValueById(newTrail.presentation_time_id, "alternative", allDictionary?.presentationTimes) ? messages?.alternative : ""
                }`}
              />
            </FormControl>
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="presentationTimes" country={country} item={dictionary.presentationTimes} />
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
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="projectSales" country={country} item={dictionary.projectSales} />
          </div>
          <div className="createBlock">
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.project_concent}
            </Typography>
            <TrailSelect className="createSelect" valueKey="project_concent_id" trail={newTrail} setTrail={setNewTrail} array={allDictionary?.projectConcent} label="Project concent" arrayKey="name" />
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="projectConcent" country={country} item={dictionary.projectConcent} />
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
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  disabled={[getValueById(newTrail.city_id, "autozonning", allCitiesWithRegions)]?.flat()?.length < 2}
                  className="createSelect"
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={newTrail?.autozonning || ""}
                  onChange={(e) => {
                    setNewTrail((prev) => ({ ...prev, autozonning: e.target.value }));
                  }}
                >
                  {[getValueById(newTrail.city_id, "autozonning", allCitiesWithRegions)]?.flat()?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
