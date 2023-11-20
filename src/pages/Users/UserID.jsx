import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosRemoveUser, axiosGetAllUsers, axiosChangeRole } from "../../api/user";
import { useAppSelector } from "../../store/reduxHooks";
import { reducerTypes } from "../../store/Users/types";
import { Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PageContainer } from "../../components/Page.styled";

function AllUsersID() {
  const { allUsers, user, locale } = useAppSelector((store) => store.user);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [roleUser, setRoleUser] = useState("");
  const [deleteUsers, setDeleteUsers] = useState([]);
  const dispatch = useDispatch();

  const messages = useMemo(() => {
    return {
      return: locale["return"],
      id: locale["all_users_id"],
      username: locale["all_users_username"],
      role: locale["all_users_role"],
      email: locale["all_users_email"],
      delete: locale["delete"],
      change_role: locale["city_id_change_user_role"],
      change: locale["city_id_change"],
    };
  }, [locale]);

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

  async function changeRole(roleUser) {
    setRoleUser(roleUser);
    if (!user.id) {
      return alert("Please login");
    }
    const result = await axiosChangeRole(roleUser, currentUser?.id, user?.email, user?.password);
    if (result?.response?.data?.message === "No access") {
      setRoleUser(currentUser?.role);
      return alert("No access");
    }
    if (result?.response?.data?.message) {
      setRoleUser(currentUser?.role);
      return alert("Something went wrong");
    }
    alert("Sucess");
  }

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const temporaryUser = allUsers?.filter((item) => item.id === Number(id))[0];
    if (temporaryUser) {
      setCurrentUser(temporaryUser);
      setRoleUser(temporaryUser?.role);
    }
    // eslint-disable-next-line
  }, [allUsers]);

  return (
    <PageContainer>
      <div style={{ display: "flex", minHeight: "100vh", justifyContent: "center" }}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
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
                <TableRow>
                  <TableCell>{currentUser?.id}</TableCell>
                  <TableCell>{currentUser?.nickname}</TableCell>
                  <TableCell>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: "150px" }} size="small">
                      <InputLabel size="small">{messages.role}</InputLabel>
                      <Select
                        style={{ textAlign: "center" }}
                        labelId="demo-simple-select-label"
                        label={messages.role}
                        id="demo-simple-select-standard"
                        value={roleUser || "USER"}
                        onChange={(e) => changeRole(e.target.value)}
                      >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="TEST">TEST</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  {/* <FormControl variant="outlined" sx={{ m: 1, minWidth: "150px" }} size="small">
          <InputLabel size="small">{role}</InputLabel>
          <Select
            style={{ textAlign: "center" }}
            labelId="demo-simple-select-label"
            label={role}
            id="demo-simple-select-standard"
            value={roleUser || "USER"}
            onChange={(e) => setRoleUser(e.target.value)}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="TEST">TEST</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        </FormControl> */}
                  <TableCell>{currentUser?.email}</TableCell>
                  <TableCell>
                    <Checkbox color="primary" readOnly onChange={(e) => changeDeleteUsers(e.target.checked, currentUser?.id)} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", color: "white", marginBottom: "1rem", width: "100%" }}>
            <Button
              variant="outlined"
              onClick={async () => {
                await Promise.all(deleteUsers?.map(async (id) => await axiosRemoveUser(Number(id), user?.id)));
                setDeleteUsers([]);
                await getAllUsers();
                alert("Success");
              }}
              hidden={!deleteUsers[0]}
              style={{ position: "relative", top: "1rem" }}
            >
              <DeleteIcon />
            </Button>
          </div>
          {/* <ChangeUserProps setRoleUser={setRoleUser} roleUser={roleUser} changeRole={changeRole} {...messages} /> */}
        </div>
      </div>
    </PageContainer>
  );
}

export default AllUsersID;
