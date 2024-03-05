import { useNavigate } from "react-router-dom";
import { Checkbox, FormControl, Select, MenuItem } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useAppSelector } from "../../../store/reduxHooks";
import CustomTooltip from "../../../components/CustomTooltip";
import { getValueById } from "../../../components/functions";
import { getFormatDate } from "../../../utils/utils";
import Trail from "../../../api/trails/trails";
import { colors, regimentColors, reservationStatusColumnColors, reservationStatusColors, contractStatusColors } from "../../../utils/utils";
import TimeContainer from "./TimeContainer";
import { customAlert } from "../../../components/Alert/AlertFunction";
import SelectReservationStatus from "./SelectReservationStatus";

function AllTrailsTable({ messages, allTrails, changeDeleteTrails, weekDays, replaceDots, createCity, zoom }) {
  const navigate = useNavigate();
  const { allUsers, country } = useAppSelector((store) => store.user);
  const {
    callTamplates,
    citiesWithRegions,
    contractStatuses,
    forms,
    presentationTimes,
    projectConcent,
    projectSales,
    regiments,
    regions,
    reservationStatuses,
    departure,
    departureDate,
    allDictionary,
  } = useAppSelector((store) => store.trails);

  async function updateTrail(trail) {
    if (!trail.autozonning) {
      return customAlert({ message: "Fill out autozoning" });
    }
    const result = await Trail.updateTrail(trail, country);
    if (!result) {
      return customAlert({ message: "Error" });
    }
    customAlert({ message: "Sucess", severity: "success" });
  }

  function getDayName(date) {
    const d = new Date(date);
    return weekDays[d.getDay()];
  }

  function getTimeByTrail(trail, allTimes) {
    const times = getValueById(trail.presentation_time_id, "presentation_hour", allTimes) || [];
    return times[0] || "";
  }

  return (
    <>
      {allTrails
        ?.sort((a, b) => getTimeByTrail(a, presentationTimes)?.localeCompare(getTimeByTrail(b, presentationTimes)))
        ?.map((item, trailIndex) => {
          const address = getValueById(item.form_id, "address", forms);
          const comments = getValueById(item.form_id, "comments", forms);
          const company_id = getValueById(item?.departure_id, "company_id", departure);
          return (
            <tr key={item.id} style={{ textAlign: "center", maxHeight: "73px", background: getValueById(item.presentation_time_id, "alternative", presentationTimes) && "aquamarine" }}>
              <td className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/trails/${item?.id}`)}>
                <div className="tableInput">{item.id || ""}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{getValueById(item.planning_person_id, "nickname", allUsers)}</div>
              </td>
              <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
                <div className="tableInput">{getFormatDate(replaceDots(item.date_scheduled))}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset", background: regimentColors[getValueById(company_id, "id", allDictionary?.regiments) || 0] }}>
                <div className="tableInput">{getValueById(company_id, "name", allDictionary?.regiments)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{getValueById(item.city_id, "city_type", citiesWithRegions)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{getValueById(item.city_id, "population", citiesWithRegions)}</div>
              </td>
              <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
                <div className="tableInput">
                  {getFormatDate(getValueById(item.departure_date_id, "data", departureDate)) || ""} {getDayName(getValueById(item.departure_date_id, "data", departureDate))}
                </div>
              </td>
              <TimeContainer item={item} presentationTimes={presentationTimes} messages={messages} />
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{getValueById(item.presentation_time_id, "rental_hours", presentationTimes)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{getValueById(item.regionId, "timezone", regions)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset", background: reservationStatusColumnColors[item.reservation_status_id || 0] }}>
                <div className="tableInput">{getValueById(item.regionId, "region", regions)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset", background: reservationStatusColumnColors[item.reservation_status_id || 0] }}>
                <div className="tableInput">{getValueById(item.city_id, "city_name", citiesWithRegions)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset", background: reservationStatusColumnColors[item.reservation_status_id || 0] }}>
                <div className="tableInput">{getValueById(item.form_id, "local", forms)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset", position: "relative", background: reservationStatusColumnColors[item.reservation_status_id || 0] }} id="tooltip">
                <div className="tableInput">{address}</div>
              </td>
              <td className="basesTableCell black selectInputNoWrap" style={{ maxWidth: "unset", background: reservationStatusColors[item.reservation_status_id || 0] }}>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={item.reservation_status_id}
                    onChange={(e) => updateTrail({ ...item, reservation_status_id: e.target.value })}
                    style={{
                      color: "black",
                      fontSize: "14px",
                      maxWidth: "130px",
                    }}
                  >
                    {allDictionary?.reservationStatuses?.map((el, index) => (
                      <MenuItem key={`${index} ${el?.id}`} value={el?.id}>
                        {el?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset", background: item.landmarks ? "white" : colors?.red }}>
                <div className="tableInput">{item.landmarks || ""}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                {(getValueById(item.form_id, "telephone", forms) || []).map((el, index) => (
                  <div className="tableInput" style={{ whiteSpace: "nowrap" }} key={`${index} ${el}`}>
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
              <td className="basesTableCell" style={{ maxWidth: "unset", background: contractStatusColors[item.contract_status_id || 0] }}>
                <div className="tableInput">{getValueById(item.contract_status_id, "name", allDictionary?.contractStatuses)}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{item.contract_comment || ""}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{item.comment || ""}</div>
              </td>
              {/* <td className="basesTableCell" style={{ maxWidth: "unset", background: item.sent_to_podil ? colors.green : colors.red }}>
                <div className="tableInput">{item.sent_to_podil ? messages.yes : messages.no}</div>
              </td> */}
              <td className="basesTableCell black" style={{ background: item.sent_to_podil ? colors.green : colors.red }}>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={!!item.sent_to_podil}
                    onChange={(e) => {
                      createCity(item, e.target.value, "visible_in_podil", null, null, null, allDictionary, departure, forms, citiesWithRegions);
                    }}
                    style={{ color: "black" }}
                  >
                    <MenuItem value={false}>{messages.no}</MenuItem>
                    <MenuItem value={true}>{messages.yes}</MenuItem>
                  </Select>
                </FormControl>
              </td>
              <td className="basesTableCell black" style={{ background: item.sent_to_bases ? colors.green : colors.red }}>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={!!item.sent_to_bases}
                    onChange={(e) => {
                      createCity(item, e.target.value, "visible_in_bases", null, null, null, allDictionary, departure, forms, citiesWithRegions);
                    }}
                    style={{ color: "black" }}
                  >
                    <MenuItem value={false}>{messages.no}</MenuItem>
                    <MenuItem value={true}>{messages.yes}</MenuItem>
                  </Select>
                </FormControl>
              </td>
              <td className="basesTableCell black" style={{ background: item.sent_to_speaker ? colors.green : colors.red }}>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={!!item.sent_to_speaker}
                    onChange={(e) => {
                      createCity(item, e.target.value, "visible_in_speaker", null, null, null, allDictionary, departure, forms, citiesWithRegions);
                    }}
                    style={{ color: "black" }}
                  >
                    <MenuItem value={false}>{messages.no}</MenuItem>
                    <MenuItem value={true}>{messages.yes}</MenuItem>
                  </Select>
                </FormControl>
              </td>
              <td className="basesTableCell black" style={{ background: item.sent_to_scenario ? colors.green : colors.red }}>
                <FormControl variant="standard">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={!!item.sent_to_scenario}
                    onChange={(e) => {
                      createCity(item, e.target.value, "visible_in_scenario", null, null, null, allDictionary, departure, forms, citiesWithRegions);
                    }}
                    style={{ color: "black" }}
                  >
                    <MenuItem value={false}>{messages.no}</MenuItem>
                    <MenuItem value={true}>{messages.yes}</MenuItem>
                  </Select>
                </FormControl>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{item.autozonning || ""}</div>
              </td>
              <td className="basesTableCell" style={{ maxWidth: "unset" }}>
                <div className="tableInput">{item.regionalization_comment || ""}</div>
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
                <div className="tableInput">
                  {comments ? (
                    <CustomTooltip sx={{ fontWeight: "20px" }} titleProps={{ right: "0px", left: "unset" }} title={comments}>
                      <ChatBubbleIcon />
                    </CustomTooltip>
                  ) : (
                    <ChatBubbleOutlineIcon />
                  )}
                </div>
              </td>

              <td className="basesTableCell" style={{ minWidth: "75px" }}>
                <Checkbox className="checkboxOnWhiteBackground" onChange={(e) => changeDeleteTrails(e.target.checked, item?.id)} />
              </td>
            </tr>
          );
        })}
    </>
  );
}

export default AllTrailsTable;
