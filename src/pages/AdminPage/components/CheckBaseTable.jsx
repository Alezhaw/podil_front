import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "@material-ui/core";

import DropdownBaseTable from "./DropdownBaseTable";

function CheckBaseTable({ currentCities, country, checkKey, changeCheck, filterSpeaker }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      {currentCities?.map((item, index) => {
        return (
          <>
            <tr className="row-borders"  key={`CheckBaseTableRow-${index}-${item.id}`} onClick={() => setOpen((prev) => !prev)}>
              {index === 0 ? (
                <th
                  rowSpan={`${currentCities.length}`}
                  className="default-col not-bold clickable row-borders"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/adminPanel/${country}/${item?.id_for_base}`)}
                >
                  {item.id_for_base || ""}
                </th>
              ) : null}
              {!filterSpeaker && index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="default-col not-bold row-borders">
                  {item.l_p || ""}
                </th>
              ) : null}
              <th className="default-col not-bold row-borders">{item.godzina || ""}</th>
              {!filterSpeaker && <th className="default-col not-bold row-borders">{item.os_poj || ""}</th>}
              {!filterSpeaker && <th className="default-col not-bold row-borders">{item.pary || ""}</th>}
              {!filterSpeaker && index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="coming-col not-bold row-borders coming-check-col">
                  <input style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item.wyjasnienia} readOnly/>
                </th>
              ) : null}
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="default-col not-bold row-borders project-check-col">
                  {item.projekt || ""}
                </th>
              ) : null}
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="miasto-col not-bold row-borders">
                  {item.miasto_lokal || ""}
                </th>
              ) : null}
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="timezone-col not-bold row-borders">
                  {item.timezone || 0}
                </th>
              ) : null}
              {!filterSpeaker && <th className="default-col not-bold row-borders">{item.limit || ""}</th>}
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="default-col not-bold row-borders">
                  <input onChange={(e) => changeCheck(e.target.checked, item.id_for_base)} style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item[checkKey]} />
                </th>
              ) : null}
            </tr>

            {checkKey === "check_base" ? (
              open ? (
                index === currentCities.length - 1 ? (
                  <tr>
                    <th colSpan={11} style={{ overflow: "auto" }}>
                      <Container style={{ padding: "0px", margin: "20px 0px 0px" }}>
                        <table style={{ textAlign: "center" }}>
                          <tbody>
                            <DropdownBaseTable item={item} country={country} id_for_base={item.id_for_base} />
                          </tbody>
                        </table>
                      </Container>
                    </th>
                  </tr>
                ) : null
              ) : null
            ) : null}
          </>
        );
      })}
    </>
  );
}

export default CheckBaseTable;
