import * as React from "react";
import { useNavigate } from "react-router-dom";
import { citiesStatusColor } from "../../../components/mock/OutputMock";
import { useState } from "react";
import { getValueById } from "../../../components/functions";

function AllCityTable({
  departureArray,
  departureIndex,
  departure,
  arrayIndex,
  currentCities,
  country,
  changeDeleteCities,
  filterColumns,
  changeCitiesStatus,
  citiesStatus,
  trailsForCampaign,
  allDictionary,
  servers,
  instances,
}) {
  const navigate = useNavigate();
  const [changeStatus, setChangeStatus] = useState(false);
  const currentTrail = trailsForCampaign?.find((el) => el.id === currentCities[0]?.trailId);
  const currentServer = servers?.find((el) => el.id === currentTrail?.gazooServerId);
  const currentInstance = instances?.find((el) => el?.ApiAddress === currentServer?.url);
  const routeNumber = departure?.find((el) => el.id === departureArray?.flat()[0]?.departureId);
  function formatDate(date) {
    if (!date) {
      return;
    }
    return String(date)?.split("T")[0]?.replaceAll("-", ".") || "";
  }
  return (
    <>
      <tr style={{ height: "27px", background: "#f37dea" }}>
        {arrayIndex === 0 ? (
          <th
            style={{ color: "black", background: "white", border: "1px solid black" }}
            rowSpan={departureArray?.length + (departureArray || [])?.map((el) => el?.length)?.reduce((el, acc) => el + acc, 0)}
          >
            <div style={{ writingMode: "vertical-rl", maxHeight: "169px", transform: "rotate(180deg)" }}>
              {getValueById(routeNumber?.company_id, "name", allDictionary?.regiments)}
              <br />
              {routeNumber?.route_number}
            </div>
          </th>
        ) : null}
        <th></th>
        {(filterColumns || [])
          ?.filter((el) => el?.value)
          ?.map((el, index) => (
            <React.Fragment key={index}>{el.firstRow({ formatDate, currentCities, index })}</React.Fragment>
          ))}
      </tr>
      {(currentCities || [])?.map((item, index) => (
        <tr key={item.id === "create" ? `${item.id_for_base} ${item.time} ${index}` : `${item.id}-${index}`}>
          {index === 0 ? (
            <th
              rowSpan={`${currentCities.length}`}
              className="basesTableCell"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/city/${item?.id_for_base}`);
              }}
            >
              <div className="tableInput" style={{ width: "50px", textAlign: "center" }}>
                {item.id_for_base || ""}
              </div>
            </th>
          ) : null}
          {filterColumns
            ?.filter((el) => el?.value)
            .map((el, keyIndex) => (
              <React.Fragment key={keyIndex}>
                {el?.content({ index, currentCities, item, changeDeleteCities, changeStatus, changeCitiesStatus, setChangeStatus, citiesStatus, citiesStatusColor, currentTrail, currentInstance })}
              </React.Fragment>
            ))}
        </tr>
      ))}
    </>
  );
}

export default AllCityTable;
