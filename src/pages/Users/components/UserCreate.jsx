import { Form } from "react-bootstrap";
import validator from "validator";
import { useState } from "react";
import { useEffect } from "react";
import { axiosRegistration } from "../../../api/user";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { useAppSelector } from "../../../store/reduxHooks";
import { Button, Typography, useTheme } from "@mui/material";

function UserCreate({ setIsOpen, getAllUsers }) {
  const dispatch = useDispatch();
  const { user } = useAppSelector((store) => store.user);
  const theme = useTheme();
  const [nickname, setNickname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordV2, setPasswordV2] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email is empty");
  const [passwordError, setPasswordError] = useState("Password is empty");
  const [passwordNoChect, setpasswordNoChect] = useState("Password is empty");
  const [checked, setChecked] = useState(false);
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
      setEmailError("Email is incorrect");
    } else {
      setEmailError("");
    }
  }

  function passwordUser(e) {
    setPassword(e.currentTarget.value);
    if (!validator.isStrongPassword(e.currentTarget.value, { minSymbols: 0, minUppercase: 0 })) {
      setPasswordError("Minimum length 8 and minimum 1 number");
      if (!e.currentTarget.value) {
        setPasswordError("Password is empty");
      }
    } else {
      setPasswordError("");
    }
  }

  function passwordV2User(a) {
    setPasswordV2(a.currentTarget.value);
    if (!validator.isStrongPassword(a.currentTarget.value, { minSymbols: 0, minUppercase: 0 })) {
      setpasswordNoChect("Password is incorrect");
      if (!a.currentTarget.value) {
        setpasswordNoChect("Password is empty");
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
      getAllUsers();
      console.log("success");
    }
    if (typeof result !== "string");
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

  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modalContentStyles styledScroll"
        style={{
          background: theme.palette.mode === "light" ? "#F3F1F2" : "#1b1b1d",
          color: theme.palette.text.primary,
          alignItems: "baseline",
          position: "relative",
          maxHeight: "80vh",
          //width: "80vh",
          overflow: "auto",
        }}
      >
        <h3>Create User</h3>
        <hr className="hr-viss" />
        <Form className="width-form">
          <Form.Group controlId="formBasicEmailV1">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              onChange={(e) => {
                changeNickname(e);
                cheakLengthLogin(e);
              }}
              type="text"
              placeholder=""
            />
            {errorLogin ? <div style={{ color: "red" }}>{errorLogin}</div> : ""}
            {errorLoginLength ? <div style={{ color: "red" }}>{errorLoginLength}</div> : ""}
            <Form.Text className="text-muted">Use only latin symbols</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmailV2">
            <Form.Label>Email:</Form.Label>
            <Form.Control onBlur={(e) => blurHandler(e)} name="login" value={login} onChange={loginUser} type="email" placeholder="" />
            {errorEmail ? <div style={{ color: "red" }}>{errorEmail}</div> : ""}
            {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordV1">
            <Form.Label>Password:</Form.Label>
            <Form.Control onBlur={(e) => blurHandler(e)} name="password" onChange={passwordUser} type="password" placeholder="" />
            {passwordDirty && passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
          </Form.Group>
          <Form.Group controlId="formBasicPasswordV2">
            <Form.Label>Condirm password:</Form.Label>
            <Form.Control value={passwordV2} onChange={passwordV2User} type="password" placeholder="" />
            {passwordNoChect && <Typography style={{ color: "red" }}>{passwordNoChect}</Typography>}
          </Form.Group>

          <Button disabled={!formValid} onClick={(e) => getUsers(e)}>
            Create
          </Button>
          <Button onClick={(e) => setIsOpen(false)}>Back</Button>
        </Form>
      </div>
    </div>
  );
}

export default UserCreate;
