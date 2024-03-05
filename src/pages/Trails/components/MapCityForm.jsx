import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import { useAppSelector } from "../../../store/reduxHooks";
import Trail from "../../../api/trails/trails";
import Forms from "../../../api/trails/forms";
import PresentationTime from "../../../api/trails/presentationTime";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import { OtherStyle } from "../../../components/Page.styled";
import EditFormSelects from "./EditFormSelects";
import { customAlert } from "../../../components/Alert/AlertFunction";

function MapCityForm({ currentCity, setCurrentCity, currentTrails }) {
  const { country, locale } = useAppSelector((store) => store.user);
  const trail = currentTrails?.sort((a, b) => new Date(b?.presentation_date) - new Date(a?.presentation_date))?.find((el) => el.city_id === currentCity?.id);
  const [allTrails, setAllTrails] = useState([]);
  const [times, setTimes] = useState([]);

  const messages = useMemo(() => {
    return {
      population: locale["population"],
      city: locale["trails_city"],
      hours_quantity: locale["map_quantity_hours"],
      date: locale["date"],
      previous_departure: locale["previous_departure"],
    };
  }, [locale]);

  const getLength = (id) => times?.find((el) => el.id === id)?.presentation_hour?.length;

  async function getTrails({ country, city_id }) {
    const result = await Trail.getTrailsByCityId({ ids: [city_id], country });
    if (result?.trails) {
      const allTrails = result?.trails?.filter((el) => el.id !== trail?.id);
      setAllTrails(allTrails);
    } else {
      customAlert({ message: result?.message || "Trails not found" });
    }
  }

  async function getTimes(trail, allTrails, country) {
    const trails = [trail, ...allTrails];
    const timeIds = trails?.map((el) => el.presentation_time_id);
    const result = await PresentationTime.getByIds({ ids: timeIds, country });
    if (result?.times) {
      setTimes(result.times);
    } else {
      console.log("times", result?.message || "Times not found");
    }
  }

  useEffect(() => {
    getTimes(trail, allTrails, country);
    // eslint-disable-next-line
  }, [trail, allTrails, country]);

  useEffect(() => {
    if (trail) {
      getTrails({ country, city_id: trail?.city_id });
    }
    // eslint-disable-next-line
  }, [country, trail]);

  return (
    <OtherStyle>
      <div className="editForm resize horizontal scroll">
        <IconButton onClick={() => setCurrentCity({})} className="close">
          <CloseIcon />
        </IconButton>

        <div className="container">
          <Typography className="createTitle" variant="body1" component="h2">
            {getLength(trail?.presentation_time_id)}h {trail?.presentation_date}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.population}
            </Typography>
            <Typography className="createTitle" variant="body1" component="h2">
              {currentCity?.population}
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.city}
            </Typography>
            <Typography className="createTitle" variant="body1" component="h2">
              {currentCity?.city_name}
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.hours_quantity}
            </Typography>
            <Typography className="createTitle" variant="body1" component="h2">
              {getLength(trail?.presentation_time_id)}h
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography className="createTitle" variant="body1" component="h2">
              {messages?.date}
            </Typography>
            <Typography className="createTitle" variant="body1" component="h2">
              {trail?.presentation_date}
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography className="createTitle" variant="body1" component="h2" style={{ alignItems: "baseline" }}>
              {messages?.previous_departure}
            </Typography>
            <div style={{ flexDirection: "column" }}>
              {allTrails?.map((el) => (
                <Typography className="createTitle" variant="body1" component="h2">
                  {getLength(el.presentation_time_id)}h/{el?.presentation_date}
                </Typography>
              ))}
            </div>
          </div>

          {/* <button
            onClick={() =>
              console.log(
                times?.find((el) => el.id === trail?.presentation_time_id),
                "zalupka"
              )
            }
          >
            132
          </button> */}
          {/* <button onClick={() => console.log(allDictionary, "zalupka2")}>122</button>  */}
          {/* <EditFormSelects
                messages={messages}
                setForm={setCurrentForm}
                form={currentForm}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                searchLocations={searchLocations}
                setSearchLocations={setSearchLocations}
                disabled={disabled}
              />{" "} */}
          {!true ? (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Button
                // onClick={() => updateForm({ form: currentForm, country })}
                style={{ width: "fit-content" }}
                variant="outlined"
              >
                {/* {messages.save} */}
              </Button>
              <Button
                // onClick={() => removeForm({ id: currentForm?.id, country })}
                style={{ width: "fit-content" }}
                variant="outlined"
              >
                {/* {messages.delete} */}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </OtherStyle>
  );
}

export default MapCityForm;
