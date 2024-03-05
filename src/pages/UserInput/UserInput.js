import { useParams } from "react-router-dom";
import { Button, Typography, Divider, TextField, Box, FormControl } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { axiosLogin } from "../../api/user";
import { reducerTypes } from "../../store/Users/types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";
import { PageContainer } from "../../components/Page.styled";
import { customAlert } from "../../components/Alert/AlertFunction";

function UserInput() {
  const dispatch = useDispatch();
  const { user, locale } = useAppSelector((store) => store.user);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();
  const { logout } = useParams();

  const messages = useMemo(() => {
    return {
      title: locale["login_title"],
      username: locale["login_username"],
      password: locale["login_password"],
      signIn: locale["login_sign_in"],
      emptyLog: locale["login_empty_log"],
      minCharacters: locale["login_min_characters"],
      incorrectPass: locale["login_password_incorrect"],
      emptyPass: locale["login_password_empty"],
    };
  }, [locale]);

  const [emailError, setEmailError] = useState(messages?.emptyLog);
  const [passwordError, setPasswordError] = useState("emptyPass");

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
      setErrorLogin(messages?.minCharacters);
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
      setPasswordError("incorrectPass");
      if (!e.target.value) {
        setPasswordError("emptyPass");
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
    const result = await axiosLogin(login, password);
    if (!result?.message) {
      offReserch(e);
      dispatch({
        type: reducerTypes.GET_USER,
        payload: await axiosLogin(login, password),
      });
      navigate("/podil");
    } else {
      customAlert({ message: result?.message });
    }
  }

  useEffect(() => {
    if (user?.email === undefined) {
      navigate("/login/true");
    } else {
      if (!logout) navigate("/podil");
    }
  }, [navigate, user]);

  return (
    <PageContainer>
      <div style={{ padding: "1rem 10rem" }}>
        <Typography variant="h3" style={{ paddingBottom: "1rem" }}>
          {messages?.title}
        </Typography>
        <Divider />
        <FormControl style={{ maxWidth: "30vw", display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography>{messages?.username}:</Typography>
            <TextField
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
            {emailDirty && emailError && <div style={{ color: "red" }}>{messages?.emptyLog}</div>}
            {errorLogin ? <div style={{ color: "red" }}>{messages?.minCharacters}</div> : ""}
          </Box>
          <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography>{messages?.password}:</Typography>
            <TextField onBlur={(e) => blurHandler(e)} name="password" value={password} onChange={passwordUser} type="password" placeholder="" />
            {passwordDirty && passwordError && <div style={{ color: "red" }}>{messages[passwordError]}</div>}
          </Box>
          <Button variant="outlined" disabled={!formValid} onClick={(e) => getUsers(e)}>
            {messages?.signIn}
          </Button>
        </FormControl>
      </div>
    </PageContainer>
  );
}

export default UserInput;
