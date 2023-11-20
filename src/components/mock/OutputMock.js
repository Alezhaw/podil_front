import { MenuItem, FormControl, Select, Checkbox } from "@mui/material";

export const validateCreditCard = (item) => {
  const itemReplace = item.replaceAll(" ", "");
  const checkLength = itemReplace.length === 16;
  const checkNumber = /^[0-9]+$/.test(itemReplace);
  return checkLength && checkNumber;
};

export const validateYandexMoney = (item) => {
  const checkLength = item.length === 12;
  const checkNumber = /^[0-9]+$/.test(item);
  return checkLength && checkNumber;
};

export const validateWebmoney = (item) => {
  const item1 = item.slice(0, 1);
  const item2 = item.slice(1);
  const checkItem1 = /^[a-zA-Z]$/.test(item1);
  const checkItem2 = validateYandexMoney(item2);
  return checkItem1 && checkItem2;
};

export const forSpeakerMock = [
  {
    id: "1",
    text: "text1",
  },
  {
    id: "2",
    text: "text2",
  },
  {
    id: "3",
    text: "text3",
  },
];

export const citiesStatus = ["Canceled", "In progress", "Closed", "Waiting"];

export const citiesStatusColor = ["#8B00FF", "#00FF00", "#FF2400", "#FFFFFF"];

