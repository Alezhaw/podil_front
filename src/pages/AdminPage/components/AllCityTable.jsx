import { Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function AllCityTable({ currentCities, country, changeDeleteCities, setCity }) {
  const navigate = useNavigate();
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <table style={{ textAlign: "center", background: "rgba(90, 89, 89, 0.75)" }}>
        <thead>
          <tr>
            <th className="basesTableCell">ID</th>
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
            <th className="basesTableCell">Rekodow na 1 zgode</th>
            <th className="basesTableCell">WB 1</th>
            <th className="basesTableCell">WB 2</th>
            <th className="basesTableCell">Ilość Zaproszeń</th>
            <th className="basesTableCell">Zgody inne miasto</th>
            <th colspan="2" style={{ border: "1px solid white" }}>
              <tr>
                <th style={{ borderRight: "1px solid white" }}>Rekodow na 1 zgode</th>
                <th>Aktualna ilość zaproszeń</th>
              </tr>
              <tr>
                <th colspan="2" style={{ borderTop: "1px solid white", borderBottom: "1px solid white" }}>
                  1 dzień
                </th>
              </tr>
              <tr>
                <th colspan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      //onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_1_data: e.target.value })))}
                      className="tableInput"
                      type="text"
                      autoComplete="off"
                      value={formatDate(currentCities[0]?.dzien_1_data || "") || ""}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colspan="2" style={{ border: "1px solid white" }}>
              <tr>
                <th style={{ borderRight: "1px solid white" }}>Rekodow na 1 zgode</th>
                <th>Aktualna ilość zaproszeń</th>
              </tr>
              <tr>
                <th colspan="2" style={{ borderTop: "1px solid white", borderBottom: "1px solid white" }}>
                  2 dzień
                </th>
              </tr>
              <tr>
                <th colspan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      //onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_2_data: e.target.value })))}
                      className="tableInput"
                      type="text"
                      autoComplete="off"
                      value={formatDate(currentCities[0]?.dzien_2_data || "") || ""}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colspan="2" style={{ border: "1px solid white" }}>
              <tr>
                <th style={{ borderRight: "1px solid white" }}>Rekodow na 1 zgode</th>
                <th>Aktualna ilość zaproszeń</th>
              </tr>
              <tr>
                <th colspan="2" style={{ borderTop: "1px solid white", borderBottom: "1px solid white" }}>
                  3 dzień
                </th>
              </tr>
              <tr>
                <th colspan="2" style={{ position: "relative", top: "6px" }}>
                  {
                    <input
                      //onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, dzien_3_data: e.target.value })))}
                      className="tableInput"
                      type="text"
                      autoComplete="off"
                      value={formatDate(currentCities[0]?.dzien_3_data || "") || ""}
                    />
                  }
                </th>
              </tr>
            </th>
            <th colspan="6" style={{ border: "1px solid white" }}>
              <th colspan="6" style={{ width: "335px", borderBottom: "1px solid white", height: "75px" }}>
                VIP
              </th>
              <tr style={{ height: "55px" }}>
                <th style={{ borderRight: "1px solid white", width: "100px" }}>ID</th>
                <th style={{ borderRight: "1px solid white", width: "100px" }}>Формат</th>
                <th style={{ borderRight: "1px solid white", width: "70.89px" }}>Лимит</th>
                <th style={{ borderRight: "1px solid white", width: "70.89px" }}>Приход</th>
                <th style={{ borderRight: "1px solid white", width: "70.89px" }}>Пар всего</th>
                <th style={{ width: "70.89px" }}>%, прихода</th>
              </tr>
            </th>
            <th className="basesTableCell">ЗАМЕТКА</th>
            <th colspan="3" style={{ border: "1px solid white" }}>
              <th colspan="3" style={{ borderBottom: "1px solid white", height: "75px" }}>
                WYNIKI POTWIERDZEŃ
              </th>
              <tr>
                <th style={{ borderRight: "1px solid white", width: "70.89px", height: "55px" }}>Zgoda</th>
                <th style={{ borderRight: "1px solid white", width: "70.89px" }}>Odmowy</th>
                <th style={{ width: "70.89px" }}>Kropki</th>
              </tr>
            </th>
            <th colspan="2" style={{ border: "1px solid white", minWidth: "220px" }}>
              <th colspan="2" style={{ borderBottom: "1px solid white", height: "75px", width: "220px" }}>
                SMS
              </th>
              <tr>
                <th style={{ borderRight: "1px solid white", width: "110px", height: "55px" }}>Umawianie</th>
                <th>Potwierdzanie</th>
              </tr>
            </th>
            <th className="basesTableCell">Удалить город</th>
          </tr>
        </thead>
        <tbody>
          {currentCities?.map((item, index) => (
            <tr key={item.id === "create" ? `${item.id_for_base + item.godzina + index}` : item.id}>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/${country}/${item?.id_for_base}`)}>
                  <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                    {item.id_for_base || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                    {item.l_p || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                  {item.godzina || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                  {item.os_poj || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                  {item.pary || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, wyjasnienia: !!e.target.checked })))}
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                    {item.projekt || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ width: "250px", textAlign: "center" }}>
                    {item.miasto_lokal || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                    {item.timezone || 0}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                  {item.limit || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input
                    // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, w_toku: e.target.checked })))}
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
                    // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, zamkniete: e.target.checked })))}
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
                  <div className="tableInput" style={{ textAlign: "center", minWidth: "106px" }}>
                    {item.dodawanie_rekordow || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {item.scenariusze || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {item.weryfikacja_dkj || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {item.podpinanie_scenariuszy || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ width: "100px", textAlign: "center" }}>
                    {item.present || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {Number(item.rekodow_na_1_zgode).toFixed() || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ width: "100px", textAlign: "center" }}>
                    {item.wb_1 || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ width: "70px", textAlign: "center" }}>
                    {item.wb_2 || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center" }}>
                  {item.ilosc_zaproszen || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.zgody_inne_miasto || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                    {Number(item.dzien_1_rekodow_na_1_zgode).toFixed() || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {item.dzien_1_aktualna_ilosc_zaproszen || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                    {Number(item.dzien_2_rekodow_na_1_zgode).toFixed() || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {item.dzien_2_aktualna_ilosc_zaproszen || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                    {Number(item.dzien_3_rekodow_na_1_zgode).toFixed() || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {item.dzien_3_aktualna_ilosc_zaproszen || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center", width: "100px" }}>
                    {item.vip_id || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center", width: "100px" }}>
                    {item.vip_format || ""}
                  </div>
                </td>
              ) : (
                ""
              )}

              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.vip_limit || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.vip_coming || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.vip_total_steam || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.vip_percent_coming || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center", width: "100px" }}>
                    {item.system || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.zgoda_wyniki_potwierdzen || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.odmowy_wyniki_potwierdzen || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ textAlign: "center", width: "50px" }}>
                  {item.kropki_wyniki_potwierdzen || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.sms_umawianie} />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.sms_potwierdzen} />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell">
                  <input onChange={(e) => changeDeleteCities(e.target.checked, item?.id_for_base)} className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" />
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

export default AllCityTable;
