import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../../../store/reduxHooks";
import { reducerTypes } from "../../../../store/Users/types";
import { transferStatusMock } from "../../../../components/mock/OutputMock";
import { axiosChangeUserTransfer, axiosGetAllUserTransfers } from "../../../../api/transfer";

function TransfersID() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem('backroundImg')
    const [currentTransfers, setCurrentTransfers] = useState(null)
    const [transfersID, setTransfersID] = useState()
    const [nameTransfers, setNameTransfers] = useState('')
    const [emailTransfers, setEmailTransfers] = useState('')
    const [paymantSystem, setPaymantSystem] = useState('')
    const [walletNumber, setWalletNumber] = useState('')
    const [scoreTransfers, setScoreTransfers] = useState()
    const [timeTransfers, setTimeTransfers] = useState('')
    const [statusTransfers, setStatusTransfers] = useState()
    const { allTransfers, user } = useAppSelector((store) => store.user);
    const navigate = useNavigate()

    async function getAllTransfers() {
        const data = await axiosGetAllUserTransfers();
        if (data) {
            dispatch({
                type: reducerTypes.GET_ALL_TRANSFERS,
                payload: data,
            });
        }
    }

    async function changeTransfer() {
        if (!transfersID || !scoreTransfers || !statusTransfers) return alert('Введите все данные');
        const result = await axiosChangeUserTransfer(Number(transfersID), Number(scoreTransfers), Number(statusTransfers), user?.email, user?.password);
        if (result) {
            getAllTransfers();
            return alert('Успешно')
        };
        alert('Что-то пошло не так')
    }

    useEffect(() => {
        if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
            navigate("/")
        }
    }, [user?.role, navigate, user])

    useEffect(() => {
        const temporaryTransfers = allTransfers?.filter(item => item.id === Number(id))[0]
        if (temporaryTransfers) {
            setCurrentTransfers(temporaryTransfers)
            setTransfersID(temporaryTransfers?.id)
            setNameTransfers(temporaryTransfers?.userNickname)
            setEmailTransfers(temporaryTransfers?.userEmail)
            setPaymantSystem(temporaryTransfers?.paymantSystem)
            setWalletNumber(temporaryTransfers?.walletNumber)
            setScoreTransfers(temporaryTransfers?.score)
            setTimeTransfers(temporaryTransfers?.time)
            setStatusTransfers(temporaryTransfers?.status)
        }
        // eslint-disable-next-line 
    }, [allTransfers])

    useEffect(() => {
        getAllTransfers();
        // eslint-disable-next-line 
    }, [user])

    return <>
        <div style={{ display: 'flex', minHeight: '100vh', justifyContent: "center", }} className={!statebackground ? 'styleAdminPanel' : 'styleAdminPanel2'}>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(17, 17, 18, 0.65)" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: '10px', color: 'white' }}>
                    <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2">
                        Вернуться назад
                    </div>
                </div>
                <div style={{ marginTop: '20px', color: "white" }}>
                    <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
                        <div style={{ textAlign: 'center', width: '50px' }} className="output-id">ID</div>
                        <div style={{ textAlign: 'center', width: '150px' }} className="output-date">Имя пользователя</div>
                        <div style={{ textAlign: 'center', width: '210px' }} className="output-date">Почта пользователя</div>
                        <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Платежная система</div>
                        <div style={{ textAlign: 'center', width: '210px' }} className="output-sum">Номер кошелька</div>
                        <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Сумма перевода</div>
                        <div style={{ textAlign: 'center', width: '155px' }} className="output-sum">Время перевода</div>
                        <div style={{ textAlign: 'center', width: '120px' }} className="output-date">Статус</div>
                    </div>
                    {<div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={currentTransfers?.email}>
                        <div style={{ width: '50px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-id">{transfersID}</div>
                        <div style={{ width: '150px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">{nameTransfers}</div>
                        <div style={{ width: '210px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">{emailTransfers}</div>
                        <div style={{ width: '155px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-date">{paymantSystem}</div>
                        <div style={{ width: '210px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center", overflowWrap: "anywhere" }} className="output-sum">{walletNumber}</div>
                        <div style={{ width: '155px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center", overflowWrap: "anywhere" }} className="output-id">{scoreTransfers}p</div>
                        <div style={{ width: '155px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-sum">{timeTransfers}</div>
                        <div style={{ width: '120px', minHeight: '48px', display: "flex", alignItems: "center", justifyContent: "center" }} className="output-date">{transferStatusMock[statusTransfers - 1] || ''}</div>
                    </div>}
                    <div className='pages-user-box-2'>
                        <div style={{ flexDirection: "column" }} className='pages-user-block'>
                            <h6 style={{ margin: "0", textAlign: "center" }}>Изменение суммы перевода</h6>
                            <input
                                onChange={(e) => setScoreTransfers(e.target.value || 0)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: "white", borderRadius: "5px" }}
                                type="number"
                                name="name"
                                placeholder="Изменение денег пользователя"
                                autoComplete="off"
                                required
                                value={scoreTransfers || 0}
                            />
                        </div>
                        <div style={{ flexDirection: "column" }} className='pages-user-block'>
                            <h6 style={{ margin: "0", textAlign: "center" }}>Изменение статуса перевода</h6>
                            <select
                                onChange={(e) => setStatusTransfers(e.target.value)}
                                style={{ color: "white", borderRadius: "5px" }}
                                className="tabl-flex-admin-user-scores "
                                name="select"
                                value={String(statusTransfers || 1)}>
                                <option value="1">В обработке</option>
                                <option value="2">Отмененный</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center" }}>
                        <div className="tabl-flex-admin-button-global" onClick={changeTransfer}>
                            Внести изменения
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
}

export default TransfersID