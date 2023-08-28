import CloseIcon from "@mui/icons-material/Close";

function CreateCity({ setIsOpen, firstTime, setFirstTime, secondTime, setSecondTime, thirdTime, setThirdTime, changeCityValues, createCity }) {
  return (
    <div onClick={() => setIsOpen(false)} style={{ background: "rgba(17, 17, 18, 0.95)" }} className="modalStyles">
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", width: "59%", flexDirection: "row-reverse" }}>
        <CloseIcon style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}></CloseIcon>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>First time</h6>
              <input
                onChange={(e) => setFirstTime((prev) => ({ ...prev, time: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.time || "00:00:00"}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Second time</h6>
              <input
                onChange={(e) => setSecondTime((prev) => ({ ...prev, time: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={secondTime?.time || "00:00:00"}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", overflowWrap: "anywhere" }}>Third time</h6>
              <input
                onChange={(e) => setThirdTime((prev) => ({ ...prev, time: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                s
                required
                value={thirdTime?.time || "00:00:00"}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Region</h6>
              <input
                onChange={(e) => changeCityValues("region", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.region || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Город</h6>
              <input
                onChange={(e) => changeCityValues("city_lokal", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.city_lokal || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Address</h6>
              <input
                onChange={(e) => changeCityValues("adress", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.adress || ""}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Institution</h6>
              <input
                onChange={(e) => changeCityValues("institution", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.institution || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Hall</h6>
              <input
                onChange={(e) => changeCityValues("hall", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.hall || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Date</h6>
              <input
                onChange={(e) => changeCityValues("date", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="date"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.date || "0000-00-00"}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Population</h6>
              <input
                onChange={(e) => changeCityValues("population", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="number"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.population || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>System</h6>
              <input
                onChange={(e) => changeCityValues("city_note", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.city_note || ""}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>KP</h6>
              <input
                onChange={(e) => changeCityValues("projekt", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.projekt || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Timezoneс</h6>
              <input
                onChange={(e) => changeCityValues("timezone", Number(e.target.value) || null)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="number"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.timezone || ""}
              />
            </div>
            <div style={{ flexDirection: "column", width: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>ID for base</h6>
              <input
                onChange={(e) => changeCityValues("id_for_base", Number(e.target.value) || null)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="number"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.id_for_base || ""}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Limit 1</h6>
              <input
                onChange={(e) => setFirstTime((prev) => ({ ...prev, limit: Number(e.target.value) || null }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="number"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.limit || ""}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Limit 2</h6>
              <input
                onChange={(e) => setSecondTime((prev) => ({ ...prev, limit: Number(e.target.value) || null }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="number"
                placeholder=""
                autoComplete="off"
                required
                value={secondTime?.limit || ""}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", overflowWrap: "anywhere" }}>Limit 3</h6>
              <input
                onChange={(e) => setThirdTime((prev) => ({ ...prev, limit: Number(e.target.value) || null }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="number"
                placeholder=""
                autoComplete="off"
                s
                required
                value={thirdTime?.limit || ""}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Limit regalo 1</h6>
              <input
                onChange={(e) => setFirstTime((prev) => ({ ...prev, present: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.present || ""}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Limit regalo 2</h6>
              <input
                onChange={(e) => setSecondTime((prev) => ({ ...prev, present: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={secondTime?.present || ""}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", overflowWrap: "anywhere" }}>Limit regalo 3</h6>
              <input
                onChange={(e) => setThirdTime((prev) => ({ ...prev, present: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                s
                required
                value={thirdTime?.present || ""}
              />
            </div>
          </div>
        </div>
        <div className="tabl-flex-admin-button-global2" onClick={() => createCity(firstTime, secondTime, thirdTime)}>
          Create presentation
        </div>
      </div>
    </div>
  );
}

export default CreateCity;
