import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Helper from "../../image/helper.png";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import { axiosGetMessagestoAdmin } from "../../api/adminMessages";
import { axiosGetOneChat } from "../../api/adminChat";
import { useAppSelector } from "../../store/reduxHooks";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { socket } from "../../App";
import RadioGroupRating from "./RadioGroupRating";
import Face4Icon from "@mui/icons-material/Face4";
import PortraitIcon from "@mui/icons-material/Portrait";

function Chat() {
  const dispatch = useDispatch();
  const { user, messageToAdmin } = useAppSelector((store) => store.user);
  const [checked, setChecked] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const chatRef = useRef(null);
  const [image, setImage] = useState(null);
  const [close, setClose] = useState(false);
  const [chatStatus, setChatStatus] = useState(1);
  const [numberOfObjects, setNumberOfObjects] = useState("+");

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setNumberOfObjects(1);
  };

  async function getChatStatus() {
    if (!user?.email) return;
    const result = await axiosGetOneChat(user?.email, user?.password);
    if (result?.statusForUser) {
      setChatStatus(result?.statusForUser || 1);
    }
  }

  async function getMessagesToAdmin() {
    if (!user?.email) return;
    const result = await axiosGetMessagestoAdmin(user?.email);
    if (result) {
      dispatch({
        type: reducerTypes.GET_MESSAGE_TO_ADMIN,
        payload: result?.filter((item) => item.nickname !== "location")?.sort((a, b) => a.id - b.id),
      });
      const resultLength = Number(localStorage.getItem("messagetoadminLength")) || 0;
      if (result?.length > resultLength) {
        setNewMessage(true);
      }
    }
  }

  function sendMessageToAdmin(message) {
    if (!user?.email || !user?.nickname) return alert("Войдите в аккаунт");
    const time = new Date().toLocaleString().replaceAll(",", "");
    const reader = new FileReader();
    reader.readAsDataURL(image || new Blob([]));
    reader.onload = () => {
      if (reader?.result?.includes("audio")) {
        setImage(null);
        return alert("Отправлять можно только изображения!");
      }
      if (!message && reader?.result === "data:") return alert("Сообщение не может быть пустым");
      socket.emit("sendMessageToAdmin", { nickname: user?.nickname, email: user?.email, time, message, image: reader?.result || null });
      localStorage.setItem("chatrate", "");
      localStorage.setItem("messagetoadminLength", String(messageToAdmin?.length + 1));
      setUserMessage("");
      setImage(null);
      setNumberOfObjects("+");
    };
  }

  useEffect(() => {
    //  getMessagesToAdmin();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    //getChatStatus();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    socket.emit("join", { name: user?.email, room: user?.email });
  }, [user]);

  // useEffect(() => {
  //     if (!messageToAdmin[7]) return;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(new Blob(messageToAdmin[7]?.image.data));
  //     reader.onload = () => {
  //         setImageUrl(reader.result);
  //     };
  // }, [messageToAdmin]);

  useEffect(() => {
    socket.on("messageToAdmin", ({ data }) => {
      if (messageToAdmin?.includes(data)) return;
      dispatch({
        type: reducerTypes.GET_MESSAGE_TO_ADMIN,
        payload: [...messageToAdmin, data],
      });
      setNewMessage(true);
      setChatStatus(1);
    });
    // eslint-disable-next-line
  }, [messageToAdmin]);

  useEffect(() => {
    socket.on("updateChatStatus", ({ data }) => {
      if (data) {
        getMessagesToAdmin();
        getChatStatus();
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    // eslint-disable-next-line
  }, [messageToAdmin, checked]);

  useEffect(() => {
    const length = localStorage.getItem("messagetoadminLength");
    if (length && messageToAdmin) {
      Number(length) >= messageToAdmin.length && setNewMessage(false);
    }
    // eslint-disable-next-line
  }, [messageToAdmin]);

  if (window.location.href.includes("adminPanel")) return null;

  return (
    <>
      {checked ? (
        <div className="chat-bg" onClick={() => setChecked(false)}>
          <div className={checked ? "chat activ-chat" : "chat"} onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <img alt="img-helper" className="img-helper" src={Helper}></img>
              <div className="helper-nickName">
                <div style={{ fontWeight: "bold" }}>Служба поддержки</div>
                <div style={{ fontSize: "12px" }}>Онлайн</div>
              </div>
              <CloseIcon
                onClick={() => {
                  localStorage.setItem("messagetoadminLength", String(messageToAdmin?.length));
                  setChecked(false);
                  setNewMessage(false);
                }}
                style={{ color: "white", position: "absolute", right: "15px", width: "30px", height: "30px" }}
              ></CloseIcon>
            </div>
            <div className="mainChat" ref={chatRef}>
              {messageToAdmin
                ?.filter((el) => el?.statusForUser !== 2)
                ?.filter((el) => el?.nickname !== "location")
                ?.map((item) => (
                  <div key={item?.id}>
                    {item?.role === "ADMIN" && item?.administratorName === "system" ? (
                      <div className="massegeStyleUserChat">
                        <p className="boxStyle2">
                          <span className="styleSizeChat">
                            <span style={{ color: "red" }}>{item?.message}</span>
                          </span>
                        </p>
                      </div>
                    ) : item?.role === "USER" ? (
                      <div className="massegeStyleAdminChat">
                        <div className="boxStyle1">
                          <span className="styleSizeChat">
                            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                              <PortraitIcon style={{ width: "35px", height: "35px" }}></PortraitIcon>{" "}
                              <div className="flex-pos">
                                {item?.image && item?.image !== "data:" ? <img width="100%" src={`${item.image}`} alt="pic from base64" /> : null}
                                {item?.message}: {item?.nickname}
                              </div>
                            </div>
                          </span>{" "}
                          <span className="posMassegeses">
                            {item?.time} <PortraitIcon style={{ width: "35px", opacity: "0" }}></PortraitIcon>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="massegeStyleUserChat">
                        <div className="boxStyle2">
                          <span className="styleSizeChat">
                            <Face4Icon style={{ width: "35px", height: "35px" }}></Face4Icon> {item?.administratorName}: <span style={{ color: "red" }}>{item?.message}</span>
                          </span>
                          <span className="posMassegeses">
                            <Face4Icon style={{ opacity: "0", width: "35px" }}></Face4Icon> {item?.time}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {/* eslint-disable-next-line*/}
              {!!localStorage.getItem("chatrate") || !!close || chatStatus == 1 ? null : (
                <div style={{ background: "#ffffff33", display: "flex", padding: "15px 5px", gap: "10px", justifyContent: "center" }}>
                  <h3 style={{ color: "black", fontSize: "18px", margin: "0px", padding: "0px" }}>Оцените нашу работу</h3> <RadioGroupRating setClose={setClose} />
                </div>
              )}
            </div>
            <div className="body-chat-sms">
              <input
                style={{
                  padding: ".375rem .75rem",
                  border: ".5px solid #ced4da",
                  width: "80%",
                  marginRight: "1px",
                  borderRadius: "0 0 0 9px",
                }}
                type={"text"}
                placeholder="Введите сообщение"
                value={userMessage}
                onChange={(e) => String(setUserMessage(e.target.value))}
                onKeyDown={(e) => e.key === "Enter" && sendMessageToAdmin(userMessage)}
              ></input>
              <input className="fileInput" name="file" id="file" multiple type="file" onChange={handleChange}></input>
              <label htmlFor="file">
                <span>{numberOfObjects}</span>
              </label>
              <Button
                size="large"
                sx={{
                  border: "1px black",
                  borderRadius: "0 0 9px 0",
                  width: "20%",
                  background: "black",
                  alignSelf: "flex-end",
                  color: "#FFFFFF",
                  height: "41px",
                  borderColor: "#FFF",
                  marginLeft: "auto",
                }}
                onClick={() => sendMessageToAdmin(userMessage)}
              >
                <SendIcon className="paperPlan"></SendIcon>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* {!checked?<HeadsetMicIcon onClick={() => setChecked(!checked)} className='chat-icon icon-chat-sizes'></HeadsetMicIcon> : ''} */}
      {!checked ? (
        <div className="chat-icon">
          <Badge
            style={{ color: "white" }}
            onClick={() => {
              setNewMessage(false);
              setChecked(!checked);
              localStorage.setItem("messagetoadminLength", String(messageToAdmin?.length));
            }}
            badgeContent={newMessage ? "!" : null}
            className="icon-chat-sizes2"
            color="error"
          >
            <MailIcon color="action" />
          </Badge>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Chat;
