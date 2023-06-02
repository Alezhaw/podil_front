import CloseIcon from "@mui/icons-material/Close";
import Base from "./Base";
import { Container } from "@material-ui/core";
import { StyledInput } from "../../../style/styles";
import { useEffect, useState } from "react";

function CreateBase({ setIsOpen, newBase, setNewBase, createBase, cities, bases, currentBases }) {
  const [search, setSearch] = useState("");
  const [filteredBases, setFilteredBases] = useState([]);

  useEffect(() => {
    const temporaryBases = cities
      ?.filter((el, i, ar) => (search ? el?.miasto_lokal?.toLowerCase()?.includes(search) : false))
      ?.filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
      ?.map((el) => ({ id_for_base: el.id_for_base, miasto_lokal: el.miasto_lokal }))
      ?.map((city) => bases.filter((base) => Number(base?.id_for_base) === Number(city.id_for_base))?.map((base) => ({ ...base, miasto_lokal: city.miasto_lokal })))
      ?.flat()
      ?.filter((base) => !currentBases.filter((item) => item.base_id === base.base_id)[0]);

    const finalBases = !!temporaryBases[0]
      ? temporaryBases
      : bases
          ?.filter((item) => (search ? item?.base_id?.toLowerCase()?.includes(search?.toLowerCase()) : false))
          ?.map((base) => ({ ...base, miasto_lokal: cities?.filter((city) => Number(city.id_for_base) === Number(base.id_for_base))[0]?.miasto_lokal }));

    setFilteredBases(finalBases);
  }, [cities, search, bases, currentBases]);

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.9)" }} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", width: "59%", flexDirection: "row-reverse" }}>
        <CloseIcon style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}></CloseIcon>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
        <div style={{ minWidth: "100px", margin: "0px 5px", textAlign: "center", background: "white", color: "black" }}>
          <tr>
            <td colspan="3" className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_id: e.target.value }))}
                className="tableInput"
                //style={{ width: '50px' }}
                type="text"
                autoComplete="off"
                placeholder="ID"
                value={newBase.base_id || ""}
              />
            </td>
          </tr>
          <tr>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_stat_1: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="text"
                autoComplete="off"
                placeholder="стат 1"
                value={newBase.base_stat_1 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_stat_2: e.target.value }))}
                className="tableInput"
                style={{ width: "120px" }}
                type="text"
                autoComplete="off"
                placeholder="стат 2"
                value={newBase.base_stat_2 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_stat_3: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="text"
                autoComplete="off"
                placeholder="стат 3"
                value={newBase.base_stat_3 || ""}
              />
            </td>
          </tr>
          <tr>
            <td colspan="2" className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_type: e.target.value }))}
                className="tableInput"
                // style={{ width: '120px' }}
                type="text"
                autoComplete="off"
                placeholder="Тип"
                value={newBase.base_type || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_sort: e.target.value }))}
                className="tableInput"
                style={{ maxWidth: "120px" }} //140 сделать
                type="text"
                autoComplete="off"
                placeholder="сорт из"
                value={newBase.base_sort || ""}
              />
            </td>
          </tr>
          <tr>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_sogl_1: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="number"
                autoComplete="off"
                placeholder="согл 1"
                value={newBase.base_sogl_1 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_sogl_2: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="number"
                autoComplete="off"
                placeholder="согл 2"
                value={newBase.base_sogl_2 || ""}
              />
            </td>
            <td className="basesTableCell">
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_sogl_3: e.target.value }))}
                className="tableInput"
                style={{ width: "50px" }}
                type="number"
                autoComplete="off"
                placeholder="согл 3"
                value={newBase.base_sogl_3 || ""}
              />
            </td>
          </tr>
          <tr>
            <td colspan="3" className="basesTableCell">
              {" "}
              Ком:{" "}
              <input
                onChange={(e) => setNewBase((prev) => ({ ...prev, base_comment: e.target.value }))}
                className="tableInput"
                //style={{ width: '50px' }}
                type="text"
                autoComplete="off"
                placeholder="комментарий"
                value={newBase.base_comment || ""}
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
          value={search}
          placeholder="Поиск"
          onChange={(e) => setSearch(e.target.value?.toLowerCase())}
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
                      <td colspan="3" className="basesTableCell" style={{ background: "", maxWidth: "354px" }}>
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
