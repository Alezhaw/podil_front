import { useAppSelector } from "../../store/reduxHooks";
import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "./Header.styled";
import { FormControl, InputLabel, Menu, MenuItem, Select, Typography, Button, useTheme } from "@mui/material";
import { reducerTypes } from "../../store/Users/types";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header({ theme, setTheme }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useTheme();
  const { locale, country, selectedLang, user } = useAppSelector((store) => store.user);
  const countries = ["RU", "KZ", "PL"];
  const languages = ["EN", "PL", "RU"];
  const [anchorElLogs, setAnchorElLogs] = useState(null);
  const logsMenuOpen = Boolean(anchorElLogs);
  const [logsPage, setLogsPage] = useState("");
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const profileMenuOpen = Boolean(anchorElProfile);

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      users: locale["admin_panel_users"],
      podil: locale["admin_panel_podil"],
      trails: locale["admin_panel_trails"],
      map: locale["admin_panel_map"],
      trails_dictionary: locale["admin_panel_trails_dictionary"],
      edit_trails_dictionary: locale["admin_panel_edit_trails_dictionary"],
      trails_call_template: locale["admin_panel_trails_call_template"],
      trails_cities_with_reg: locale["admin_panel_trails_cities_with_reg"],
      trails_contact_status: locale["admin_panel_trails_contact_status"],
      trails_form: locale["admin_panel_trails_form"],
      trails_planning_person: locale["admin_panel_trails_planning_person"],
      trails_presentation_time: locale["admin_panel_trails_presentation_time"],
      trails_project_concent: locale["admin_panel_trails_project_concent"],
      trails_project_sales: locale["admin_panel_trails_project_sales"],
      trails_regiment: locale["admin_panel_trails_regiment"],
      trails_region: locale["admin_panel_trails_region"],
      trails_reservation_status: locale["admin_panel_trails_reservation_status"],
      bases: locale["admin_panel_bases"],
      speaker: locale["admin_panel_speaker"],
      scenario: locale["admin_panel_scenario"],
      logs: locale["admin_panel_logs"],
      logs_country: locale["logs_country"],
      logs_cities: locale["admin_panel_logs_cities"],
      logs_bases: locale["admin_panel_logs_bases"],
      background: locale["admin_panel_background"],
      language: locale["admin_panel_language"],
    };
  }, [locale]);

  function changeCountry(e) {
    localStorage.setItem("country", e.target.value);
    dispatch({
      type: reducerTypes.GET_COUNTRY,
      payload: e.target.value,
    });
  }

  function changeLanguage(e) {
    const language = e.target.value;
    localStorage.setItem("selected-lang", language);
    dispatch({
      type: reducerTypes.GET_SELECTED_LANG,
      payload: language,
    });
    setAnchorElProfile(null);
  }

  function changeTheme() {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
    setAnchorElProfile(null);
  }

  useEffect(() => {
    let logs = messages.logs;
    switch (true) {
      case window.location.href.includes("logsCities"):
        logs = ` ${messages.logs} ${messages.logs_cities}`;
        break;
      case window.location.href.includes("logsBases"):
        logs = ` ${messages.logs} ${messages.logs_bases}`;
        break;
      default:
    }

    setLogsPage(logs);
    // eslint-disable-next-line
  }, [messages, window.location.href]);

  //if (window.location.href.includes("login")) return null;

  return (
    <HeaderContainer theme={currentTheme}>
      <div className="countrySelect">
        <FormControl variant="outlined" sx={{ m: 1, minWidth: "80px" }} size="small">
          <InputLabel>{messages.logs_country}</InputLabel>
          <Select label={messages.logs_country} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={country} onChange={changeCountry} style={{ textAlign: "center" }}>
            {countries.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="container">
        <Typography className={`button ${window.location.href.includes("users") && "active"}`} variant="body1" component="h2" onClick={() => navigate("users")}>
          {messages.users}
        </Typography>
        <Typography className={`button ${window.location.href.includes("podil") && "active"}`} variant="body1" component="h2" onClick={() => navigate("podil")}>
          {messages.podil}
        </Typography>
        <Typography className={`button ${window.location.href.includes("trails") && "active"}`} variant="body1" component="h2" onClick={() => navigate("trails")}>
          {messages.trails}
        </Typography>
        <Typography className={`button ${window.location.href.includes("dictionary") && "active"}`} variant="body1" component="h2" onClick={() => navigate("dictionary")}>
          {messages.trails_dictionary}
        </Typography>
        <Typography className={`button ${window.location.href.includes("bases") && "active"}`} variant="body1" component="h2" onClick={() => navigate("bases")}>
          {messages.bases}
        </Typography>
        <Typography className={`button ${window.location.href.includes("speaker") && "active"}`} variant="body1" component="h2" onClick={() => navigate("speaker")}>
          {messages.speaker}
        </Typography>
        <Typography className={`button ${window.location.href.includes("scenario") && "active"}`} variant="body1" component="h2" onClick={() => navigate("scenario")}>
          {messages.scenario}
        </Typography>
        <Typography
          className={`button ${window.location.href.includes("logs") && "active"}`}
          variant="body1"
          component="h2"
          onClick={(e) => setAnchorElLogs((prev) => (!!prev ? null : e.currentTarget))}
        >
          {logsPage}
        </Typography>
        <Menu id="basic-menu" anchorEl={anchorElLogs} open={logsMenuOpen} onClose={() => setAnchorElLogs(null)} MenuListProps={{ "aria-labelledby": "basic-button" }}>
          <MenuItem
            onClick={() => {
              navigate("logsCities");
              setLogsPage(` ${messages.logs} ${messages.logs_cities}`);
              setAnchorElLogs(null);
            }}
          >
            {messages.logs_cities}
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("logsBases");
              setLogsPage(` ${messages.logs} ${messages.logs_bases}`);
              setAnchorElLogs(null);
            }}
          >
            {messages.logs_bases}
          </MenuItem>
        </Menu>
        <Typography className={`button ${window.location.href.includes("trailMap") && "active"}`} variant="body1" component="h2" onClick={() => navigate("trailMap")}>
          {messages.map}
        </Typography>
      </div>

      <Button onClick={(e) => setAnchorElProfile((prev) => (!!prev ? null : e.currentTarget))} variant="outlined" sx={{ margin: "8px", position: "absolute", right: "0px" }}>
        <AccountCircleIcon className="userIcon" />
      </Button>
      <Menu id="basic-menu" anchorEl={anchorElProfile} open={profileMenuOpen} onClose={() => setAnchorElProfile(null)} MenuListProps={{ "aria-labelledby": "basic-button" }}>
        <MenuItem
          onClick={() => {
            // navigate("/bases");
            // setAnchorElProfile(null);
          }}
        >
          <FormControl variant="outlined" sx={{ m: 1, minWidth: "80px" }} size="small">
            <InputLabel>{messages.language}</InputLabel>
            <Select
              style={{ textAlign: "center" }}
              label={messages.language}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedLang}
              onChange={changeLanguage}
            >
              {languages.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem onClick={changeTheme}>{theme === "dark" ? <LightModeIcon sx={{ width: "100%" }} /> : <DarkModeIcon sx={{ width: "100%" }} />}</MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/login/true");
            setAnchorElProfile(null);
          }}
        >
          <LogoutIcon sx={{ width: "100%" }} />
        </MenuItem>
      </Menu>
    </HeaderContainer>
  );
}

export default Header;
