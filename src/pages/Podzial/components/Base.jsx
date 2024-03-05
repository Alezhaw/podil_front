import { Button, Checkbox, Table, TableCell, TableRow, TextField, FormControlLabel, Autocomplete } from "@mui/material";
import { useAppSelector } from "../../../store/reduxHooks";

function Base({ item, setCurrentBases, changeDeleteBases, forSearch, forCheckTable, setNewBases }) {
  const { servers, instances } = useAppSelector((store) => store.user);
  return (
    <Table className="tableHeader inputBaseID sizeForBases" key={item.id} style={{ marginRight: `${forSearch ? 0 : 20}px`, minWidth: "300px" }}>
      <TableRow colSpan="3">
        <TableCell colSpan="3" className="basePadding">
          <div style={{ display: "flex", gap: "1rem", flexDirection: "row", alignItems: "center" }}>
            <TextField
              disabled={forSearch}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              style={{ minWidth: "80px" }}
              id="fullWidth"
              variant="outlined"
              onChange={(e) =>
                setCurrentBases((prev) =>
                  prev.map((el) =>
                    el.id === item.id
                      ? {
                          ...el,
                          gazooCampaignId: e.target.value || 0,
                          podzial_id: `${e.target.value} ${instances?.find((el) => el?.ApiAddress === servers?.find((el) => el?.id === item?.gazooServerId)?.url)?.Name || ""}`,
                        }
                      : el
                  )
                )
              }
              className="tableHeader basePadding"
              type="number"
              autoComplete="off"
              placeholder="ID"
              value={item.gazooCampaignId || ""}
            />
            <Autocomplete
              disabled={forSearch}
              style={{ margin: "8px", minWidth: "170px" }}
              disablePortal
              id="combo-box-demo"
              disableClearable
              options={instances?.sort((a, b) => a?.Name?.localeCompare(b?.Name))?.map((el) => ({ ...el, label: el?.Name }))}
              onChange={(e, value) =>
                setCurrentBases((prev) =>
                  prev.map((el) =>
                    el.id === item.id
                      ? {
                          ...el,
                          gazooServerId: servers?.find((el) => el?.url === value?.ApiAddress)?.id,
                          podzial_id: `${item.gazooCampaignId} ${instances?.find((el) => el?.ApiAddress === value?.ApiAddress)?.Name}`,
                        }
                      : el
                  )
                )
              }
              renderInput={(params) => <TextField {...params} label="Server" variant="standard" />}
              value={instances?.find((el) => el?.ApiAddress === servers?.find((el) => el?.id === item?.gazooServerId)?.url)?.Name}
            />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, stat_1: e.target.value } : el)))}
            className="tableHeader basePadding"
            type="text"
            autoComplete="off"
            placeholder="Stat 1"
            value={item.stat_1 || ""}
          />
        </TableCell>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, stat_2: e.target.value } : el)))}
            className="tableHeader basePadding"
            type="text"
            autoComplete="off"
            placeholder="Stat 2"
            value={item.stat_2 || ""}
          />
        </TableCell>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, stat_3: e.target.value } : el)))}
            className="tableHeader basePadding"
            type="text"
            autoComplete="off"
            placeholder="Stat 3"
            value={item.stat_3 || ""}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan="2" className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, type: e.target.value } : el)))}
            className="tableHeader basePadding"
            type="text"
            autoComplete="off"
            placeholder="Type"
            value={item.type || ""}
          />
        </TableCell>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sort: e.target.value } : el)))}
            className="tableHeader basePadding"
            type="text"
            autoComplete="off"
            placeholder="Sort from"
            value={item.sort || ""}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sogl_1: e.target.value || 0 } : el)))}
            className="tableHeader basePadding"
            type="number"
            autoComplete="off"
            placeholder="Sogl 1"
            value={item.sogl_1 || ""}
          />
        </TableCell>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sogl_2: e.target.value || 0 } : el)))}
            className="tableHeader basePadding"
            type="number"
            autoComplete="off"
            placeholder="Sogl 2"
            value={item.sogl_2 || ""}
          />
        </TableCell>
        <TableCell className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, sogl_3: e.target.value || 0 } : el)))}
            className="tableHeader basePadding"
            type="number"
            autoComplete="off"
            placeholder="Sogl 3"
            value={item.sogl_3 || ""}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan="3" className="basePadding">
          <TextField
            id="fullWidth"
            fullWidth
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, comment: e.target.value } : el)))}
            className="tableHeader basePadding"
            type="text"
            autoComplete="off"
            placeholder="Comment"
            value={item.comment || ""}
            label="Com:"
          />
        </TableCell>
      </TableRow>

      {!forSearch ? (
        !forCheckTable ? (
          <TableRow colSpan="3">
            <TableCell align="center" colSpan="3" className="basePadding">
              <FormControlLabel
                control={<Checkbox className="checkboxOnBlackBackground" label="Delete" onChange={(e) => changeDeleteBases(e.target.checked, item.id)} />}
                label="Delete"
                sx={{ color: "text.primary" }}
              />
            </TableCell>
          </TableRow>
        ) : (
          <TableRow colSpan="3" style={{ height: "67px" }}>
            <TableCell align="center" colSpan="3" className="basePadding">
              <Button onClick={() => setNewBases((prev) => prev?.filter((el) => el.id !== item.id))}>Remove</Button>
            </TableCell>
          </TableRow>
        )
      ) : null}
    </Table>
  );
}

export default Base;
