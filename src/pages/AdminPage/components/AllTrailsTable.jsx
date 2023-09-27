import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AllTrailsTable({ allTrails, country, changeDeleteTrails, weekDays }) {
  const navigate = useNavigate();

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
          <td className="basesTableCell">
            <button
              onClick={() => {
                console.log(123, allTrails);
                var d = new Date(item.presentation_date);
                var dayName = weekDays[d.getDay()];
                // const date = new Date(item.presentation_date);
                console.log(1, dayName);
              }}
            >
              {" "}
              123
            </button>
            {/* <div className="tableInput">{item.planning_person_id || ""}</div> */}
            {/* <input
                  className="tableInput"
                  style={{ minWidth: "0px", width: "100px" }}
                  type="text"
                  autoComplete="off"
                  value={item.planning_person_id || ""} //подгрузить
                /> */}
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <input className="tableInput" type="date" autoComplete="off" value={item.date_scheduled || undefined} disabled />
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.company_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.city_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.city_id || ""}</div>
          </td>
          <td className="basesTableCell">
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
          <td className="basesTableCell">
            <div className="tableInput">{item.presentation_time_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.presentation_time_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.regionId || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.city_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.form_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.form_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.reservation_status_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.alternative || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.form_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.form_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.form_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.contract_status_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.comment || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.sent_to_podil || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.sent_to_bases || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.sent_to_speaker || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.sent_to_scenario || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.autozonning || ""}</div>
          </td>
          <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
            <input className="tableInput" type="date" autoComplete="off" value={item.date_of_the_previous_presentation || undefined} disabled />
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.project_sales_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.project_concent_id || ""}</div>
          </td>
          <td className="basesTableCell">
            <div className="tableInput">{item.call_template_id || ""}</div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default AllTrailsTable;
