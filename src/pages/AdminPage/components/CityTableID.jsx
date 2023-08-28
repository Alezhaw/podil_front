import { Container, Button } from "@material-ui/core";
import { MenuItem, FormControl, Select } from "@mui/material";
import { citiesStatus } from "../../../components/mock/OutputMock";

function CityTableID({ setCity, currentCities, deleteTime, country }) {
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  function addTime(setCity, currentCities) {
    const time = prompt("What time do you want to add?", "10:00:00");
    if (!time) return;
    setCity[currentCities.length]({
      ...currentCities[0],
      id: "create",
      time: time || " ",
      coming: null,
      couples: null,
      limit: null,
      quantity_invites: null,
      days_topical_quantity_invites: [],
      vip_limit: null,
      vip_coming: null,
      vip_total_steam: null,
      vip_percent_coming: null,
      consent_results_confirmation: null,
      refusal_results_confirmation: null,
      dots_results_confirmation: null,
    });
  }

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <table style={{ textAlign: "center" }}>
        <thead style={{ background: "#5a5959" }}>
          <tr>
            <th>
              {currentCities.length < 3 ? (
                <Button style={{ color: "white", fontSize: "30px" }} onClick={async () => addTime(setCity, currentCities)}>
                  +
                </Button>
              ) : (
                ""
              )}
            </th>
            <th className="basesTableCell">L.p</th>
            <th className="basesTableCell">Time</th>
            <th className="basesTableCell">Сoming</th>
            <th className="basesTableCell">Pair</th>
            <th className="basesTableCell">Wyjasnienia</th>
            <th className="basesTableCell">Project</th>
            <th className="basesTableCell">Timezone</th>
            <th className="basesTableCell">Region</th>
            <th className="basesTableCell">City / Lokal</th>
            <th className="basesTableCell">Address</th>
            <th className="basesTableCell">Institution</th>
            <th className="basesTableCell">Hall</th>
            <th className="basesTableCell">Date</th>
            <th className="basesTableCell">Population</th>
            <th className="basesTableCell">System</th>
            <th className="basesTableCell">Limit</th>
            <th className="basesTableCell" style={{ minWidth: "160px" }}>
              Status
            </th>
            <th className="basesTableCell">During</th>
            <th className="basesTableCell">Closed</th>
            <th className="basesTableCell">Add numbers</th>
            <th className="basesTableCell">Scenario</th>
            <th className="basesTableCell">Werefication DKJ</th>
            <th className="basesTableCell">Podpinanie scenariuszy</th>
            <th className="basesTableCell">Limit regalo</th>
            <th className="basesTableCell" style={{ background: "#c8ff03", color: "black" }}>
              Numbers_for_1_consent
            </th>
            <th className="basesTableCell">WB 1</th>
            <th className="basesTableCell">WB 2</th>
            <th className="basesTableCell">quantity invites</th>
            <th className="basesTableCell">Consents another city</th>
            <th colSpan="2" style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ borderRight: "1px solid black" }}>Numbers for 1 consent</th>
                <th>Topical quantity consent</th>
              </tr>
              <tr>
                <th colSpan="2" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                  1 dzień
                </th>
              </tr>
              <tr>
                <th colSpan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      onChange={(e) =>
                        setCity?.map((item) =>
                          item((prev) => ({ ...prev, days_date: [e.target.value, prev.days_date ? prev.days_date[1] : null, prev.days_date ? prev.days_date[2] : null].filter((el) => !!el) }))
                        )
                      }
                      className="tableInput"
                      style={{ color: "white" }}
                      type="date"
                      value={[currentCities[0]?.days_date].flat()[0] || "0000-00-00"}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colSpan="2" style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ borderRight: "1px solid black" }}>Numbers for 1 consent</th>
                <th>Topical quantity consent</th>
              </tr>
              <tr>
                <th colSpan="2" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                  2 dzień
                </th>
              </tr>
              <tr>
                <th colSpan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      onChange={(e) =>
                        setCity?.map((item) =>
                          item((prev) => ({ ...prev, days_date: [prev.days_date ? prev.days_date[0] : null, e.target.value, prev.days_date ? prev.days_date[2] : null].filter((el) => !!el) }))
                        )
                      }
                      className="tableInput"
                      style={{ color: "white" }}
                      type="date"
                      value={[currentCities[0]?.days_date].flat()[1] || "0000-00-00"}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colSpan="2" style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ borderRight: "1px solid black" }}>Numbers for 1 consent</th>
                <th>Topical quantity consent</th>
              </tr>
              <tr>
                <th colSpan="2" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                  3 dzień
                </th>
              </tr>
              <tr>
                <th colSpan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      onChange={(e) =>
                        setCity?.map((item) =>
                          item((prev) => ({ ...prev, days_date: [prev.days_date ? prev.days_date[0] : null, prev.days_date ? prev.days_date[1] : null, e.target.value].filter((el) => !!el) }))
                        )
                      }
                      className="tableInput"
                      style={{ color: "white" }}
                      type="date"
                      value={[currentCities[0]?.days_date].flat()[2] || "0000-00-00"}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colSpan="6" style={{ border: "1px solid black" }}>
              <th colSpan="6" style={{ width: "335px", borderBottom: "1px solid black", height: "75px" }}>
                VIP
              </th>
              <tr style={{ height: "55px" }}>
                <th style={{ borderRight: "1px solid black", width: "100px" }}>ID</th>
                <th style={{ borderRight: "1px solid black", width: "100px" }}>Format</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Limit</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Coming</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Pair</th>
                <th style={{ width: "70.89px" }}>%, coming</th>
              </tr>
            </th>
            <th className="basesTableCell">System</th>
            <th colSpan="3" style={{ border: "1px solid black" }}>
              <th colSpan="3" style={{ borderBottom: "1px solid black", height: "75px" }}>
                WYNIKI POTWIERDZEŃ
              </th>
              <tr>
                <th style={{ borderRight: "1px solid black", width: "70.89px", height: "55px" }}>Zgoda</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Odmowy</th>
                <th style={{ width: "70.89px" }}>Kropki</th>
              </tr>
            </th>
            <th colSpan="2" style={{ border: "1px solid black", minWidth: "220px" }}>
              <th colSpan="2" style={{ borderBottom: "1px solid black", height: "75px", width: "220px" }}>
                SMS
              </th>
              <tr>
                <th style={{ borderRight: "1px solid black", width: "110px", height: "55px" }}>Umawianie</th>
                <th>Potwierdzanie</th>
              </tr>
            </th>
          </tr>
        </thead>
        <tbody style={{ background: "white" }}>
          {currentCities?.map((item, index) => (
            <tr key={item.id === "create" ? `${item.id_for_base + item.time + index}` : item.id}>
              <td>
                {" "}
                <Button
                  style={{ background: "lightgreen", color: "black" }}
                  onClick={async () => {
                    let checkConfirm = window.confirm("Are you sure?");
                    if (checkConfirm) {
                      await deleteTime(Number(item.id), country);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
              {index === 0 ? (
                country === "PL" ? (
                  <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                    <textarea
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, l_p_for_pl: e.target.value })))}
                      className="tableInput"
                      type="text"
                      style={{ width: "100px", minHeight: "100px" }}
                      autoComplete="off"
                      value={item.l_p_for_pl || ""}
                    />
                  </td>
                ) : (
                  <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                    <input
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, l_p: e.target.value })))}
                      className="tableInput"
                      style={{ width: "50px" }}
                      type="number"
                      autoComplete="off"
                      value={item.l_p || ""}
                    />
                  </td>
                )
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, time: e.target.value.trim() || " " }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.time}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, coming: e.target.value }))}
                  className="tableInput"
                  style={{ minWidth: "0px", width: "100px" }}
                  type="text"
                  autoComplete="off"
                  value={item.coming || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, couples: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.couples || ""}
                />
              </td>
              {index === 0 ? (
                country === "PL" ? (
                  <td rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ background: "#f2ffac", color: "black" }}>
                    <textarea
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, explains_for_pl: !!e.target.value })))}
                      className="tableInput"
                      style={{ width: "100px", minHeight: "50px" }}
                      type="text"
                      autoComplete="off"
                      value={item.explains_for_pl || ""}
                    />
                  </td>
                ) : (
                  <td rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ background: "#f2ffac", color: "black" }}>
                    <input
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, explains: !!e.target.checked })))}
                      className="tableInput"
                      style={{ width: "25px", height: "25px" }}
                      type="checkbox"
                      autoComplete="off"
                      checked={!!item.explains}
                    />
                  </td>
                )
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ background: "lightgreen", color: "black" }}>
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, projekt: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="text"
                    autoComplete="off"
                    value={item.projekt || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, timezone: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={item.timezone || 0}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, region: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="text"
                    autoComplete="off"
                    value={item.region || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, city_lokal: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="text"
                    autoComplete="off"
                    value={item.city_lokal || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, adress: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="text"
                    autoComplete="off"
                    value={item.adress || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, institution: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="text"
                    autoComplete="off"
                    value={item.institution || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, hall: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="text"
                    autoComplete="off"
                    value={item.hall || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, date: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="date"
                    autoComplete="off"
                    value={item.date || "0000-00-00"}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, population: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="number"
                    autoComplete="off"
                    value={item.population || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, city_note: e.target.value })))}
                    className="tableInput"
                    style={{ width: "120px", height: "125px", padding: "10px" }}
                    type="text"
                    autoComplete="off"
                    value={item.city_note || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, limit: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.limit || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "160px", fontWeight: 700, fontSize: "16px" }}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120, display: "flex", flexDirection: "column" }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={item.status}
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, status: e.target.value })))}
                      style={{ fontWeight: 700, fontSize: "16px", display: "flex", flexDirection: "column" }}
                    >
                      {citiesStatus.map((item, index) => (
                        <MenuItem value={index}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, during: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.during}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, closed: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.closed}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, add_scenario: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.add_scenario || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, scenario: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.scenario || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, verification_dkj: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.verification_dkj || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, undermining_scenariuszy: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.undermining_scenariuszyy || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: "lightgreen", color: "black" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, present: e.target.value })))}
                    className="tableInput"
                    style={{ width: "100px" }}
                    type="text"
                    autoComplete="off"
                    value={item.present || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, numbers_for_1_consent: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.numbers_for_1_consent).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, wb_1: e.target.value })))}
                    className="tableInput"
                    style={{ width: "100px" }}
                    type="text"
                    autoComplete="off"
                    value={item.wb_1 || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, wb_2: e.target.value })))}
                    className="tableInput"
                    style={{ width: "70px" }}
                    type="number"
                    autoComplete="off"
                    value={item.wb_2 || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, quantity_invites: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.quantity_invites || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, consent_another_city: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.consent_another_city || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) =>
                      setCity?.map((item) =>
                        item((prev) => ({
                          ...prev,
                          days_numbers_for_consent: [
                            e.target.value,
                            prev.days_numbers_for_consent ? prev.days_numbers_for_consent[1] : null,
                            prev.days_numbers_for_consent ? prev.days_numbers_for_consent[2] : null,
                          ].filter((el) => !!el),
                        }))
                      )
                    }
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.days_numbers_for_consent ? item.days_numbers_for_consent[0] || 0 : 0).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) =>
                    setCity?.map((item) =>
                      item((prev) => ({
                        ...prev,
                        days_topical_quantity_invites: [
                          e.target.value,
                          prev.days_topical_quantity_invites ? prev.days_topical_quantity_invites[1] : null,
                          prev.days_topical_quantity_invites ? prev.days_topical_quantity_invites[2] : null,
                        ].filter((el) => !!el),
                      }))
                    )
                  }
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={Number(item.days_topical_quantity_invites ? item.days_topical_quantity_invites[0] || 0 : 0).toFixed() || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) =>
                      setCity?.map((item) =>
                        item((prev) => ({
                          ...prev,
                          days_numbers_for_consent: [
                            prev.days_numbers_for_consent ? prev.days_numbers_for_consent[0] : null,
                            e.target.value,
                            prev.days_numbers_for_consent ? prev.days_numbers_for_consent[2] : null,
                          ].filter((el) => !!el),
                        }))
                      )
                    }
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.days_numbers_for_consent ? item.days_numbers_for_consent[1] || 0 : 0).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) =>
                    setCity?.map((item) =>
                      item((prev) => ({
                        ...prev,
                        days_topical_quantity_invites: [
                          prev.days_topical_quantity_invites ? prev.days_topical_quantity_invites[0] : null,
                          e.target.value,
                          prev.days_topical_quantity_invites ? prev.days_topical_quantity_invites[2] : null,
                        ].filter((el) => !!el),
                      }))
                    )
                  }
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={Number(item.days_topical_quantity_invites ? item.days_topical_quantity_invites[1] || 0 : 0).toFixed() || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) =>
                      setCity?.map((item) =>
                        item((prev) => ({
                          ...prev,
                          days_numbers_for_consent: [
                            prev.days_numbers_for_consent ? prev.days_numbers_for_consent[0] : null,
                            prev.days_numbers_for_consent ? prev.days_numbers_for_consent[1] : null,
                            e.target.value,
                          ].filter((el) => !!el),
                        }))
                      )
                    }
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.days_numbers_for_consent ? item.days_numbers_for_consent[2] || 0 : 0).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) =>
                    setCity?.map((item) =>
                      item((prev) => ({
                        ...prev,
                        days_topical_quantity_invites: [
                          prev.days_topical_quantity_invites ? prev.days_topical_quantity_invites[0] : null,
                          prev.days_topical_quantity_invites ? prev.days_topical_quantity_invites[1] : null,
                          e.target.value,
                        ].filter((el) => !!el),
                      }))
                    )
                  }
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={Number(item.days_topical_quantity_invites ? item.days_topical_quantity_invites[2] || 0 : 0).toFixed() || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, vip_id: e.target.value })))}
                    className="tableInput"
                    style={{ width: "100px" }}
                    type="text"
                    autoComplete="off"
                    value={item.vip_id || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, vip_format: e.target.value })))}
                    className="tableInput"
                    style={{ width: "100px" }}
                    type="text"
                    autoComplete="off"
                    value={item.vip_format || ""}
                  />
                </td>
              ) : (
                ""
              )}

              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, vip_limit: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.vip_limit || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, vip_coming: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.vip_coming || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, vip_total_steam: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.vip_total_steam || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, vip_percent_coming: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.vip_percent_coming || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, system: e.target.value })))}
                    className="tableInput"
                    style={{ width: "100px" }}
                    type="text"
                    autoComplete="off"
                    value={item.system || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, consent_results_confirmation: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.consent_results_confirmation || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, refusal_results_confirmation: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.refusal_results_confirmation || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, dots_results_confirmation: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.dots_results_confirmation || ""}
                />
              </td>
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, sms_consent: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.sms_consent}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowSpan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, sms_confirmation: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.sms_confirmation}
                  />
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default CityTableID;
