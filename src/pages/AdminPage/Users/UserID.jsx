import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosDeleteUser, axiosGetAllUsers, axiosChangeRole } from "../../../api/user";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import ChangeUserProps from "./component/ChangeUserProps";
import { StyledDiv, StyledDivHeader } from "./style";

function AllUsersID() {
  const { allUsers, user } = useAppSelector((store) => store.user);
  const statebackground = !!localStorage.getItem("backroundImg");
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [roleUser, setRoleUser] = useState("");
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
    if (user?.role === "USER" || user?.role === null || user?.role === "" || user?.role === undefined) {
      navigate("/");
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
    }
    // eslint-disable-next-line
  }, [allUsers]);

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh", justifyContent: "center" }} className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(17, 17, 18, 0.65)" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px", color: "white" }}>
            <div onClick={() => navigate("/adminPanel")} className="tabl-flex-admin-button-global2">
              Return
            </div>
          </div>
          <div style={{ marginTop: "20px", color: "white" }}>
            <div style={{ borderRadius: "5px" }} className="tabl-flex-admin">
              <StyledDivHeader size="50px">ID</StyledDivHeader>
              <StyledDivHeader size="155px">Username</StyledDivHeader>
              <StyledDivHeader size="155px">Role</StyledDivHeader>
              <StyledDivHeader size="210px">Email</StyledDivHeader>
              <StyledDivHeader size="80px">Delete</StyledDivHeader>
            </div>

            {
              <div style={{ marginTop: "5px", borderRadius: "5px" }} className="tabl-flex-admin-user" key={currentUser?.email}>
                <StyledDiv size="50px">{currentUser?.id}</StyledDiv>
                <StyledDiv size="155px">{currentUser?.nickname}</StyledDiv>
                <StyledDiv size="155px">{roleUser}</StyledDiv>
                <StyledDiv size="210px">{currentUser?.email}</StyledDiv>
                <StyledDiv size="80px" onChange={(e) => changeDeleteUsers(e.target.checked, currentUser?.id)}>
                  <Checkbox color="error" readOnly />
                </StyledDiv>
              </div>
            }
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
                Delete
              </div>
            </div>
          </div>
          <ChangeUserProps setRoleUser={setRoleUser} roleUser={roleUser} changeRole={changeRole} />
        </div>
      </div>
    </>
  );
}

export default AllUsersID;
