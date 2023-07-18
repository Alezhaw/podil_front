import { Button } from "@material-ui/core";

function Base({ item, setCurrentBases, changeDeleteBases, forSearch, forCheckTable, setNewBases }) {
  return (
    <tr style={{ minWidth: "100px", margin: "0px 5px", background: "white", color: "black" }} key={item.id}>
      <td>
        <table>
          <tbody>
            <tr>
              <td colSpan="3" className="basesTableCell" style={{ background: "" }}>
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
                  style={{ width: "120px", maxWidth: "70px" }}
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
              <td colSpan="2" className="basesTableCell">
                <input
                  onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_type: e.target.value } : el)))}
                  className="tableInput"
                  // style={{ width: '120px' }}
                  type="text"
                  style={{ maxWidth: "120px" }}
                  autoComplete="off"
                  value={item.base_type || ""}
                />
              </td>
              <td className="basesTableCell">
                <input
                  onChange={(e) => setCurrentBases((prev) => prev.map((el) => (el.id === item.id ? { ...el, base_sort: e.target.value } : el)))}
                  className="tableInput"
                  style={{ maxWidth: "70px" }} //140 сделать
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
              <td colSpan="3" className="basesTableCell">
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

            {!forSearch ? (
              !forCheckTable ? (
                <tr colSpan="3" className="basesTableCell">
                  <td style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onChange={(e) => null}>
                    <span style={{ position: "relative", left: "15px" }}>Удалить: </span>
                    <input
                      onChange={(e) => changeDeleteBases(e.target.checked, item.id)}
                      className="tableInput"
                      style={{ width: "25px", height: "42px", position: "relative", left: "111px" }}
                      type="checkbox"
                      defaultChecked={false}
                      autoComplete="off"
                    />
                  </td>
                </tr>
              ) : (
                <tr colSpan="3" className="basesTableCell">
                  <th colSpan="3" style={{ height: "42px", verticalAlign: "middle" }}>
                    <Button style={{ fontWeight: 700, fontSize: "16px" }} onClick={() => setNewBases((prev) => prev?.filter((el) => el.id !== item.id))}>
                      Remove
                    </Button>
                  </th>
                </tr>
              )
            ) : null}
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default Base;
