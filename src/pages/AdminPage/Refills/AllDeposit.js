import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { StyledInput } from "../../../style/styles";
import { axiosGetAllRefills, axiosDeleteRefill, axiosCreateRefill } from "../../../api/refill";
import { useNavigate } from "react-router-dom";
import { refillStatusMock } from "../../../components/mock/OutputMock";
import CloseIcon from '@mui/icons-material/Close';
import AlertError from "../../../components/AlertError";
import { StyledDiv, StyledDivHeader } from "../Users/style";

function AllRefills() {

  const dispatch = useDispatch();
  const { user, allRefills } = useAppSelector((store) => store.user)
  const [newID, setnewID] = useState(0);
  const [newSumDep, setNewSumDep] = useState(0);
  const [emailUser, setEmailUser] = useState('');
  const [search, setSearch] = useState('');
  const [sortId, setSortId] = useState(true);
  const [refills, setRefills] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteRefills, setDeleteRefills] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  async function getAllRefills() {
    const data = await axiosGetAllRefills();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_REFILLS,
        payload: data,
      });
    }
  }

  async function createRefill() {
    if (!newID || !newSumDep || !emailUser) return alert('Введите все данные');
    const result = await axiosCreateRefill(Number(newID), Number(newSumDep), emailUser, user?.email, user?.password);
    if (result) {
      alert('Успешно');
      getAllRefills();
      setnewID(0);
      setNewSumDep(0);
      setEmailUser('');
    } else {
      return <AlertError message={'Что-то пошло не так'} />
    }
  }

  function changeDeleteRefills(checked, id) {
    if (checked) {
      setDeleteRefills(prev => [...prev, id])
    } else {
      setDeleteRefills(prev => prev.filter(item => item !== id))
    }
  }

  useEffect(() => {
    setRefills(allRefills
      ?.filter((el) => search ? (el?.userEmail?.toLowerCase()?.includes(search) ||
        el?.userNickname?.toLowerCase()?.includes(search)) : true)
      ?.sort((a, b) => sortId ? a.uniqueId - b.uniqueId : b.uniqueId - a.uniqueId))
  }, [allRefills, search, sortId])

  useEffect(() => {
    getAllRefills();
    // eslint-disable-next-line 
  }, [user])

  return <>
    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <StyledInput className="tabl-flex-admin-search"
        style={{ color: "white", borderRadius: "5px", paddingLeft: '10px' }}
        type="search"
        id='Search'
        value={search}
        placeholder="Поиск"
        onChange={(e) => setSearch(e.target.value?.toLowerCase())}
        autoComplete="off"
        required />

    </div>

    <div style={{ display: "flex", justifyContent: "center" }}> <h2>ПОЛЬЗОВАТЕЛИ</h2></div>

    <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
      <StyledDivHeader size='80px'  >UNIQUE ID</StyledDivHeader>
      <StyledDivHeader size='80px'  >ID для пользователя</StyledDivHeader>
      <StyledDivHeader size='155px' style={{ cursor: 'pointer' }} onClick={() => setSortId(prev => !prev)}>Время создания</StyledDivHeader>
      <StyledDivHeader size='100px'  >Сумма</StyledDivHeader>
      <StyledDivHeader size='155px'  >Почта пользователя</StyledDivHeader>
      <StyledDivHeader size='155px'  >Имя пользователя</StyledDivHeader>
      <StyledDivHeader size='155px'  >Статус</StyledDivHeader>
      <StyledDivHeader size='80px'   >Удалить</StyledDivHeader>
    </div>

    {refills?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={item.uniqueId}>
      <StyledDiv size={{ textAlign: 'center', width: '80px', height: '48px', display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }} onClick={() => {
        navigate(`/adminPanel/refill/${item?.uniqueId}`)
      }} >{item.uniqueId}</StyledDiv>
      <StyledDiv size='80px'  style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/refill/${item?.uniqueIdid}`)} className="output-id">{item?.id}</StyledDiv>
      <StyledDiv size='155px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/refill/${item?.uniqueId}`)} className="output-id">{item?.time}</StyledDiv>
      <StyledDiv size='100px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/refill/${item?.uniqueId}`)} className="output-date">{item?.score}</StyledDiv>
      <StyledDiv size='155px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/refill/${item?.uniqueId}`)} className="output-date">{item?.userEmail}</StyledDiv>
      <StyledDiv size='155px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/refill/${item?.uniqueId}`)} className="output-sum">{item?.userNickname}</StyledDiv>
      <StyledDiv size='155px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/refill/${item?.uniqueId}`)} className="output-sum">{refillStatusMock[item?.status - 1]}</StyledDiv>
      <StyledDiv size='80px' style={{ cursor: 'pointer' }}  onChange={(e) => changeDeleteRefills(e.target.checked, item?.uniqueId)}><Checkbox color="error" /></StyledDiv>
    </div>)}
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: '5px' }}>
      <div className="tabl-flex-admin-button"
        onClick={async () => {
          await Promise.all(deleteRefills?.map(async id => await axiosDeleteRefill(Number(id), user?.email, user?.password)))
          setDeleteRefills([])
          await getAllRefills();
          alert('Success')
        }}>
        Удалить
      </div>
    </div>

    <Pagination
      style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}
      count={Math.ceil(refills?.length / itemsPerPage)}
      shape="rounded"
      onChange={(e, value) => setPage(Number(value) - 1)}
      renderItem={(item) => (
        <PaginationItem
          {...item}
        />
      )}
    />

    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: '20px' }}>
      <h6 style={{ margin: '0px', paddingRight: "10px" }}>Кол-во</h6>
      <input
        className="tabl-flex-admin-pages"
        style={{ color: "white", borderRadius: "5px" }}
        type="number"
        name="name"
        value={itemsPerPage}
        placeholder="Елементов на странице"
        // className={styles.input}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        autoComplete="off"
        required
      />
    </div>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: '250px' }}>
      <div onClick={() => setIsOpen(true)} style={{ maxWidth: "205px !important" }} className="tabl-flex-admin-button-global2">
        Новое пополнение
      </div>
    </div>
    {isOpen ? <div onClick={() => setIsOpen(false)} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', width: "59%", flexDirection: "row-reverse" }}>
        <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} ></CloseIcon>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
        <div style={{ display: "flex", gap: '20px' }}>
          <div style={{ flexDirection: "column" }} className='pages-user-block'>
            <h6 style={{ margin: "0", textAlign: "center" }}>Создание ID</h6>
            <input
              onChange={(e) => setnewID(e.target.value || 0)}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px" }}
              type="number"
              name="name"
              placeholder="Изменение ID пополнения"
              autoComplete="off"
              required
              value={newID}
            />
          </div>
          <div style={{ flexDirection: "column" }} className='pages-user-block'>
            <h6 style={{ margin: "0", textAlign: "center" }}>Создание суммы пополнения</h6>
            <input
              onChange={(e) => setNewSumDep(Number(e.target.value) || 0)}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px" }}
              type="number"
              name="name"
              placeholder="Изменение денег пользователя"
              autoComplete="off"
              required
              value={newSumDep}
            />
          </div>
          <div style={{ flexDirection: "column" }} className='pages-user-block'>
            <h6 style={{ margin: "0", textAlign: "center", overflowWrap: "anywhere" }}>Email пользователя или Login</h6>
            <input
              onChange={(e) => setEmailUser(e.target.value)}
              className="tabl-flex-admin-user-scores "
              style={{ color: "white", borderRadius: "5px" }}
              type="text"
              name="name"
              placeholder="Изменение email пользователя"
              autoComplete="off"
              required
              value={emailUser}
            />
          </div>
        </div>
        <div className="tabl-flex-admin-button-global2" onClick={createRefill}>
          Создать пополнение
        </div>
      </div>
    </div> : ""}

  </>
}

export default AllRefills