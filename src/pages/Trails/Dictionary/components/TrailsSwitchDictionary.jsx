import { TextField, Checkbox, Autocomplete, FormControlLabel } from "@mui/material";
import { useAppSelector } from "../../../../store/reduxHooks";
import { getValueById } from "../../../../components/functions";

function TrailsSwitchDictionary({ keyName, keyProperty, dictionaryObject, setDictionaryObject, messages }) {
  const { allDictionary, allCitiesWithRegions } = useAppSelector((store) => store.trails);

  switch (keyName) {
    case "presentationTimes":
      return (
        <>
          <TextField
            onChange={(e) =>
              setDictionaryObject((prev) => ({
                ...prev,
                [keyProperty]: [e.target.value, prev[keyProperty] ? prev[keyProperty][1] : null, prev[keyProperty] ? prev[keyProperty][2] : null].filter((el) => !!el),
              }))
            }
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={[dictionaryObject[keyProperty]].flat()[0] || ""}
            label={"1 " + messages.trails_presentation_hours}
          />
          <TextField
            onChange={(e) =>
              setDictionaryObject((prev) => ({
                ...prev,
                [keyProperty]: [prev[keyProperty] ? prev[keyProperty][0] : null, e.target.value, prev[keyProperty] ? prev[keyProperty][2] : null].filter((el) => !!el),
              }))
            }
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={[dictionaryObject[keyProperty]].flat()[1] || ""}
            label={"2 " + messages.trails_presentation_hours}
          />
          <TextField
            onChange={(e) =>
              setDictionaryObject((prev) => ({
                ...prev,
                [keyProperty]: [prev[keyProperty] ? prev[keyProperty][0] : null, prev[keyProperty] ? prev[keyProperty][1] : null, e.target.value].filter((el) => !!el),
              }))
            }
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={[dictionaryObject[keyProperty]].flat()[2] || ""}
            label={"3 " + messages.trails_presentation_hours}
          />

          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, rental_hours: e.target.value }))}
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={dictionaryObject.rental_hours || ""}
            label={messages.trails_rental_hours}
          />
          <FormControlLabel
            control={<Checkbox checked={dictionaryObject?.alternative} onChange={(e) => setDictionaryObject((prev) => ({ ...prev, alternative: e.target.checked, relevance_status: true }))} />}
            label={messages?.alternative}
          />
        </>
      );

    case "regions":
      return (
        <>
          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [keyProperty]: e.target.value }))}
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={dictionaryObject[keyProperty] || ""}
            label={messages.trails_dictionary_edit_element}
          />
          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, timezone: e.target.value }))}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            required
            value={dictionaryObject?.timezone ?? ""}
            label={messages?.timezone}
          />
        </>
      );

    case "citiesWithRegions":
      return (
        <>
          <Autocomplete
            className=""
            style={{ margin: "8px" }}
            disablePortal
            id="combo-box-demo"
            disableClearable
            options={allDictionary?.regions?.map((el) => ({ ...el, label: el?.region }))}
            onChange={(e, values) => {
              setDictionaryObject((prev) => ({ ...prev, region_id: Number(values?.id) }));
            }}
            renderInput={(params) => <TextField {...params} label="Region" variant="standard" />}
            value={getValueById(dictionaryObject.region_id, "region", allDictionary?.regions)}
          />
          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [keyProperty]: e.target.value }))}
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={dictionaryObject[keyProperty] || ""}
            label={messages.city_search}
          />

          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, city_type: e.target.value }))}
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={dictionaryObject?.city_type || ""}
            label={"City type"}
          />
          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, population: Number(e.target.value) }))}
            type="number"
            placeholder=""
            autoComplete="off"
            required
            value={dictionaryObject?.population || ""}
            label={"population"}
          />
          <TextField
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, autozonning: e.target.value?.split(",") }))}
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={[dictionaryObject?.autozonning]?.flat()?.join(",") || ""}
            label={"autozonning"}
          />
        </>
      );
    default:
      return (
        <TextField
          onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [keyProperty]: e.target.value }))}
          type="text"
          placeholder=""
          autoComplete="off"
          required
          value={dictionaryObject[keyProperty] || ""}
          label={messages.trails_dictionary_edit_element}
        />
      );
  }
}

export default TrailsSwitchDictionary;
