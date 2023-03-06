import { useDispatch } from 'react-redux';
import { axiosCreateChat, axiosDeleteChat, axiosGetChatID } from '../../../api/botSettings';
import { reducerTypes } from '../../../store/Users/types';
import { StyledDiv, StyledDivHeader } from '../Users/style';
import { useAppSelector } from '../../../store/reduxHooks';
import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AlertError from '../../../components/AlertError';

function BotAdmin() {
    const dispatch = useDispatch();
    const { telegramUser, user } = useAppSelector((store) => store.user);
    const [deleteUsers, setDeleteUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('')
    const [chatId, setChatId] = useState()

    async function getTelegramUsers() {
        const data = await axiosGetChatID();
        if (data) {
            console.log(data);
            dispatch({
                type: reducerTypes.GET_TELEGRAM_USER,
                payload: data,
            });
        }
    }

    function changeDeleteUsers(checked, id) {
        if (checked) {
            setDeleteUsers((prev) => [...prev, id]);
        } else {
            setDeleteUsers((prev) => prev.filter((item) => item !== id));
        }
    }

    async function createRefill() {
        if (!name || !chatId ) return alert('Введите все данные');
        const result = await axiosCreateChat(name, chatId, user.email, user.password)
        if (result) {
          alert('Успешно');
          getTelegramUsers();
          setName('')
          setChatId()
        } else {
          return <AlertError message={'Что-то пошло не так'} />
        }
      }

    useEffect(() => {
        getTelegramUsers();
        // eslint-disable-next-line
    }, [user]);

    return (
        <div style={{display:"flex",flexDirection: "column", alignItems: "center"}}>
            <div style={{ borderRadius: '5px', width: '450px' }} className="tabl-flex-admin">
                <StyledDivHeader size="150px">Имя</StyledDivHeader>
                <StyledDivHeader size="150px">Chat ID</StyledDivHeader>
                <StyledDivHeader size="150px">Удаление</StyledDivHeader>
            </div>
            {telegramUser?.map((item) => (
                <div style={{ marginTop: '5px', borderRadius: '5px', width: '450px' }} className="tabl-flex-admin-user">
                    <StyledDiv size="150px">{item?.name}</StyledDiv>
                    <StyledDiv size="150px">{item?.chatid}</StyledDiv>
                    <StyledDiv size="150px">
                        <Checkbox color="error" onChange={(e) => changeDeleteUsers(e.target.checked, item?.name)} />
                    </StyledDiv>
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: '5px',width:'450px' }}>
                <div
                    className="tabl-flex-admin-button"
                    onClick={async () => {
                        await Promise.all(deleteUsers?.map(async (item) => await axiosDeleteChat(item, user.email, user.password)));
                        setDeleteUsers([]);
                        await getTelegramUsers();
                        alert('Success');
                    }}
                >
                    Удалить
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: '250px' }}>
      <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
            Создать
      </div>
        </div>
            {isOpen ? <div onClick={() => setIsOpen(false)} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', width: "59%", flexDirection: "row-reverse" }}>
        <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} ></CloseIcon>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
        <div style={{ display: "flex", gap: '20px' }}>
          <div style={{ flexDirection: "column" }} className='pages-user-block'>
            <h6 style={{ margin: "0", textAlign: "center" }}>Имя</h6>
            <input
              onChange={(e) => setName(e.target.value || '')}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px" }}
              type="text"
              name="name"
              placeholder="Имя"
              autoComplete="off"
              required
              value={name}
            />
          </div>
          <div style={{ flexDirection: "column" }} className='pages-user-block'>
            <h6 style={{ margin: "0", textAlign: "center" }}>Chat ID</h6>
            <input
              onChange={(e) => setChatId(e.target.value || 0)}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px" }}
              type="number"
              name="name"
              placeholder="Chat ID"
              autoComplete="off"
              required
              value={chatId}
            />
          </div>
        </div>
        <div className="tabl-flex-admin-button-global2" onClick={createRefill}>
          Добавить
        </div>
      </div>
    </div> : ""}
        </div>
    );
}

export default BotAdmin;
