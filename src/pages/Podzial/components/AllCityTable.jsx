import { useNavigate } from "react-router-dom";
import { citiesStatusColor } from "../../../components/mock/OutputMock";
import { useState } from "react";

function AllCityTable({ currentCities, country, changeDeleteCities, filterColumns, changeCitiesStatus, citiesStatus }) {
  const navigate = useNavigate();
  const [changeStatus, setChangeStatus] = useState(false);
  function formatDate(date) {
    if (!date) {
      return;
    }
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return (
    <>
      <tr style={{ height: "27px", background: "#f37dea" }}>
        <th></th>
        {filterColumns?.filter((el) => el.value)?.map((el, index) => el.firstRow({ formatDate, currentCities, index }))}
      </tr>
      {currentCities?.map((item, index) => (
        <tr key={item.id === "create" ? `${item.id_for_base + item.time + index}` : item.id}>
          {index === 0 ? (
            <th rowSpan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/city/${item?.id_for_base}`)}>
              <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                {item.id_for_base || ""}
              </div>
            </th>
          ) : (
            ""
          )}
          {filterColumns
            ?.filter((el) => el.value)
            .map((el) => el.content({ index, currentCities, item, changeDeleteCities, changeStatus, changeCitiesStatus, setChangeStatus, citiesStatus, citiesStatusColor }))}
        </tr>
      ))}
    </>
  );
}

export default AllCityTable;
