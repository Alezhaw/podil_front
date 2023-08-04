import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { citiesStatus, citiesStatusColor } from "../../../components/mock/OutputMock";
import DropdownBaseTable from "./DropdownBaseTable";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DropdownSpeakerTable from "./DropdownSpeakerTable";

function CheckBaseTable({ currentCities, country, checkKey, changeCheck, filterColumns, filterSpeaker, changeCitiesStatus }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);

  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return (
    <>
      {currentCities?.map((item, index) => {
        return (
          <>
            <tr key={item.id === "create" ? `${item.id_for_base + item.godzina + index}` : item.id}>
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} style={{ cursor: "pointer" }}>
                  <IconButton onClick={() => setOpen((prev) => !prev)}>
                    <ArrowBackIosNewIcon style={{ color: "black", transitionDuration: "500ms", transitionProperty: "transform", transform: `rotate(${!open ? 270 : 90}deg)` }} />
                  </IconButton>
                </th>
              ) : (
                ""
              )}
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/${country}/${item?.id_for_base}`)}>
                  <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                    {item.id_for_base || ""}
                  </div>
                </th>
              ) : (
                ""
              )}
              {filterColumns
                ?.filter((el) => el.value)
                .map((el) => {
                  //console.log(index, item, filterColumns);
                  return el.content({ index, currentCities, item, changeStatus, changeCitiesStatus, setChangeStatus, citiesStatus, changeCheck, citiesStatusColor });
                })}
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
            {checkKey === "check_speaker" ? (
              open ? (
                index === currentCities.length - 1 ? (
                  <tr>
                    <th colSpan={11} style={{ overflow: "auto" }}>
                      <Container style={{ padding: "0px", margin: "20px 0px 0px" }}>
                        <table style={{ textAlign: "center" }}>
                          <tbody>
                            <DropdownSpeakerTable item={item} country={country} id_for_base={item.id_for_base} filterSpeaker={filterSpeaker} godzina={item.godzina} present={item.present} />
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
