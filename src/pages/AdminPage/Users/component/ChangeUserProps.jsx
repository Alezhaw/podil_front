function ChangeUserProps({ setRoleUser, roleUser, changeRole }) {
  return (
    <div className="pages-user-box">
      <div className="pages-user-block">
        <h6 style={{ margin: "0", textAlign: "center" }}>Изменение роли пользователя</h6>
        <div style={{ display: "flex", gap: " 5px" }}>
          <select
            onChange={(e) => setRoleUser(e.currentTarget.value)}
            style={{ color: "white", borderRadius: "5px" }}
            className="tabl-flex-admin-user-scores "
            name="select"
            value={roleUser || "USER"}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="USER">USER</option>
          </select>
          <div className="tabl-flex-admin-button" onClick={changeRole}>
            Изменить
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeUserProps;
