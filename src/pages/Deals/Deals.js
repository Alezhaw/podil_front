import { Form } from "react-bootstrap"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect } from "react";
import { axiosGetDeal } from "../../api/deal";
import { reducerTypes } from "../../store/Users/types";
import { useDispatch } from 'react-redux';

import { dealStatusMock } from "../../components/mock/OutputMock";
import { socket } from "../../App";

function Deals() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user, deals, checkAlertSystemMessage } = useAppSelector((store) => store.user)

    async function getDeal() {
        if (!user.email) return;
        dispatch({
            type: reducerTypes.GET_DEAL,
            payload: await axiosGetDeal(user?.email, user?.password)
        });
    }

    useEffect(() => {
        if (!user?.email) return;
        const time = new Date().toLocaleString().replaceAll(',', '');
        socket.emit('location', { email: user?.email, location: document?.location?.pathname, time });
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        getDeal();
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (!user?.checkRu) {
            navigate("/blockMaseges")
        }
    }, [user.checkRu, navigate])


    return <div className="bg-img">
        <div className="container">
            <div className="height-box">
                <div style={{ height: '100vh', paddingTop: "20px" }} className="dial-flex_box">
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="adapt-header">
                            <Form.Label htmlFor="inputPassword5">Мои сделки</Form.Label>
                            <Link style={{ textDecoration: "none", color: 'white', fontSize: '14px' }} to='/makedeal'> <button className="spec-btn-ux">Открыть сделку<AddCircleOutlineIcon></AddCircleOutlineIcon></button></Link>
                        </div>
                        {checkAlertSystemMessage || user?.systemMessage === 'true' ?
                            <div className="message-header">
                                <div style={{ borderLeft: '1px solid red' }}>
                                    <div style={{ padding: '10px' }}>
                                        Доброго времени суток,{user.nickname}
                                        <br />
                                        На данный момент, переводы и выводы для вашей учетной записи приостановлены.
                                        <br />
                                        Описание причины ограничений вы можите найти в <Link style={{ color: '#f25322', textDecoration: "none" }} to='/systemmessages'>Системные сообщения </Link>
                                    </div>
                                </div>
                            </div>
                            : ''}
                    </div>
                    <table className="trades-table">
                        <thead>
                            <tr>
                                <th className="dilit-block">Номер</th>
                                <th>Название</th>
                                <th>Номер сделки</th>
                                <th>Сумма</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals?.sort((a, b) => a.id - b.id)?.map((item, index) => <tr key={index}>
                                <th className="dilit-block">{index + 1}</th>
                                <th ><Link style={{ color: '#f25322', textDecoration: "none" }} to={`/deal/${item.id}`}>{item?.name}</Link></th>
                                <th>{item?.id}</th>
                                <th>{item?.sum}р</th>
                                <th>{dealStatusMock[item?.status - 1]}</th>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default Deals