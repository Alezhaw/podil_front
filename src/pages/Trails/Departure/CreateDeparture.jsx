import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { List, ListItem, ListItemText, Button, useTheme, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function CreateDeparture({ setIsOpen, newDeparture, setNewDeparture, messages, weekDays, createDeparture, replaceDots }) {
  const theme = useTheme();

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
    dateFrom.setDate(dateFrom.getDate() + 1);
    let dateTo = new Date(newDeparture.dateTo);
    dateTo.setDate(dateTo.getDate() + 1);

    let daylist = getDaysArray(dateFrom, dateTo);
    setNewDeparture((prev) => ({ ...prev, range: [dateFrom, dateTo], dates: daylist.map((v) => v.toISOString().split("T")[0]) }));
    // eslint-disable-next-line
  }, [newDeparture.dateFrom, newDeparture.dateTo]);

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
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem", textAlign: "center", width: "350px", justifyContent: "space-evenly" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={messages?.from}
                  onChange={(e) => setNewDeparture((prev) => ({ ...prev, dateFrom: e }))}
                  slotProps={{ textField: { size: "small" } }}
                  defaultValue={dayjs(new Date(newDeparture.dateFrom))}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={messages?.to}
                  onChange={(e) => setNewDeparture((prev) => ({ ...prev, dateTo: e }))}
                  slotProps={{ textField: { size: "small" } }}
                  defaultValue={dayjs(new Date(newDeparture.dateTo))}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div style={{ marginTop: 0 }} className="createBlock">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ maxHeight: 300, overflow: "auto" }}>
                <List>
                  {newDeparture?.dates?.map((date, index) => (
                    <ListItem style={{ height: 46, left: 0, right: undefined, top: 0, width: "100%", padding: "0px 1rem" }} key={index} component="div" disablePadding>
                      <ListItemText primary={`${replaceDots(date)} ${getDayName(date)}`} />
                      <CloseIcon style={{ cursor: "pointer" }} onClick={() => deleteDate(date)} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
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
