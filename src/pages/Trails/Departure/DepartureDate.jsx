import { useEffect, useState } from "react";
import AllTrailsTable from "../components/AllTrailsTable";
import { useAppSelector } from "../../../store/reduxHooks";
import CreateTrail from "../components/CreateTrail";

function DepartureDate({ item, index, date, messages, allTrails, country, changeDeleteTrails, weekDays, createTrail, search, planningPersonIds, dateFrom, dateTo, replaceDots }) {
  const checkFilter = search || !!planningPersonIds || dateTo;
  const { user } = useAppSelector((store) => store.user);
  const { presentationTimes } = useAppSelector((store) => store.trails);
  const [trails, setTrails] = useState([]);
  const [rowNumber, setRowNumber] = useState(0);
  const [newTrail, setNewTrail] = useState({
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
  const [isOpen, setIsOpen] = useState(false);

  function getValueById(id, key, array) {
    if (!id) {
      return "";
    }
    const item = array?.filter((item) => item.id === Number(id))[0];
    return item ? item[key] : "";
  }

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
      {isOpen ? <CreateTrail setIsOpen={setIsOpen} createTrail={createTrail} newTrail={newTrail} setNewTrail={setNewTrail} messages={messages} /> : null}
      <tr style={{ border: "1px solid lightgray", textAlign: "start" }} key={`date ${index} ${item.id}`}>
        <td colSpan={100}>{replaceDots(date.data)}</td>
      </tr>
      <AllTrailsTable
        key={`table ${index} ${item.id}`}
        messages={messages}
        allTrails={trails}
        country={country}
        changeDeleteTrails={changeDeleteTrails}
        weekDays={weekDays}
        replaceDots={replaceDots}
      />
      {!checkFilter
        ? Array(3 - (rowNumber > 2 ? 3 : rowNumber)).fill(
            <tr style={{ cursor: "pointer", height: "50px", background: "lightgray", borderBottom: "5px solid white" }} onClick={() => setIsOpen(true)}>
              <td colSpan={100}></td>
            </tr>
          )
        : null}
    </>
  );
}

export default DepartureDate;
