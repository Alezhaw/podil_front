import Checkbox from "@mui/material/Checkbox";

function Base({ item, setCurrentBases, changeDeleteBases }) {
  return (
    <div style={{ minWidth: "100px", margin: "0px 5px" }} key={item.id}>
      <tr>
        <td colspan="3" className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_id: e.target.value } : el)))}
            className="tableInput"
            //style={{ width: '50px' }}
            type="text"
            autoComplete="off"
            value={item.base_id || ""}
          />
        </td>
      </tr>
      <tr>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_stat_1: e.target.value } : el)))}
            className="tableInput"
            style={{ width: "50px" }}
            type="text"
            autoComplete="off"
            value={item.base_stat_1 || ""}
          />
        </td>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_stat_2: e.target.value } : el)))}
            className="tableInput"
            style={{ width: "120px" }}
            type="text"
            autoComplete="off"
            value={item.base_stat_2 || ""}
          />
        </td>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_stat_3: e.target.value } : el)))}
            className="tableInput"
            style={{ width: "50px" }}
            type="text"
            autoComplete="off"
            value={item.base_stat_3 || ""}
          />
        </td>
      </tr>
      <tr>
        <td colspan="2" className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_type: e.target.value } : el)))}
            className="tableInput"
            // style={{ width: '120px' }}
            type="text"
            autoComplete="off"
            value={item.base_type || ""}
          />
        </td>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_sort: e.target.value } : el)))}
            className="tableInput"
            style={{ maxWidth: "120px" }} //140 сделать
            type="text"
            autoComplete="off"
            value={item.base_sort || ""}
          />
        </td>
      </tr>
      <tr>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_sogl_1: e.target.value } : el)))}
            className="tableInput"
            style={{ width: "50px" }}
            type="number"
            autoComplete="off"
            value={item.base_sogl_1 || ""}
          />
        </td>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_sogl_2: e.target.value } : el)))}
            className="tableInput"
            style={{ width: "50px" }}
            type="number"
            autoComplete="off"
            value={item.base_sogl_2 || ""}
          />
        </td>
        <td className="basesTableCell">
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_sogl_3: e.target.value } : el)))}
            className="tableInput"
            style={{ width: "50px" }}
            type="number"
            autoComplete="off"
            value={item.base_sogl_3 || ""}
          />
        </td>
      </tr>
      <tr>
        <td colspan="3" className="basesTableCell">
          {" "}
          Ком:{" "}
          <input
            onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_comment: e.target.value } : el)))}
            className="tableInput"
            //style={{ width: '50px' }}
            type="text"
            autoComplete="off"
            value={item.base_comment || ""}
          />
        </td>
      </tr>
      <tr colspan="3" className="basesTableCell">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onChange={(e) => null}>
          <span style={{ position: "relative", left: "15px" }}>Удалить: </span>
          <input
            onChange={(e) => changeDeleteBases(e.target.checked, item.id)}
            className="tableInput"
            style={{ width: "25px", height: "42px", position: "relative", left: "111px" }}
            type="checkbox"
            defaultChecked={false}
            autoComplete="off"
          />
        </div>
      </tr>
    </div>
  );
}

export default Base;
