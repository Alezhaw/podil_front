import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../store/reduxHooks';
import { reducerTypes } from '../../../../store/Users/types';
import { transferStatusMock } from '../../../../components/mock/OutputMock';
import { axiosChangeUserToUserTransfer, axiosGetAllUserToUserTransfers } from '../../../../api/transferToUser';
import { StyledDiv, StyledDivHeader } from '../../Users/style';

function TransfersToUserID() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem('backroundImg');
    const [currentTransfersToUser, setCurrentTransfersToUser] = useState(null);
    const [transfersIDToUser, setTransfersIDToUser] = useState();
    const [emailTransfersToUser, setEmailTransfersToUser] = useState('');
    const [emailReceiverToUser, setEmailReceiverToUser] = useState('');
    const [scoreTransfers, setScoreTransfersToUser] = useState();
    const [timeTransfersToUser, setTimeTransfersToUser] = useState('');
    const [statusTransfersToUser, setStatusTransfersToUser] = useState();
    const { allTransfersToUser, user } = useAppSelector((store) => store.user);
    const navigate = useNavigate();

    async function getAllTransfersTouser() {
        const data = await axiosGetAllUserToUserTransfers();
        if (data) {
            dispatch({
                type: reducerTypes.GET_ALL_TRANSFERS_TO_USER,
                payload: data
            });
        }
    }

    async function changeTransfer() {
        if (!transfersIDToUser || !scoreTransfers || !statusTransfersToUser) return alert('Введите все данные');
        const result = await axiosChangeUserToUserTransfer(
            Number(transfersIDToUser),
            Number(scoreTransfers),
            Number(statusTransfersToUser),
            user?.email,
            user?.password
        );
        if (result) {
            getAllTransfersTouser();
            return alert('Успешно');
        }
        alert('Что-то пошло не так');
    }

    useEffect(() => {
        if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
            navigate('/');
        }
    }, [user?.role, navigate, user]);

    useEffect(() => {
        const temporaryTransfersToUser = allTransfersToUser?.filter((item) => item.id === Number(id))[0];
        if (temporaryTransfersToUser) {
            setCurrentTransfersToUser(temporaryTransfersToUser);
            setTransfersIDToUser(temporaryTransfersToUser?.id);
            setEmailTransfersToUser(temporaryTransfersToUser?.userEmail);
            setEmailReceiverToUser(temporaryTransfersToUser?.receiverEmail);
            setScoreTransfersToUser(temporaryTransfersToUser?.score);
            setTimeTransfersToUser(temporaryTransfersToUser?.time);
            setStatusTransfersToUser(temporaryTransfersToUser?.status);
        }
        // eslint-disable-next-line
    }, [allTransfersToUser]);

    useEffect(() => {
        getAllTransfersTouser();
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div
                style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center' }}
                className={!statebackground ? 'styleAdminPanel' : 'styleAdminPanel2'}
            >
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(17, 17, 18, 0.65)' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px', color: 'white' }}>
                        <div onClick={() => navigate('/adminPanel')} className="tabl-flex-admin-button-global2">
                            Вернуться назад
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', color: 'white' }}>
                        <div style={{ borderRadius: '5px' }} className="tabl-flex-admin">
                            <StyledDivHeader size='50px'>
                                ID
                            </StyledDivHeader>
                            <StyledDivHeader size='150px'>
                                Почта пользователя
                            </StyledDivHeader>
                            <StyledDivHeader size='210px'>
                                Почта получателя
                            </StyledDivHeader>
                            <StyledDivHeader size='155px'>
                                Сумма перевода
                            </StyledDivHeader>
                            <StyledDivHeader size='155px'>
                                Время перевода
                            </StyledDivHeader>
                            <StyledDivHeader size='120px'>
                                Статус
                            </StyledDivHeader>
                        </div>
                        {
                            <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={currentTransfersToUser?.email}>
                                <StyledDiv size='50px'>
                                    {transfersIDToUser}
                                </StyledDiv>
                                <StyledDiv size='150px' style={{overflowWrap: 'anywhere'}}>
                                    {emailTransfersToUser}
                                </StyledDiv>
                                <StyledDiv size='210px' style={{overflowWrap: 'anywhere'}}>
                                    {emailReceiverToUser}
                                </StyledDiv>
                                <StyledDiv size='155px'>
                                    {scoreTransfers}
                                </StyledDiv>
                                <StyledDiv size='155px' >
                                    {timeTransfersToUser}
                                </StyledDiv>
                                <StyledDiv size='120px'>
                                    {transferStatusMock[statusTransfersToUser - 1] || ''}
                                </StyledDiv>
                            </div>
                        }
                        <div className="pages-user-box-2">
                            <div style={{ flexDirection: 'column' }} className="pages-user-block">
                                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение суммы перевода</h6>
                                <input
                                    onChange={(e) => setScoreTransfersToUser(e.target.value || 0)}
                                    className="tabl-flex-admin-user-scores "
                                    style={{ color: 'white', borderRadius: '5px' }}
                                    type="number"
                                    name="name"
                                    placeholder="Изменение денег пользователя"
                                    autoComplete="off"
                                    required
                                    value={scoreTransfers || 0}
                                />
                            </div>
                            <div style={{ flexDirection: 'column' }} className="pages-user-block">
                                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение статуса перевода</h6>
                                <select
                                    onChange={(e) => setStatusTransfersToUser(e.target.value)}
                                    style={{ color: 'white', borderRadius: '5px' }}
                                    className="tabl-flex-admin-user-scores "
                                    name="select"
                                    value={String(statusTransfersToUser) || '1'}
                                >
                                    <option value="1">В обработке</option>
                                    <option value="2">Отмененный</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                            <div className="tabl-flex-admin-button-global" onClick={changeTransfer}>
                                Внести изменения
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransfersToUserID;
