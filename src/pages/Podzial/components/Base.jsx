import { Button, Checkbox, Table, TableCell, TableRow, TextField, FormControlLabel } from "@mui/material";

function Base({ item, setCurrentBases, changeDeleteBases, forSearch, forCheckTable, setNewBases }) {
  return (
    <Table className="tableHeader inputBaseID sizeForBases" key={item.id}>
      <TableRow colSpan="3">
        <TableCell colSpan="3">
          <TextField
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            id="fullWidth"
            fullWidth
            variant="outlined"
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, podzial_id: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="ID"
            value={item.podzial_id || ""}
          ></TextField>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, stat_1: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="Stat 1"
            value={item.stat_1 || ""}
          />
        </TableCell>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, stat_2: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="Stat 2"
            value={item.stat_2 || ""}
          />
        </TableCell>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, stat_3: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="Stat 3"
            value={item.stat_3 || ""}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan="2">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, type: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="Type"
            value={item.type || ""}
          />
        </TableCell>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sort: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="Sort from"
            value={item.sort || ""}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sogl_1: e.target.value } : el)))}
            className="tableHeader"
            type="number"
            autoComplete="off"
            placeholder="Sogl 1"
            value={item.sogl_1 || ""}
          />
        </TableCell>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sogl_2: e.target.value } : el)))}
            className="tableHeader"
            type="number"
            autoComplete="off"
            placeholder="Sogl 2"
            value={item.sogl_2 || ""}
          />
        </TableCell>
        <TableCell>
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sogl_3: e.target.value } : el)))}
            className="tableHeader"
            type="number"
            autoComplete="off"
            placeholder="Sogl 3"
            value={item.sogl_3 || ""}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan="3">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, comment: e.target.value } : el)))}
            className="tableHeader"
            type="text"
            autoComplete="off"
            placeholder="Comment"
            value={item.comment || ""}
            label="Ком:"
          />
        </TableCell>
      </TableRow>

      {!forSearch ? (
        !forCheckTable ? (
          <TableRow colSpan="3">
            <TableCell align="center" colSpan="3">
              <FormControlLabel
                control={<Checkbox className="checkboxOnBlackBackground" label="Delete" onChange={(e) => changeDeleteBases(e.target.checked, item.id)} />}
                label="Delete"
                sx={{ color: "text.primary" }}
              />
            </TableCell>
          </TableRow>
        ) : (
          <TableRow colSpan="3" style={{ height: "67px" }}>
            <TableCell align="center" colSpan="3">
              <Button onClick={() => setNewBases((prev) => prev?.filter((el) => el.id !== item.id))}>Remove</Button>
            </TableCell>
          </TableRow>
        )
      ) : null}
    </Table>
  );
}

export default Base;
