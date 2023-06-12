import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import validator from "validator";
import { useState } from "react";
import { useEffect } from "react";
import { axiosRegistration } from "../../api/user";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";

function UserRegistr() {
  const dispatch = useDispatch();
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV2, setPasswordV2] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
  const [passwordNoChect, setpasswordNoChect] = useState("Пароль не может быть пустым");
  const [checked, setChecked] = useState(true);
  const [formValid, setFormValid] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [errorLoginLength, setEerrorLoginLength] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const blurHandler = (e) => {
    switch (e.currentTarget.name) {
      case "login":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
    }
  };

  function cheakLengthLogin(e) {
    if (e.currentTarget.value.length < 5) {
      setErrorLogin("Минимум 5 символов");
    } else {
      setErrorLogin("");
    }
  }

  function changeNickname(e) {
    const pattern = /^[a-zA-Z0-9]+$/;
    setNickname(e.currentTarget.value);
    if (pattern.test(e.currentTarget.value) || e.currentTarget.value === "") {
      setEerrorLoginLength("");
    } else {
      setEerrorLoginLength("Некорректные символы");
    }
  }

  function loginUser(e) {
    setLogin(e.currentTarget.value);
    setErrorEmail("");
    if (!validator.isEmail(e.currentTarget.value)) {
      setEmailError("Некоректный email");
    } else {
      setEmailError("");
    }
  }

  function passwordUser(e) {
    setPassword(e.currentTarget.value);
    if (!validator.isStrongPassword(e.currentTarget.value, { minSymbols: 0, minUppercase: 0 })) {
      setPasswordError("Минимальная длина 8 и минимум 1 цифра");
      if (!e.currentTarget.value) {
        setPasswordError("Пароль не может быть пустым");
      }
    } else {
      setPasswordError("");
    }
  }

  function passwordV2User(a) {
    setPasswordV2(a.currentTarget.value);
    if (!validator.isStrongPassword(a.currentTarget.value, { minSymbols: 0, minUppercase: 0 })) {
      setpasswordNoChect("Некоректный пароль");
      if (!a.currentTarget.value) {
        setpasswordNoChect("Пароль не может быть пустым");
      }
    } else {
      setpasswordNoChect("");
    }
  }

  function offReserch(e) {
    e.preventDefault();
  }

  async function getUsers(e) {
    offReserch(e);
    let checkRu = "false";
    let res = await fetch("https://api.db-ip.com/v2/free/self");
    let data = await res.json();
    if (data?.countryCode === "RU") checkRu = "true";
    const result = await axiosRegistration(login, password, nickname, checkRu);
    if (typeof result === "string") {
      result === "Пользователь с таким email уже существует" ? setErrorEmail(result) : setErrorLogin(result);
    } else {
      dispatch({
        type: reducerTypes.GET_USER,
        payload: result,
      });
    }
    if (typeof result !== "string") navigate("/");
  }

  useEffect(() => {
    if (password === passwordV2) {
      setpasswordNoChect();
    } else {
      setpasswordNoChect("Пароли не совпадают");
    }
  }, [password, passwordV2]);

  useEffect(() => {
    if (emailError || passwordError || passwordNoChect || checked || errorLogin || errorLoginLength) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, errorLogin, passwordError, passwordNoChect, checked, errorLoginLength]);

  useEffect(() => {
    if (user?.email === undefined) {
      navigate("/registr");
    } else {
      navigate("/adminPanel");
    }
  }, [user?.email, navigate, user]);

  return (
    <div className="bg-img">
      <div style={{ paddingTop: "30px", paddingBottom: "30px", minHeight: "75vh" }} className="container">
        <h3 className="header-inner_title login-inner_title">Регистрация</h3>
        <hr className="hr-viss" />
        <Form className="width-form">
          <Form.Group className="mb-3" controlId="formBasicEmailV1">
            <Form.Label className="color-input-name">Имя пользователя</Form.Label>
            <Form.Control
              name="nickname"
              value={nickname}
              onChange={(e) => {
                changeNickname(e);
                cheakLengthLogin(e);
              }}
              type="text"
              placeholder=""
            />
            {errorLogin ? <div style={{ color: "red" }}>{errorLogin}</div> : ""}
            {errorLoginLength ? <div style={{ color: "red" }}>{errorLoginLength}</div> : ""}
            <Form.Text className="text-muted">Пожалуйста, используйте только латинские буквы.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmailV2">
            <Form.Label className="color-input-name">Действующий e-mail:</Form.Label>
            <Form.Control onBlur={(e) => blurHandler(e)} name="login" value={login} onChange={loginUser} type="email" placeholder="" />
            {errorEmail ? <div style={{ color: "red" }}>{errorEmail}</div> : ""}
            {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordV1">
            <Form.Label className="color-input-name">Пароль:</Form.Label>
            <Form.Control onBlur={(e) => blurHandler(e)} name="password" value={password} onChange={passwordUser} type="password" placeholder="" />
            {passwordDirty && passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordV2">
            <Form.Label className="color-input-name">Подтвердить пароль:</Form.Label>
            <Form.Control value={passwordV2} onChange={passwordV2User} type="password" placeholder="" />
            {passwordNoChect && <div style={{ color: "red" }}>{passwordNoChect}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div style={{ display: "flex" }}>
              <Form.Check checked={!checked} onChange={() => setChecked(!checked)} style={{ marginRight: "5px" }} type="checkbox" />
              <span style={{ color: "white" }}>Принять</span>
            </div>
          </Form.Group>
          <button disabled={!formValid} onClick={(e) => getUsers(e)} className="btn-class-v2">
            Отправить
          </button>
        </Form>
      </div>
    </div>
  );
}

export default UserRegistr;
