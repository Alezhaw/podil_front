import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetUserTransfers } from "../../api/transfer";
import { axiosGetUserToUserTransfers } from "../../api/transferToUser";
import { socket } from "../../App";

function SystemMessages() {

    const dispatch = useDispatch()
    const { checkAlertSystemMessage, user, transfers, transfersToUser, nameTheSite } = useAppSelector((store) => store.user)
    const [dopSummDon, setDopSummDon] = useState('')
    const [fullSummDon, setFullSummDon] = useState('')

    let filteredTransfers = transfers?.filter(item => item.status !== 2);
    let filteredTransfersToUser = transfersToUser?.filter(item => item.status !== 2);
    let dateUser = filteredTransfers[0]?.time?.replaceAll('.', '/')?.split('/')
    let dateUser2 = filteredTransfersToUser[0]?.time?.replaceAll('.', '/')?.split('/')
    if (dateUser?.length === 3) dateUser = `${dateUser[1]}/${dateUser[0]}/${dateUser[2]}`
    if (dateUser2?.length === 3) dateUser2 = `${dateUser2[1]}/${dateUser2[0]}/${dateUser2[2]}`
    let dateParceUser = new Date(dateUser)
    let dateParceUser2 = new Date(dateUser2)
    const triggerTime = new Date(dateParceUser.getFullYear(), dateParceUser.getMonth(), dateParceUser.getDate() + 1, 9, 0, 0).toLocaleDateString();
    const triggerTime2 = new Date(dateParceUser2.getFullYear(), dateParceUser2.getMonth(), dateParceUser2.getDate() + 1, 9, 0, 0).toLocaleDateString();

    async function getUserTransfers() {
        if (!user?.email) return;
        let result = await axiosGetUserTransfers(user?.email)
        if (result) {
            dispatch({
                type: reducerTypes.GET_TRANSFERS,
                payload: result
            })
        }
    }

    async function getUserTransfersToUser() {
        if (!user?.email) return;
        let result = await axiosGetUserToUserTransfers(user?.email)
        if (result) {
            dispatch({
                type: reducerTypes.GET_TRANSFERS_TO_USER,
                payload: result
            })
        }
    }

    useEffect(() => {
        getUserTransfers()
        getUserTransfersToUser()               // Обернуть в промис чтобы вызывались одновременно все axios
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (checkAlertSystemMessage || user?.systemMessage === 'true') {
            localStorage.setItem(`${user.email}`, 'true')
            dispatch({
                type: reducerTypes.GET_UPDATE_HEADER_ALERT,
                payload: false,
            });
        }

        switch (true) {
            case user.score < 5000:
                setDopSummDon(1500)
                setFullSummDon(user.score + 1500);
                break;
            case user?.score < 8000:
                setDopSummDon(2500)
                setFullSummDon(user.score + 2500);
                break;
            case user?.score < 10000:
                setDopSummDon(4000)
                setFullSummDon(user.score + 4000);
                break;
            case user?.score < 15000:
                setDopSummDon(5000)
                setFullSummDon(user.score + 5000);
                break;
            case user?.score >= 15000:
                setDopSummDon(5000)
                setFullSummDon(user.score + 5000);
                break;
            default:
                setDopSummDon(0)
                setFullSummDon(user.score + 0);
        }
        // eslint-disable-next-line 
    }, [checkAlertSystemMessage, dispatch, user])

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    return <div className="bg-img" style={{ paddingBottom: "20px", paddingTop: "2px" }}>
        <div style={{ marginTop: '30px' }} className="container heiggg">
            <h3 style={{ borderBottom: "1px solid rgb(85, 85, 88)" }} className="login-inner_title" onClick={() => console.log(checkAlertSystemMessage, user?.systemMessage)}>Системные сообщения</h3>
            {checkAlertSystemMessage || user?.systemMessage === 'true' ?
                <div className="message-flex">
                    <div className="message-header">
                        <h2>Сообщение от {nameTheSite.name}</h2>
                        <h2>{triggerTime || triggerTime2}</h2>
                    </div>
                    <div className="message-body">
                        Доброго времени суток, {user.nickname}
                        <br />
                        <br />
                        В соответствии, с пунктом правил Пользовательского соглашения 5.2.11 финансовые операции временно приостановлены, как и доступ к сделкам во избежание возможной легализации средств, полученных преступным путем.
                        Данная сумма устанавливается автоматически, исходя из сделки/сделок на момент первого перевода.
                        <div style={{ color: 'red', margin: '0px', padding: '0px' }}>Для Вас установлена сумма минимального перевода {user?.minimumTransferAmount || fullSummDon} RUB</div>
                        <br />
                        <div style={{ color: 'red', margin: '0px', padding: '0px' }}> Сумма пополнения для Вас составляет: {user?.sumTransferAmoumt || dopSummDon} RUB. </div>
                        Данную сумму возможно дополнить только новым платёжем, после чего,
                        вам будет доступен перевод всей суммы, включая пополненные средства.<span style={{ color: 'red', margin: '0px', padding: '0px' }}>Так же доносим до вашего ведома, что по истечению 10 рабочих дней, будет взиматься комиссия в размере 1.5% каждые последующие сутки.</span>
                        <br />
                        <br />
                        Данные ограничения накладываются выборочно, во избежание конфликта с мониторинг-системой. Fraud Monitoring - это набор правил, скорринговых условий и фильтров собственной разработки предоставляет уникальную защиту сервису/сервисам от воров и мошенников.
                        Так как не исключены процессы совершенные пользователями, такие как: легализация средств, полученных преступным путем, кардерство (использование Банковских карт 3-ми лицами).
                        После пополнения вам будет доступен перевод в полном объеме, доступ к сделкам так же будет открыт.
                        <br />
                        <br />
                        С уважением,
                        Администрация {nameTheSite.name}
                        <br />
                    </div>
                </div> :
                ""}
        </div>
    </div>
}

export default SystemMessages