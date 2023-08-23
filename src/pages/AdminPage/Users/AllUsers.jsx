import { useAppSelector } from "../../../store/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { StyledInput } from "../../../style/styles";
import { axiosDeleteUser, axiosGetAllUsers } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { StyledDiv, StyledDivHeader } from "./style";

function AllUsers() {
  const dispatch = useDispatch();
  const { user, allUsers } = useAppSelector((store) => store.user);
  const [search, setSearch] = useState("");
  const [filterAdmin, setFilterAdmin] = useState(true);
  const [filterModerator, setFilterModerator] = useState(true);
  const [filterChater, setFilterChater] = useState(true);
  const [filterUser, setFilterUser] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [deleteUsers, setDeleteUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  async function getAllUsers() {
    const data = await axiosGetAllUsers();
    if (data) {
      dispatch({
        type: reducerTypes.GET_ALL_USERS,
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

  useEffect(() => {
    setUsers(
      allUsers
        ?.filter((el) => (search ? el?.email?.toLowerCase()?.includes(search) || el?.nickname?.toLowerCase()?.includes(search) : true))
        ?.filter(
          (checkbox) =>
            (checkbox?.role === "ADMIN" && filterAdmin) ||
            (checkbox?.role === "MODERATOR" && filterModerator) ||
            (checkbox?.role === "CHATER" && filterChater) ||
            (checkbox?.role === "USER" && filterUser)
        )
        ?.filter((el) => !(el.completed === 1) || completed)
    );
  }, [allUsers, search, filterAdmin, filterModerator, filterChater, filterUser, completed]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StyledInput
          className="tabl-flex-admin-search"
          style={{ color: "white", borderRadius: "5px", paddingLeft: "10px" }}
          type="search"
          id="Search"
          value={search}
          placeholder="Поиск"
          onChange={(e) => setSearch(e.target.value?.toLowerCase())}
          autoComplete="off"
          required
        />

        <div className="tabl-flex-admin-filtr" style={{ borderRadius: "5px" }}>
          {/* <h5 style={{ margin: '0' }}>Админы</h5> <Checkbox value={filterAdmin} defaultChecked onChange={() => setFilterAdmin((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>Модеры</h5> <Checkbox value={filterModerator} defaultChecked onChange={() => setFilterModerator((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>Чатеры</h5> <Checkbox value={filterChater} defaultChecked onChange={() => setFilterChater((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>Юзеры</h5> <Checkbox value={filterUser} defaultChecked onChange={() => setFilterUser((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>Закрытые</h5> <Checkbox value={completed} onChange={() => setCompleted((prev) => !prev)} color="error" /> */}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <h2>ПОЛЬЗОВАТЕЛИ</h2>
      </div>

      <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
        <StyledDivHeader size="50px">ID</StyledDivHeader>
        <StyledDivHeader size="155px">Имя пользователя</StyledDivHeader>
        <StyledDivHeader size="155px">Роль пользователя</StyledDivHeader>
        <StyledDivHeader size="210px">Почта Пользователя</StyledDivHeader>
        <StyledDivHeader size="80px">Удалить</StyledDivHeader>
      </div>

      {users
        ?.sort((a, b) => a.id - b.id)
        .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
        ?.map((item, index) => (
          <div style={{ marginTop: "5px", borderRadius: "5px" }} className="tabl-flex-admin-user" key={item?.email}>
            <StyledDiv size="50px" onClick={() => navigate(`/adminPanel/user/${item?.id}`)} className="output-id">
              {item?.id}
            </StyledDiv>
            <StyledDiv size="155px" onClick={() => navigate(`/adminPanel/user/${item?.id}`)} className="output-sum">
              {item?.nickname}
            </StyledDiv>
            <StyledDiv size="155px" onClick={() => navigate(`/adminPanel/user/${item?.id}`)} className="output-date">
              {item?.role}
            </StyledDiv>
            <StyledDiv size="210px" onClick={() => navigate(`/adminPanel/user/${item?.id}`)} className="output-id">
              {item?.email}
            </StyledDiv>
            <StyledDiv size="80px" className="output-sum" onChange={(e) => changeDeleteUsers(e.target.checked, item?.id)}>
              <Checkbox color="error" />
            </StyledDiv>
          </div>
        ))}

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
        <div
          className="tabl-flex-admin-button"
          onClick={async () => {
            await Promise.all(deleteUsers?.map(async (id) => await axiosDeleteUser(Number(id), user?.email, user?.password)));
            setDeleteUsers([]);
            await getAllUsers();
            alert("Success");
          }}
        >
          Удалить
        </div>
      </div>

      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        count={Math.ceil(users?.length / itemsPerPage)}
        shape="rounded"
        onChange={(e, value) => setPage(Number(value) - 1)}
        renderItem={(item) => <PaginationItem {...item} />}
      />

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
        <h6 style={{ margin: "0px", paddingRight: "10px" }}>Кол-во</h6>
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
  );
}

export default AllUsers;
