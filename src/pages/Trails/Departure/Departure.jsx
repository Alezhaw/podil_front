import { useEffect, useState } from "react";
import DepartureDate from "./DepartureDate";

function DepartureTable({ item, departureDate, messages, allTrails, country, changeDeleteTrails, weekDays, sort, createTrail, search, planningPersonIds, dateFrom, dateTo }) {
  const [isOpen, setIsOpen] = useState(true);
  const [dates, setDates] = useState([]);
  const replaceDots = (date) => String(date)?.replaceAll("-", ".");

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
      <tr
        rowSpan={10}
        style={{ border: "1px solid black", textAlign: "start", cursor: "pointer", background: "#242526", color: "white" }}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <td colSpan="100" className="tableHeader">
          {replaceDots(item.range[sort ? 1 : 0])} - {replaceDots(item.range[sort ? 0 : 1])}
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
              country={country}
              changeDeleteTrails={changeDeleteTrails}
              weekDays={weekDays}
              createTrail={createTrail}
              search={search}
              planningPersonIds={planningPersonIds[0]}
              dateFrom={dateFrom}
              dateTo={dateTo}
              replaceDots={replaceDots}
            />
          ))
        : null}
    </>
  );
}

export default DepartureTable;
