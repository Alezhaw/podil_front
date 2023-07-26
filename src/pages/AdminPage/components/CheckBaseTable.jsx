import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { citiesStatus, citiesStatusColor } from "../../../components/mock/OutputMock";
import { Container } from "@material-ui/core";
import DropdownBaseTable from "./DropdownBaseTable";
import DropdownSpeakerTable from "./DropdownSpeakerTable";

function CheckBaseTable({ currentCities, country, checkKey, changeCheck, filterSpeaker, filterColumns, changeCitiesStatus }) {
  const navigate = useNavigate();
  const [changeStatus, setChangeStatus] = useState(false);
  const [open, setOpen] = useState(false);
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return (
    <>
      <tr style={{ height: "26.8px", background: "#f37dea" }}>
        <th></th>
        {filterColumns?.filter((el) => el.value).map((el) => el.firstRow({ formatDate, currentCities }))}
      </tr>
      {currentCities?.map((item, index) => {
        return (
          <>
            <tr key={item.id === "create" ? `${item.id_for_base + item.godzina + index}` : item.id} onClick={() => setOpen((prev) => !prev)}>
              {index === 0 ? (
                <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/${country}/${item?.id_for_base}`)}>
                  <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                    {item.id_for_base || ""}
                  </div>
                </th>
              ) : (
                ""
              )}
              {filterColumns?.filter((el) => el.value).map((el) => el.content({ index, currentCities, item, changeStatus, changeCitiesStatus, setChangeStatus, citiesStatus, citiesStatusColor }))}
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
                            <DropdownSpeakerTable item={item} country={country} id_for_base={item.id_for_base} />
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
