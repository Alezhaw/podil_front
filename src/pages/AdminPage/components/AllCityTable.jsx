import { Container } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { allCitiesTableMock } from "../../../components/mock/OutputMock";

function AllCityTable({ currentCities, country, changeDeleteCities }) {
  const navigate = useNavigate();
  function formatDate(date) {
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }

  return (
    <>
      <tr style={{ height: "26.8px", background: "#f37dea" }}>
        <th></th>
        {allCitiesTableMock.map((el) => el.firstRow({ formatDate, currentCities }))}
      </tr>
      {currentCities?.map((item, index) => (
        <tr key={item.id === "create" ? `${item.id_for_base + item.godzina + index}` : item.id}>
          {index === 0 ? (
            <th rowspan={`${currentCities.length}`} className="basesTableCell" style={{ cursor: "pointer" }} onClick={() => navigate(`/adminPanel/${country}/${item?.id_for_base}`)}>
              <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                {item.id_for_base || ""}
              </div>
            </th>
          ) : (
            ""
          )}

          {allCitiesTableMock.map((el) => el.content({ index, currentCities, item, changeDeleteCities }))}
        </tr>
      ))}
    </>
  );
}

export default AllCityTable;
