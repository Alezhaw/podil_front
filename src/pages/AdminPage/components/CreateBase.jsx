import CloseIcon from "@mui/icons-material/Close";
import Base from "./Base";
import { Container } from "@material-ui/core";
import { StyledInput } from "../../../style/styles";
import { useEffect, useState } from "react";

function CreateBase({ setIsOpen, newBase, setNewBase, createBase, getFilteredBases, country }) {
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
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.9)" }} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", width: "59%", flexDirection: "row-reverse" }}>
        <CloseIcon style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}></CloseIcon>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
        <div style={{ minWidth: "100px", margin: "0px 5px", textAlign: "center", background: "white", color: "black" }}>
          <tr>
            <td colSpan="3" className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, podzial_id: e.target.value }))}
                className="tableInput"
                //style={{ width: '50px' }}
                type="text"
                autoComplete="off"
                placeholder="ID"
                value={newBase.podzial_id || ""}
              />
            </td>
          </tr>
          <tr>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, stat_1: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="text"
                autoComplete="off"
                placeholder="стат 1"
                value={newBase.stat_1 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, stat_2: e.target.value }))}
                className="tableInput"
                style={{ width: "120px" }}
                type="text"
                autoComplete="off"
                placeholder="стат 2"
                value={newBase.stat_2 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, stat_3: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="text"
                autoComplete="off"
                placeholder="стат 3"
                value={newBase.stat_3 || ""}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, type: e.target.value }))}
                className="tableInput"
                // style={{ width: '120px' }}
                type="text"
                autoComplete="off"
                placeholder="Тип"
                value={newBase.type || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, sort: e.target.value }))}
                className="tableInput"
                style={{ maxWidth: "120px" }} //140 сделать
                type="text"
                autoComplete="off"
                placeholder="сорт из"
                value={newBase.sort || ""}
              />
            </td>
          </tr>
          <tr>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, sogl_1: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="number"
                autoComplete="off"
                placeholder="согл 1"
                value={newBase.sogl_1 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, sogl_2: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="number"
                autoComplete="off"
                placeholder="согл 2"
                value={newBase.sogl_2 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, sogl_3: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="number"
                autoComplete="off"
                placeholder="согл 3"
                value={newBase.sogl_3 || ""}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="3" className="basesTableCell">
              {" "}
              Ком:{" "}
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, comment: e.target.value }))}
                className="tableInput"
                //style={{ width: '50px' }}
                type="text"
                autoComplete="off"
                placeholder="комментарий"
                value={newBase.comment || ""}
              />
            </td>
          </tr>
        </div>
        <div className="tabl-flex-admin-button-global2" onClick={() => createBase([newBase])}>
          Создать Базу
        </div>
        <StyledInput
          className="tabl-flex-admin-search"
          style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
          type="search"
          id="Search"
          value={searchForInput}
          placeholder="Поиск"
          onChange={(e) => setSearchForInput(e.target.value?.toLowerCase())}
          onBlur={(e) => {
            setSearch(e.target.value?.toLowerCase()?.trim());
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              setSearch(e.target.value?.toLowerCase()?.trim());
            }
          }}
          autoComplete="off"
          required
        />
        <div style={{ overflow: "auto" }}>
          {/* <table style={{ minWidth: `${currentBases?.length * 358}px`, textAlign: 'center' }}> */}
          <Container style={{ padding: "0px", margin: "20px 0px 0px" }}>
            <table style={{ textAlign: "center" }}>
              <tbody style={{ display: "flex", flexDirection: "row" }}>
                {filteredBases?.map((item) => (
                  <div style={{ marginBottom: "20px" }}>
                    <tr style={{ height: "100px" }}>
                      <td colSpan="3" className="basesTableCell" style={{ background: "", maxWidth: "354px" }}>
                        {item.miasto_lokal}
                      </td>
                    </tr>
                    <Base item={item} setCurrentBases={() => null} changeDeleteBases={() => null} forSearch />
                  </div>
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
