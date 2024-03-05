import CloseIcon from "@mui/icons-material/Close";
import Base from "./Base";
import { TextField, Container, Autocomplete, Button, Table, TableCell, TableRow } from "@mui/material";
import { StyledInput } from "../../../style/styles";
import React, { useEffect, useState } from "react";

function CreateBase({ setIsOpen, newBase, setNewBase, createBase, getFilteredBases, country, messages, servers, instances }) {
  const [search, setSearch] = useState("");
  const [searchForInput, setSearchForInput] = useState("");
  const [filteredBases, setFilteredBases] = useState([]);

  async function getBases(search) {
    const data = await getFilteredBases(String(search), country);
    if (data[0]) {
      setFilteredBases(data);
    }
  }

  useEffect(() => {
    if (search) {
      getBases(search);
    }
  }, [search]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles scroll">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles scroll"
        style={{
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Table className="tableHeader inputBaseID sizeForBases scroll">
          <TableRow>
            <TableCell colSpan="3" className="basePadding">
              <div style={{ display: "flex", gap: "1rem", flexDirection: "row", alignItems: "center" }}>
                <TextField
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  style={{ minWidth: "80px" }}
                  id="fullWidth"
                  variant="outlined"
                  onChange={(e) =>
                    setNewBase((prev) => ({
                      ...prev,
                      gazooCampaignId: e.target.value,
                      podzial_id: `${e.target.value} ${instances?.find((el) => el?.ApiAddress === servers?.find((el) => el?.id === newBase?.gazooServerId)?.url)?.Name || ""}`,
                    }))
                  }
                  className="tableHeader basePadding"
                  type="number"
                  autoComplete="off"
                  placeholder="ID"
                  value={newBase.gazooCampaignId || ""}
                />
                <Autocomplete
                  style={{ margin: "8px", minWidth: "170px" }}
                  disablePortal
                  id="combo-box-demo"
                  disableClearable
                  options={instances?.sort((a, b) => a?.Name?.localeCompare(b?.Name))?.map((el) => ({ ...el, label: el?.Name }))}
                  onChange={(e, value) =>
                    setNewBase((prev) => ({
                      ...prev,
                      gazooServerId: servers?.find((el) => el?.url === value?.ApiAddress)?.id,
                      podzial_id: `${newBase.gazooCampaignId} ${instances?.find((el) => el?.ApiAddress === value?.ApiAddress)?.Name}`,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} label="Server" variant="standard" />}
                  value={instances?.find((el) => el?.ApiAddress === servers?.find((el) => el?.id === newBase?.gazooServerId)?.url)?.Name}
                />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, stat_1: e.target.value }))}
                className="tableHeader basePadding baseWidth"
                type="text"
                autoComplete="off"
                placeholder="Stat 1"
                value={newBase.stat_1 || ""}
              />
            </TableCell>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, stat_2: e.target.value }))}
                className="tableHeader basePadding baseWidth"
                type="text"
                autoComplete="off"
                placeholder="Stat 2"
                value={newBase.stat_2 || ""}
              />
            </TableCell>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, stat_3: e.target.value }))}
                className="tableHeader basePadding baseWidth"
                type="text"
                autoComplete="off"
                placeholder="Stat 3"
                value={newBase.stat_3 || ""}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan="2" className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, type: e.target.value }))}
                className="tableHeader basePadding baseWidth"
                type="text"
                autoComplete="off"
                placeholder="Type"
                value={newBase.type || ""}
              />
            </TableCell>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, sort: e.target.value }))}
                className="tableHeader basePadding baseWidth"
                type="text"
                autoComplete="off"
                placeholder="Sort from"
                value={newBase.sort || ""}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, sogl_1: e.target.value }))}
                className="tableHeader basePadding"
                type="number"
                autoComplete="off"
                placeholder="Sogl 1"
                value={newBase.sogl_1 || ""}
              />
            </TableCell>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, sogl_2: e.target.value }))}
                className="tableHeader basePadding"
                type="number"
                autoComplete="off"
                placeholder="Sogl 2"
                value={newBase.sogl_2 || ""}
              />
            </TableCell>
            <TableCell className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, sogl_3: e.target.value }))}
                className="tableHeader basePadding"
                type="number"
                autoComplete="off"
                placeholder="Sogl 3"
                value={newBase.sogl_3 || ""}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan="3" className="basePadding">
              <TextField
                onChange={(e) => setNewBase((prev) => ({ ...prev, comment: e.target.value }))}
                className="tableHeader basePadding baseWidth"
                type="text"
                autoComplete="off"
                placeholder="Comment"
                value={newBase.comment || ""}
                label="Com:"
              />
            </TableCell>
          </TableRow>
        </Table>
        <Button onClick={() => createBase([newBase])} variant="outlined">
          {messages.create_base}
        </Button>
        <TextField
          size="small"
          label={messages.search}
          variant="outlined"
          id="Search"
          value={searchForInput}
          onChange={(e) => setSearchForInput(e.target.value?.toLowerCase())}
          onBlur={(e) => {
            setSearch(e.target.value?.toLowerCase()?.trim());
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              setSearch(e.target.value?.toLowerCase()?.trim());
            }
          }}
        />

        <div>
          {/* <table style={{ minWidth: `${currentBases?.length * 358}px`, textAlign: 'center' }}> */}
          <Container style={{ padding: "0px", margin: "1rem 0px 0px" }}>
            <table style={{ textAlign: "center" }}>
              <tbody style={{ display: "flex", flexDirection: "column" }}>
                {filteredBases?.map((item) => (
                  <React.Fragment key={item.id}>
                    <TableRow style={{ height: "100px", marginBottom: "1rem", display: "contents" }}>
                      <TableCell colSpan="3" className="basesTableCell" style={{ textAlign: "center" }}>
                        {item?.region}
                        <br />
                        {item.city_lokal}
                        <br />
                        {item?.institution}
                        <br />
                        {item?.date}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <Base item={item} setCurrentBases={() => null} changeDeleteBases={() => null} forSearch />
                    </TableRow>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default CreateBase;
