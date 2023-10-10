import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, FormControl, Select, Autocomplete, TextField } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTrailsTypes } from "../../../store/Users/trails/trailsTypes";
import Trail from "../../../api/trails/trails";

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
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles" background="white">
      <div onClick={(e) => e.stopPropagation()} style={{ flexDirection: "column", zIndex: 1, background: "rgba(255, 255, 255, 0.95)" }} className="pages-user-block">
        <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "-50px", right: "0px" }}>
          <CloseIcon style={{ cursor: "pointer", marginBottom: "20px" }} onClick={() => setIsOpen(false)}></CloseIcon>
        </div>

        <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{title}</h6>
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
        {key === "presentation_hour" ? (
          <>
            <input
              onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: [e.target.value, prev[key] ? prev[key][1] : null, prev[key] ? prev[key][2] : null].filter((el) => !!el) }))}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              value={[dictionaryObject[key]].flat()[0] || ""}
            />
            <input
              onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: [prev[key] ? prev[key][0] : null, e.target.value, prev[key] ? prev[key][2] : null].filter((el) => !!el) }))}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              value={[dictionaryObject[key]].flat()[1] || ""}
            />
            <input
              onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: [prev[key] ? prev[key][0] : null, prev[key] ? prev[key][1] : null, e.target.value].filter((el) => !!el) }))}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              value={[dictionaryObject[key]].flat()[2] || ""}
            />

            <input
              onChange={(e) => setDictionaryObject((prev) => ({ ...prev, rental_hours: e.target.value }))}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
              type="text"
              placeholder=""
              autoComplete="off"
              required
              value={dictionaryObject.rental_hours || ""}
            />
          </>
        ) : (
          <input
            onChange={(e) => setDictionaryObject((prev) => ({ ...prev, [key]: e.target.value }))}
            className="tabl-flex-admin-user-scores "
            style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
            type="text"
            placeholder=""
            autoComplete="off"
            required
            value={dictionaryObject[key] || ""}
          />
        )}

        <div
          className="tabl-flex-admin-button-global2"
          onClick={async () => {
            const result = await update(dictionaryObject, country);
            if (result) {
              await getAllDictionary({ country });
              alert("Sucess");
            } else {
              alert("Something went wrong");
            }
          }}
        >
          Save Changes
        </div>
        <div
          className="tabl-flex-admin-button-global2"
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
        </div>

        <input
          className="tabl-flex-admin-user-scores "
          onChange={(e) => setNewDictionaryObject((prev) => ({ ...prev, [key]: e.target.value, relevance_status: true }))}
          style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
          placeholder=""
          autoComplete="off"
          required
        />

        <div
          className="tabl-flex-admin-button-global2"
          onClick={async () => {
            const result = await create(newDictionaryObject, country);
            if (result) {
              setNewDictionaryObject({});
              await getAllDictionary({ country });
              alert("Sucess");
            } else {
              alert("Something went wrong");
            }
          }}
        >
          Add element
        </div>
      </div>
    </div>
  );
}

export default TrailsDictionatiesEdit;
