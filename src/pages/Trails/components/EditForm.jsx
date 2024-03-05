import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import { useAppSelector } from "../../../store/reduxHooks";
import Trail from "../../../api/trails/trails";
import Forms from "../../../api/trails/forms";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import { OtherStyle } from "../../../components/Page.styled";
import EditFormSelects from "./EditFormSelects";
import { customAlert } from "../../../components/Alert/AlertFunction";

function EditForm({ currentForm, setCurrentForm, selectedAddress, setSelectedAddress }) {
  const { country, locale } = useAppSelector((store) => store.user);
  const { allDictionary, citiesWithRegions, allCitiesWithRegions } = useAppSelector((store) => store.trails);
  const dispatch = useDispatch();
  const [searchLocations, setSearchLocations] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const messages = useMemo(() => {
    return {
      city_search: locale["trails_city"],
      route_search: locale["trails_route"],
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
      create_trail: locale["trails_create_trail"],
      title: locale["trails_title"],
      all: locale["trails_all"],
      columns: locale["columns"],
      new_departure: locale["trails_new_departure"],
      sort: locale["sort"],
      delete: locale["delete"],
      items_per_page: locale["items_per_page"],
      from: locale["from"],
      to: locale["to"],
      days_of_the_week: locale["days_of_the_week"],
      yes: locale["trails_yes"],
      no: locale["trails_no"],
      create: locale["trails_create"],
      new_institution: locale["forms_new_institution"],
      create_Institution: locale["forms_create_institution"],
      presentation_number: locale["forms_presentation_Number"],
      confirm: locale["forms_confirm"],
      email: locale["email"],
      day: locale["day"],
      time: locale["time"],
      room_number: locale["forms_room_number"],
      booker: locale["forms_booker"],
      starting_price: locale["forms_starting_price"],
      trade_group: locale["forms_trade_group"],
      edit: locale["trails_edit_departure"],
      save: locale["trails_dictionary_save"],
    };
  }, [locale]);

  function getCorrectTime(date) {
    if (!date) return;
    let correctDate = new Date(date);
    correctDate.setDate(correctDate.getDate() + 1);
    correctDate.setHours(correctDate.getHours() + 2);
    return correctDate.toISOString().split("T")[1]?.split(":")?.slice(0, 2).join(":");
  }

  async function updateForm({ form, country }) {
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

    const result = await Forms.update({ form: newForm, country });

    if (!result?.message) {
      return customAlert({ message: "Success", severity: "success" });
    } else {
      return customAlert({ message: result?.message || "Something went wrong" });
    }
  }

  async function removeForm({ id, country }) {
    const result = await Forms.remove(id, country);
    if (!result?.message) {
      return customAlert({ message: "Success", severity: "success" });
    } else {
      return customAlert({ message: result?.message || "Something went wrong" });
    }
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

  useEffect(() => {
    if (!allDictionary?.regions[0]) {
      getAllDictionary({ country });
    }
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    if (currentForm.region_id) {
      getCitiesByRegion({ country, region_id: currentForm.region_id });
    }
    // eslint-disable-next-line
  }, [currentForm.region_id, country]);

  return (
    <OtherStyle>
      <div className="editForm resize horizontal scroll">
        <IconButton onClick={() => setCurrentForm({})} className="close">
          <CloseIcon />
        </IconButton>

        <IconButton onClick={() => setDisabled((prev) => !prev)} className="edit">
          <EditIcon />
        </IconButton>

        <div className="container">
          {/* <button onClick={() => console.log(currentForm, "zalupka", selectedAddress)}>132</button>
          <button onClick={() => console.log(allDictionary, "zalupka2")}>122</button> */}
          <EditFormSelects
            messages={messages}
            setForm={setCurrentForm}
            form={currentForm}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            searchLocations={searchLocations}
            setSearchLocations={setSearchLocations}
            disabled={disabled}
          />{" "}
          {!disabled ? (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Button onClick={() => updateForm({ form: currentForm, country })} style={{ width: "fit-content" }} variant="outlined">
                {messages.save}
              </Button>
              <Button onClick={() => removeForm({ id: currentForm?.id, country })} style={{ width: "fit-content" }} variant="outlined">
                {messages.delete}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </OtherStyle>
  );
}
export default EditForm;
