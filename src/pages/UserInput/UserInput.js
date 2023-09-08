import { Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosLogin } from "../../api/user";
import { reducerTypes } from "../../store/Users/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";

function UserInput() {
  const dispatch = useDispatch();
  const { user } = useAppSelector((store) => store.user);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Login is empty");
  const [passwordError, setPasswordError] = useState("Password is empty");
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const { logout } = useParams();

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

  function loginUser(e) {
    setLogin(e.currentTarget.value);
    // if(!validator.isEmail(e.currentTarget.value)) {
    //   setEmailError('Некоректный логин')
    // } else {
    setEmailError("");
    //}
  }

  function passwordUser(e) {
    setPassword(e.currentTarget.value);
    if (e.target.value.length < 4) {
      setPasswordError("Incorrect password");
      if (!e.target.value) {
        setPasswordError("Password is empty");
      }
    } else {
      setPasswordError("");
    }
  }

  useEffect(() => {
    if (emailError || passwordError || errorLogin) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, errorLogin]);

  function offReserch(e) {
    e.preventDefault();
  }

  async function getUsers(e) {
    offReserch(e);
    dispatch({
      type: reducerTypes.GET_USER,
      payload: await axiosLogin(login, password),
    });
    navigate("/adminPanel");
  }

  useEffect(() => {
    if (user?.email === undefined) {
      navigate("/login");
    } else {
      if (!logout) navigate("/adminPanel");
    }
  }, [navigate, user]);

  return (
    <div className="bg-img">
      <div style={{ paddingBottom: "30px", paddingTop: "30px", minHeight: "calc(75vh + 103px)" }} className="container">
        <h3 className="header-inner_title login-inner_title">Login</h3>
        <hr className="hr-viss" />
        <Form className="width-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="color-input-name">Username:</Form.Label>
            <Form.Control
              onBlur={(e) => blurHandler(e)}
              name="login"
              value={login}
              onChange={(e) => {
                loginUser(e);
                cheakLengthLogin(e);
              }}
              type="email"
              placeholder=""
            />
            {emailDirty && emailError && <div style={{ color: "red" }}>{emailError}</div>}
            {errorLogin ? <div style={{ color: "red" }}>{errorLogin}</div> : ""}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="color-input-name">Password:</Form.Label>
            <Form.Control onBlur={(e) => blurHandler(e)} name="password" value={password} onChange={passwordUser} type="password" placeholder="" />
            {passwordDirty && passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link className="link-hover-effects" to="/registr">
              Registration
            </Link>
          </Form.Group>
          <button disabled={!formValid} onClick={(e) => getUsers(e)} className="btn-class-v2">
            Sign in
          </button>
        </Form>
      </div>
    </div>
  );
}

export default UserInput;
