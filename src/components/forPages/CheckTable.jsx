import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "@material-ui/core";
import { citiesStatusColor } from "../mock/OutputMock";
import DropdownBaseTable from "../../pages/CheckBases/DropdownBaseTable";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

import DropdownSpeakerTable from "../../pages/CheckSpeaker/DropdownSpeakerTable";

function CheckTable({ currentCities, country, checkKey, changeCheck, filterColumns, filterSpeaker, changeCitiesStatus, citiesStatus }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);

  return (
    <>
      {currentCities?.map((item, index) => (
        <>
          <tr key={item.id === "create" ? `${item.id_for_base + item.time + index}` : item.id}>
            {index === 0 ? (
              <th rowSpan={`${currentCities.length}`}>
                <IconButton onClick={() => setOpen((prev) => !prev)}>
                  <ArrowBackIosNewIcon style={{ color: "black", transitionDuration: "500ms", transitionProperty: "transform", transform: `rotate(${!open ? 270 : 90}deg)` }} />
                </IconButton>
              </th>
            ) : (
              ""
            )}
            {index === 0 ? (
              <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/city/${item?.id_for_base}`)}>
                <div className="tableInput" style={{ minWwidth: "50px", textAlign: "center" }}>
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
              <th rowSpan={`${currentCities.length}`} className="default-col not-bold row-borders" style={{ border: "1px solid black" }}>
                <input onChange={(e) => changeCheck(e.target.checked, item.id_for_base)} style={{ width: "25px", height: "25px" }} type="checkbox" autoComplete="off" checked={!!item[checkKey]} />
              </th>
            ) : null}
          </tr>
          {checkKey === "check_base" ? (
            open ? (
              index === currentCities.length - 1 ? (
                <tr>
                  <th></th>
                  <th colSpan={12} style={{ overflow: "auto" }}>
                    <div>
                      <Container style={{ padding: "1rem 0px", margin: "0" }}>
                        <DropdownBaseTable item={item} country={country} id_for_base={item.id_for_base} />
                      </Container>
                    </div>
                  </th>
                </tr>
              ) : null
            ) : null
          ) : null}
          {checkKey === "check_speaker" ? (
            open ? (
              index === currentCities.length - 1 ? (
                <tr>
                  <th></th>
                  <th colSpan={12} style={{ overflow: "auto" }}>
                    <Container style={{ padding: "0px", margin: "1rem 0px 0px" }}>
                      <table style={{ textAlign: "center" }}>
                        <tbody>
                          <DropdownSpeakerTable item={item} country={country} id_for_base={item.id_for_base} filterSpeaker={filterSpeaker} time={item.time} present={item.present} />
                        </tbody>
                      </table>
                    </Container>
                  </th>
                </tr>
              ) : null
            ) : null
          ) : null}
        </>
      ))}
    </>
  );
}

export default CheckTable;
