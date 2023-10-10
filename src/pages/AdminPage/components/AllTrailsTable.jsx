import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";

function AllTrailsTable({ messages, allTrails, country, changeDeleteTrails, weekDays }) {
  const navigate = useNavigate();
  const { allUsers } = useAppSelector((store) => store.user);
  const { callTamplates, citiesWithRegions, contractStatuses, forms, presentationTimes, projectConcent, projectSales, regiments, regions, reservationStatuses, departure, departureDate } =
    useAppSelector((store) => store.trails);

  function getValueById(id, key, array) {
    if (!id) {
      return "";
    }
    const item = array?.filter((item) => item.id === Number(id))[0];
    return item ? item[key] : "";
  }

  function getDayName(date) {
    const d = new Date(date);
    return weekDays[d.getDay()];
  }

  return (
    <>
      {allTrails?.map((item) => (
        <tr key={item.id} style={{ textAlign: "center" }}>
          <td className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/trails/${country}/${item?.id}`)}>
            <div className="tableInput">{item.id || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.planning_person_id, "nickname", allUsers)}</div>
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <div className="tableInput">{item.date_scheduled}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.company_id, "name", regiments)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.city_id, "city_type", citiesWithRegions)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.city_id, "population", citiesWithRegions)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.route_number || ""}</div>
          </td>
          <td className="basesTableCell" style={{ padding: "0px", maxWidth: "unset" }}>
            {(getValueById(item.departure_id, "range", departure) || [])?.map((date, index) => (
              // <input key={index} className="tableInput" type="date" autoComplete="off" value={date || undefined} disabled />
              <div key={index} style={{ margin: "0 10px", width: "65px" }}>
                {date}
              </div>
            ))}
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <div className="tableInput">
              {getValueById(item.departure_date_id, "data", departureDate) || ""} {getDayName(getValueById(item.departure_date_id, "data", departureDate))}
            </div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">
              {(getValueById(item.presentation_time_id, "presentation_hour", presentationTimes) || []).map((time, index) => (
                <div className="tableInput" key={index}>
                  {time}
                </div>
              ))}
            </div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.presentation_time_id, "rental_hours", presentationTimes)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.regionId, "region", regions)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.city_id, "city_name", citiesWithRegions)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "local", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "address", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.reservation_status_id, "name", reservationStatuses)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.alternative || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            {(getValueById(item.form_id, "telephone", forms) || []).map((el, index) => (
              <div className="tableInput" key={index}>
                {el}
              </div>
            ))}
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "cost", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "payment_method", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.contract_status_id, "name", contractStatuses)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.comment || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_podil ? messages.yes : messages.no}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_bases ? messages.yes : messages.no}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_speaker ? messages.yes : messages.no}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_scenario ? messages.yes : messages.no}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.autozonning || ""}</div>
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <input className="tableInput" type="date" autoComplete="off" value={item.date_of_the_previous_presentation || undefined} disabled />
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.project_sales_id, "name", projectSales)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.project_concent_id, "name", projectConcent)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.call_template_id, "name", callTamplates)}</div>
          </td>

          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "local", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "confirm", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "parking", forms)}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{getValueById(item.form_id, "comments", forms)}</div>
          </td>

          <td className="basesTableCell" style={{ minWidth: "75px" }}>
            <input onChange={(e) => changeDeleteTrails(e.target.checked, item?.id)} className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" />
          </td>
        </tr>
      ))}
    </>
  );
}

export default AllTrailsTable;
