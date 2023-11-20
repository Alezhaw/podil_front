import { useState } from "react";
import { TableCell, TableRow } from "@mui/material";

function LogsBasesTableRow({ item, getCorrectTime }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className="pointer" key={item.id} onClick={() => setOpen((prev) => !prev)}>
        <TableCell>{item.base_id}</TableCell>
        <TableCell>{item.id_base}</TableCell>
        <TableCell>{item.country}</TableCell>
        <TableCell>{item.action}</TableCell>
        <TableCell>{item.differencesLength}</TableCell>
        <TableCell>{getCorrectTime(item)}</TableCell>
        <TableCell>{item.user_email}</TableCell>
      </TableRow>

      {open
        ? item.differences?.map((el, index) => (
            <TableRow key={`${index} ${item.id}`}>
              <TableCell className="secondaryBack" colSpan="7">
                {el[0]}: {el[1]} {"=>"} {el[2]}
              </TableCell>
            </TableRow>
          ))
        : null}
    </>
  );
}

export default LogsBasesTableRow;
