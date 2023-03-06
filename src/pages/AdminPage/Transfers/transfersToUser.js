import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllUserToUserTransfers } from "../../../api/transferToUser";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from "react-router-dom";
import { transferStatusMock } from "../../../components/mock/OutputMock";
import { StyledDiv, StyledDivHeader } from '../Users/style';

function TransfersToUser(search) {

  const dispatch = useDispatch();
  const [transfersToUser, setTransferToUser] = useState([]);
  const [page, setPage] = useState(0);
  const [sortId, setSortId] = useState(true);
  const [sortStatus, setSortStatus] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { allTransfersToUser } = useAppSelector((store) => store.user);
  const navigate = useNavigate()

  async function getAllTransfersTouser() {
    const data = await axiosGetAllUserToUserTransfers();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_TRANSFERS_TO_USER,
        payload: data,
      });
    }
  }

  useEffect(() => {
    setTransferToUser(allTransfersToUser
      ?.filter((el) => search?.search ? (el?.userEmail?.toLowerCase()?.includes(search?.search) ||
        el?.userNickname?.toLowerCase()?.includes(search?.search) ||
        el?.receiverEmail?.toLowerCase()?.includes(search?.search) ||
        el?.receiverNickname?.toLowerCase()?.includes(search?.search)) : true)
      ?.sort((a, b) => sortId ? a.id - b.id : b.id - a.id).sort((a, b) => sortStatus ? a.status - b.status : b.status - a.status))
  }, [allTransfersToUser, search, sortId, sortStatus])

  useEffect(() => {
    getAllTransfersTouser();
    // eslint-disable-next-line 
  }, [])

  return <>

    <div style={{ display: "flex", justifyContent: "center" }}> <h2>ПЕРЕВОДЫ ПОЛЬЗОВАТЕЛЮ</h2></div>

    <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
      <StyledDivHeader size='80px'>ID</StyledDivHeader>
      <StyledDivHeader size='210px' style={{cursor: 'pointer' }} onClick={() => setSortId(prev => !prev)}>Время создания</StyledDivHeader>
      <StyledDivHeader size='100px' >Сумма</StyledDivHeader>
      <StyledDivHeader size='155px' >Почта пользователя</StyledDivHeader>
      <StyledDivHeader size='155px' >Имя пользователя</StyledDivHeader>
      <StyledDivHeader size='155px' >Почта получателя</StyledDivHeader>
      <StyledDivHeader size='155px' >Имя получателя</StyledDivHeader>
      <StyledDivHeader size='155px' style={{cursor: 'pointer' }} onClick={() => setSortStatus(prev => !prev)}>Статус</StyledDivHeader>
    </div>

    {transfersToUser?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={item.id}>
      <StyledDiv size='80px'  style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.id}</StyledDiv>
      <StyledDiv size='210px' style={{cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.time}</StyledDiv>
      <StyledDiv size='100px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.score}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.userEmail}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.userNickname}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer', overflowWrap: "anywhere" }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.receiverEmail}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{item.receiverNickname}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/transferstouser/${item?.id}`)} >{transferStatusMock[item.status - 1]}</StyledDiv>
    </div>)}

    <Pagination
      style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}
      count={Math.ceil(transfersToUser?.length / itemsPerPage)}
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

export default TransfersToUser