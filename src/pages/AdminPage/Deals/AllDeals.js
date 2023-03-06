import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { axiosDeleteDeal, axiosGetAllDeal } from "../../../api/deal";
import { StyledInput } from "../../../style/styles";
import { useNavigate } from "react-router-dom";
import { dealStatusMock } from "../../../components/mock/OutputMock";
import { StyledDiv, StyledDivHeader } from "../Users/style";

function AllDeals() {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(true);
  const [filterCheck, setFilterCheck] = useState(true);
  const [filterPayed, setFilterPayed] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);
  const [filterArbitration, setFilterArbitration] = useState(true);
  const [sortId, setSortId] = useState(true);
  const { allDeals, user } = useAppSelector((store) => store.user)
  const [deals, setDeals] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteDeals, setDeleteDeals] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate()

  async function getAllDeals() {
    const data = await axiosGetAllDeal();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_DEALS,
        payload: data,
      });
    }
  }

  function changeDeleteDeals(checked, id) {
    if (checked) {
      setDeleteDeals(prev => [...prev, id])
    } else {
      setDeleteDeals(prev => prev.filter(item => item !== id))
    }
  }

  useEffect(() => {
    setDeals(allDeals
      ?.filter((el) => search ? (el?.buyer?.toLowerCase()?.includes(search) ||
        el?.buyerNickname?.toLowerCase()?.includes(search) ||
        el?.seller?.toLowerCase()?.includes(search) ||
        el?.sellerNickname?.toLowerCase()?.includes(search)) : true)
      ?.filter((checkbox) => (checkbox?.status === 1 && filterOpen) ||
        (checkbox?.status === 2 && filterCheck) ||
        (checkbox?.status === 3 && filterPayed) ||
        (checkbox?.status === 4 && filterComplete) ||
        (checkbox?.status === 5 && filterArbitration))
      ?.sort((a, b) => sortId ? a.id - b.id : b.id - a.id))
  }, [allDeals, search, filterOpen, filterCheck, filterPayed, filterComplete, filterArbitration, sortId])

  useEffect(() => {
    getAllDeals();
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

      <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px" }}>
        <h5 style={{ margin: '0' }}>На согласовании</h5> <Checkbox value={filterOpen} defaultChecked onChange={() => setFilterOpen((prev) => !prev)} color="error" />
        <h5 style={{ margin: '0' }}>Ожидает оплаты</h5> <Checkbox value={filterCheck} defaultChecked onChange={() => setFilterCheck((prev) => !prev)} color="error" />
        <h5 style={{ margin: '0' }}>Оплачена</h5> <Checkbox value={filterPayed} defaultChecked onChange={() => setFilterPayed((prev) => !prev)} color="error" />
        <h5 style={{ margin: '0' }}>Завершена</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" />
        <h5 style={{ margin: '0' }}>Арбитраж</h5> <Checkbox value={filterArbitration} defaultChecked onChange={() => setFilterArbitration((prev) => !prev)} color="error" />
      </div>
    </div>

    <h3 style={{ textAlign: 'center' }}>СДЕЛКИ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ НА САЙТЕ</h3>

    <div className="tabl-flex-admin" style={{ borderRadius: "5px" }}>
      <StyledDivHeader size='80px'  >ID </StyledDivHeader>
      <StyledDivHeader size='155px' style={{cursor: 'pointer' }} onClick={() => setSortId(prev => !prev)}>Время создания сделки</StyledDivHeader>
      <StyledDivHeader size='155px' >Имя продавца</StyledDivHeader>
      <StyledDivHeader size='210px' >Почта продавца</StyledDivHeader>
      <StyledDivHeader size='155px' >Имя покупателя</StyledDivHeader>
      <StyledDivHeader size='210px' >Почта покупателя</StyledDivHeader>
      <StyledDivHeader size='155px' >Сумма сделки</StyledDivHeader>
      <StyledDivHeader size='155px' >Статус сделки </StyledDivHeader>
      <StyledDivHeader size='80px'  >Удалить</StyledDivHeader>
    </div>

    {deals?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={item?.id}>
      <StyledDiv size='80px'  style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)}>{item?.id}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)}>{item?.createdAt}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} >{item?.sellerNickname}</StyledDiv>
      <StyledDiv size='210px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} >{item?.seller}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} >{item?.buyerNickname}</StyledDiv>
      <StyledDiv size='210px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} >{item?.buyer}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} >{item?.sum}</StyledDiv>
      <StyledDiv size='155px' style={{cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)} >{dealStatusMock[item?.status - 1]}</StyledDiv>
      <StyledDiv size='80px' onChange={(e) => changeDeleteDeals(e.target.checked, item?.id)}><Checkbox color="error" /></StyledDiv>
    </div>)}
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: '5px' }}>
      <div className="tabl-flex-admin-button"
        onClick={async () => {
          await Promise.all(deleteDeals?.map(async id => await axiosDeleteDeal(Number(id), user?.email, user?.password)))
          setDeleteDeals([])
          await getAllDeals();
          alert('Success')
        }}>
        Удалить
      </div>
    </div>

    <Pagination
      style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}
      count={Math.ceil(deals?.length / itemsPerPage)}
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

export default AllDeals