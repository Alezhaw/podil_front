import { useState } from "react";
import { Button, IconButton, TextField, TableCell, TableRow, Checkbox, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ShowListsRow({ item, messages, updateList, deleteLists, changeDeleteLists }) {
  const [list, setList] = useState({ ...item, telephone: item.telephone.map((el, index) => ({ id: index, tel: el })) });
  const [disabled, setDisabled] = useState(true);
  const [updateDisable, setUpdateDisable] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="basesTableCell">
          <IconButton color="primary" onClick={() => setDisabled((prev) => !prev)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell className="basesTableCell">{list.id}</TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, present: e.target.value }))}
            type="text"
            value={list.present || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput autoWidth"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, full_name: e.target.value }))}
            type="text"
            value={list.full_name || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, coupon_number: e.target.value }))}
            type="text"
            value={list.coupon_number || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell" style={{ width: "auto" }}>
          {disabled
            ? list.telephone?.map((el) => el.tel)?.join(",")
            : list.telephone?.map((el, index) => (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }} key={el.id}>
                  <input
                    key={el.id}
                    disabled={disabled}
                    className="disableBlackColor tableInput autoWidth"
                    variant="standard"
                    onChange={(e) => setList((prev) => ({ ...prev, telephone: prev.telephone.map((item) => (item.id === el.id ? { ...item, tel: e.target.value } : item)) }))}
                    type="text"
                    value={el.tel || ""}
                  />
                  {index + 1 === list?.telephone?.length ? (
                    <IconButton onClick={() => setList((prev) => ({ ...prev, telephone: [...prev.telephone, { id: el.id + 1, tel: "" }] }))}>
                      <AddIcon color="primary" />
                    </IconButton>
                  ) : null}
                  {index === 0 ? null : (
                    <IconButton onClick={() => setList((prev) => ({ ...prev, telephone: prev?.telephone?.filter((item) => item.id !== el.id) }))}>
                      <RemoveIcon color="primary" />
                    </IconButton>
                  )}
                </div>
              ))}
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, guests: e.target.value }))}
            type="number"
            value={list.guests || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, couples: e.target.value }))}
            type="number"
            value={list.couples || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, passport: e.target.value }))}
            type="number"
            value={list.passport || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, age: e.target.value }))}
            type="number"
            value={list.age || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, instead: e.target.value }))}
            type="text"
            value={list.instead || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput autoWidth"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, guest_full_name: e.target.value }))}
            type="text"
            value={list.guest_full_name || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, client_with_bank_refusal: e.target.value }))}
            type="text"
            value={list.client_with_bank_refusal || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, guest_telephone: e.target.value }))}
            type="text"
            value={list.guest_telephone || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, left_not_admitted: e.target.value }))}
            type="text"
            value={list.left_not_admitted || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput autoWidth"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, reason: e.target.value }))}
            type="text"
            value={list.reason || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, sms: e.target.value }))}
            type="number"
            value={list.sms || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, notes: e.target.value }))}
            type="text"
            value={list.notes || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, presentation_number: e.target.value }))}
            type="number"
            value={list.presentation_number || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput autoWidth"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, location: e.target.value }))}
            type="text"
            value={list.location || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, time: e.target.value }))}
            type="text"
            value={list.time || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, address: e.target.value }))}
            type="text"
            value={list.address || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, team: e.target.value }))}
            type="number"
            value={list.team || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <input
            disabled={disabled}
            className="disableBlackColor tableInput"
            variant="standard"
            onChange={(e) => setList((prev) => ({ ...prev, who_called: e.target.value }))}
            type="text"
            value={list.who_called || ""}
          />
        </TableCell>
        <TableCell className="basesTableCell">
          <Checkbox checked={!!deleteLists?.find((item) => item === list.id)} onChange={(e) => changeDeleteLists(e.target.checked, list?.id)} />
        </TableCell>
      </TableRow>
      {!disabled ? (
        <TableRow>
          <TableCell colSpan={100} className="basesTableCell disablePrimaryColor" style={{ textAlign: "left" }}>
            <Button disabled={updateDisable} size="small" variant="outlined" onClick={() => updateList({ item: list, setDisabled: setUpdateDisable })}>
              {messages.save}
            </Button>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}

export default ShowListsRow;
