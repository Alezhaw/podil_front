import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

function CreateDeparture({ setIsOpen, newDeparture, setNewDeparture, messages, weekDays, createDeparture }) {
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
    let daylist = getDaysArray(new Date(newDeparture.dateFrom), new Date(newDeparture.dateTo));
    setNewDeparture((prev) => ({ ...prev, range: [prev.dateFrom, prev.dateTo], dates: daylist.map((v) => v.toISOString().split("T")[0]) }));
    // eslint-disable-next-line
  }, [newDeparture.dateFrom, newDeparture.dateTo]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles" style={{ background: "rgba(255, 255, 255, 0.95)", alignItems: "baseline", position: "relative" }}>
        <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "-50px", right: "0px" }}>
          <CloseIcon style={{ cursor: "pointer", marginBottom: "20px" }} onClick={() => setIsOpen(false)}></CloseIcon>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", background: "rgba(255, 255, 255, 0.1)" }}>
          <div style={{ flexDirection: "column" }} className="pages-user-block">
            <h6 style={{ margin: "0", textAlign: "center", color: "black" }}>{messages?.departure_dates}</h6>
            <div style={{ display: "flex", flexDirection: "row", color: "black", textAlign: "center", width: "350px", justifyContent: "space-evenly" }}>
              <span style={{ display: "flex", flexDirection: "column" }}>
                {messages.from}
                <input
                  style={{ padding: "0px 5px" }}
                  onChange={(e) => setNewDeparture((prev) => ({ ...prev, dateFrom: e.target.value }))}
                  className="tableInput"
                  type="date"
                  value={newDeparture?.dateFrom}
                />
              </span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                {messages.to}
                <input
                  style={{ padding: "0px 5px" }}
                  onChange={(e) => setNewDeparture((prev) => ({ ...prev, dateTo: e.target.value }))}
                  className="tableInput"
                  type="date"
                  value={newDeparture?.dateTo}
                />
              </span>
            </div>
          </div>
          <div style={{ flexDirection: "column", color: "black" }} className="pages-user-block">
            <h6 style={{ margin: "0", textAlign: "center" }}>{messages?.departure_dates}</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ maxHeight: 300, overflow: "auto" }}>
                <List>
                  {newDeparture?.dates?.map((date, index) => (
                    <ListItem style={{ height: 46, left: 0, right: undefined, top: 0, width: "100%", padding: "0px 20px" }} key={index} component="div" disablePadding>
                      <ListItemText primary={`${date} ${getDayName(date)}`} />
                      <CloseIcon style={{ cursor: "pointer" }} onClick={() => deleteDate(date)} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </div>
          <Button style={{ color: "black" }} onClick={() => createDeparture({ newDeparture, setNewDeparture, setIsOpen })}>
            {messages.create}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateDeparture;
