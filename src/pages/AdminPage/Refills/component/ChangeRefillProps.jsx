function ChangeRefillProps({
    setIdRefil,
    setTimeRefill,
    setScoreRefill,
    idRefill,
    timeRefill,
    scoreRefiil,
    setStatusRefill,
    statusRefill,
    changeRefill
}) {
    return <>
            <div className='pages-user-box-2'>
                <div style={{ flexDirection: "column" }} className='pages-user-block'>
                    <h6 style={{ margin: "0", textAlign: "center" }}>Изменение ID пополнения</h6>
                    <input
                        onChange={(e) => setIdRefil(e.target.value || 0)}
                        className="tabl-flex-admin-user-scores "
                        style={{ color: "white", borderRadius: "5px" }}
                        type="number"
                        name="name"
                        placeholder="Изменение денег пользователя"
                        autoComplete="off"
                        required
                        value={idRefill || 0}
                    />
                </div>
                <div style={{ flexDirection: "column" }} className='pages-user-block'>
                    <h6 style={{ margin: "0", textAlign: "center" }}>Изменение времени пополнения</h6>
                    <input
                        onChange={(e) => setTimeRefill(e.target.value)}
                        className="tabl-flex-admin-user-scores "
                        style={{ color: "white", borderRadius: "5px" }}
                        type="text"
                        name="name"
                        placeholder="Изменение денег пользователя"
                        autoComplete="off"
                        required
                        value={timeRefill || ''}
                    />
                </div>
                <div style={{ flexDirection: "column" }} className='pages-user-block'>
                    <h6 style={{ margin: "0", textAlign: "center" }}>Изменение суммы пополнения</h6>
                    <input
                        onChange={(e) => setScoreRefill(e.target.value || 0)}
                        className="tabl-flex-admin-user-scores "
                        style={{ color: "white", borderRadius: "5px" }}
                        type="number"
                        name="name"
                        placeholder="Изменение денег пользователя"
                        autoComplete="off"
                        required
                        value={scoreRefiil || 0}
                    />
                </div>
                <div style={{ flexDirection: "column" }} className='pages-user-block'>
                    <h6 style={{ margin: "0", textAlign: "center" }}>Изменение статуса пополнения</h6>
                    <select
                        onChange={(e) => setStatusRefill(e.target.value)}
                        style={{ color: "white", borderRadius: "5px" }}
                        className="tabl-flex-admin-user-scores "
                        name="select"
                        value={String(statusRefill || 1)}>
                        <option value="1">В обработке</option>
                        <option value="2">Успешный</option>
                    </select>
                </div>
            </div>
            <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center" }}>
                <div className="tabl-flex-admin-button-global" onClick={changeRefill}>
                    Внести изменения
                </div>
            </div>
        </>
}

export default ChangeRefillProps