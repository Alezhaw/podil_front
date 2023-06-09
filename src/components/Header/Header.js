import { Link, useLocation } from "react-router-dom";
import "../../style/header.css";
import { useAppSelector } from "../../store/reduxHooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { check } from "../../api/user";

function Header() {
  const { state } = useLocation();
  const { user } = useAppSelector((store) => store.user);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  function clickArrowdown() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  async function auth() {
    const getUsers = await check();
    dispatch({
      type: reducerTypes.GET_USER,
      payload: getUsers,
    });
  }

  async function getUsers(e) {
    dispatch({
      type: reducerTypes.GET_USER,
      payload: {},
    });
  }

  async function logOut(e) {
    getUsers();
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const checkLocation = window.location.href.includes("registr") || window.location.href.includes("login");
    if (!user?.email && !checkLocation) {
      auth();
    }
    // eslint-disable-next-line
  }, []);

  if (window.location.href.includes("adminPanel")) return null;

  return (
    <>
      <div className="navbar-header">
        <div className="nav-main-header">
          {user?.id ? (
            <div className="header-navBar" style={{ marginLeft: "25px", display: "flex", width: "666px", justifyContent: "space-between", alignItems: "center" }}></div>
          ) : (
            <div className="flex-nav-link header-navBar"></div>
          )}
        </div>
        {user?.id ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link onClick={clickArrowdown} className="color-nav-link color" to="#" style={{ display: "flex", flexDirection: "row" }}>
              {user.nickname}
            </Link>
            <KeyboardArrowDownIcon onClick={clickArrowdown} className={!checked ? "hoverArrow" : "transformArrow"}></KeyboardArrowDownIcon>
            <div onClick={(e) => e.stopPropagation()} className={checked ? "user-profile-block js-profile-block_open active" : "user-profile-block js-profile-block_open"}>
              <ul className="nav-detail_list">
                {user?.role === "USER" || null || "" ? (
                  ""
                ) : (
                  <li className="nav-detail_item">
                    <Link className="nav-detail_link" to="/adminPanel">
                      Админ панель
                    </Link>
                  </li>
                )}
                {/* <li className="nav-detail_item"><Link className="nav-detail_link" to="/systemmessages">Системные сообщения {(bellState && !checkReadMessage) || (user?.systemMessage === 'true' && !checkReadMessage) ? <NotificationsNoneIcon className="bell-color"></NotificationsNoneIcon> : ''}</Link></li> */}
                {/* <li className="nav-detail_item"><Link className="nav-detail_link" to="/settings">Мои настройки</Link></li> */}
                <li className="nav-detail_item border-exit">
                  <Link onClick={logOut} className="nav-detail_link" to="/">
                    Выход
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex-nav-link-registr ">
            <Link className="color-nav-link color" to="/login" style={{ display: "flex", flexDirection: "row" }}>
              Войти <div style={{ width: "1px", height: "12px", border: "0.5px solid rgb(170, 170, 171)", position: "relative", left: "12.5px", top: "6px" }}></div>
            </Link>
            <Link className="color-nav-link color" to="/registr">
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
