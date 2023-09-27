import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../../store/reduxHooks";

function AllTrailsTable({ allTrails, country, changeDeleteTrails, weekDays, getDictionary }) {
  const navigate = useNavigate();
  const { callTamplates, citiesWithRegions, contractStatuses, forms, planningPeople, presentationTimes, projectConcent, projectSales, regiments, regions, reservationStatuses } = useAppSelector(
    (store) => store.trails
  );

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
    <tbody>
      {/* <button onClick={() => console.log(123, allTrails)}> 123</button> */}

      {allTrails?.map((item) => (
        <tr key={item.id} style={{ textAlign: "center" }}>
          <td className="basesTableCell">
            <div className="tableInput">{item.id || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            {/* <button
              onClick={() => {
                getDictionary({ country, trails: allTrails });
                // console.log(1, dayName);
              }}
            >
              {" "}
              123
            </button> */}
            <div className="tableInput">{getValueById(item.planning_person_id, "name", planningPeople)}</div>
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <input className="tableInput" type="date" autoComplete="off" value={item.date_scheduled || undefined} disabled />
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
            {item.departure_dates?.map((date, index) => (
              <input key={index} className="tableInput" type="date" autoComplete="off" value={date || undefined} disabled />
            ))}
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <div className="tableInput">
              {item.presentation_date || ""} {getDayName(item.presentation_date)}
            </div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">
              {(getValueById(item.presentation_time_id, "presentation_hour", presentationTimes) || []).map((date, index) => (
                <input key={index} className="tableInput" type="date" autoComplete="off" value={date || undefined} disabled />
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
            {(getValueById(item.form_id, "telephone", forms) || []).map((el) => (
              <div className="tableInput">{el}</div>
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
            <div className="tableInput">{item.sent_to_podil || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_bases || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_speaker || ""}</div>
          </td>
          <td className="basesTableCell" style={{ maxWidth: "unset" }}>
            <div className="tableInput">{item.sent_to_scenario || ""}</div>
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
        </tr>
      ))}
    </tbody>
  );
}

export default AllTrailsTable;
