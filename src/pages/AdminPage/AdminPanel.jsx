import * as React from "react";
import { useState } from "react";
import AllUsers from "./Users/AllUsers";
import { useNavigate } from "react-router-dom";
import AllCities from "./Podzial/AllCities";
import { Menu, MenuItem } from "@mui/material";
import CheckBases from "./CheckBases/CheckBases";
import CheckSpeaker from "./CheckSpeaker/CheckSpeaker";
import CheckScenario from "./CheckScenario/CheckScenario";
import LogsCities from "./Logs/LogsCities";
import LogsBases from "./Logs/LogsBases";
import MenuItemForPanel from "./components/MenuItemForPanel";

function AdminPanel() {
  const [item, setItem] = useState(Number(localStorage.getItem("adminPage")) || 7);
  const [statebackground, setStatebackground] = useState(!!localStorage.getItem("backroundImg"));
  const navigate = useNavigate();
  const countries = ["RU", "KZ", "PL"];
  const [anchorElDivision, setAnchorElDivision] = useState(null);
  const [anchorElBase, setAnchorElBase] = useState(null);
  const [anchorElSpeaker, setAnchorElSpeaker] = useState(null);
  const [anchorElScenario, setAnchorElScenario] = useState(null);
  const [anchorElLogs, setAnchorElLogs] = useState(null);
  const divisionMenuOpen = Boolean(anchorElDivision);
  const baseMenuOpen = Boolean(anchorElBase);
  const speakerMenuOpen = Boolean(anchorElSpeaker);
  const scenarioMenuOpen = Boolean(anchorElScenario);
  const logsMenuOpen = Boolean(anchorElLogs);
  const divisionItems = [7, 8, 20];
  const baseItems = [9, 10, 17];
  const speakerItems = [11, 12, 18];
  const scenarioItems = [13, 14, 19];

  const [divisionPage, setDivisionPage] = useState(getTitleWithCountry("PODZIAL", countries, item, divisionItems));
  const [basePage, setBasePage] = useState(getTitleWithCountry("BASES", countries, item, baseItems));
  const [speakerPage, setSpeakerPage] = useState(getTitleWithCountry("SPEAKER", countries, item, speakerItems));
  const [scenarioPage, setScenarioPage] = useState(getTitleWithCountry("SCENARIO", countries, item, scenarioItems));
  const [logsPage, setLogsPage] = useState(item === 15 ? "LOGS CITIES" : item === 16 ? "LOGS BASES" : "LOGS");

  function getTitleWithCountry(title, countries, item, itemCount) {
    countries = itemCount.map((el, index) => ({
      count: itemCount[index],
      title: `${title} ${countries[index]}`,
    }));
    return countries.filter((el) => el.count === item)[0]?.title || title;
  }

  function visibleItem(name) {
    setDivisionPage(" PODZIAL ");
    setBasePage(" BASES ");
    setSpeakerPage(" SPEAKER ");
    setScenarioPage(" SCENARIO ");
    setLogsPage(" LOGS ");
    setItem(Number(name));
    // navigate(`/adminPanel/${name}`)
    localStorage.setItem("adminPage", String(name));
  }

  function getPage(item) {
    switch (item) {
      case 0:
        return (
          <div style={{ display: "block", width: "100%" }}>
            <AllUsers />
          </div>
        );
      case 7:
        return (
          <div style={{ display: "block", width: "100%" }}>
            <AllCities country="RU" />
          </div>
        );
      case 8:
        return (
          <div style={{ display: "block" }}>
            <AllCities country="KZ" />
          </div>
        );
      case 20:
        return (
          <div style={{ display: "block" }}>
            <AllCities country="PL" />
          </div>
        );
      case 9:
        return (
          <div style={{ display: "block" }}>
            <CheckBases country="RU" />
          </div>
        );
      case 10:
        return (
          <div style={{ display: "block" }}>
            <CheckBases country="KZ" />
          </div>
        );
      case 17:
        return (
          <div style={{ display: "block" }}>
            <CheckBases country="PL" />
          </div>
        );
      case 11:
        return (
          <div style={{ display: "block" }}>
            <CheckSpeaker country="RU" />
          </div>
        );
      case 12:
        return (
          <div style={{ display: "block" }}>
            <CheckSpeaker country="KZ" />
          </div>
        );
      case 18:
        return (
          <div style={{ display: "block" }}>
            <CheckSpeaker country="PL" />
          </div>
        );
      case 13:
        return (
          <div style={{ display: "block" }}>
            <CheckScenario country="RU" />
          </div>
        );
      case 14:
        return (
          <div style={{ display: "block" }}>
            <CheckScenario country="KZ" />
          </div>
        );
      case 19:
        return (
          <div style={{ display: "block" }}>
            <CheckScenario country="PL" />
          </div>
        );
      case 15:
        return (
          <div style={{ display: "block" }}>
            <LogsCities />
          </div>
        );
      case 16:
        return (
          <div style={{ display: "block" }}>
            <LogsBases />
          </div>
        );
      default:
        <></>;
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex", minHeight: "100vh" }} className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}>
        <div style={{ display: "flex", flexDirection: "column", width: "11%" }} className="panel_user">
          <button onClick={(e) => visibleItem(e.currentTarget.name)} name="0" className={item === 0 ? "block_user_panel activ-block-admin" : "block_user_panel"}>
            <h4>ALL USERS</h4>
          </button>
          <button
            onClick={(e) => setAnchorElDivision((prev) => (!!prev ? null : e.currentTarget))}
            className={divisionItems.filter((el) => item === el)[0] ? "block_user_panel activ-block-admin" : "block_user_panel"}
          >
            <h4> {divisionPage} </h4>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElDivision}
            open={divisionMenuOpen}
            onClose={() => setAnchorElDivision(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {divisionItems.map((el, index) => (
              <MenuItemForPanel title="PODZIAL" el={el} index={index} countries={countries} visibleItem={visibleItem} setPage={setDivisionPage} setAnchorEl={setAnchorElDivision} />
            ))}
          </Menu>
          <button
            onClick={(e) => setAnchorElBase((prev) => (!!prev ? null : e.currentTarget))}
            className={baseItems.filter((el) => item === el)[0] ? "block_user_panel activ-block-admin" : "block_user_panel"}
          >
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
            {baseItems.map((el, index) => (
              <MenuItemForPanel title="BASES" el={el} index={index} countries={countries} visibleItem={visibleItem} setPage={setBasePage} setAnchorEl={setAnchorElBase} />
            ))}
          </Menu>
          <button
            onClick={(e) => setAnchorElSpeaker((prev) => (!!prev ? null : e.currentTarget))}
            className={speakerItems.filter((el) => item === el)[0] ? "block_user_panel activ-block-admin" : "block_user_panel"}
          >
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
            {speakerItems.map((el, index) => (
              <MenuItemForPanel title="SPEAKER" el={el} index={index} countries={countries} visibleItem={visibleItem} setPage={setSpeakerPage} setAnchorEl={setAnchorElSpeaker} />
            ))}
          </Menu>

          <button
            onClick={(e) => setAnchorElScenario((prev) => (!!prev ? null : e.currentTarget))}
            className={scenarioItems.filter((el) => item === el)[0] ? "block_user_panel activ-block-admin" : "block_user_panel"}
          >
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
            {scenarioItems.map((el, index) => (
              <MenuItemForPanel title="SCENARIO" el={el} index={index} countries={countries} visibleItem={visibleItem} setPage={setScenarioPage} setAnchorEl={setAnchorElScenario} />
            ))}
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
                setLogsPage(" LOGS CITIES");
                setAnchorElLogs(null);
              }}
            >
              CITIES
            </MenuItem>
            <MenuItem
              onClick={() => {
                visibleItem("16");
                setLogsPage(" LOGS BASES");
                setAnchorElLogs(null);
              }}
            >
              BASES
            </MenuItem>
          </Menu>
          <button
            onClick={() => {
              localStorage.setItem("backroundImg", !statebackground ? " " : "");
              setStatebackground((prev) => !prev);
            }}
            className={statebackground ? "block_user_panel" : "block_user_panel"}
          >
            <h4>СМЕНА ФОНА </h4>
          </button>
        </div>
        <div style={{ paddingLeft: "10px" }} className="panel_user">
          {getPage(item)}
          {/* {item === 0 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllUsers />
            </div>
          ) : (
            ""
          )}
          {item === 7 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllCities country="RU" />
            </div>
          ) : (
            ""
          )}
          {item === 8 ? (
            <div style={{ display: "block" }}>
              <AllCities country="KZ" />
            </div>
          ) : (
            ""
          )}
          {item === 9 ? (
            <div style={{ display: "block" }}>
              <CheckBases country="RU" />
            </div>
          ) : (
            ""
          )}
          {item === 10 ? (
            <div style={{ display: "block" }}>
              <CheckBases country="KZ" />
            </div>
          ) : (
            ""
          )}
          {item === 17 ? (
            <div style={{ display: "block" }}>
              <CheckBases country="PL" />
            </div>
          ) : (
            ""
          )}
          {item === 11 ? (
            <div style={{ display: "block" }}>
              <CheckSpeaker country="RU" />
            </div>
          ) : (
            ""
          )}
          {item === 12 ? (
            <div style={{ display: "block" }}>
              <CheckSpeaker country="KZ" />
            </div>
          ) : (
            ""
          )}
          {item === 18 ? (
            <div style={{ display: "block" }}>
              <CheckSpeaker country="PL" />
            </div>
          ) : (
            ""
          )}
          {item === 13 ? (
            <div style={{ display: "block" }}>
              <CheckScenario country="RU" />
            </div>
          ) : (
            ""
          )}
          {item === 14 ? (
            <div style={{ display: "block" }}>
              <CheckScenario country="KZ" />
            </div>
          ) : (
            ""
          )}
          {item === 19 ? (
            <div style={{ display: "block" }}>
              <CheckScenario country="PL" />
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
          )} */}
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
