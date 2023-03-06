import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { axiosChangeDeal, axiosGetAllDeal } from "../../../api/deal";
import { dealStatusMock } from "../../../components/mock/OutputMock";
import { socketAdmin } from "../AdminPanel";
import { StyledDiv, StyledDivHeader } from "../Users/style";

function DealID() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const statebackground = !!localStorage.getItem("backroundImg");
  const { allDeals, user } = useAppSelector((store) => store.user);
  const [currentDeal, setCurrentDeal] = useState(null);
  const [nameDeal, setNameDeal] = useState("");
  const [sumDeal, setSumDeal] = useState();
  const [statusDeal, setStatusDeal] = useState();
  const [descriptionDeal, setDescriptionDeal] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorSumDeal, setErrorSumDeal] = useState("");
  const navigate = useNavigate();

  async function getAllDeals() {
    const data = await axiosGetAllDeal();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_DEALS,
        payload: data,
      });
    }
  }

  function sendAdminMessage(message) {
    if (!currentDeal?.id || !message) return alert("Сделка не найдена");
    const time = new Date().toLocaleString().replaceAll(",", "");
    socketAdmin.emit("sendAdminMessage", {
      dealId: currentDeal.id,
      message,
      time,
    });
  }

  function setDescpittions(e) {
    setDescriptionDeal(e.target.value);
    if (e.target.value?.length < 30) {
      setErrorDescription("Минимальное количествое 30 символов");
    } else if (!e.target.value) {
      setErrorDescription("Поле не может быть пустым");
    } else {
      setErrorDescription("");
    }
  }

  function sumFull(e) {
    setSumDeal(e.currentTarget.value || 0);
    if (!e.target.value) {
      setErrorSumDeal("Введите сумму");
    } else if (e.target.value < 2000) {
      setErrorSumDeal("Минимальная сумма 2000р");
    } else {
      setErrorSumDeal("");
    }
  }

  async function changeDeal() {
    if (descriptionDeal?.length < 30)
      return alert("Описание должно состоять минимум из 30 символов");
    if (!nameDeal || !sumDeal || !statusDeal)
      return alert("Введите все данные");
    if (sumDeal < 2000) return alert("Минимальная сумма 2000 рублей");
    const result = await axiosChangeDeal(
      currentDeal?.id,
      nameDeal,
      sumDeal,
      Number(statusDeal),
      descriptionDeal,
      user?.email,
      user?.password
    );
    if (result) {
      sendAdminMessage(
        `Гарант сменил статус сделки на: ${dealStatusMock[
          statusDeal - 1
        ]?.toLowerCase()}`
      );
      getAllDeals();
      return alert("Успешно");
    }
    alert("Что-то пошло не так");
  }

  useEffect(() => {
    const temporaryDeal = allDeals?.filter((item) => item.id === Number(id))[0];
    if (temporaryDeal) {
      setCurrentDeal(temporaryDeal);
      setNameDeal(temporaryDeal?.name);
      setSumDeal(temporaryDeal?.sum);
      setStatusDeal(temporaryDeal?.status);
      setDescriptionDeal(temporaryDeal?.description);
    }
    // eslint-disable-next-line
  }, [allDeals]);

  useEffect(() => {
    if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
      navigate("/")
    }
  }, [user?.role, navigate, user])

  useEffect(() => {
    getAllDeals();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
        }}
        className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(17, 17, 18, 0.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10px",
              color: "white",
            }}
          >
            <div
              onClick={() => navigate("/adminPanel")}
              className="tabl-flex-admin-button-global2"
            >
              Вернуться назад
            </div>
          </div>
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
              <StyledDivHeader size="50px" >
                ID
              </StyledDivHeader>
              <StyledDivHeader size="155px" >
                Название сделки
              </StyledDivHeader>
              <StyledDivHeader size="155px" >
                Имя покупателя
              </StyledDivHeader>
              <StyledDivHeader size="155px"  >
                Имя продавца
              </StyledDivHeader>
              <StyledDivHeader size="210px"  >
                Почта покупателя
              </StyledDivHeader>
              <StyledDivHeader size="155px" >
                Почта продавца
              </StyledDivHeader>
              <StyledDivHeader size="155px" >
                Cумма сделки
              </StyledDivHeader>
              <StyledDivHeader size="155px"  >
                Статус сделки
              </StyledDivHeader>
              <StyledDivHeader size="210px"  >
                Описание
              </StyledDivHeader>
            </div>
            {
              <div
                style={{ marginTop: "5px", borderRadius: "5px" }}
                className="tabl-flex-admin-user"
                key={currentDeal?.email}
              >
                <StyledDiv size="50px">
                  {currentDeal?.id}
                </StyledDiv>
                <StyledDiv size="155px">
                  {nameDeal}
                </StyledDiv>
                <StyledDiv size="155px">
                  {currentDeal?.buyerNickname}
                </StyledDiv>
                <StyledDiv size="155px">
                  {currentDeal?.sellerNickname}
                </StyledDiv>
                <StyledDiv size="210px">
                  {currentDeal?.buyer}p
                </StyledDiv>
                <StyledDiv size="155px">
                  {currentDeal?.seller}
                </StyledDiv>
                <StyledDiv size="155px">
                  {sumDeal}
                </StyledDiv>
                <StyledDiv size="155px">
                  {dealStatusMock[statusDeal - 1]}
                </StyledDiv>
                <StyledDiv size="210px">
                  {descriptionDeal}
                </StyledDiv>
              </div>
            }
            <div className="pages-user-box-2" style={{ position: "relative" }}>
              <div
                className="tabl-flex-admin-button-global"
                style={{ position: "absolute", bottom: "0px", left: "60px" }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={`/deal/${currentDeal?.id}`}
                >
                  Зайти в чат
                </Link>
              </div>
              <div
                style={{ flexDirection: "column" }}
                className="pages-user-block"
              >
                <h6 style={{ margin: "0", textAlign: "center" }}>
                  Изменение названия сделки
                </h6>
                <input
                  onChange={(e) => setNameDeal(e.target.value)}
                  className="tabl-flex-admin-user-scores "
                  style={{ color: "white", borderRadius: "5px" }}
                  type="text"
                  name="name"
                  placeholder="Изменение денег пользователя"
                  autoComplete="off"
                  required
                  value={nameDeal || ""}
                />
              </div>
              <div
                style={{ flexDirection: "column" }}
                className="pages-user-block"
              >
                <h6 style={{ margin: "0", textAlign: "center" }}>
                  Изменение суммы сделки
                </h6>
                <input
                  onChange={sumFull}
                  className="tabl-flex-admin-user-scores "
                  style={{ color: "white", borderRadius: "5px" }}
                  type="number"
                  name="name"
                  placeholder="Изменение денег пользователя"
                  autoComplete="off"
                  required
                  value={sumDeal || 0}
                />
                <h6 style={{ overflowWrap: "anywhere" }}>{errorSumDeal}</h6>
              </div>
              <div
                style={{ flexDirection: "column" }}
                className="pages-user-block"
              >
                <h6 style={{ margin: "0", textAlign: "center" }}>
                  Изменение статуса сделки
                </h6>
                <select
                  onChange={(e) => setStatusDeal(e.target.value)}
                  style={{ color: "white", borderRadius: "5px" }}
                  className="tabl-flex-admin-user-scores "
                  name="select"
                  value={String(statusDeal || 1)}
                >
                  <option value="1">{dealStatusMock[0]}</option>
                  <option value="2">{dealStatusMock[1]}</option>
                  <option value="3">{dealStatusMock[2]}</option>
                  <option value="4">{dealStatusMock[3]}</option>
                  <option value="5">{dealStatusMock[4]}</option>
                </select>
              </div>
              <div
                style={{ flexDirection: "column" }}
                className="pages-user-block"
              >
                <h6 style={{ margin: "0", textAlign: "center" }}>
                  Изменение описания сделки
                </h6>
                <input
                  onChange={setDescpittions}
                  className="tabl-flex-admin-user-scores "
                  style={{ color: "white", borderRadius: "5px" }}
                  type="text"
                  name="name"
                  placeholder="Изменение денег пользователя"
                  autoComplete="off"
                  required
                  value={descriptionDeal || ""}
                />
                <h6 style={{ overflowWrap: "anywhere" }}>{errorDescription}</h6>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <div
                className="tabl-flex-admin-button-global"
                onClick={changeDeal}
              >
                Внести изменения
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DealID;
