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
              <h6 style={{ margin: "0", textAlign: "center" }}>Первое время</h6>
              <input
                onChange={(e) => setFirstTime((prev) => ({ ...prev, godzina: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.godzina || ""}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Второе время</h6>
              <input
                onChange={(e) => setSecondTime((prev) => ({ ...prev, godzina: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={secondTime?.godzina || ""}
              />
            </div>
            <div style={{ flexDirection: "column", maxWidth: "110px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center", overflowWrap: "anywhere" }}>Третье время</h6>
              <input
                onChange={(e) => setThirdTime((prev) => ({ ...prev, godzina: e.target.value }))}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                s
                required
                value={thirdTime?.godzina || ""}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ flexDirection: "column", width: "300px" }} className="pages-user-block">
              <h6 style={{ margin: "0", textAlign: "center" }}>Город</h6>
              <input
                onChange={(e) => changeCityValues("miasto_lokal", e.target.value)}
                className="tabl-flex-admin-user-scores "
                style={{ color: "white", borderRadius: "5px", minWidth: "0px", height: "269px" }}
                type="text"
                placeholder=""
                autoComplete="off"
                required
                value={firstTime?.miasto_lokal || ""}
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
              <h6 style={{ margin: "0", textAlign: "center" }}>Часовой пояс</h6>
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
              <h6 style={{ margin: "0", textAlign: "center" }}>Лимит 1</h6>
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
              <h6 style={{ margin: "0", textAlign: "center" }}>Лимит 2</h6>
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
              <h6 style={{ margin: "0", textAlign: "center", overflowWrap: "anywhere" }}>Лимит 3</h6>
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
          {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ flexDirection: 'column', maxWidth: '150px' }} className="pages-user-block">
                            <h6 style={{ margin: '0', textAlign: 'center' }}>Dodawanie rekordów</h6>
                            <input
                                onChange={(e) => changeCityValues('dodawanie_rekordow', e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={firstTime?.dodawanie_rekordow || ''}
                            />
                        </div>
                        <div style={{ flexDirection: 'column', maxWidth: '150px' }} className="pages-user-block">
                            <h6 style={{ margin: '0', textAlign: 'center' }}>Scenariusze</h6>
                            <input
                                onChange={(e) => changeCityValues('scenariusze', e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={firstTime?.scenariusze || ''}
                            />
                        </div>
                        <div style={{ flexDirection: 'column', maxWidth: '150px' }} className="pages-user-block">
                            <h6 style={{ margin: '0', textAlign: 'center', overflowWrap: 'anywhere' }}>Weryfikacja DKJ</h6>
                            <input
                                onChange={(e) => changeCityValues('weryfikacja_dkj', e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                s
                                required
                                value={firstTime?.weryfikacja_dkj || ''}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ flexDirection: 'column', maxWidth: '150px' }} className="pages-user-block">
                            <h6 style={{ margin: '0', textAlign: 'center' }}>Podpinanie scenari.</h6>
                            <input
                                onChange={(e) => changeCityValues('podpinanie_scenariuszy', e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={firstTime?.podpinanie_scenariuszy || ''}
                            />
                        </div>
                        <div style={{ flexDirection: 'column', maxWidth: '150px' }} className="pages-user-block">
                            <h6 style={{ margin: '0', textAlign: 'center' }}>VIP формат</h6>
                            <input
                                onChange={(e) => changeCityValues('vip_format', e.target.value)}
                                className="tabl-flex-admin-user-scores "
                                style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                type="text"
                                placeholder=""
                                autoComplete="off"
                                required
                                value={firstTime?.vip_format || ''}
                            />
                        </div> 
                    </div>*/}
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
          Создать зал
        </div>
      </div>
    </div>
  );
}

export default CreateCity;
