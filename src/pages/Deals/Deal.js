import { LinearProgress, Button } from '@mui/material';
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../App";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetOneDeal, axiosChangeDealStatus } from "../../api/deal";
import { axiosGetDealMessages } from '../../api/dealMessages';
import { axiosDecreaseScore, axiosIncreaseScore } from '../../api/user';
import { dealStatusMock } from "../../components/mock/OutputMock";
import sound from '../../sound/newMessage.mp3';

function Deal() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)
  const [messages, setMessages] = useState('')
  const { deals, user, dealMessages } = useAppSelector((store) => store.user)
  const { id } = useParams();
  const [deal, setDeal] = useState(deals?.filter(item => String(item.id) === id)[0])
  const chatRef = useRef(null);
  const audioPlayer = useRef(null);

  function playAudio() {
    try {
      if (audioPlayer) {
        audioPlayer.current.play();
      }
    } catch {
      console.log('Ошибка воспроизведения аудио, обновите страницу')
    }
  }

  function sendMessage() {
    const time = new Date().toLocaleString().replaceAll(',', '')
    socket.emit("sendMessage", { dealId: deal.id, nickname: user.nickname, email: user.email, message: messages, time, role: user.role });
    setMessages('')
  }

  function sendAdminMessage(message) {
    if (!deal?.id || !message) return alert('Сделка не найдена');
    const time = new Date().toLocaleString().replaceAll(',', '')
    socket.emit("sendAdminMessage", { dealId: deal.id, message, time });
  }

  async function getDealMessages() {
    const result = await axiosGetDealMessages(id)
    dispatch({
      type: reducerTypes.GET_DEAL_MESSAGES,
      payload: result,
    });
  }

  async function getDeal() {
    const result = await axiosGetOneDeal(Number(id))
    if (result) {
      setDeal(result)
    }
  }

  async function changeDealStatus(status) {
    if (!user?.email) return alert('Войдите в аккаунт')
    const result = await axiosChangeDealStatus(Number(id), Number(status || 1), user?.email, user?.password)
    if (result) {
      setDeal(prev => ({ ...prev, status: result?.status }))
      return true;
    } else alert('Что-то пошло не так')
  }

  async function pay() {
    if (!user?.email) return alert('Войдите в аккаунт')
    if (!deal?.sum) return alert('Сделка не найдена')
    const resultUser = await axiosDecreaseScore(Number((deal?.sum + deal?.sum * 0.08)).toFixed(), user?.email, user?.password)
    if (resultUser) {
      dispatch({
        type: reducerTypes.GET_USER,
        payload: resultUser,
      });
      sendAdminMessage('Сделка оплачена. Теперь вы  должны испольнить обязательства в рамках этой суммы. Для передачи информации и общения используйте данный чат');
      await changeDealStatus(3);
    } else alert('Что-то пошло не так')
  }

  async function getPay() {
    if (!user?.email) return alert('Войдите в аккаунт')
    if (!deal?.seller) return alert('Продавец не найден')
    if (!deal?.sum || !deal?.id) return alert('Сделка не найдена')
    const result = await changeDealStatus(4);
    if (result) {
      sendAdminMessage(`Покупатель принял работу и подтвердил платёж. На ваш счет поступила оплата в размере: ${deal?.sum || ''}₽`)
      sendAdminMessage(`Какой отзыв вы хотели бы добавить на наш сайт? (Через 24 часа ваш отзыв автоматически обновится на сайте)`)
      const receiver = await axiosIncreaseScore(deal?.id, user?.email, user?.password, deal?.seller);
      if (receiver) {
        socket.emit("getPay", { dealId: deal.id, receiver });
      }
    }
  }

  useEffect(() => {
    let temporaryDeal = deal
    if (temporaryDeal) {
      setDeal(temporaryDeal)
      const progress = temporaryDeal?.status * 25 > 100 ? 0 : temporaryDeal?.status * 25
      setProgress(progress)
    }
  }, [id, deal])

  useEffect(() => {
    socket.emit("join", { name: user?.email, room: String(deal?.id) });
  }, [deal, user, deals]);

  useEffect(() => {
    getDealMessages();
    getDeal();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      dispatch({
        type: reducerTypes.GET_DEAL_MESSAGES,
        payload: [...dealMessages, data]
      });
      if (data?.email !== user?.email) playAudio();
    });
    // eslint-disable-next-line
  }, [dealMessages]);

  useEffect(() => {
    socket.on("setPay", ({ receiver }) => {
      if (receiver?.email === user?.email) {
        dispatch({
          type: reducerTypes.GET_USER,
          payload: { ...user, score: receiver.score }
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("adminMessage", ({ data }) => {
      dispatch({
        type: reducerTypes.GET_DEAL_MESSAGES,
        payload: [...dealMessages, data]
      });
      if (data?.email !== user?.email) playAudio();
    });
    getDeal();
    // eslint-disable-next-line
  }, [dealMessages]);

  useEffect(() => {
    if (chatRef?.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    // eslint-disable-next-line
  }, [dealMessages]);

  useEffect(() => {
    if (user?.checkRu) {
      if (user?.checkRu !== 'true') {
        navigate("/blockMaseges")
      }
    }
  }, [user.checkRu, navigate])

  useEffect(() => {
    if (!user?.email) return;
    const time = new Date().toLocaleString().replaceAll(',', '');
    socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
    // eslint-disable-next-line
  }, [user]);

  return <div className="bg-img">
    <audio ref={audioPlayer} src={sound} />
    <div style={{ paddingBottom: '20px', paddingTop: "30px" }} className='container heiggg'>
      <div className="message-body">
        <div className="posishnNameButton">
          <div style={{ paddingBottom: '5px' }}>Статус сделки: {dealStatusMock[deal?.status - 1]}</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
            {(deal?.status === 1 && deal?.creator !== user?.email) ? <button className="buttonDeal1" onClick={async () => {
              const result = await changeDealStatus(2);
              if (result) sendAdminMessage('Второй участник сделки подтвердил свое участие')
            }}>Подтвердить участие</button> : null}
            {(deal?.status === 2 && deal?.buyer === user?.email) ? <button className="buttonDeal1" onClick={pay}>Оплатить</button> : null}
            {(deal?.status === 3 && deal?.buyer === user?.email) ? <button className="buttonDeal1" onClick={getPay}>Подтвердить выполнение сделки</button> : null}
            {(deal?.status === 3) ? <button className="buttonDeal2" onClick={async () => {
              const result = await changeDealStatus(5);
              if (result) sendAdminMessage('Был вызван арбитраж. Опишите пожалуйста вашу проблему и сотрудники сервиса вам помогут');
            }}>Арбитраж</button> : null}
          </div>
        </div>
        {(deal?.status !== 5) ? <LinearProgress variant="determinate" value={progress} /> : null}
      </div>
      <div className="message-body">
        <div>
          <table className="trades-table-deals ">
            <tbody>
              <tr style={{ borderBottom: "1px solid" }}>
                <th>Название сделки</th>
                <th className="dilit-block">Покупатель</th>
                <th className="dilit-block">Продавец</th>
                <th>Сумма сделки</th>
                <th>Комиссия сделки</th>
                <th>Итоговая сумма</th>
              </tr>


              <tr>
                <th>{deal?.name}</th>
                <th className="dilit-block">{deal?.buyerNickname || deal?.buyer}</th>
                <th className="dilit-block">{deal?.sellerNickname || deal?.seller}</th>
                <th>{deal?.sum} ₽</th>
                <th>{(deal?.sum * 0.08).toFixed(0)} ₽</th>
                <th>{(deal?.sum + deal?.sum * 0.08).toFixed()} ₽</th>
              </tr>
            </tbody>
          </table>
          <div>
            <h5 style={{ padding: "20px" }}>ОПИСАНИЕ СДЕЛКИ:</h5>
            <div style={{ paddingLeft: "20px", overflowWrap: 'anywhere' }}>{deal?.description}</div>
          </div>
        </div>
      </div>
      <div className="message-body">
        <h2 style={{ textAlign: 'center' }}>Чат с партнером по сделке</h2>
        <h4 style={{ textAlign: 'center' }}>{deal?.buyer === user?.email ? deal?.sellerNickname : deal?.buyerNickname}</h4>
        <div className="scrollDiv" ref={chatRef}>
          {dealMessages?.map((item, index) => {
            if (item.dealId !== Number(id)) return null;

            return item.role !== 'USER' ?
              <div style={{ textAlign: user?.role !== 'USER' ? 'end' : 'start', paddingRight: user?.role !== 'USER' ? '30px' : '0px' }} key={index}>
                <p
                  style={{ display: 'flex', flexDirection: 'column', overflowWrap: 'anywhere', color: '#59DBFF' }}
                >{item.message} <span style={{ fontSize: '15px', color: '#59DBFF' }}>{item.time}</span></p>
              </div> :
              item.nickname === user.nickname ?
                <div style={{ textAlign: 'end', paddingRight: '30px' }} key={index}>
                  <p style={{ display: 'flex', flexDirection: 'column', overflowWrap: 'anywhere' }}
                  >{item.message} <span style={{ fontSize: '15px', color: '#59DBFF' }}>{item.time}</span></p>
                </div>
                : <div style={{ textAlign: 'start' }} key={index}>
                  <p style={{ display: 'flex', flexDirection: 'column', overflowWrap: 'anywhere' }}
                  >{`${item.nickname}: ${item.message}`} <span style={{ fontSize: '15px', color: '#59DBFF' }}>{item.time}</span> </p>
                </div>
          })}
        </div>
        <div style={{ width: '100%', display: 'flex', marginTop: '40px' }}>
          <input
            style={{ padding: '.375rem .75rem', border: '1px solid #ced4da', borderRadius: '.375rem', width: '100%', marginRight: '15px' }}
            type={'text'}
            onChange={(e) => setMessages(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && sendMessage()
            }
            value={messages}
            placeholder='Введите сообщение'
          >
          </input>
          <Button
            size='large'
            onClick={() => sendMessage()}
            sx={{
              alignSelf: 'flex-end',
              color: '#FFFFFF',
              borderColor: '#FFF',
              marginLeft: 'auto',
            }}>Отправить</Button>
        </div>
      </div>
    </div>
  </div>
}

export default Deal;