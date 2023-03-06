import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosDeleteUser, axiosGetAllUsers, axiosChangeRole, axiosChangeScore, axiosChangeSystemMessage, axiosChangeCompleted, axiosChangeCheckRu, axiosChangeTransferAmount } from '../../../api/user';
import { useAppSelector } from '../../../store/reduxHooks';
import { reducerTypes } from '../../../store/Users/types';
import ChangeUserProps from './component/ChangeUserProps';
import { StyledDiv, StyledDivHeader } from './style';

function AllUsersID() {
    const { allUsers, user } = useAppSelector((store) => store.user);
    const statebackground = !!localStorage.getItem('backroundImg');
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [roleUser, setRoleUser] = useState('');
    const [systemMessagesUser, setSystemMessagesUser] = useState('');
    const [completedUser, setCompletedUser] = useState('');
    const [scoreUser, setscoreUser] = useState('');
    const [minScore, setMinScore] = useState(0);
    const [minRefil, setMinRefil] = useState(0);
    const [blockUser, setBlockUser] = useState('');
    const [deleteUsers, setDeleteUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeDeleteUsers(checked, id) {
        if (checked) {
            setDeleteUsers((prev) => [...prev, id]);
        } else {
            setDeleteUsers((prev) => prev.filter((item) => item !== id));
        }
    }

    async function getAllUsers() {
        const data = await axiosGetAllUsers();
        dispatch({
            type: reducerTypes.GET_ALL_USERS,
            payload: data || [],
        });
    }

    async function changeRole() {
        const result = await axiosChangeRole(roleUser, currentUser?.id, user?.email, user?.password);
        console.log(result?.response?.data?.message);
        if (result?.response?.data?.message === 'Нет доступа') {
            setRoleUser(currentUser?.role);
            return alert('Нет доступа');
        }
        if (result?.response?.data?.message) {
            setRoleUser(currentUser?.role);
            return alert('Что-то пошло не так');
        }
        alert('Успешно');
    }

    async function changeScore() {
        const result = await axiosChangeScore(scoreUser, currentUser?.id, user?.email, user?.password);
        if (result) {
            getAllUsers();
            return alert('Успешно');
        }
        alert('Что-то пошло не так');
    }

    async function changeSystemMessage() {
        const result = await axiosChangeSystemMessage(systemMessagesUser, currentUser?.id, user?.email, user?.password);
        if (result) {
            getAllUsers();
            return alert('Успешно');
        }
        alert('Что-то пошло не так');
    }

    async function changeCompleted() {
        const result = await axiosChangeCompleted(completedUser, currentUser?.id, user?.email, user?.password);
        if (result) {
            getAllUsers();
            return alert('Успешно');
        }
        alert('Что-то пошло не так');
    }

    async function changeCheckRu() {
        const result = await axiosChangeCheckRu(blockUser, currentUser?.id, user?.email, user?.password);
        if (result) {
            getAllUsers();
            return alert('Успешно');
        }
        alert('Что-то пошло не так');
    }

    async function changeTransferAmount() {
        const result = await axiosChangeTransferAmount(minScore, minRefil, currentUser?.id, user?.email, user?.password);
        if (result) {
            getAllUsers();
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
        getAllUsers();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const temporaryUser = allUsers?.filter((item) => item.id === Number(id))[0];
        if (temporaryUser) {
            setCurrentUser(temporaryUser);
            setRoleUser(temporaryUser?.role);
            setSystemMessagesUser(temporaryUser?.systemMessage);
            setCompletedUser(temporaryUser?.completed);
            setscoreUser(temporaryUser?.score);
            setMinScore(temporaryUser?.minimumTransferAmount);
            setMinRefil(temporaryUser?.minimumTransferAmount - temporaryUser?.score < 0 ? 0 : temporaryUser?.minimumTransferAmount - temporaryUser?.score);
            setBlockUser(temporaryUser?.checkRu);
        }
        // eslint-disable-next-line
    }, [allUsers]);

    return (
        <>
            <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center' }} className={!statebackground ? 'styleAdminPanel' : 'styleAdminPanel2'}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(17, 17, 18, 0.65)' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px', color: 'white' }}>
                        <div onClick={() => navigate('/adminPanel')} className="tabl-flex-admin-button-global2">
                            Вернуться назад
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', color: 'white' }}>
                        <div style={{ borderRadius: '5px' }} className="tabl-flex-admin">
                            <StyledDivHeader size='50px' >
                                ID
                            </StyledDivHeader>
                            <StyledDivHeader size='155px' >
                                Имя пользователя
                            </StyledDivHeader>
                            <StyledDivHeader size='155px' >
                                Роль пользователя
                            </StyledDivHeader>
                            <StyledDivHeader size='155px' >
                                Деньги пользователя
                            </StyledDivHeader>
                            <StyledDivHeader size='210px' >
                                Почта Пользователя
                            </StyledDivHeader>
                            <StyledDivHeader size='155px' >
                                Статус системного сообщения
                            </StyledDivHeader>
                            <StyledDivHeader size='80px'>
                                Completed
                            </StyledDivHeader>
                            <StyledDivHeader size='100px' >
                                Блокировка
                            </StyledDivHeader>
                            <StyledDivHeader size='130px' >
                                Минимальный перевод
                            </StyledDivHeader>
                            <StyledDivHeader size='130px' >
                                Сумма пополнения
                            </StyledDivHeader>
                            <StyledDivHeader size='80px' >
                                Удалить
                            </StyledDivHeader>
                        </div>

                        {
                            <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={currentUser?.email}>
                                <StyledDiv size="50px">{currentUser?.id}</StyledDiv>
                                <StyledDiv size="155px">{currentUser?.nickname}</StyledDiv>
                                <StyledDiv size="155px">{roleUser}</StyledDiv>
                                <StyledDiv size="155px">{scoreUser ?? 0}p</StyledDiv>
                                <StyledDiv size="210px">{currentUser?.email}</StyledDiv>
                                <StyledDiv size="155px">{systemMessagesUser === 'true' ? 'Отправлено' : 'Не отправлено'}</StyledDiv>
                                <StyledDiv size="80px">{['В работе', 'Завершён'][completedUser]}</StyledDiv>
                                <StyledDiv size="100px">{blockUser === 'true' ? 'Разблокирован' : 'Заблокирован'}</StyledDiv>
                                <StyledDiv size="130px">{minScore ?? 0}p</StyledDiv>
                                <StyledDiv size="130px">{minRefil ?? 0}p</StyledDiv>
                                <StyledDiv size="80px" onChange={(e) => changeDeleteUsers(e.target.checked, currentUser?.id)}>
                                    <Checkbox color="error" />
                                </StyledDiv>
                            </div>
                        }
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: '5px' }}>
                            <div
                                className="tabl-flex-admin-button"
                                onClick={async () => {
                                    await Promise.all(deleteUsers?.map(async (id) => await axiosDeleteUser(Number(id), user?.email, user?.password)));
                                    setDeleteUsers([]);
                                    await getAllUsers();
                                    alert('Success');
                                }}
                            >
                                Удалить
                            </div>
                        </div>
                    </div>
                    <ChangeUserProps
                        setRoleUser={setRoleUser}
                        roleUser={roleUser}
                        changeRole={changeRole}
                        setscoreUser={setscoreUser}
                        scoreUser={scoreUser}
                        changeScore={changeScore}
                        setSystemMessagesUser={setSystemMessagesUser}
                        systemMessagesUser={systemMessagesUser}
                        changeSystemMessage={changeSystemMessage}
                        setCompletedUser={setCompletedUser}
                        completedUser={completedUser}
                        changeCompleted={changeCompleted}
                        setBlockUser={setBlockUser}
                        blockUser={blockUser}
                        changeCheckRu={changeCheckRu}
                        setMinScore={setMinScore}
                        minScore={minScore}
                        changeTransferAmount={changeTransferAmount}
                        setMinRefil={setMinRefil}
                    />
                </div>
            </div>
        </>
    );
}

export default AllUsersID;
