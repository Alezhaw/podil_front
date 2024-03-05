import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemText, Button, useTheme, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NumberInput from "../../../components/NumberInput";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTrailsTypes } from "../../../store/Trails/trailsTypes";
import Trail from "../../../api/trails/trails";
import TrailSelect from "../components/TrailSelect";
import EditDictionaryButton from "../components/EditDictionaryButton";
import Regiment from "../../../api/trails/regiment";
import { getFormatDate } from "../../../utils/utils";
import MyDatePicker from '../../../components/forPages/MyDatePicker';

function CreateDeparture({ setIsOpen, newDeparture, setNewDeparture, messages, weekDays, createDeparture, replaceDots, forEdit }) {
  const dispatch = useDispatch();
  const { country } = useAppSelector((store) => store.user);
  const { allDictionary } = useAppSelector((store) => store.trails);
  const [isOpenDictionary, setIsOpenDictionary] = useState(null);
  const [dictionary, setDictionary] = useState({});
  const theme = useTheme();
  const [value, setValue] = useState(0);

  function getDayName(date) {
    const d = new Date(date);
    return weekDays[d.getDay()];
  }
  function getDaysArray(s, e) {
    for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
    return a;
  }

  function deleteDate(date) {
    setNewDeparture((prev) => ({ ...prev, dates: prev.dates.filter((el) => el !== date) }));
  }

  useEffect(() => {
    if (!newDeparture.dateFrom || !newDeparture.dateTo) return;

    let dateFrom = new Date(newDeparture.dateFrom);
    let dateTo = new Date(newDeparture.dateTo);
    if (!forEdit) {
      dateFrom.setDate(dateFrom.getDate() + 1);
      dateTo.setDate(dateTo.getDate() + 1);
    }

    let daylist = getDaysArray(dateFrom, dateTo);
    setNewDeparture((prev) => ({ ...prev, range: [dateFrom.toISOString().split("T")[0], dateTo.toISOString().split("T")[0]], dates: daylist.map((v) => v.toISOString().split("T")[0]) }));
    // eslint-disable-next-line
  }, [newDeparture.dateFrom, newDeparture.dateTo]);

  useEffect(() => {
    setDictionary({
      regiments: { array: allDictionary?.regiments, title: messages?.trails_regiment, keyName: "regiments", key: "name", update: Regiment.update, remove: Regiment.remove, create: Regiment.create },
    });
  }, [allDictionary, messages]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles"
        style={{ background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d", color: theme.palette.text.primary, alignItems: "baseline", position: "relative" }}
      >
        <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "-50px", right: "0px" }}>
          <CloseIcon style={{ cursor: "pointer", marginBottom: "1rem", color: "white" }} onClick={() => setIsOpen(false)}></CloseIcon>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ flexDirection: "column" }} className="createBlock">
            <Typography variant="body1" component="h2" sx={{ textAlign: "center" }}>
              {messages?.departure_dates}
            </Typography>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem", textAlign: "center", justifyContent: "space-evenly" }}>
              <MyDatePicker
                label={messages?.from}
                onChange={(e) => setNewDeparture((prev) => ({ ...prev, dateFrom: e }))}
                defaultValue={dayjs(new Date(newDeparture.dateFrom))}
              />
              <MyDatePicker
                label={messages?.to}
                onChange={(e) => setNewDeparture((prev) => ({ ...prev, dateTo: e }))}
                defaultValue={dayjs(new Date(newDeparture.dateTo))}
              />
            </div>
          </div>
          <div style={{ marginTop: 0 }} className="createBlock">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ maxHeight: 300, overflow: "auto" }}>
                <List>
                  {newDeparture?.dates?.map((date, index) => (
                    <ListItem style={{ height: 46, left: 0, right: undefined, top: 0, width: "100%", padding: "0px 1rem" }} key={index} component="div" disablePadding>
                      <ListItemText primary={`${getFormatDate(replaceDots(date))} ${getDayName(date)}`} />
                      <CloseIcon style={{ cursor: "pointer" }} onClick={() => deleteDate(date)} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </div>
          <div style={{ flexDirection: "row", alignItems: "center" }} className="createBlock">
            <Typography variant="body1" component="h2" sx={{ textAlign: "center", minWidth: "120px" }}>
              {messages?.route_number}
            </Typography>
            <NumberInput style={{ width: "-webkit-fill-available" }} value={newDeparture?.route_number || 0} onChange={(event, val) => setNewDeparture((prev) => ({ ...prev, route_number: val }))} />
          </div>

          <div style={{ flexDirection: "row", alignItems: "center" }} className="createBlock">
            <Typography variant="body1" component="h2" sx={{ textAlign: "center", minWidth: "120px" }}>
              {messages?.company}
            </Typography>
            <TrailSelect
              formStyle={{ width: "-webkit-fill-available" }}
              valueKey="company_id"
              trail={newDeparture}
              setTrail={setNewDeparture}
              array={allDictionary?.regiments}
              label="Company"
              arrayKey="name"
            />
            <EditDictionaryButton isOpen={isOpenDictionary} setIsOpen={setIsOpenDictionary} name="regiments" country={country} item={dictionary.regiments} />
          </div>

          <Button variant="outlined" onClick={() => createDeparture({ newDeparture, setNewDeparture, setIsOpen })}>
            {messages.create}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateDeparture;
