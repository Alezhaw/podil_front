import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import AllTrailsTable from "../components/AllTrailsTable";
import { useAppSelector } from "../../../store/reduxHooks";
import CreateTrail from "../components/CreateTrail";
import CreateDeparture from "./CreateDeparture";
import { getValueById } from "../../../components/functions";
import { getFormatDate } from "../../../utils/utils";

function DepartureDate({
  item,
  index,
  date,
  messages,
  allTrails,
  trailsLength,
  changeDeleteTrails,
  weekDays,
  createTrail,
  search,
  planningPersonIds,
  dateFrom,
  dateTo,
  replaceDots,
  departureIndex,
  createCity,
  updateDeparture,
  zoom,
}) {
  const { user } = useAppSelector((store) => store.user);
  const { presentationTimes, departureDate } = useAppSelector((store) => store.trails);
  const [trails, setTrails] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditDeparture, setIsOpenEditDeparture] = useState(false);
  const [newTrail, setNewTrail] = useState({
    route_number: item.route_number,
    reservation_status_id: 1,
    relevance_status: true,
    departure_dates: item.range,
    presentation_date: date.data,
    call_template_id: 2,
    planning_person_id: user?.id,
    date_scheduled: new Date().toISOString().split("T")[0],
    departure_id: item.id,
    departure_date_id: date.id,
  });
  const [editDeparture, setEditDeparture] = useState({ ...item, dateFrom: item?.range[0], dateTo: item?.range[1] });
  const testRowNumber = trailsLength + departureDate?.filter((el) => el.departure_id === item.id)?.length;

  useEffect(() => {
    setTrails(allTrails?.filter((el) => el.departure_date_id === date.id));
    setRowNumber(
      allTrails
        ?.filter((el) => el.departure_date_id === date.id)
        ?.map((el) => getValueById(el.presentation_time_id, "presentation_hour", presentationTimes))
        ?.flat()?.length
    );

    // eslint-disable-next-line
  }, [allTrails, date]);

  return (
    <>
      {isOpen ? <CreateTrail setIsOpen={setIsOpen} createTrail={createTrail} newTrail={newTrail} setNewTrail={setNewTrail} rowNumber={rowNumber} messages={messages} /> : null}
      {isOpenEditDeparture ? (
        <tr>
          <th>
            <CreateDeparture
              setIsOpen={setIsOpenEditDeparture}
              messages={{ ...messages, create: messages?.apply }}
              newDeparture={editDeparture}
              setNewDeparture={setEditDeparture}
              weekDays={messages.days_of_the_week}
              createDeparture={updateDeparture}
              replaceDots={replaceDots}
              forEdit
            />
          </th>
        </tr>
      ) : null}
      <tr style={{ border: "1px solid lightgray", textAlign: "start", height: "29px" }} key={`date ${index} ${item.id}`}>
        {departureIndex === 0 ? (
          <>
            <td rowSpan={testRowNumber} className="basesTableCell">
              <div style={{ transform: "rotateZ(-90deg)", fontSize: "1.5rem", textAlign: "center" }}>{item.route_number}</div>
            </td>
            <td rowSpan={testRowNumber} className="basesTableCell pointer" style={{ height: "200px" }} onClick={() => setIsOpenEditDeparture((prev) => !prev)}>
              <div style={{ writingMode: "vertical-rl", maxHeight: "169px", transform: "rotate(180deg)", fontSize: "1.5rem", flexDirection: "column" }}>
                {item.range?.map((date, index) => (
                  // <input key={index} className="tableInput" type="date" autoComplete="off" value={date || undefined} disabled />
                  <div key={index} style={{ margin: "0 10px", whiteSpace: "nowrap" }}>
                    {getFormatDate(replaceDots(date))}
                  </div>
                ))}
              </div>
            </td>
          </>
        ) : null}
        <td colSpan={6} style={{ padding: "6px" }}>
          <div style={{ display: "flex", position: "sticky", left: "13px", width: "calc(100vw - 100px)", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              {getFormatDate(replaceDots(date.data))}{" "}
              <div style={{ position: "absolute", top: "-9px", right: "-40px" }}>
                {
                  //!checkFilter ? (
                  // && rowNumber < 3
                  <IconButton color="primary" size="small" onClick={() => setIsOpen(true)}>
                    <AddIcon />
                  </IconButton>
                  // ) : null
                }
              </div>
            </div>
          </div>
        </td>

        <td colSpan={100} style={{ padding: "6px" }}></td>
      </tr>

      {item?.id && !trails[0] ? (
        <>
          {Array.from({ length: allTrails?.filter((el) => el.departure_date_id === date.id)?.length })?.map((el, index) => (
            <tr key={index}></tr>
          ))}
        </>
      ) : null}
      <AllTrailsTable
        key={`table ${index} ${item.id}`}
        messages={messages}
        allTrails={trails}
        changeDeleteTrails={changeDeleteTrails}
        weekDays={weekDays}
        replaceDots={replaceDots}
        createCity={createCity}
        zoom={zoom}
      />
    </>
  );
}

export default DepartureDate;
