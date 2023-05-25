import { Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function CheckBaseTable({ currentCities, country, key }) {
  const navigate = useNavigate();

  return (
    <Container style={{ padding: "0px", margin: "0px" }}>
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr style={{ height: "26.8px" }}>
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
        <tbody style={{ background: "rgba(90, 89, 89, 0.75)" }}>
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
                <div className="tableInput" style={{ width: "89.3px", textAlign: "center" }}>
                  {item.os_poj || ""}
                </div>
              </td>
              <td className="basesTableCell">
                <div className="tableInput" style={{ width: "65.91px", textAlign: "center" }}>
                  {item.pary || ""}
                </div>
              </td>
              {index === 0 ? (
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "144.06px" }}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "114.67px" }}>
                  <div className="tableInput" style={{ textAlign: "center" }}>
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
                <td rowspan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "70.8px" }}>
                  <input
                    // onChange={(e) => setCity?.map((item) => item((prev) => ({ ...prev, wyjasnienia: !!e.target.checked })))}
                    className="tableInput"
                    style={{ width: "25px", height: "25px" }}
                    type="checkbox"
                    autoComplete="off"
                    checked={!!item[key]}
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

export default CheckBaseTable;
