import { MenuItem, FormControl, Select } from "@mui/material";

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

export const allCitiesTableMock = [
  {
    column: "lp",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        L.p
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} className="basesTableCell">
          <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
            {item.l_p_for_pl || item.l_p || ""}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "time",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        Time
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ item }) => (
      <th className="basesTableCell">
        <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
          {item.time}
        </div>
      </th>
    ),
  },
  {
    column: "Сoming",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        Сoming
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ item }) => (
      <th className="basesTableCell">
        <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
          {item.os_poj || ""}
        </div>
      </th>
    ),
  },
  {
    column: "Pair",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        Pair
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ item }) => (
      <th className="basesTableCell">
        <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
          {item.pary || ""}
        </div>
      </th>
    ),
  },
  {
    column: "Wyjasnienia",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "86px" }}>
        Wyjasnienia
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        item.explains !== null ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "86px", background: "#f2ffac", color: "black" }}>
            <input
              // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, wyjasnienia: !!e.target.checked })))}
              className="tableInput"
              style={{ width: "25px", height: "25px" }}
              type="checkbox"
              autoComplete="off"
              checked={!!item.explains}
              readOnly
            />
          </th>
        ) : (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "86px", background: "#f2ffac", color: "black" }}>
            <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
              {item.explains_for_pl || ""}
            </div>
          </th>
        )
      ) : (
        ""
      ),
  },
  {
    column: "Project",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        Project
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ background: "lightgreen", color: "black" }}>
          <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
            {item.projekt || ""}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "Timezone",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "78px" }}>
        Timezone
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "78px" }}>
          <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
            {item.timezone || 0}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "Miasto / Lokal",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "250px" }}>
        Miasto / Lokal
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item, citiesStatusColor }) => {
      const itemArray = [item.region, item.city_lokal, item.adress, [item.institution, item.hall], item.date, item.population, item.city_note];
      return index === 0 ? (
        <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: citiesStatusColor[item.status] }} className="basesTableCell">
          <div className="tableInput" style={{ width: "250px", textAlign: "center" }}>
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
    column: "Limit",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        Limit
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ item }) => (
      <th className="basesTableCell">
        <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
          {item.limit || ""}
        </div>
      </th>
    ),
  },
  {
    column: "Status",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "160px" }}>
        Status
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ currentCities, changeStatus, item, changeCitiesStatus, setChangeStatus, citiesStatus, index }) =>
      index === 0 ? (
        <td rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "160px", fontWeight: 700, fontSize: "16px" }}>
          {changeStatus ? (
            <div className="tableInput" style={{ textAlign: "center" }}>
              loading...
            </div>
          ) : (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={item.status}
                onChange={(e) => changeCitiesStatus(setChangeStatus, e.target.value, item.id_for_base)}
                style={{ fontWeight: 700, fontSize: "16px" }}
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
    column: "W toku",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "85px" }}>
        W toku
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "85px" }}>
          <input
            // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, w_toku: e.target.checked })))}
            className="tableInput"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            autoComplete="off"
            checked={!!item.w_toku}
            readOnly
          />
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "closed",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "85px", maxWidth: "85px" }}>
        Zamkniete
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "85px" }}>
          <input
            // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, zamkniete: e.target.checked })))}
            className="tableInput"
            style={{ width: "25px", height: "25px" }}
            type="checkbox"
            autoComplete="off"
            checked={!!item.closed}
            readOnly
          />
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "Dodawanie rekordów",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "140px" }}>
        Dodawanie rekordów
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
    column: "scenario",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "97.5px" }}>
        scenario
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
    column: "verification dkj",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "94px" }}>
        Verification dkj
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
    column: "undermining_scenariuszy",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "96px" }}>
        Podpinanie scenariuszy
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
    column: "Limit regalo",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
        Limit regalo
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: "lightgreen", color: "black" }} className="basesTableCell">
          <div className="tableInput" style={{ width: "100px", textAlign: "center" }}>
            {item.present || ""}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "Rekodow na 1 zgode",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "78.4px" }}>
        Rekodow na 1 zgode
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
    column: "WB 1",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
        WB 1
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
          <div className="tableInput" style={{ width: "100px", textAlign: "center" }}>
            {item.wb_1 || ""}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "WB 2",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
        WB 2
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
          <div className="tableInput" style={{ width: "70px", textAlign: "center" }}>
            {item.wb_2 || ""}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "Ilość Zaproszeń",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "87px" }}>
        Ilość Zaproszeń
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
    column: "Zgody inne miasto",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "70.8px", background: "#c8ff03", color: "black" }}>
        Zgody inne miasto
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
    column: "Холодка статистика (дни)",
    value: true,
    header: () => (
      <>
        <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px" }}>
          <tr style={{ background: "none" }}>
            <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
            <th>Aktualna ilość zaproszeń</th>
          </tr>
          <tr style={{ background: "none" }}>
            <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
              1 dzień
            </th>
          </tr>
        </th>
        <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px" }}>
          <tr style={{ background: "none" }}>
            <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
            <th>Aktualna ilość zaproszeń</th>
          </tr>
          <tr style={{ background: "none" }}>
            <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
              2 dzień
            </th>
          </tr>
        </th>
        <th colSpan="2" style={{ border: "1px solid black", minWidth: "130px" }}>
          <tr style={{ background: "none" }}>
            <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
            <th>Aktualna ilość zaproszeń</th>
          </tr>
          <tr style={{ background: "none" }}>
            <th colSpan="2" style={{ borderTop: "1px solid black", position: "relative", top: "6px" }}>
              3 dzień
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
    column: "vip",
    value: true,
    header: () => (
      <th colSpan="6" style={{ border: "1px solid black" }}>
        <th colSpan="6" style={{ width: "335px", borderBottom: "1px solid black", height: "75px" }}>
          VIP
        </th>
        <tr style={{ height: "55px", background: "none" }}>
          <th style={{ borderRight: "1px solid black", minWidth: "100.8px" }}>ID</th>
          <th style={{ borderRight: "1px solid black", minWidth: "100.8px" }}>Format</th>
          <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>Limit</th>
          <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>Coming</th>
          <th style={{ borderRight: "1px solid black", minWidth: "70.8px" }}>Pair</th>
          <th style={{ minWidth: "70.8px" }}>%, coming</th>
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
            <div className="tableInput" style={{ textAlign: "center", width: "100px" }}>
              {item.vip_id || ""}
            </div>
          </th>
        ) : (
          ""
        )}
        {index === 0 ? (
          <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
            <div className="tableInput" style={{ textAlign: "center", width: "100px" }}>
              {item.vip_format || ""}
            </div>
          </th>
        ) : (
          ""
        )}

        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.vip_limit || ""}
          </div>
        </th>
        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.vip_coming || ""}
          </div>
        </th>
        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.vip_total_steam || ""}
          </div>
        </th>
        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.vip_percent_coming || ""}
          </div>
        </th>
      </>
    ),
  },
  {
    column: "System",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ minWidth: "100.8px" }}>
        System
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "100px" }}>
            {item.system || ""}
          </div>
        </th>
      ) : (
        ""
      ),
  },
  {
    column: "WYNIKI POTWIERDZEŃ",
    value: true,
    header: () => (
      <th colSpan="3" style={{ border: "1px solid black" }}>
        <th colSpan="3" style={{ borderBottom: "1px solid black", height: "75px" }}>
          WYNIKI POTWIERDZEŃ
        </th>
        <tr style={{ background: "none" }}>
          <th style={{ borderRight: "1px solid black", minWidth: "68.8px", height: "55px" }}>Zgoda</th>
          <th style={{ borderRight: "1px solid black", minWidth: "68.8px" }}>Odmowy</th>
          <th style={{ minWidth: "68.8px" }}>Kropki</th>
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
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.consent_results_confirmation || ""}
          </div>
        </th>
        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.refusal_results_confirmation || ""}
          </div>
        </th>
        <th className="basesTableCell">
          <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
            {item.dots_results_confirmation || ""}
          </div>
        </th>
      </>
    ),
  },
  {
    column: "SMS",
    value: true,
    header: () => (
      <th colSpan="2" style={{ border: "1px solid black" }}>
        <th colSpan="2" style={{ borderBottom: "1px solid black", height: "75px" }}>
          SMS
        </th>
        <tr style={{ background: "none" }}>
          <th style={{ borderRight: "1px solid black", maxWidth: "70.8px", height: "55px" }}>Umawianie</th>
          <th style={{ maxWidth: "95px" }}>Potwierdzanie</th>
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
            <input className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.sms_consent} readOnly />
          </th>
        ) : (
          ""
        )}
        {index === 0 ? (
          <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "95px" }}>
            <input className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.sms_confirmation} readOnly />
          </th>
        ) : (
          ""
        )}
      </>
    ),
  },
  {
    column: "Delete",
    value: true,
    header: () => (
      <th className="basesTableCell" style={{ maxWidth: "75px" }}>
        Delete
      </th>
    ),
    firstRow: () => <th></th>,
    content: ({ index, currentCities, item, changeDeleteCities }) =>
      index === 0 ? (
        <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "75px" }}>
          <input onChange={(e) => changeDeleteCities(e.target.checked, item?.id_for_base)} className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" />
        </th>
      ) : (
        ""
      ),
  },
];
