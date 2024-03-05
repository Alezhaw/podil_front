import { MenuItem, FormControl, Select, Autocomplete, TextField, Container } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";
import TrailSelect from "./TrailSelect";
import { sortPresentationHour } from "../../../components/functions";
import "../../../components/forPages/input.css";
import { getValueById } from "../../../components/functions";
import TimeWithLimits from "./TimeWithLimits";
import { getFormatDate, colors, reservationStatusColumnColors, reservationStatusColors, contractStatusColors } from "../../../utils/utils";

function TrailIDTable({ country, messages, trail, setTrail, getFormsByCityAndName, createCity, limits, setLimits, rowNumber }) {
  const { allUsers } = useAppSelector((store) => store.user);
  const { allDictionary, citiesWithRegions, allCitiesWithRegions, forms, allForms, departure, departureDate } = useAppSelector((store) => store.trails);

  function getDayName(date) {
    if (!date) {
      return "";
    }
    if (!messages.days_of_the_week) {
      return "";
    }
    const d = new Date(date);
    return messages.days_of_the_week[d.getDay()];
  }

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <table style={{ textAlign: "center" }}>
        <thead className="tableHeader">
          <tr>
            <th className="basesTableCell">{messages?.planning_person}</th>
            <th className="basesTableCell">{messages?.date_scheduled}</th>
            {/* <th className="basesTableCell">{messages?.company}</th> */}
            <th className="basesTableCell">{messages?.city_type}</th>
            <th className="basesTableCell">{messages?.population}</th>
            <th className="basesTableCell">{messages?.route}</th>
            {/* <th className="basesTableCell">{messages?.team_number}</th> */}
            <th className="basesTableCell">{messages?.departure_dates}</th>
            <th className="basesTableCell">{messages?.presentation_date}</th>
            <th className="basesTableCell">{messages?.presentation_hours}</th>
            <th className="basesTableCell">{messages?.limit}</th>
            <th className="basesTableCell">{messages?.rental_hours}</th>
            <th className="basesTableCell">{messages?.timezone}</th>
            <th className="basesTableCell">{messages?.region}</th>
            <th className="basesTableCell">{messages?.city}</th>
            <th className="basesTableCell">{messages?.institution}</th>
            <th className="basesTableCell">{messages?.address}</th>
            <th className="basesTableCell">{messages?.reservation_status}</th>
            <th className="basesTableCell">{messages?.landmarks}</th>
            <th className="basesTableCell">{messages?.telephone}</th>
            <th className="basesTableCell">{messages?.cost}</th>
            <th className="basesTableCell">{messages?.payment_method}</th>
            <th className="basesTableCell">{messages?.contract_status}</th>
            <th className="basesTableCell">{messages?.contract_comment}</th>
            <th className="basesTableCell">{messages?.comment}</th>
            <th className="basesTableCell">{messages?.send_to_podil}</th>
            <th className="basesTableCell">{messages?.send_to_bases}</th>
            <th className="basesTableCell">{messages?.send_to_speaker}</th>
            <th className="basesTableCell">{messages?.send_to_scenario}</th>
            <th className="basesTableCell" onClick={() => console.log(1, trail)}>
              {messages?.autozonning}
            </th>
            <th className="basesTableCell">{messages?.regionalization_comment}</th>
            <th className="basesTableCell">{messages?.date_of_previous_presentation}</th>
            <th className="basesTableCell">{messages?.project_sales}</th>
            <th className="basesTableCell">{messages?.project_concent}</th>
            <th className="basesTableCell">{messages?.call_template}</th>
            <th className="basesTableCell">{messages?.hall}</th>
            <th className="basesTableCell">{messages?.payment_notes}</th>
            <th className="basesTableCell">{messages?.free_parking}</th>
            <th className="basesTableCell">{messages?.comments}</th>
          </tr>
        </thead>
        <tbody style={{ background: "white" }}>
          <tr style={{ textAlign: "center", color: "black" }}>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.planning_person_id, "nickname", allUsers)}</div>
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              <input className="tableInput" type="date" autoComplete="off" value={trail.date_scheduled || undefined} disabled />
            </td>
            {/* <td className="basesTableCell black" style={{ maxWidth: "unset" }}>
              <TrailSelect valueKey="company_id" trail={trail} setTrail={setTrail} array={allDictionary?.regiments} arrayKey="name" />
            </td> */}
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.city_id, "city_type", citiesWithRegions) || getValueById(trail.city_id, "city_type", allCitiesWithRegions)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.city_id, "population", citiesWithRegions) || getValueById(trail.city_id, "population", allCitiesWithRegions)}</div>
            </td>
            {/* <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <input
                onChange={(e) => setTrail((prev) => ({ ...prev, route_number: Number(e.target.value) }))}
                className="tableInput"
                style={{ width: "70px" }}
                type="number"
                autoComplete="off"
                value={trail.route_number || ""}
              />
              <div className="tableInput">{trail.route_number || ""}</div>
            </td> */}
            <td className="basesTableCell" style={{ padding: "0px", maxWidth: "unset" }}>
              <div>{getValueById(trail.departure_id, "route_number", departure) || []}</div>
            </td>
            <td className="basesTableCell" style={{ padding: "0px", maxWidth: "unset" }}>
              <div>
                {(getValueById(trail.departure_id, "range", departure) || [])?.map((date, index) => (
                  <input key={index} className="tableInput" type="date" autoComplete="off" value={date || undefined} disabled />
                ))}
              </div>
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              <div className="tableInput">
                {getFormatDate(trail?.presentation_date)} {getDayName(trail?.presentation_date)}
              </div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput black">
                <Autocomplete
                  disablePortal
                  id="movie-customized-option-demo"
                  disableClearable
                  options={sortPresentationHour(allDictionary?.presentationTimes)
                    //?.filter((el) => el?.presentation_hour?.length <= 3 + [getValueById(trail.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes)]?.flat()?.length - rowNumber)
                    ?.map((el) => ({ ...el, label: `${el.presentation_hour?.join(" ")} ${el?.alternative ? messages?.alternative : ""}` }))}
                  sx={{ width: 200 }}
                  onChange={(e, values) => {
                    setTrail((prev) => ({ ...prev, presentation_time_id: Number(values?.id) }));
                  }}
                  renderInput={(params) => <TextField {...params} label="Times" variant="standard" />}
                  value={`${[getValueById(trail.presentation_time_id, "presentation_hour", allDictionary?.presentationTimes)]?.flat()?.join(" ")} ${
                    getValueById(trail.presentation_time_id, "alternative", allDictionary?.presentationTimes) ? messages?.alternative : ""
                  }`}
                />
              </div>
            </td>
            <TimeWithLimits limits={limits} setLimits={setLimits} />
            {/* <td className="basesTableCell black" style={{ minWidth: "100px", padding: "0px" }}>
              <div className="tableInput">
                {limits?.map((el, index) => (
                  <div key={`${el.time} ${index}`} style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center", background: "black" }}>
                    {el?.time}
                    <TextField
                      style={{ color: "black" }}
                      variant="standard"
                      type="number"
                      value={el?.limit}
                      onChange={(e) => setLimits((prev) => prev?.map((item) => (item.time === el.time ? { ...item, limit: e.target.value } : item)))}
                    />
                  </div>
                ))}
              </div>
            </td> */}
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.presentation_time_id, "rental_hours", allDictionary?.presentationTimes)}</div>
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              <div className="tableInput">{getValueById(trail.regionId, "timezone", allDictionary?.regions)}</div>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: reservationStatusColumnColors[trail.reservation_status_id || 0] }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                disableClearable
                options={allDictionary?.regions?.map((el) => ({ ...el, label: el.region }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setTrail((prev) => ({ ...prev, city_id: null }));
                  setTrail((prev) => ({ ...prev, regionId: Number(values?.id) }));
                }}
                renderInput={(params) => <TextField {...params} label="Region" variant="standard" />}
                value={getValueById(trail.regionId, "region", allDictionary?.regions)}
              />
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: reservationStatusColumnColors[trail.reservation_status_id || 0] }}>
              <Autocomplete
                disablePortal
                id="movie-customized-option-demo"
                disableClearable
                options={allCitiesWithRegions?.map((el) => ({ ...el, label: el.city_name }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setTrail((prev) => ({ ...prev, city_id: Number(values?.id), autozonning: [values?.autozonning].flat()[0] }));
                }}
                renderInput={(params) => <TextField {...params} label="City" variant="standard" />}
                value={getValueById(trail.city_id, "city_name", allCitiesWithRegions)}
              />
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: reservationStatusColumnColors[trail.reservation_status_id || 0] }}>
              {/* <div className="tableInput">{getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)}</div> */}
              <Autocomplete
                disablePortal
                id="movie-customized-option-demo"
                options={allForms?.map((el) => ({ ...el, label: `${el.id} ${el.local} \n (${el.town})` }))}
                sx={{ width: 300 }}
                onChange={(e, values) => {
                  setTrail((prev) => ({ ...prev, form_id: Number(values?.id) }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Inctitution"
                    variant="standard"
                    onChange={(e) => getFormsByCityAndName({ country, search: e.target.value })}
                    // onKeyUp={(e) => {
                    //   if (e.key === "Enter") {
                    //     getFormsByCityAndName({ country, search: e.target.value });
                    //     console.log(1, e.target.value);
                    //   }
                    // }}
                  />
                )}
                value={getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)}
              />
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset", background: reservationStatusColumnColors[trail.reservation_status_id || 0] }}>
              <div className="tableInput" style={{ width: "400px" }}>
                {getValueById(trail.form_id, "address", forms) || getValueById(trail.form_id, "address", allForms)}
              </div>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: reservationStatusColors[trail.reservation_status_id || 0] }}>
              <TrailSelect valueKey="reservation_status_id" trail={trail} setTrail={setTrail} array={allDictionary?.reservationStatuses} arrayKey="name" />
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset", background: trail.landmarks ? "white" : colors?.red }}>
              <textarea
                onChange={(e) => setTrail((prev) => ({ ...prev, landmarks: e.target.value }))}
                className="tableInput styledScroll textArea"
                style={{ width: "120px", height: "125px", padding: "10px" }}
                type="text"
                autoComplete="off"
                value={trail.landmarks || ""}
              />
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              {(getValueById(trail.form_id, "telephone", forms) || getValueById(trail.form_id, "telephone", allForms) || []).map((el, index) => (
                <div className="tableInput" style={{ whiteSpace: "nowrap" }} key={index}>
                  {el}
                </div>
              ))}
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "cost", forms) || getValueById(trail.form_id, "cost", allForms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "payment_method", forms) || getValueById(trail.form_id, "payment_method", allForms)}</div>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset" }}>
              <TrailSelect valueKey="contract_status_id" trail={trail} setTrail={setTrail} array={allDictionary?.contractStatuses} arrayKey="name" />
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <textarea
                onChange={(e) => setTrail((prev) => ({ ...prev, contract_comment: e.target.value }))}
                className="tableInput styledScroll textArea"
                style={{ width: "120px", height: "125px", padding: "10px" }}
                type="text"
                autoComplete="off"
                value={trail.contract_comment || ""}
              />
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <textarea
                onChange={(e) => setTrail((prev) => ({ ...prev, comment: e.target.value }))}
                className="tableInput styledScroll textArea"
                style={{ width: "120px", height: "125px", padding: "10px" }}
                type="text"
                autoComplete="off"
                value={trail.comment || ""}
              />
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: trail.sent_to_podil ? colors.green : colors.red }}>
              <div className="tableInput">{trail.sent_to_podil || ""}</div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={!!trail.sent_to_podil}
                  onChange={(e) => {
                    setTrail((prev) => ({ ...prev, sent_to_podil: e.target.value }));
                    createCity(trail, e.target.value, "visible_in_podil");
                  }}
                  style={{ fontWeight: 700, gap: "10px", color: "black" }}
                >
                  <MenuItem value={false}>{messages.no}</MenuItem>
                  <MenuItem value={true}>{messages.yes}</MenuItem>
                </Select>
              </FormControl>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: trail.sent_to_bases ? colors.green : colors.red }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={!!trail.sent_to_bases}
                  onChange={(e) => {
                    setTrail((prev) => ({ ...prev, sent_to_bases: e.target.value }));
                    createCity(trail, e.target.value, "visible_in_bases");
                  }}
                  style={{ fontWeight: 700, gap: "10px", color: "black" }}
                >
                  <MenuItem value={false}>{messages.no}</MenuItem>
                  <MenuItem value={true}>{messages.yes}</MenuItem>
                </Select>
              </FormControl>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: trail.sent_to_speaker ? colors.green : colors.red }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={!!trail.sent_to_speaker}
                  onChange={(e) => {
                    setTrail((prev) => ({ ...prev, sent_to_speaker: e.target.value }));
                    createCity(trail, e.target.value, "visible_in_speaker");
                  }}
                  style={{ fontWeight: 700, gap: "10px", color: "black" }}
                >
                  <MenuItem value={false}>{messages.no}</MenuItem>
                  <MenuItem value={true}>{messages.yes}</MenuItem>
                </Select>
              </FormControl>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset", background: trail.sent_to_scenario ? colors.green : colors.red }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={!!trail.sent_to_scenario}
                  onChange={(e) => {
                    setTrail((prev) => ({ ...prev, sent_to_scenario: e.target.value }));
                    createCity(trail, e.target.value, "visible_in_scenario");
                  }}
                  style={{ fontWeight: 700, gap: "10px", color: "black" }}
                >
                  <MenuItem value={false}>{messages.no}</MenuItem>
                  <MenuItem value={true}>{messages.yes}</MenuItem>
                </Select>
              </FormControl>
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset" }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  disabled={[getValueById(trail.city_id, "autozonning", allCitiesWithRegions)]?.flat()?.length < 2}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={trail?.autozonning || ""}
                  onChange={(e) => {
                    setTrail((prev) => ({ ...prev, autozonning: e.target.value }));
                  }}
                >
                  {[getValueById(trail.city_id, "autozonning", allCitiesWithRegions)]?.flat()?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <textarea
                onChange={(e) => setTrail((prev) => ({ ...prev, regionalization_comment: e.target.value }))}
                className="tableInput styledScroll textArea"
                style={{ width: "120px", height: "125px", padding: "10px" }}
                type="text"
                autoComplete="off"
                value={trail.regionalization_comment || ""}
              />
            </td>
            <td style={{ padding: "0px", maxWidth: "unset" }} className="basesTableCell">
              <input
                style={{ padding: "0px 5px" }}
                onChange={(e) => setTrail((prev) => ({ ...prev, date_of_the_previous_presentation: e.target.value }))}
                className="tableInput"
                type="date"
                value={trail.date_of_the_previous_presentation || "0000-00-00"}
              />
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset" }}>
              <TrailSelect valueKey="project_sales_id" trail={trail} setTrail={setTrail} array={allDictionary?.projectSales} arrayKey="name" />
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset" }}>
              <TrailSelect valueKey="project_concent_id" trail={trail} setTrail={setTrail} array={allDictionary?.projectConcent} arrayKey="name" />
            </td>
            <td className="basesTableCell black" style={{ maxWidth: "unset" }}>
              <TrailSelect valueKey="call_template_id" trail={trail} setTrail={setTrail} array={allDictionary?.callTamplates} arrayKey="name" />
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "local", forms) || getValueById(trail.form_id, "local", allForms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "confirm", forms) || getValueById(trail.form_id, "confirm", allForms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "parking", forms) || getValueById(trail.form_id, "parking", allForms)}</div>
            </td>
            <td className="basesTableCell" style={{ maxWidth: "unset" }}>
              <div className="tableInput">{getValueById(trail.form_id, "comments", forms) || getValueById(trail.form_id, "comments", allForms)}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default TrailIDTable;
