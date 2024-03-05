import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import { TrailsDictionariesEditTable } from "./trailsDictionariesEdit.styled";
import { ContainerForEditMenu } from "./trailsDictionariesEdit.styled";
import { customAlert } from "../../../components/Alert/AlertFunction";
import TrailsSwitchDictionary from "./components/TrailsSwitchDictionary";
import CitiesWithRegions from "../../../api/trails/citiesWithRegion";
import { getValueById } from "../../../components/functions";

function TrailsDictionatiesEdit({ country, setIsOpen, item }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { array, keyName, key, title, update, remove, create } = item;
  const { locale } = useAppSelector((store) => store.user);
  const { allDictionary, allCitiesWithRegions } = useAppSelector((store) => store.trails);
  const [dictionaryObject, setDictionaryObject] = useState({ relevance_status: true });
  const [newDictionaryObject, setNewDictionaryObject] = useState({ relevance_status: true });

  const messages = useMemo(() => {
    return {
      days_of_the_week: locale["days_of_the_week"],
      trails_dictionary_save: locale["trails_dictionary_save"],
      trails_dictionary_delete: locale["trails_dictionary_delete"],
      trails_dictionary_add: locale["trails_dictionary_add"],
      trails_dictionary_element: locale["trails_dictionary_element"],
      trails_dictionary_new_element: locale["trails_dictionary_new_element"],
      trails_dictionary_edit_element: locale["trails_dictionary_edit_element"],
      trails_presentation_hours: locale["trails_presentation_hours"],
      trails_rental_hours: locale["trails_rental_hours"],
      alternative: locale["trails_alternative"],
      timezone: locale["timezone"],
      city_search: locale["trails_city"],
    };
  }, [locale]);

  async function getAllDictionary({ country }) {
    const allDictionary = await Trail.getAllDictionary({ country });
    if (allDictionary) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: allDictionary,
      });
    }
  }

  async function getCitiesByName({ country, search = "" }) {
    const allCitiesWithRegions = await CitiesWithRegions.getByName({ country, search });
    if (allCitiesWithRegions) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_CITIES_WITH_REGIONS,
        payload: allCitiesWithRegions,
      });
    }
  }

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    getCitiesByName({ country, search });
    // eslint-disable-next-line
  }, [search]);

  return (
    <TrailsDictionariesEditTable>
      <ContainerForEditMenu onClick={(e) => e.stopPropagation()} className="scroll">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(null);
          }}
          style={{ cursor: "pointer", position: "absolute", top: "1rem", right: "1rem" }}
        >
          <CloseIcon />
        </div>

        {keyName === "citiesWithRegions" ? (
          <>
            <Autocomplete
              style={{ margin: "8px" }}
              id="movie-customized-option-demo"
              // disabled={!newTrail?.regionId}
              disablePortal
              disableClearable
              options={array?.map((el) => ({ ...el, label: `${el.city_name} (${allDictionary?.regions?.find((region) => region.id === el?.region_id)?.region})` }))}
              sx={{ width: 300 }}
              onChange={(e, values) => {
                setDictionaryObject(values);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => {
                    setDictionaryObject({ relevance_status: true });
                    setSearch(e.target.value);
                  }}
                  label="City"
                  variant="standard"
                />
              )}
              value={getValueById(dictionaryObject.id, "city_name", array)}
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
          </>
        ) : (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            disableClearable
            options={array?.map((el) => ({ ...el, label: `${el[key]} ${el?.alternative ? messages?.alternative : ""}` }))}
            sx={{ width: 300 }}
            onChange={(e, values) => setDictionaryObject(values)}
            renderInput={(params) => <TextField {...params} label={messages.trails_dictionary_element} variant="standard" />}
            value={dictionaryObject?.id ? array?.find((el) => el.id === dictionaryObject?.id)[key] : ""}
          />
        )}
        {dictionaryObject.id ? <TrailsSwitchDictionary keyName={keyName} keyProperty={key} dictionaryObject={dictionaryObject} setDictionaryObject={setDictionaryObject} messages={messages} /> : null}

        <Button
          disabled={!dictionaryObject?.id}
          onClick={async () => {
            const result = await update(dictionaryObject, country);
            if (!result?.message) {
              await getCitiesByName({ country, search });
              await getAllDictionary({ country });
              customAlert({ message: "Success", severity: "success" });
            } else {
              customAlert({ message: result.message });
            }
          }}
        >
          {messages.trails_dictionary_save}
        </Button>
        <Button
          disabled={!dictionaryObject?.id}
          onClick={async () => {
            const result = await remove(dictionaryObject, country);
            if (!result?.message) {
              setDictionaryObject({});
              await getAllDictionary({ country });
              await getCitiesByName({ country, search });
              customAlert({ message: "Success", severity: "success" });
            } else {
              customAlert({ message: result.message });
            }
          }}
        >
          {messages.trails_dictionary_delete}
        </Button>

        <TrailsSwitchDictionary keyName={keyName} keyProperty={key} dictionaryObject={newDictionaryObject} setDictionaryObject={setNewDictionaryObject} messages={messages} />

        <Button
          size="medium"
          disabled={!newDictionaryObject[key]}
          onClick={async () => {
            const result = await create(newDictionaryObject, country);
            if (!result?.message) {
              setNewDictionaryObject({});
              await getCitiesByName({ country, search });
              await getAllDictionary({ country });
              customAlert({ message: "Success", severity: "success" });
            } else {
              customAlert({ message: result.message });
            }

            // if (result) {
            //   setNewDictionaryObject({});
            //   await getAllDictionary({ country });
            //   alert("Sucess");
            // } else {
            //   alert("Something went wrong");
            // }
          }}
        >
          {messages.trails_dictionary_add}
        </Button>
      </ContainerForEditMenu>
    </TrailsDictionariesEditTable>
  );
}

export default TrailsDictionatiesEdit;
