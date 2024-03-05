import { useAppSelector } from "../../store/reduxHooks";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reducerTypes } from "../../store/Users/types";
import { axiosRemoveUser, axiosGetAllUsers } from "../../api/user";
import UserCreate from "./components/UserCreate";
import { TextField, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { PageContainer } from "../../components/Page.styled";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationBlock from "../../components/forPages/PaginationBlock";
import { customAlert } from "../../components/Alert/AlertFunction";

function AllUsers() {
  const dispatch = useDispatch();
  const { user, allUsers, locale } = useAppSelector((store) => store.user);
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
  const [isOpen, setIsOpen] = useState(false);

  const messages = useMemo(() => {
    return {
      search: locale["search"],
      items_per_page: locale["items_per_page"],
      return: locale["return"],
      title: locale["all_users_title"],
      id: locale["all_users_id"],
      username: locale["all_users_username"],
      role: locale["all_users_role"],
      email: locale["all_users_email"],
      delete: locale["delete"],
    };
  }, [locale]);

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
    setUsers(allUsers?.filter((el) => (search ? el?.email?.toLowerCase()?.includes(search) || el?.nickname?.toLowerCase()?.includes(search) : true)));
  }, [allUsers, search, filterAdmin, filterModerator, filterChater, filterUser, completed]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [user]);

  return (
    <PageContainer>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", height: "41px" }}>
        <TextField size="small" label={messages.search} variant="outlined" type="search" id="Search" value={search} onChange={(e) => setSearch(e.target.value?.toLowerCase())} />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
          {isOpen === false ? (
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "5px" }}>
              <Button onClick={() => setIsOpen(true)}>Create User</Button>
            </div>
          ) : (
            <UserCreate setIsOpen={setIsOpen} getAllUsers={getAllUsers} />
          )}
          <Button
            variant="outlined"
            onClick={async () => {
              await Promise.all(deleteUsers?.map(async (id) => await axiosRemoveUser(Number(id), user.id)));
              setDeleteUsers([]);
              await getAllUsers();
              customAlert({ message: "Success", severity: "success" });
            }}
            hidden={!deleteUsers[0]}
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="centerTable" size="small">
          <TableHead>
            <TableRow>
              <TableCell>{messages.id}</TableCell>
              <TableCell>{messages.username}</TableCell>
              <TableCell>{messages.role}</TableCell>
              <TableCell>{messages.email}</TableCell>
              <TableCell>{messages.delete}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              ?.sort((a, b) => a.id - b.id)
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              ?.map((item, index) => (
                <TableRow key={item.email} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell className="pointer" component="th" scope="row" onClick={() => navigate(`/users/${item?.id}`)}>
                    {item?.id}
                  </TableCell>
                  <TableCell>{item.nickname}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell onChange={(e) => changeDeleteUsers(e.target.checked, item?.id)}>
                    {" "}
                    <Checkbox color="primary" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationBlock
        count={Math.ceil(users?.length / itemsPerPage)}
        page={page}
        setPage={setPage}
        setItemsPerPage={setItemsPerPage}
        itemsPerPageForInput={itemsPerPage}
        setItemsPerPageForInput={setItemsPerPage}
        messages={messages}
        noZoom
      />
    </PageContainer>
  );
}

export default AllUsers;
