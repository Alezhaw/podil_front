import { useEffect, useState } from "react";
import DepartureDate from "./DepartureDate";
import { Button } from "@mui/material";
import Map from "../components/Map";
import { getFormatDate } from "../../../utils/utils";

function DepartureTable({
  item,
  departureDate,
  allTrails,
  changeDeleteTrails,
  weekDays,
  sort,
  search,
  planningPersonIds,
  dateFrom,
  dateTo,
  getDictionary,
  createTrail,
  messages,
  createCity,
  updateDeparture,
  zoom,
}) {
  const [isOpen, setIsOpen] = useState(!(JSON.parse(localStorage.getItem("hideDepartureDate")) || [])?.find((el) => String(el) === String(item?.id)));
  const [dates, setDates] = useState([]);
  const replaceDots = (date) => String(date)?.replaceAll("-", ".");
  const [isOpenMap, setIsOpenMap] = useState(false);

  useEffect(() => {
    setDates(
      departureDate
        .filter((date) => item.id === date.departure_id)
        .sort((a, b) => {
          a = new Date(a.data);
          b = new Date(b.data);

          return sort ? b - a : a - b;
        })
    );
    // eslint-disable-next-line
  }, [departureDate, sort]);

  return (
    <>
      <tr rowSpan={10} style={{ border: "1px solid black", textAlign: "start", background: "#242526", color: "white" }}>
        <td colSpan="100" className="tableHeader" style={{ padding: "6px" }}>
          <div style={{ display: "flex", gap: "2rem", position: "sticky", left: "13px", width: "calc(100vw - 100px)", alignItems: "center" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsOpen((prev) => {
                  const hideDepartureDate = JSON.parse(localStorage.getItem("hideDepartureDate")) || [];
                  if (!prev) {
                    localStorage.setItem("hideDepartureDate", JSON.stringify(hideDepartureDate?.filter((el) => String(el) !== String(item?.id))));
                  } else {
                    localStorage.setItem("hideDepartureDate", JSON.stringify([...hideDepartureDate, item?.id]));
                  }
                  return !prev;
                });
              }}
            >
              {getFormatDate(replaceDots(item.range[sort ? 1 : 0]))} - {getFormatDate(replaceDots(item.range[sort ? 0 : 1]))}
            </div>
            <Button onClick={() => setIsOpenMap((prev) => !prev)}>{messages.halls}</Button>
          </div>
        </td>
      </tr>
      {isOpen
        ? dates.map((date, index) => (
            <DepartureDate
              key={index}
              index={`${index} ${item.id}`}
              item={item}
              date={date}
              messages={messages}
              allTrails={allTrails?.filter((el) => el.departure_date_id === date.id)}
              trailsLength={allTrails?.filter((el) => el.departure_id === item.id)?.length}
              changeDeleteTrails={changeDeleteTrails}
              weekDays={weekDays}
              createTrail={createTrail}
              search={search}
              planningPersonIds={planningPersonIds[0]}
              dateFrom={dateFrom}
              dateTo={dateTo}
              replaceDots={replaceDots}
              departureIndex={index}
              createCity={createCity}
              updateDeparture={updateDeparture}
              zoom={zoom}
            />
          ))
        : null}

      {isOpenMap ? <Map selectedDeparture={item.id} isOpenMap={isOpenMap} setIsOpenMap={setIsOpenMap} getDictionary={getDictionary} /> : null}
    </>
  );
}

export default DepartureTable;
