import { useNavigate } from "react-router-dom";
import { citiesStatus } from "../../../components/mock/OutputMock";
import { MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";

function AllCityTable({ currentCities, country, changeDeleteCities, filterColumns, changeCitiesStatus }) {
  const navigate = useNavigate();
  const [changeStatus, setChangeStatus] = useState(false);
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return (
    <>
      <tr style={{ height: "26.8px", background: "#f37dea" }}>
        <th></th>
        <th></th>
        {filterColumns?.filter((el) => el.value).map((el) => el.firstRow({ formatDate, currentCities }))}
      </tr>
      {currentCities?.map((item, index) => (
        <tr key={item.id === "create" ? `${item.id_for_base + item.godzina + index}` : item.id}>
          {index === 0 ? (
            <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/${country}/${item?.id_for_base}`)}>
              <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                {item.id_for_base || ""}
              </div>
            </th>
          ) : (
            ""
          )}
          {index === 0 ? (
            <td rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ minWidth: "160px", fontWeight: 700, fontSize: "16px" }}>
              {/* <input onChange={(e) => null} className="tableInput" style={{ width: "100px" }} type="text" autoComplete="off" value={citiesStatus[item.status] || ""} /> */}
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
          )}
          {filterColumns?.filter((el) => el.value).map((el) => el.content({ index, currentCities, item, changeDeleteCities }))}
        </tr>
      ))}
    </>
  );
}

export default AllCityTable;
