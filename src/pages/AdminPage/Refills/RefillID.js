import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { refillStatusMock } from "../../../components/mock/OutputMock";
import { axiosUpdateRefill, axiosGetAllRefills } from "../../../api/refill";
import ChangeRefillProps from "./component/ChangeRefillProps";
import { StyledDiv, StyledDivHeader } from "../Users/style";

function RefillID() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem('backroundImg')
    const [currentRefill, setCurrentRefill] = useState(null)
    const [idRefill, setIdRefil] = useState()
    const [timeRefill, setTimeRefill] = useState('')
    const [scoreRefiil, setScoreRefill] = useState()
    const [statusRefill, setStatusRefill] = useState('')
    const [uniqueID, setUniqueID] = useState()
    const { user, allRefills } = useAppSelector((store) => store.user)
    const navigate = useNavigate()

    async function getAllRefills() {
        const data = await axiosGetAllRefills();
        if (data) {
            dispatch({
                type: reducerTypes.GET_ALL_REFILLS,
                payload: data,
            });
        }
    }

    async function changeRefill() {
        if (!timeRefill || !scoreRefiil || !scoreRefiil) return alert('Введите все данные');
        if (scoreRefiil < 0) return alert('Значение меньше 0')
        const result = await axiosUpdateRefill(Number(idRefill), timeRefill, Number(scoreRefiil), Number(statusRefill), Number(uniqueID), currentRefill?.userEmail, user?.email, user?.password);
        if (result) {
            getAllRefills();
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
        const temporaryRefill = allRefills?.filter(item => item.uniqueId === Number(id))[0]
        if (temporaryRefill) {
            setCurrentRefill(temporaryRefill)
            setIdRefil(temporaryRefill?.id)
            setTimeRefill(temporaryRefill?.time)
            setScoreRefill(temporaryRefill?.score)
            setStatusRefill(temporaryRefill?.status)
            setUniqueID(temporaryRefill?.uniqueId)
        }
        // eslint-disable-next-line 
    }, [allRefills])


    useEffect(() => {
        getAllRefills();
        // eslint-disable-next-line 
    }, [])

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
                        <StyledDivHeader size='50px'>ID</StyledDivHeader>
                        <StyledDivHeader size='155px'>Имя пользователя</StyledDivHeader>
                        <StyledDivHeader size='210px'>Почта пользователя</StyledDivHeader>
                        <StyledDivHeader size='155px'>Время создания</StyledDivHeader>
                        <StyledDivHeader size='155px'>Сумма пополнения</StyledDivHeader>
                        <StyledDivHeader size='120px'>Сутатус</StyledDivHeader>
                        <StyledDivHeader size='100px'>UNIQUE ID</StyledDivHeader>
                    </div>
                    {<div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={currentRefill?.email}>
                        <StyledDiv size="50px">{idRefill}</StyledDiv>
                        <StyledDiv size='155px'>{currentRefill?.userNickname}</StyledDiv>
                        <StyledDiv size='210px'style={{overflowWrap: "anywhere" }}>{currentRefill?.userEmail}</StyledDiv>
                        <StyledDiv size='155px'>{timeRefill}</StyledDiv>
                        <StyledDiv size='155px'>{scoreRefiil}p</StyledDiv>
                        <StyledDiv size='120px'>{refillStatusMock[statusRefill - 1]}</StyledDiv>
                        <StyledDiv size='100px' style={{overflowWrap: "anywhere" }}>{uniqueID}</StyledDiv>
                    </div>}
                </div>
                <ChangeRefillProps 
                    setIdRefil={setIdRefil}
                    changeRefill={changeRefill}
                    statusRefill={statusRefill}
                    setStatusRefill={setStatusRefill}
                    scoreRefiil={scoreRefiil}
                    setScoreRefill={setScoreRefill}
                    timeRefill={timeRefill}
                    setTimeRefill={setTimeRefill}
                    idRefill={idRefill}
                />
            </div>
        </div>
    </>
}

export default RefillID