import React from "react";
import { Button, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import EditFormSelects from "../components/EditFormSelects";

function CreateForm({ form, setForm, setIsOpen, createForm, messages, selectedAddress, setSelectedAddress, searchLocations, setSearchLocations }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { country } = useAppSelector((store) => store.user);
  const { allDictionary } = useAppSelector((store) => store.trails);

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
    if (form.region_id) {
      getCitiesByRegion({ country, region_id: form.region_id });
    }
    // eslint-disable-next-line
  }, [form.region_id, country]);

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
        <EditFormSelects
          messages={messages}
          setForm={setForm}
          form={form}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          searchLocations={searchLocations}
          setSearchLocations={setSearchLocations}
          disabled={false}
        />

        <Button variant="outlined" style={{ marginTop: "15px" }} onClick={() => createForm({ form, setForm })}>
          {messages.create_Institution}
        </Button>
      </div>
    </div>
  );
}

export default CreateForm;
