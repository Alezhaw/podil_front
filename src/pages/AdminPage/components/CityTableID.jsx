import { Container, Button } from "@material-ui/core";

function CityTableID({ setCity, currentCities, deleteTime }) {
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  function addTime(setCity, currentCities) {
    const time = prompt("Какое время вы хотите добавить?", "10:00");
    if (!time) return;
    setCity[currentCities.length]({
      ...currentCities[0],
      id: "create",
      godzina: time || " ",
      os_poj: null,
      pary: null,
      limit: null,
      ilosc_zaproszen: null,
      dzien_1_aktualna_ilosc_zaproszen: null,
      dzien_2_aktualna_ilosc_zaproszen: null,
      dzien_3_aktualna_ilosc_zaproszen: null,
      vip_limit: null,
      vip_coming: null,
      vip_total_steam: null,
      vip_percent_coming: null,
      zgoda_wyniki_potwierdzen: null,
      odmowy_wyniki_potwierdzen: null,
      kropki_wyniki_potwierdzen: null,
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
            <th className="basesTableCell">Godzina</th>
            <th className="basesTableCell">Приход всего</th>
            <th className="basesTableCell">Пар всего</th>
            <th className="basesTableCell">Проверка прихода</th>
            <th className="basesTableCell">КР</th>
            <th className="basesTableCell">Miasto / Lokal</th>
            <th className="basesTableCell">Часовой Пояс</th>
            <th className="basesTableCell">Лимит</th>
            <th className="basesTableCell">W toku</th>
            <th className="basesTableCell">Zamkniete</th>
            <th className="basesTableCell">Dodawanie rekordów</th>
            <th className="basesTableCell">Scenariusze</th>
            <th className="basesTableCell">Weryfikacja DKJ</th>
            <th className="basesTableCell">Podpinanie scenariuszy</th>
            <th className="basesTableCell">Limit regalo</th>
            <th className="basesTableCell" style={{ background: "#c8ff03", color: "black" }}>
              Rekodow na 1 zgode
            </th>
            <th className="basesTableCell">WB 1</th>
            <th className="basesTableCell">WB 2</th>
            <th className="basesTableCell">Ilość Zaproszeń</th>
            <th className="basesTableCell">Zgody inne miasto</th>
            <th colspan="2" style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
                <th>Aktualna ilość zaproszeń</th>
              </tr>
              <tr>
                <th colspan="2" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                  1 dzień
                </th>
              </tr>
              <tr>
                <th colspan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_1_data: e.target.value })))}
                      className="tableInput"
                      style={{ color: "white" }}
                      type="text"
                      autoComplete="off"
                      value={formatDate(currentCities[0]?.dzien_1_data || "") || ""}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colspan="2" style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
                <th>Aktualna ilość zaproszeń</th>
              </tr>
              <tr>
                <th colspan="2" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                  2 dzień
                </th>
              </tr>
              <tr>
                <th colspan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_2_data: e.target.value })))}
                      className="tableInput"
                      style={{ color: "white" }}
                      type="text"
                      autoComplete="off"
                      value={formatDate(currentCities[0]?.dzien_2_data || "") || ""}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colspan="2" style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ borderRight: "1px solid black" }}>Rekodow na 1 zgode</th>
                <th>Aktualna ilość zaproszeń</th>
              </tr>
              <tr>
                <th colspan="2" style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
                  3 dzień
                </th>
              </tr>
              <tr>
                <th colspan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_3_data: e.target.value })))}
                      className="tableInput"
                      style={{ color: "white" }}
                      type="text"
                      autoComplete="off"
                      value={formatDate(currentCities[0]?.dzien_3_data || "") || ""}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colspan="6" style={{ border: "1px solid black" }}>
              <th colspan="6" style={{ width: "335px", borderBottom: "1px solid black", height: "75px" }}>
                VIP
              </th>
              <tr style={{ height: "55px" }}>
                <th style={{ borderRight: "1px solid black", width: "100px" }}>ID</th>
                <th style={{ borderRight: "1px solid black", width: "100px" }}>Формат</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Лимит</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Приход</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Пар всего</th>
                <th style={{ width: "70.89px" }}>%, прихода</th>
              </tr>
            </th>
            <th className="basesTableCell">ЗАМЕТКА</th>
            <th colspan="3" style={{ border: "1px solid black" }}>
              <th colspan="3" style={{ borderBottom: "1px solid black", height: "75px" }}>
                WYNIKI POTWIERDZEŃ
              </th>
              <tr>
                <th style={{ borderRight: "1px solid black", width: "70.89px", height: "55px" }}>Zgoda</th>
                <th style={{ borderRight: "1px solid black", width: "70.89px" }}>Odmowy</th>
                <th style={{ width: "70.89px" }}>Kropki</th>
              </tr>
            </th>
            <th colspan="2" style={{ border: "1px solid black", minWidth: "220px" }}>
              <th colspan="2" style={{ borderBottom: "1px solid black", height: "75px", width: "220px" }}>
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
            <tr key={item.id === "create" ? `${item.id_for_base + item.godzina + index}` : item.id}>
              <td>
                {" "}
                <Button
                  style={{ background: "lightgreen", color: "black" }}
                  onClick={async () => {
                    let checkConfirm = window.confirm("Вы уверены?");
                    if (checkConfirm) {
                      await deleteTime(Number(item.id));
                    }
                  }}
                >
                  Удалить
                </Button>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, l_p: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={item.l_p || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, godzina: e.target.value.trim() || " " }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.godzina || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, os_poj: e.target.value }))}
                  className="tableInput"
                  style={{ minWidth: "0px", width: "100px" }}
                  type="text"
                  autoComplete="off"
                  value={item.os_poj || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, pary: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="text"
                  autoComplete="off"
                  value={item.pary || ""}
                />
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ background: "#f2ffac", color: "black" }}>
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, wyjasnienia: !!e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.wyjasnienia}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ background: "lightgreen", color: "black" }}>
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
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <textarea
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, miasto_lokal: e.target.value })))}
                    className="tableInput"
                    style={{ width: "260px", height: "125px" }}
                    type="text"
                    autoComplete="off"
                    value={item.miasto_lokal || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, w_toku: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.w_toku}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, zamkniete: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.zamkniete}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dodawanie_rekordow: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.dodawanie_rekordow || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, scenariusze: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.scenariusze || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, weryfikacja_dkj: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.weryfikacja_dkj || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, podpinanie_scenariuszy: e.target.value })))}
                    className="tableInput"
                    style={{ width: "auto" }}
                    type="text"
                    autoComplete="off"
                    value={item.podpinanie_scenariuszy || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: "lightgreen", color: "black" }} className="basesTableCell">
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
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, rekodow_na_1_zgode: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.rekodow_na_1_zgode).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
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
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
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
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, ilosc_zaproszen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.ilosc_zaproszen || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, zgody_inne_miasto: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.zgody_inne_miasto || ""}
                />
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_1_rekodow_na_1_zgode: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.dzien_1_rekodow_na_1_zgode).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, dzien_1_aktualna_ilosc_zaproszen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.dzien_1_aktualna_ilosc_zaproszen || ""}
                />
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_2_rekodow_na_1_zgode: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.dzien_2_rekodow_na_1_zgode).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, dzien_2_aktualna_ilosc_zaproszen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.dzien_2_aktualna_ilosc_zaproszen || ""}
                />
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_3_rekodow_na_1_zgode: e.target.value })))}
                    className="tableInput"
                    style={{ width: "50px" }}
                    type="number"
                    autoComplete="off"
                    value={Number(item.dzien_3_rekodow_na_1_zgode).toFixed() || ""}
                  />
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, dzien_3_aktualna_ilosc_zaproszen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.dzien_3_aktualna_ilosc_zaproszen || ""}
                />
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
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
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
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
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
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
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, zgoda_wyniki_potwierdzen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.zgoda_wyniki_potwierdzen || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, odmowy_wyniki_potwierdzen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.odmowy_wyniki_potwierdzen || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCity[index]((prev) => ({ ...prev, kropki_wyniki_potwierdzen: e.target.value }))}
                  className="tableInput"
                  style={{ width: "50px" }}
                  type="number"
                  autoComplete="off"
                  value={item.kropki_wyniki_potwierdzen || ""}
                />
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, sms_umawianie: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.sms_umawianie}
                  />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, sms_potwierdzen: e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item.sms_potwierdzen}
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
