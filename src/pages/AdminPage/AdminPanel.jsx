import * as React from "react";
import { useEffect, useState, useRef } from "react";
import AllDeposit from "./Refills/AllDeposit";
import AllDeals from "./Deals/AllDeals";
import AllUsers from "./Users/AllUsers";
import AllTransfers from "./Transfers/AllTransfers";
import { useAppSelector } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import SetNameTheSite from "./SiteProps/SiteProps";
import io from "socket.io-client";
import AllChats from "./Chats/AllChats";
import { axiosGetAdminChats } from "../../api/adminChat";
import { axiosGetAllDeal } from "../../api/deal";
import { check } from "../../api/user";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import sound from "../../sound/newMessage.mp3";
import BotAdmin from "./SettingBot/BotAdmin";
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

export const socketAdmin = io.connect(`https://back-nnk5.onrender.com`);

function AdminPanel() {
  const dispatch = useDispatch();
  const [item, setItem] = useState();
  const [checkNewMessage, setCheckNewMessage] = useState(false); // позже будет добавлять чаты
  const [statebackground, setStatebackground] = useState(!!localStorage.getItem("backroundImg"));
  const { user, adminChat } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const audioPlayer = useRef(null);
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

  async function auth() {
    const getUsers = await check();
    dispatch({
      type: reducerTypes.GET_USER,
      payload: getUsers,
    });
  }

  function playAudio() {
    try {
      if (audioPlayer) {
        audioPlayer.current.play();
      }
    } catch {
      console.log("Ошибка воспроизведения аудио, обновите страницу");
    }
  }

  async function getAllDeals() {
    const data = await axiosGetAllDeal();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_DEALS,
        payload: data,
      });
    }
  }

  async function getAllChats() {
    if (!user?.email) return auth();
    const data = await axiosGetAdminChats(user?.email, user?.password);
    if (data) {
      dispatch({
        type: reducerTypes.GET_ADMIN_CHAT,
        payload: data,
      });
    }
  }

  function visibleItem(name) {
    setBasePage(" БАЗЫ ");
    setSpeakerPage(" ДИКТОР ");
    setScenarioPage(" СЦЕНАРИЙ ");
    setLogsPage(" ЛОГИ ");
    setItem(Number(name));
  }

  useEffect(() => {
    setCheckNewMessage(adminChat.some((item) => item.newMessage === 1));
    // eslint-disable-next-line
  }, [adminChat]);

  useEffect(() => {
    socketAdmin.on("newMessage", ({ data }) => {
      if (data) {
        getAllChats();
      }
    });
    socketAdmin.on("newMessage", ({ data }) => {
      playAudio();
    });
    socketAdmin.on("changeDealStatus", ({ data }) => {
      if (data?.check) getAllDeals();
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user?.role) {
      navigate("/login");
    }
    getAllDeals();
    getAllChats();
    if (user?.email) {
      socketAdmin.emit("join", { name: "1", room: "1" });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <audio ref={audioPlayer} src={sound} />
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
          {item === 1 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllDeals />
            </div>
          ) : (
            ""
          )}
          {item === 2 ? (
            <div style={{ display: "block" }}>
              <AllDeposit />
            </div>
          ) : (
            ""
          )}
          {item === 3 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllTransfers />
            </div>
          ) : (
            ""
          )}
          {item === 4 ? (
            <div style={{ display: "block", width: "100%" }}>
              <AllChats />
            </div>
          ) : (
            ""
          )}
          {item === 5 ? (
            <div style={{ display: "block" }}>
              <SetNameTheSite />
            </div>
          ) : (
            ""
          )}
          {item === 6 ? (
            <div style={{ display: "block" }}>
              <BotAdmin />
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
