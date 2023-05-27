import { Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function AllCityTable({ currentCities, country, changeDeleteCities }) {
  const navigate = useNavigate();
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

console.log('ok');

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <table style={{ textAlign: "center" }}>
        <thead> 
          <tr style={{ height: "26.8px", background: "#f37dea"}}>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th colspan="2" style={{ border: "", background: "", minWidth: "130px", background: "#c3ffc3", color: "black", border: "solid black 1px"  }}>
              <div className="tableInput">{formatDate(currentCities[0]?.dzien_1_data || "") || ""}</div>
            </th>
            <th colspan="2" style={{ border: "", background: "", minWidth: "130px", background: "#c3ffc3", color: "black", border: "solid black 1px"    }}>
              <div className="tableInput">{formatDate(currentCities[0]?.dzien_2_data || "") || ""}</div>
            </th>
            <th colspan="2" style={{ border: "", background: "", minWidth: "130px", background: "#c3ffc3", color: "black" , border: "solid black 1px"   }}>
              <div className="tableInput">{formatDate(currentCities[0]?.dzien_3_data || "") || ""}</div>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ background: "white", color: "black"}}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "86px", background: "#f2ffac", color: "black" }}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{background: "lightgreen", color: "black"}}>
                  <div className="tableInput" style={{ width: "50px", textAlign: "center"}}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "78px" }}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "85px" }}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "85px" }}>
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
                  <div className="tableInput" style={{ textAlign: "center", minWidth: "119px" }}>
                    {item.dodawanie_rekordow || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "97.5px",}} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {item.scenariusze || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "94px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {item.weryfikacja_dkj || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "96px" }} className="basesTableCell">
                  <div className="tableInput" style={{ textAlign: "center" }}>
                    {item.podpinanie_scenariuszy || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", background: "lightgreen", color: "black" }} className="basesTableCell">
                  <div className="tableInput" style={{ width: "100px", textAlign: "center" }}>
                    {item.present || ""}
                  </div>
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} style={{ maxWidth: "250px", padding: "0px", minWidth: "78.4px" }} className="basesTableCell">
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
              <td className="basesTableCell" style={{ minWidth: "87px" }}>
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
                  {item.ilosc_zaproszen || ""}
                </div>
              </td>
              <td className="basesTableCell" style={{ minWidth: "65px" }}>
                <div className="tableInput" style={{ textAlign: "center", minWidth: "50px" }}>
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
                  {Number(item.dzien_1_aktualna_ilosc_zaproszen).toFixed() == 0 ? "" : Number(item.dzien_1_aktualna_ilosc_zaproszen).toFixed()}
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
                  {Number(item.dzien_2_aktualna_ilosc_zaproszen).toFixed() == 0 ? "" : Number(item.dzien_2_aktualna_ilosc_zaproszen).toFixed()}
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
                  {Number(item.dzien_3_aktualna_ilosc_zaproszen).toFixed() == 0 ? "" : Number(item.dzien_3_aktualna_ilosc_zaproszen).toFixed()}
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  <input className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.sms_umawianie} />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "95px" }}>
                  <input className="tableInput" style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.sms_potwierdzen} />
                </td>
              ) : (
                ""
              )}
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "75px" }}>
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
