import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import { TrailsDictionariesEditTable } from "./trailsDictionariesEdit.styled";
import { ContainerForEditMenu } from "./trailsDictionariesEdit.styled";

function TrailsDictionatiesEdit({ country, setIsOpen, item }) {
  const dispatch = useDispatch();
  const { array, key, title, update, remove, create } = item;
  const { locale } = useAppSelector((store) => store.user);
  const { allDictionary, allCitiesWithRegions } = useAppSelector((store) => store.trails);
  const [dictionaryObject, setDictionaryObject] = useState({});
  const [newDictionaryObject, setNewDictionaryObject] = useState({});
  const [currentValue, setCurrentValue] = useState({});

  const messages = useMemo(() => {
    return {
      days_of_the_week: locale["days_of_the_week"],
    };
  }, [locale]);

  async function getAllDictionary({ country }) {
    const allDictionary = await Trail.getAllDictionary({ country });
    if (allDictionary) {
      dispatch({
        type: reducerTrailsTypes.GET_ALL_DICTIONARY,
        payload: { allDictionary, country },
      });
    }
  }

  function getValueById(id, key, array) {
    if (!id) {
      return "";
    }
    const item = array?.filter((item) => item.id === Number(id))[0];
    return item ? item[key] : "";
  }

  useEffect(() => {
    getAllDictionary({ country });
    // eslint-disable-next-line
  }, [country]);

  return (
    <TrailsDictionariesEditTable>
      <ContainerForEditMenu onClick={(e) => e.stopPropagation()}>
        <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "-50px", right: "0px" }}>
          <CloseIcon style={{ cursor: "pointer", marginBottom: "20px" }} onClick={() => setIsOpen(false)}></CloseIcon>
        </div>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disableClearable
          options={array?.map((el) => ({ ...el, label: el[key] }))}
          sx={{ width: 300 }}
          onChange={(e, values) => setDictionaryObject(values)}
          renderInput={(params) => <TextField {...params} label="Elements" variant="standard" />}
          value={dictionaryObject?.id ? array?.filter((el) => el.id === dictionaryObject?.id)[0][key] : ""}
        />
        {dictionaryObject.id ? (
          key === "presentation_hour" ? (
            <>
              <TextField
                onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: [e.target.value, prev[key] ? prev[key][1] : null, prev[key] ? prev[key][2] : null].filter((el) => !!el) }))}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={[dictionaryObject[key]].flat()[0] || ""}
              />
              <TextField
                onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: [prev[key] ? prev[key][0] : null, e.target.value, prev[key] ? prev[key][2] : null].filter((el) => !!el) }))}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={[dictionaryObject[key]].flat()[1] || ""}
              />
              <TextField
                onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: [prev[key] ? prev[key][0] : null, prev[key] ? prev[key][1] : null, e.target.value].filter((el) => !!el) }))}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={[dictionaryObject[key]].flat()[2] || ""}
              />

              <TextField
                onChange={(e) => setDictionaryObject((prev) => ({ ...prev, rental_hours: e.target.value }))}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={dictionaryObject.rental_hours || ""}
              />
            </>
          ) : (
            <TextField
              onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: e.target.value }))}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              value={dictionaryObject[key] || ""}
            />
          )
        ) : null}

        <Button
          style={{ color: "grey" }}
          onClick={async () => {
            const result = await update(dictionaryObject, country);
            if (!result?.message) {
              await getAllDictionary({ country });
              alert("Sucess");
            } else {
              alert(result.message);
            }
          }}
        >
          Save Changes
        </Button>
        <Button
          style={{ color: "grey" }}
          onClick={async () => {
            const result = await remove(dictionaryObject, country);
            if (result) {
              setDictionaryObject({});
              await getAllDictionary({ country });
              alert("Sucess");
            } else {
              alert("Something went wrong");
            }
          }}
        >
          Delete element
        </Button>

        {key === "presentation_hour" ? (
          <>
            <TextField
              onChange={(e) => setNewDictionaryObject((prev) => ({ ...prev, [key]: [e.target.value, prev[key] ? prev[key][1] : null, prev[key] ? prev[key][2] : null].filter((el) => !!el) }))}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              variant="filled"
              defaultValue="Время презентации"
            />
            <TextField
              onChange={(e) => setNewDictionaryObject((prev) => ({ ...prev, [key]: [prev[key] ? prev[key][0] : null, e.target.value, prev[key] ? prev[key][2] : null].filter((el) => !!el) }))}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              variant="filled"
              defaultValue="Время презентации"
            />
            <TextField
              onChange={(e) => setNewDictionaryObject((prev) => ({ ...prev, [key]: [prev[key] ? prev[key][0] : null, prev[key] ? prev[key][1] : null, e.target.value].filter((el) => !!el) }))}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              variant="filled"
              defaultValue="Время презентации"
            />

            <TextField
              onChange={(e) => setNewDictionaryObject((prev) => ({ ...prev, rental_hours: e.target.value, relevance_status: true }))}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              variant="filled"
              defaultValue="Время аренды"
            />
          </>
        ) : (
          <TextField
            onChange={(e) => setNewDictionaryObject((prev) => ({ ...prev, [key]: e.target.value, relevance_status: true }))}
            style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
            placeholder=""
            autoComplete="off"
            required
          />
        )}

        <Button
          style={{ color: "grey" }}
          size="medium"
          onClick={async () => {
            const result = await create(newDictionaryObject, country);
            console.log(1, result);
            if (!result?.message) {
              // setNewDictionaryObject({});
              await getAllDictionary({ country });
              alert("Sucess");
            } else {
              alert(result.message);
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
          Add element
        </Button>
      </ContainerForEditMenu>
    </TrailsDictionariesEditTable>
  );
}

export default TrailsDictionatiesEdit;
