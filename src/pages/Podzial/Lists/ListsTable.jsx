import * as React from "react";
import { useMemo } from "react";
import { ContainerForTable } from "../../../components/forPages/Table.styled";
import { useAppSelector } from "../../../store/reduxHooks";
import ListsRow from "./ListsRow";

function ListsTable({ cities, zoom }) {
  const { locale, country } = useAppSelector((store) => store.user);

  const messages = useMemo(() => {
    return {
      city_lokal: locale["city_lokal"],
      status: locale["status"],
      citiesStatus: locale["cities_status"],
      add: locale["lists_add"],
      show: locale["lists_show"],
      search: locale["search"],
    };
  }, [locale]);

  return (
    <ContainerForTable>
      <table style={{ zoom }}>
        <thead className="tableHeader">
          <tr style={{ background: "none" }}>
            <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
              ID
            </th>
            <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
              {messages.city_lokal}
            </th>
            <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
              {messages.status}
            </th>
            <th className="basesTableCell" style={{ minWidth: "70.8px" }}>
              {messages.show}
            </th>
            <th className="basesTableCell">{messages.add}</th>
          </tr>
        </thead>
        <tbody>
          {cities?.map((currentCities, index) => (
            <React.Fragment key={index}>
              {currentCities?.map((item, index) => (
                <ListsRow key={item.id} item={item} index={index} country={country} messages={messages} />
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </ContainerForTable>
  );
}

export default ListsTable;