export const allCitiesTableMock = (locale) => {
  const messages = {
    lp: locale["l_p"],
    time: locale["time"],
    coming: locale["coming"],
    couples: locale["couples"],
    explains: locale["explains"],
    project: locale["project"],
    timezone: locale["timezone"],
    city_lokal: locale["city_lokal"],
    note: locale["note"],
    limit: locale["limit"],
    status: locale["status"],
    during: locale["during"],
    closed_mock: locale["closed_mock"],
    add_scenario: locale["add_scenario"],
    scenario: locale["scenario"],
    verification_dkj: locale["verification_dkj"],
    undermining_scenariuszy: locale["undermining_scenariuszy"],
    present: locale["present"],
    numbers_for_1_consent: locale["numbers_for_1_consent"],
    wb_1: locale["wb_1"],
    wb_2: locale["wb_2"],
    quantity_invites: locale["quantity_invites"],
    consent_another_city: locale["consent_another_city"],
    numbers_for_consent: locale["numbers_for_consent"],
    topical_quantity_invites: locale["topical_quantity_invites"],
    days_statictic: locale["days_statictic"],
    day_1: locale["day_1"],
    day_2: locale["day_2"],
    day_3: locale["day_3"],
    vip: locale["vip"],
    vip_id: locale["vip_id"],
    vip_format: locale["vip_format"],
    vip_limit: locale["vip_limit"],
    vip_coming: locale["vip_coming"],
    vip_total_steam: locale["vip_total_steam"],
    vip_percent_coming: locale["vip_percent_coming"],
    system: locale["system"],
    confirmation: locale["confirmation"],
    consent_results_confirmation: locale["consent_results_confirmation"],
    refusal_results_confirmation: locale["refusal_results_confirmation"],
    dots_results_confirmation: locale["dots_results_confirmation"],
    sms: locale["sms"],
    sms_consent: locale["sms_consent"],
    sms_confirmation: locale["sms_confirmation"],
    loading: locale["loading"],
    delete: locale["delete"],
  };
  return [
    {
      column: messages.lp,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.lp}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center" }}>
              {item.l_p_for_pl || item.l_p || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.time,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "85px" }}>
          {messages.time}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ item }) => (
        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center" }}>
            {item.time}
          </div>
        </th>
      ),
    },
    {
      column: messages.coming,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.coming}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ item }) => (
        <th className="basesTableCell">
          <div className="tableInput" style={{ minWidth: "50px", textAlign: "center" }}>
            {item.coming || ""}
          </div>
        </th>
      ),
    },
    {
      column: messages.couples,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.couples}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ item }) => (
        <th className="basesTableCell">
          <div className="tableInput" style={{ minWidth: "50px", textAlign: "center" }}>
            {item.pary || ""}
          </div>
        </th>
      ),
    },
    {
      column: messages.explains,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "86px" }}>
          {messages.explains}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          item.explains !== null ? (
            <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "86px", background: "#f2ffac", color: "black" }}>
              <Checkbox className="checkboxOnWhiteBackground" checked={!!item.explains} disabled />
            </th>
          ) : (
            <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "86px", background: "#f2ffac", color: "black" }}>
              <div className="tableInput" style={{ minWidth: "50px", textAlign: "center" }}>
                {item.explains_for_pl || ""}
              </div>
            </th>
          )
        ) : (
          ""
        ),
    },
    {
      column: messages.project,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.project}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ background: "lightgreen", color: "black" }}>
            <div className="tableInput" style={{ minWidth: "50px", textAlign: "center" }}>
              {item.projekt || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.timezone,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "78px" }}>
          {messages.timezone}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "78px" }}>
            <div className="tableInput" style={{ minWidth: "50px", textAlign: "center" }}>
              {item.timezone || 0}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.city_lokal,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "250px" }}>
          {messages.city_lokal}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item, citiesStatusColor }) => {
        const itemArray = [item.region, item.city_lokal, item.adress, [item.institution, item.hall], item.date, item.population, item.city_note];
        return index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: citiesStatusColor[item.status] }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center" }}>
              {item.timezone ?? ""}{" "}
              {itemArray?.map((el) => (
                <>
                  {[el].flat()?.reduce((sum, acc) => (sum || "") + " " + (acc || ""), "") || ""}
                  {el ? <br /> : null}
                </>
              ))}
            </div>
          </th>
        ) : (
          ""
        );
      },
    },
    {
      column: messages.note,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.note}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: "lightgreen", color: "black" }} className="basesTableCell">
            <div className="tableInput" style={{ minWidth: "100px", textAlign: "center" }}>
              {item.calling_scheme || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.limit,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.limit}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ item }) => (
        <th className="basesTableCell">
          <div className="tableInput" style={{ minWidth: "50px", textAlign: "center" }}>
            {item.limit || ""}
          </div>
        </th>
      ),
    },

    {
      column: messages.status,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "160px" }}>
          {messages.status}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ currentCities, changeStatus, item, changeCitiesStatus, setChangeStatus, citiesStatus, index }) =>
        index === 0 ? (
          <td rowSpan={`${currentCities.length}`} className="basesTableCell black" style={{ minWidth: "160px", fontWeight: 700, fontSize: "16px" }}>
            {changeStatus ? (
              <div className="tableInput" style={{ textAlign: "center" }}>
                {messages.loading}...
              </div>
            ) : (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={item.status}
                  onChange={(e) => changeCitiesStatus(setChangeStatus, e.target.value, item.id_for_base)}
                  style={{ fontWeight: 700, fontSize: "16px", color: "black", ":before": { borderBottom: "1px solid black" } }}
                >
                  {citiesStatus.map((item, index) => (
                    <MenuItem value={index}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </td>
        ) : (
          ""
        ),
    },
    {
      column: messages.during,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "85px" }}>
          {messages.during}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "85px" }}>
            <Checkbox className="checkboxOnWhiteBackground" checked={!!item.w_toku} disabled />
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.closed_mock,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "85px", maxWidth: "85px" }}>
          {messages.closed_mock}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "85px" }}>
            <Checkbox className="checkboxOnWhiteBackground" checked={!!item.closed} disabled />
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.add_scenario,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "140px" }}>
          {messages.add_scenario}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "119px" }}>
              {item.add_scenario || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.scenario,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "97.5px" }}>
          {messages.scenario}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "97.5px" }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center" }}>
              {item.scenario || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.verification_dkj,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "94px" }}>
          {messages.verification_dkj}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "94px" }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center" }}>
              {item.varification_dkj || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.undermining_scenariuszy,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "96px" }}>
          {messages.undermining_scenariuszy}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "96px" }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center" }}>
              {item.undermining_scenariuszy || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.present,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
          {messages.present}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: "lightgreen", color: "black" }} className="basesTableCell">
            <div className="tableInput" style={{ minWidth: "100px", textAlign: "center" }}>
              {item.present || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.numbers_for_1_consent,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "78.4px" }}>
          {messages.numbers_for_1_consent}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "78.4px" }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center" }}>
              {Number(item.numbers_for_1_consent).toFixed() || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.wb_1,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
          {messages.wb_1}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
            <div className="tableInput" style={{ minWidth: "100px", textAlign: "center" }}>
              {item.wb_1 || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.wb_2,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
          {messages.wb_2}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
            <div className="tableInput" style={{ minWidth: "70px", textAlign: "center" }}>
              {item.wb_2 || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.quantity_invites,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "87px" }}>
          {messages.quantity_invites}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ item }) => (
        <th className="basesTableCell" style={{ minWidth: "87px" }}>
          <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
            {item.quantity_invites || ""}
          </div>
        </th>
      ),
    },
    {
      column: messages.consent_another_city,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "70.8px", background: "#c8ff03", color: "black" }}>
          {messages.consent_another_city}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ item }) => (
        <th className="basesTableCell" style={{ minWidth: "65px" }}>
          <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
            {item.consent_another_city || ""}
          </div>
        </th>
      ),
    },
    {
      column: messages.days_statictic,
      value: true,
      header: () => (
        <>
          <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px", padding: "10px" }}>
            <tr style={{ background: "none" }}>
              <th style={{ borderRight: "1px solid black", paddingRight: "10px" }}>{messages.numbers_for_consent}</th>
              <th style={{ paddingLeft: "10px" }}>{messages.topical_quantity_invites}</th>
            </tr>
            <tr style={{ background: "none" }}>
              <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
                {messages.day_1}
              </th>
            </tr>
          </th>
          <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px", padding: "10px" }}>
            <tr style={{ background: "none" }}>
              <th style={{ borderRight: "1px solid black", paddingRight: "10px" }}>{messages.numbers_for_consent}</th>
              <th style={{ paddingLeft: "10px" }}>{messages.topical_quantity_invites}</th>
            </tr>
            <tr style={{ background: "none" }}>
              <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
                {messages.day_2}
              </th>
            </tr>
          </th>
          <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px", padding: "10px" }}>
            <tr style={{ background: "none" }}>
              <th style={{ borderRight: "1px solid black", paddingRight: "10px" }}>{messages.numbers_for_consent}</th>
              <th style={{ paddingLeft: "10px" }}>{messages.topical_quantity_invites}</th>
            </tr>
            <tr style={{ background: "none" }}>
              <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
                {messages.day_3}
              </th>
            </tr>
          </th>
        </>
      ),
      firstRow: ({ formatDate, currentCities }) => {
        const daysDate = currentCities[0]?.days_date;
        return (
          <>
            <th colSpan="2" style={{ minWidth: "130px", background: "#c3ffc3", color: "black", border: "solid black 1px" }}>
              <div className="tableInput">{formatDate(daysDate && daysDate[0])}</div>
            </th>
            <th colSpan="2" style={{ minWidth: "130px", background: "#c3ffc3", color: "black", border: "solid black 1px" }}>
              <div className="tableInput">{formatDate(daysDate && daysDate[1])}</div>
            </th>
            <th colSpan="2" style={{ minWidth: "130px", background: "#c3ffc3", color: "black", border: "solid black 1px" }}>
              <div className="tableInput">{formatDate(daysDate && daysDate[2])}</div>
            </th>
          </>
        );
      },
      content: ({ index, currentCities, item }) => {
        const days_numbers_for_consent = item?.days_numbers_for_consent;
        const days_topical_quantity_invites = item?.days_topical_quantity_invites;
        return (
          <>
            {index === 0 ? (
              <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {Number(days_numbers_for_consent ? days_numbers_for_consent[0] || 0 : 0).toFixed() || ""}
                </div>
              </th>
            ) : (
              ""
            )}
            <th className="basesTableCell">
              <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                {Number(days_topical_quantity_invites ? days_topical_quantity_invites[0] || 0 : 0).toFixed() || ""}
              </div>
            </th>
            {index === 0 ? (
              <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {Number(days_numbers_for_consent ? days_numbers_for_consent[1] || 0 : 0).toFixed() || ""}
                </div>
              </th>
            ) : (
              ""
            )}
            <th className="basesTableCell">
              <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                {Number(days_topical_quantity_invites ? days_topical_quantity_invites[1] || 0 : 0).toFixed() || ""}
              </div>
            </th>
            {index === 0 ? (
              <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {Number(days_numbers_for_consent ? days_numbers_for_consent[2] || 0 : 0).toFixed() || ""}
                </div>
              </th>
            ) : (
              ""
            )}
            <th className="basesTableCell">
              <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                {Number(days_topical_quantity_invites ? days_topical_quantity_invites[2] || 0 : 0).toFixed() || ""}
              </div>
            </th>
          </>
        );
      },
    },
    {
      column: messages.vip,
      value: true,
      header: () => (
        <th colSpan="6" style={{ border: "1px solid black" }}>
          <th colSpan="6" style={{ minWidth: "335px", borderBottom: "1px solid black", height: "75px" }}>
            {messages.vip}
          </th>
          <tr style={{ height: "55px", background: "none" }}>
            <th style={{ borderRight: "1px solid black", minWidth: "100.8px" }}>{messages.vip_id}</th>
            <th style={{ borderRight: "1px solid black", minWidth: "100.8px" }}>{messages.vip_format}</th>
            <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>{messages.vip_limit}</th>
            <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>{messages.vip_coming}</th>
            <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>{messages.vip_total_steam}</th>
            <th style={{ minWidth: "70.8px" }}>{messages.vip_percent_coming}</th>
          </tr>
        </th>
      ),
      firstRow: () => (
        <>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </>
      ),
      content: ({ index, currentCities, item }) => (
        <>
          {index === 0 ? (
            <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
              <div className="tableInput" style={{ textAlign: "center", minWidth: "100px" }}>
                {item.vip_id || ""}
              </div>
            </th>
          ) : (
            ""
          )}
          {index === 0 ? (
            <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
              <div className="tableInput" style={{ textAlign: "center", minWidth: "100px" }}>
                {item.vip_format || ""}
              </div>
            </th>
          ) : (
            ""
          )}

          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.vip_limit || ""}
            </div>
          </th>
          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.vip_coming || ""}
            </div>
          </th>
          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.vip_total_steam || ""}
            </div>
          </th>
          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.vip_percent_coming || ""}
            </div>
          </th>
        </>
      ),
    },
    {
      column: messages.system,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
          {messages.system}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "100px" }}>
              {item.system || ""}
            </div>
          </th>
        ) : (
          ""
        ),
    },
    {
      column: messages.confirmation,
      value: true,
      header: () => (
        <th colSpan="3" style={{ border: "1px solid black" }}>
          <th colSpan="3" style={{ borderBottom: "1px solid black", height: "75px" }}>
            {messages.confirmation}
          </th>
          <tr style={{ background: "none" }}>
            <th style={{ borderRight: "1px solid black", minWidth: "68.8px", height: "55px" }}>{messages.consent_results_confirmation}</th>
            <th style={{ borderRight: "1px solid black", minWidth: "68.8px" }}>{messages.refusal_results_confirmation}</th>
            <th style={{ minWidth: "68.8px" }}>{messages.dots_results_confirmation}</th>
          </tr>
        </th>
      ),
      firstRow: () => (
        <>
          <th></th>
          <th></th>
          <th></th>
        </>
      ),
      content: ({ item }) => (
        <>
          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.consent_results_confirmation || ""}
            </div>
          </th>
          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.refusal_results_confirmation || ""}
            </div>
          </th>
          <th className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
              {item.dots_results_confirmation || ""}
            </div>
          </th>
        </>
      ),
    },
    {
      column: messages.sms,
      value: true,
      header: () => (
        <th colSpan="2" style={{ border: "1px solid black" }}>
          <th colSpan="2" style={{ borderBottom: "1px solid black", height: "75px" }}>
            {messages.sms}
          </th>
          <tr style={{ background: "none" }}>
            <th style={{ borderRight: "1px solid black", maxWidth: "70.8px", height: "55px" }}>{messages.sms_consent}</th>
            <th style={{ maxWidth: "95px" }}>{messages.sms_confirmation}</th>
          </tr>
        </th>
      ),
      firstRow: () => (
        <>
          <th></th>
          <th></th>
        </>
      ),
      content: ({ index, currentCities, item }) => (
        <>
          {index === 0 ? (
            <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "70.8px" }}>
              <Checkbox className="checkboxOnWhiteBackground" checked={!!item.sms_consent} disabled />
            </th>
          ) : (
            ""
          )}
          {index === 0 ? (
            <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "95px" }}>
              <Checkbox className="checkboxOnWhiteBackground" checked={!!item.sms_confirmation} disabled />
            </th>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      column: messages.delete,
      value: true,
      header: () => (
        <th className="basesTableCell" style={{ maxWidth: "75px" }}>
          {messages.delete}
        </th>
      ),
      firstRow: () => <th></th>,
      content: ({ index, currentCities, item, changeDeleteCities }) =>
        index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "75px" }}>
            <Checkbox className="checkboxOnWhiteBackground" onChange={(e) => changeDeleteCities(e.target.checked, item?.id_for_base)} />
          </th>
        ) : (
          ""
        ),
    },
  ];
};
