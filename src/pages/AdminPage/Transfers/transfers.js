import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllUserTransfers } from "../../../api/transfer";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from "react-router-dom";
import { transferStatusMock } from "../../../components/mock/OutputMock";
import { StyledDiv, StyledDivHeader } from '../Users/style';

function Transfers(search) {

  const dispatch = useDispatch();
  const [transfers, setTransfers] = useState([]);
  const [page, setPage] = useState(0);
  const [sortId, setSortId] = useState(true);
  const [sortStatus, setSortStatus] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { allTransfers } = useAppSelector((store) => store.user);
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

  useEffect(() => {
    setTransfers(allTransfers
      ?.filter((el) => search?.search ? (el?.userEmail?.toLowerCase()?.includes(search?.search) ||
        el?.userNickname?.toLowerCase()?.includes(search?.search)) : true)
      ?.sort((a, b) => sortId ? a.id - b.id : b.id - a.id).sort((a, b) => sortStatus ? a.status - b.status : b.status - a.status))
  }, [allTransfers, search, sortId, sortStatus])

  useEffect(() => {
    getAllTransfers();
    // eslint-disable-next-line 
  }, [])

  return <>

    <div style={{ display: "flex", justifyContent: "center" }}> <h2>ПЕРЕВОДЫ ПО РЕКВИЗИТАМ</h2></div>

    <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
      <StyledDivHeader size='80px' >ID</StyledDivHeader>
      <StyledDivHeader size='210px' style={{cursor: 'pointer' }}  onClick={() => setSortId(prev => !prev)}>Время создания</StyledDivHeader>
      <StyledDivHeader size='100px' >Сумма</StyledDivHeader>
      <StyledDivHeader size='155px'>Система оплаты</StyledDivHeader>
      <StyledDivHeader size='210px'>Номер кошелька</StyledDivHeader>
      <StyledDivHeader size='155px'>Почта пользователя</StyledDivHeader>
      <StyledDivHeader size='155px'>Имя пользователя</StyledDivHeader>
      <StyledDivHeader size='155px' style={{cursor: 'pointer' }} onClick={() => setSortStatus(prev => !prev)}>Статус</StyledDivHeader>
    </div>

    {transfers?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={item.id}>
      <StyledDiv size='80px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)}>{item.id}</StyledDiv>
      <StyledDiv size='210px'style={{ cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)}>{item.time}</StyledDiv>
      <StyledDiv size='100px'style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)}>{item.score}</StyledDiv>
      <StyledDiv size='155px'style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} >{item.paymantSystem}</StyledDiv>
      <StyledDiv size='210px'style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} >{item.walletNumber}</StyledDiv>
      <StyledDiv size='155px'style={{ cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} >{item.userEmail}</StyledDiv>
      <StyledDiv size='155px'style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} >{item.userNickname}</StyledDiv>
      <StyledDiv size='155px'style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transfers/${item?.id}`)} >{transferStatusMock[item.status - 1]}</StyledDiv>
    </div>)}

    <Pagination
      style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}
      count={Math.ceil(transfers?.length / itemsPerPage)}
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

  </>
}

export default Transfers