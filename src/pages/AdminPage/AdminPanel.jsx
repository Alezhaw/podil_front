import * as React from "react";
import { useState } from "react";
import AllUsers from "./Users/AllUsers";
import { useNavigate } from "react-router-dom";
import AllCitiesRu from "./PodzialRu/AllCitiesRu";
import AllCitiesKz from "./PodzialKz/AllCitiesKz";
import { Menu, MenuItem } from "@mui/material";
import CheckBasesRu from "./CheckBases/CheckBasesRu";
import CheckBasesKz from "./CheckBases/CheckBasesKz";
import CheckSpeakerRu from "./CheckSpeaker/CheckSpeakerRu";
import CheckSpeakerKz from "./CheckSpeaker/CheckSpeakerKz";
import CheckScenarioRu from "./CheckScenario/CheckScenarioRu";
import CheckScenarioKz from "./CheckScenario/CheckScenarioKz";
import LogsCities from "./Logs/LogsCities";
import LogsBases from "./Logs/LogsBases";

function AdminPanel() {
  const [item, setItem] = useState(Number(localStorage.getItem("adminPage")) || null);
  const [statebackground, setStatebackground] = useState(!!localStorage.getItem("backroundImg"));
  const navigate = useNavigate();
  const [basePage, setBasePage] = useState("БАЗЫ");
  const [speakerPage, setSpeakerPage] = useState("ДИКТОР");
  const [scenarioPage, setScenarioPage] = useState("СЦЕНАРИЙ");
  const [logsPage, setLogsPage] = useState("ЛОГИ");
  const [anchorElBase, setAnchorElBase] = useState(null);
  const [anchorElSpeaker, setAnchorElSpeaker] = useState(null);
  const [anchorElScenario, setAnchorElScenario] = useState(null);
  const [anchorElLogs, setAnchorElLogs] = useState(null);
  const baseMenuOpen = Boolean(anchorElBase);
  const speakerMenuOpen = Boolean(anchorElSpeaker);
  const scenarioMenuOpen = Boolean(anchorElScenario);
  const logsMenuOpen = Boolean(anchorElLogs);

  function visibleItem(name) {
    setBasePage(" БАЗЫ ");
    setSpeakerPage(" ДИКТОР ");
    setScenarioPage(" СЦЕНАРИЙ ");
    setLogsPage(" ЛОГИ ");
    setItem(Number(name));
    localStorage.setItem("adminPage", String(name));
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", minHeight: "100vh" }} className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}>
        <div style={{ display: "flex", flexDirection: "column", width: "11%" }} className="panel_user">
          <button onClick={(e) => visibleItem(e.currentTarget.name)} name="0" className={item === 0 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4>ВСЕ ЮЗЕРЫ</h4>
          </button>
          <button onClick={(e) => visibleItem(e.currentTarget.name)} name="7" className={item === 7 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4> ПОДИЛ РУ </h4>
          </button>
          <button onClick={(e) => visibleItem(e.currentTarget.name)} name="8" className={item === 8 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4> ПОДИЛ КЗ </h4>
          </button>
          <button onClick={(e) => setAnchorElBase((prev) => (!!prev ? null : e.currentTarget))} className={item === 9 || item === 10 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4> {basePage} </h4>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElBase}
            open={baseMenuOpen}
            onClose={() => setAnchorElBase(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                visibleItem("9");
                setBasePage(" БАЗЫ РУ");
                setAnchorElBase(null);
              }}
            >
              РОССИЯ
            </MenuItem>
            <MenuItem
              onClick={() => {
                visibleItem("10");
                setBasePage(" БАЗЫ КЗ");
                setAnchorElBase(null);
              }}
            >
              КАЗАХСТАН
            </MenuItem>
          </Menu>
          <button onClick={(e) => setAnchorElSpeaker((prev) => (!!prev ? null : e.currentTarget))} className={item === 11 || item === 12 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4> {speakerPage} </h4>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElSpeaker}
            open={speakerMenuOpen}
            onClose={() => setAnchorElSpeaker(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                visibleItem("11");
                setSpeakerPage(" ДИКТОР РУ");
                setAnchorElSpeaker(null);
              }}
            >
              РОССИЯ
            </MenuItem>
            <MenuItem
              onClick={() => {
                visibleItem("12");
                setSpeakerPage(" ДИКТОР КЗ");
                setAnchorElSpeaker(null);
              }}
            >
              КАЗАХСТАН
            </MenuItem>
          </Menu>

          <button onClick={(e) => setAnchorElScenario((prev) => (!!prev ? null : e.currentTarget))} className={item === 13 || item === 14 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4> {scenarioPage} </h4>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElScenario}
            open={scenarioMenuOpen}
            onClose={() => setAnchorElScenario(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                visibleItem("13");
                setScenarioPage(" СЦЕНАРИЙ РУ");
                setAnchorElScenario(null);
              }}
            >
              РОССИЯ
            </MenuItem>
            <MenuItem
              onClick={() => {
                visibleItem("14");
                setScenarioPage(" СЦЕНАРИЙ КЗ");
                setAnchorElScenario(null);
              }}
            >
              КАЗАХСТАН
            </MenuItem>
          </Menu>

          <button onClick={(e) => setAnchorElLogs((prev) => (!!prev ? null : e.currentTarget))} className={item === 15 || item === 16 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4> {logsPage} </h4>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElLogs}
            open={logsMenuOpen}
            onClose={() => setAnchorElLogs(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                visibleItem("15");
                setLogsPage(" ЛОГИ ГОРОДА");
                setAnchorElLogs(null);
              }}
            >
              ГОРОДА
            </MenuItem>
            <MenuItem
              onClick={() => {
                visibleItem("16");
                setLogsPage(" ЛОГИ БАЗЫ");
                setAnchorElLogs(null);
              }}
            >
              БАЗЫ
            </MenuItem>
          </Menu>
          <button
            onClick={() => {
              localStorage.setItem("backroundImg", !statebackground ? " " : "");
              setStatebackground((prev) => !prev);
            }}
            className={statebackground ? "block_user_panel activ-block-admin" : "block_user_panel"}
          >
            <h4>СМЕНА ФОНА </h4>
          </button>
        </div>
        <div style={{ paddingLeft: "10px" }} className="panel_user">
          {item === 0 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllUsers />
            </div>
          ) : (
            ""
          )}
          {item === 7 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllCitiesRu />
            </div>
          ) : (
            ""
          )}
          {item === 8 ? (
            <div style={{ display: "block" }}>
              <AllCitiesKz />
            </div>
          ) : (
            ""
          )}
          {item === 9 ? (
            <div style={{ display: "block" }}>
              <CheckBasesRu />
            </div>
          ) : (
            ""
          )}
          {item === 10 ? (
            <div style={{ display: "block" }}>
              <CheckBasesKz />
            </div>
          ) : (
            ""
          )}
          {item === 11 ? (
            <div style={{ display: "block" }}>
              <CheckSpeakerRu />
            </div>
          ) : (
            ""
          )}
          {item === 12 ? (
            <div style={{ display: "block" }}>
              <CheckSpeakerKz />
            </div>
          ) : (
            ""
          )}
          {item === 13 ? (
            <div style={{ display: "block" }}>
              <CheckScenarioRu />
            </div>
          ) : (
            ""
          )}
          {item === 14 ? (
            <div style={{ display: "block" }}>
              <CheckScenarioKz />
            </div>
          ) : (
            ""
          )}
          {item === 15 ? (
            <div style={{ display: "block" }}>
              <LogsCities />
            </div>
          ) : (
            ""
          )}
          {item === 16 ? (
            <div style={{ display: "block" }}>
              <LogsBases />
            </div>
          ) : (
            ""
          )}
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px", color: "white" }}>
            <div onClick={() => navigate("/login/true")} className="tabl-flex-admin-button-global2">
              Вернуться назад
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
