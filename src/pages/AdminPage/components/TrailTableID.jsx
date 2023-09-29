import { Container, Button } from "@material-ui/core";
import { MenuItem, FormControl, Select } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";

function TrailTableID({ country, messages, trail, weekDays }) {
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
    if (!date) {
      return "";
    }
    const d = new Date(date);
    return weekDays[d.getDay()];
  }

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <table style={{ textAlign: "center" }}>
        <thead style={{ background: "#5a5959" }}>
          <tr style={{ background: "none" }}>
            <th className="basesTableCell">Planning person</th>
            <th className="basesTableCell">Date scheduled</th>
            <th className="basesTableCell">Company</th>
            <th className="basesTableCell">City type</th>
            <th className="basesTableCell">Population</th>
            <th className="basesTableCell">Route №</th>
            <th className="basesTableCell">Departure dates</th>
            <th className="basesTableCell">Presentation date</th>
            <th className="basesTableCell">Presentation hours</th>
            <th className="basesTableCell">Rental hours</th>
            <th className="basesTableCell">Region</th>
            <th className="basesTableCell">City</th>
            <th className="basesTableCell">Institution</th>
            <th className="basesTableCell">Address</th>
            <th className="basesTableCell">Reservation status</th>
            <th className="basesTableCell">Alternative</th>
            <th className="basesTableCell">Telephone</th>
            <th className="basesTableCell">Cost</th>
            <th className="basesTableCell">Payment method</th>
            <th className="basesTableCell">Contract status</th>
            <th className="basesTableCell">Comment</th>
            <th className="basesTableCell">Send to Podil</th>
            <th className="basesTableCell">Send to Bases</th>
            <th className="basesTableCell">Send to speaker</th>
            <th className="basesTableCell">Send to Scenario</th>
            <th className="basesTableCell">Autozonning</th>
            <th className="basesTableCell">Date of the previous presentation</th>
            <th className="basesTableCell">Project sales</th>
            <th className="basesTableCell">Project concent</th>
            <th className="basesTableCell">Call template</th>
            <th className="basesTableCell">Hall</th>
            <th className="basesTableCell">Payment notes</th>
            <th className="basesTableCell">Free parking</th>
            <th className="basesTableCell">Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: "center" }}>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.planning_person_id, "name", planningPeople)}</div>
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              {/* <input className="tableInput" type="date" value={trail.date_scheduled || undefined} disabled /> */}
              <div className="tableInput">{trail.date_scheduled}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.company_id, "name", regiments)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.city_id, "city_type", citiesWithRegions)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.city_id, "population", citiesWithRegions)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.route_number || ""}</div>
            </td>
            <td className="basesTableCell" style={{ padding: "0px", maxWidth: "unset" }}>
              {trail.departure_dates?.map((date, index) => (
                <div key={index} className="tableInput">
                  {date}
                </div>
              ))}
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              <div className="tableInput">
                {trail.presentation_date || ""} {getDayName(trail.presentation_date)}
              </div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">
                {(getValueById(trail.presentation_time_id, "presentation_hour", presentationTimes) || []).map((time, index) => (
                  <div className="tableInput" key={index}>
                    {time}
                  </div>
                ))}
              </div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.presentation_time_id, "rental_hours", presentationTimes)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.regionId, "region", regions)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.city_id, "city_name", citiesWithRegions)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "local", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "address", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.reservation_status_id, "name", reservationStatuses)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.alternative || ""}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              {(getValueById(trail.form_id, "telephone", forms) || []).map((el, index) => (
                <div className="tableInput" key={index}>
                  {el}
                </div>
              ))}
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "cost", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "payment_method", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.contract_status_id, "name", contractStatuses)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.comment || ""}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.sent_to_podil || ""}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.sent_to_bases || ""}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.sent_to_speaker || ""}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.sent_to_scenario || ""}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{trail.autozonning || ""}</div>
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              <div className="tableInput">{trail.date_of_the_previous_presentation}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.project_sales_id, "name", projectSales)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.project_concent_id, "name", projectConcent)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.call_template_id, "name", callTamplates)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "local", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "confirm", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "parking", forms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "comments", forms)}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default TrailTableID;
