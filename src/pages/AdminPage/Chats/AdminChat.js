import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosGetMessagestoAdmin } from "../../../api/adminMessages";
import { axiosGetAdminChats } from "../../../api/adminChat";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { adminChatStatusMock, userPath, userPathForAdmin } from "../../../components/mock/OutputMock";
import sound from "../../../sound/newMessage.mp3";
import { ImageModal } from "./components/ImageForChat";

function AdminChat() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { adminChat, user, adminMessage } = useAppSelector((store) => store.user);
  const [statusForUserChat, setStatusForUserChat] = useState(1);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");
  const [adminName, setAdminName] = useState("Александра");
  const navigate = useNavigate();
  const chatRef = useRef(null);
  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer?.current?.play();
  }

  function getLocation(message) {
    if (!message) return;
    const locationArray = userPath.filter((el, index) => message.includes(el));
    const location = locationArray[locationArray.length - 1];
    return userPathForAdmin[location];
  }

  async function getAllChats() {
    if (!user?.email) return;
    const data = await axiosGetAdminChats(user?.email, user?.password);
    if (data) {
      dispatch({
        type: reducerTypes.GET_ADMIN_CHAT,
        payload: data,
      });
    }
  }

  async function getMessages() {
    if (!currentChat?.email) return;
    const data = await axiosGetMessagestoAdmin(currentChat?.email);
    if (data) {
      dispatch({
        type: reducerTypes.GET_ADMIN_MESSAGE,
        payload: data.sort((a, b) => a.id - b.id),
      });
    }
  }

  function sendMessageToAdmin() {
    if (!message) return alert("Сообщение не может быть пустым");
    if (!user?.email);
    if (!currentChat?.id) return alert("Чат не найден");
    if (!adminName) return alert("Введите имя админимстратора");
    const time = new Date().toLocaleString().replaceAll(",", "");
    // socketAdmin.emit('sendMessageFromAdmin', {
    //     administratorName: adminName,
    //     time,
    //     message,
    //     id: currentChat?.id,
    //     adminEmail: user?.email,
    //     adminPassword: user?.password
    // });
    setMessage("");
    const temporaryChat = adminChat?.map((item) => (item.email === email ? { ...item, newMessage: 2 } : item));
    dispatch({
      type: reducerTypes.GET_ADMIN_CHAT,
      payload: temporaryChat,
    });
  }

  function sendSystemMessage() {
    if (!user?.email) return alert("Войдите в аккаунт");
    if (!currentChat?.id) return alert("Чат не найден");
    const time = new Date().toLocaleString().replaceAll(",", "");
    // socketAdmin.emit('sendMessageFromAdmin', {
    //     administratorName: 'system',
    //     time,
    //     message: 'Спасибо, что обратились к нам! Один из наших операторов скоро вам ответит',
    //     id: currentChat?.id,
    //     adminEmail: user?.email,
    //     adminPassword: user?.password
    // });
    const temporaryChat = adminChat?.map((item) => (item.email === email ? { ...item, newMessage: 2 } : item));
    dispatch({
      type: reducerTypes.GET_ADMIN_CHAT,
      payload: temporaryChat,
    });
  }

  function updateAdminChatStatus() {
    if (!user?.email) return alert("Войдите в аккаунт");
    if (!currentChat?.email) return alert("Чат не найден");
    // socketAdmin.emit('updateAdminChatStatus', {
    //     status: Number(statusForUserChat),
    //     email: currentChat?.email,
    //     adminEmail: user?.email,
    //     adminPassword: user?.password
    // });
  }

  useEffect(() => {
    const temporaryChat = adminChat?.filter((item) => item.email === email)[0];
    if (temporaryChat) {
      setCurrentChat(temporaryChat);
      setStatusForUserChat(temporaryChat?.statusForUser);
    }
    // eslint-disable-next-line
  }, [adminChat]);

  // useEffect(() => {
  //     if (currentChat?.email) {
  //         socketAdmin.emit('join', { name: currentChat?.email, room: currentChat?.email });
  //     }
  // }, [user, currentChat]);

  useEffect(() => {
    getAllChats();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [currentChat]);

  // useEffect(() => {
  //     socketAdmin.on('messageToAdmin', ({ data }) => {
  //         if (adminMessage?.includes(data)) return;
  //         dispatch({
  //             type: reducerTypes.GET_ADMIN_MESSAGE,
  //             payload: [...adminMessage, data]
  //         });
  //         if (data?.nickname) playAudio();
  //     });
  //     // eslint-disable-next-line
  // }, [adminMessage]);

  // useEffect(() => {
  //     socketAdmin.on('location', ({ data }) => {
  //         if (adminMessage?.includes(data) || !data?.message) return;
  //         dispatch({
  //             type: reducerTypes.GET_ADMIN_MESSAGE,
  //             payload: [...adminMessage, data]
  //         });
  //     });
  //     // eslint-disable-next-line
  // }, [adminMessage]);

  // useEffect(() => {
  //     socketAdmin.on('updateChatStatus', ({ data }) => {
  //         if (data) {
  //             alert('Успешно удалено');
  //         }
  //     });
  //     // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (user?.role === "USER" || user?.role === null || user?.role === "" || user?.role === undefined) {
      navigate("/");
    }
  }, [user?.role, navigate, user]);

  useEffect(() => {
    if (chatRef?.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    // eslint-disable-next-line
  }, [adminMessage]);

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh", justifyContent: "center" }} className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(17, 17, 18, 0.65)" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px", color: "white" }}>
            <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2">
              Вернуться назад
            </div>
          </div>

          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
              <div style={{ textAlign: "center", width: "50px" }} className="output-id">
                ID
                <audio ref={audioPlayer} src={sound} />
              </div>
              <div style={{ textAlign: "center", width: "155px" }} className="output-sum">
                Имя пользователя
              </div>
              <div style={{ textAlign: "center", width: "210px" }} className="output-sum">
                Почта пользователя
              </div>
              <div style={{ textAlign: "center", width: "155px" }} className="output-sum">
                Статус для пользователя
              </div>
              <div style={{ textAlign: "center", width: "155px" }} className="output-sum">
                Время прошлого удаления чата
              </div>
              <div style={{ textAlign: "center", width: "120px" }} className="output-date">
                Оценка
              </div>
            </div>
            {
              <div style={{ marginTop: "5px", borderRadius: "5px" }} className="tabl-flex-admin-user" key={currentChat?.email}>
                <div style={{ width: "50px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }} className="output-id">
                  {currentChat?.id}
                </div>
                <div style={{ width: "155px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">
                  {currentChat?.nickname}
                </div>
                <div
                  style={{
                    width: "210px",
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflowWrap: "anywhere",
                  }}
                  className="output-sum"
                >
                  {currentChat?.email}
                </div>
                <div style={{ width: "155px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">
                  {adminChatStatusMock[statusForUserChat - 1]}
                </div>
                <div style={{ width: "155px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">
                  {currentChat?.deleteChatTime}
                </div>
                <div style={{ width: "120px", minHeight: "48px", display: "flex", alignItems: "center", justifyContent: "center" }} className="output-date">
                  {currentChat?.rate}
                </div>
              </div>
            }
            <div className="pages-user-box-2">
              <div style={{ flexDirection: "column", alignItems: "center" }} className="pages-user-block">
                <h6 style={{ margin: "0", textAlign: "center" }}>Изменение статуса для пользователя</h6>
                <select
                  onChange={(e) => setStatusForUserChat(Number(e.target.value))}
                  style={{ color: "white", borderRadius: "5px" }}
                  className="tabl-flex-admin-user-scores "
                  name="select"
                  value={String(statusForUserChat || 1)}
                >
                  <option value="1">{adminChatStatusMock[0]}</option>
                  <option value="2">{adminChatStatusMock[1]}</option>
                </select>
                <button className="tabl-flex-admin-button-global" onClick={updateAdminChatStatus}>
                  Изменить
                </button>
              </div>
              <div style={{ flexDirection: "column", alignItems: "center" }} className="pages-user-block">
                <h6 style={{ margin: "0", textAlign: "center" }}>Выбор имени</h6>
                <select onChange={(e) => setAdminName(e.currentTarget.value)} style={{ color: "white", borderRadius: "5px" }} className="tabl-flex-admin-user-scores " name="select">
                  <option value="Александра">Александра</option>
                  <option value="Анна">Анна</option>
                  <option value="Евангелина">Евангелина</option>
                  <option value="Виктория">Виктория</option>
                  <option value="Стелла">Стелла</option>
                </select>
              </div>
            </div>
            <div className="pages-user-box-2">
              <button className="tabl-flex-admin-button-global3" onClick={sendSystemMessage}>
                Присоединиться в чат
              </button>
            </div>
          </div>

          <div className="blockMassegesAdminPanel">
            <div style={{ display: "flex", justifyContent: "center", background: "rgba(90, 89, 89, 0.75)" }}>
              <h2>Чат с {currentChat?.nickname}</h2>
            </div>

            <div className="adminChats" ref={chatRef}>
              {adminMessage?.map((item) => {
                if (!item?.administratorName && !item?.message && !item?.image) return "";
                return (
                  <div key={item?.id}>
                    {item?.role === "USER" && item?.nickname === "location" ? (
                      <div className="massegeStyleUserChatLocation">
                        <p style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "center" }}>
                          Посетитель открыл страницу: {getLocation(item?.message)} <span className="posMassegeses">{item?.time}</span>
                        </p>
                      </div>
                    ) : item?.role === "USER" ? (
                      <div className="massegeStyleUserChat">
                        <p style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                          {item?.image && item?.image !== "data:" ? <ImageModal src={item?.image} /> : null}
                          {item?.nickname}: {item?.message} <span className="posMassegeses">{item?.time}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="massegeStyleAdminChat">
                        <p style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                          {item?.message} : {item?.administratorName} <span className="posMassegeses">{item?.time}</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* <div style={{ position: 'relative' }}> */}
            <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
              <input
                className="tabl-flex-admin-masseges"
                type="text"
                placeholder="Введите сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessageToAdmin()}
              ></input>
              <button className="buttonAdminChat" onClick={sendMessageToAdmin}>
                Отправить
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminChat;
