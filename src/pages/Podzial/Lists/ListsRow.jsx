import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateLists from "./CreateLists";
import ShowLists from "./ShowLists";
import { citiesStatusColor } from "../../../components/mock/OutputMock";

function ListsRow({ item, index, country, messages }) {
  const navigate = useNavigate();
  const [createisOpen, setCreateIsOpen] = useState(false);
  const [showisOpen, setShowIsOpen] = useState(false);
  const itemArray = [[item?.region, item?.city_lokal], item?.adress, [item?.institution, item?.hall], [item?.date, item?.population], item?.city_note];

  return index === 0 ? (
    <tr key={item.id === "create" ? `${item?.id_for_base + item?.time + index}` : item?.id}>
      <th className="basesTableCell">
        <div className="tableInput" style={{ cursor: "pointer" }} onClick={() => navigate(`/city/${item?.id_for_base}`)}>
          {item?.id_for_base}
        </div>
      </th>

      <th style={{ color: "black", background: citiesStatusColor[item?.status] }} className="basesTableCell">
        {item?.timezone ?? ""}{" "}
        {[itemArray]?.flat()?.map((el, itemIndex) => (
          <React.Fragment key={`${itemIndex} ${item.id}`}>
            {[el].flat()?.reduce((sum, acc) => (sum || "") + " " + (acc || ""), "") || ""}
            {el ? <br /> : null}
          </React.Fragment>
        ))}
      </th>
      <th className="basesTableCell">
        <div className="tableInput">{[messages?.citiesStatus]?.flat()[item?.status]}</div>
      </th>
      <th className="basesTableCell">
        <IconButton color="primary" onClick={() => setShowIsOpen((prev) => !prev)}>
          <VisibilityIcon />
        </IconButton>
        {showisOpen ? <ShowLists id_for_base={item?.id_for_base} setIsOpen={setShowIsOpen} /> : null}
      </th>
      <th className="basesTableCell">
        <IconButton color="primary" onClick={() => setCreateIsOpen((prev) => !prev)}>
          <AddIcon />
        </IconButton>
        {createisOpen ? <CreateLists item={item} country={country} setIsOpen={setCreateIsOpen} /> : null}
      </th>
    </tr>
  ) : null;
}

export default ListsRow;
