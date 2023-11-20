import { useState } from "react";
import { getFormatTime } from "../../utils/utils";
import { TableCell, TableRow } from "@mui/material";

function LogsCitiesTableRow({ items, getCorrectTime }) {
  const [open, setOpen] = useState(false);
  const generalItem = items[0];

  return (
    <>
      <TableRow className="pointer" key={generalItem.id} onClick={() => setOpen((prev) => !prev)}>
        <TableCell>{generalItem.id}</TableCell>
        <TableCell>{generalItem.id_for_base}</TableCell>
        <TableCell>{generalItem.country}</TableCell>
        <TableCell>{generalItem.action}</TableCell>
        <TableCell>{generalItem.differencesLength}</TableCell>
        <TableCell>{generalItem.miasto_lokal}</TableCell>
        <TableCell>{getCorrectTime(generalItem)}</TableCell>
        <TableCell>{generalItem.user_email}</TableCell>
      </TableRow>

      {open
        ? items
            ?.sort((a, b) => getFormatTime(a) - getFormatTime(b))
            ?.map((item) =>
              item.differences?.map((el, index) => (
                <TableRow key={`${index} ${generalItem.id}`}>
                  <TableCell className="secondaryBack" colSpan="8">
                    {item.godzina && `time: ${item.godzina} | `} {el[0]}: {el[1]} {"=>"} {el[2]}
                  </TableCell>
                </TableRow>
              ))
            )
        : null}
    </>
  );
}

export default LogsCitiesTableRow;
