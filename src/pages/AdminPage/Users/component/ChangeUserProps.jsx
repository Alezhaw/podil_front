function ChangeUserProps({
    setRoleUser,
    roleUser,
    changeRole,
    setscoreUser,
    scoreUser,
    changeScore,
    setSystemMessagesUser,
    systemMessagesUser,
    changeSystemMessage,
    setCompletedUser,
    completedUser,
    changeCompleted,
    setBlockUser,
    blockUser,
    changeCheck,
    setMinScore,
    minScore,
    changeTransferAmount,
    setMinRefil,
}) {
    return (
        <div className="pages-user-box">
            <div className="pages-user-block">
                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение роли пользователя</h6>
                <div style={{ display: 'flex', gap: ' 5px' }}>
                    <select
                        onChange={(e) => setRoleUser(e.currentTarget.value)}
                        style={{ color: 'white', borderRadius: '5px' }}
                        className="tabl-flex-admin-user-scores "
                        name="select"
                        value={roleUser || 'USER'}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="CHATER">CHATER</option>
                        <option value="USER">USER</option>
                    </select>
                    <div className="tabl-flex-admin-button" onClick={changeRole}>
                        Изменить
                    </div>
                </div>
            </div>
            <div className="pages-user-block">
                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение денег пользователя</h6>
                <div style={{ display: 'flex', gap: ' 5px' }}>
                    <input
                        onChange={(e) => setscoreUser(e.currentTarget.value || 0)}
                        className="tabl-flex-admin-user-scores "
                        style={{ color: 'white', borderRadius: '5px' }}
                        type="number"
                        name="name"
                        placeholder="Изменение денег пользователя"
                        autoComplete="off"
                        required
                        value={scoreUser || 0}
                    />
                    <div className="tabl-flex-admin-button" onClick={changeScore}>
                        Изменить
                    </div>
                </div>
            </div>
            <div className="pages-user-block">
                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение статуса системного сообщения</h6>
                <div style={{ display: 'flex', gap: ' 5px' }}>
                    <select
                        onChange={(e) => setSystemMessagesUser(e.currentTarget.value)}
                        style={{ color: 'white', borderRadius: '5px' }}
                        className="tabl-flex-admin-user-scores "
                        name="select"
                        value={systemMessagesUser || ''}
                    >
                        <option value="">Не выбрано</option>
                        <option value="true">Отправлено</option>
                        <option value="false">Не отпавлено</option>
                    </select>
                    <div className="tabl-flex-admin-button" onClick={changeSystemMessage}>
                        Изменить
                    </div>
                </div>
            </div>
            <div className="pages-user-block">
                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение статуса пользователя</h6>
                <div style={{ display: 'flex', gap: ' 5px' }}>
                    <select
                        onChange={(e) => setCompletedUser(e.currentTarget.value)}
                        style={{ color: 'white', borderRadius: '5px' }}
                        className="tabl-flex-admin-user-scores "
                        name="select"
                        value={String(completedUser) || ''}
                    >
                        <option value="">Не выбрано</option>
                        <option value="1">Наёбан</option>
                        <option value="0">Не наёбан</option>
                    </select>
                    <div className="tabl-flex-admin-button" onClick={changeCompleted}>
                        Изменить
                    </div>
                </div>
            </div>
            <div className="pages-user-block">
                <h6 style={{ margin: '0', textAlign: 'center' }}>Закрыть доступ</h6>
                <div style={{ display: 'flex', gap: ' 5px' }}>
                    <select
                        onChange={(e) => setBlockUser(e.currentTarget.value)}
                        style={{ color: 'white', borderRadius: '5px' }}
                        className="tabl-flex-admin-user-scores "
                        name="select"
                        value={blockUser || ''}
                    >
                        <option value="">Не выбрано</option>
                        <option value="true">Разблокировать</option>
                        <option value="false">Заблокировать</option>
                    </select>
                    <div className="tabl-flex-admin-button" onClick={changeCheck}>
                        Изменить
                    </div>
                </div>
            </div>
            <div className="pages-user-block">
                <h6 style={{ margin: '0', textAlign: 'center' }}>Изменение мин суммы вывода</h6>
                <div style={{ display: 'flex', gap: ' 5px' }}>
                    <input
                        onChange={(e) => {
                            setMinScore(e.currentTarget.value || 0);
                            setMinRefil(e.currentTarget.value - scoreUser < 0 ? 0 : e.currentTarget.value - scoreUser);
                        }}
                        className="tabl-flex-admin-user-scores "
                        style={{ color: 'white', borderRadius: '5px' }}
                        type="number"
                        name="name"
                        placeholder="Изменение мин суммы вывода"
                        autoComplete="off"
                        required
                        value={minScore}
                    />
                    <div className="tabl-flex-admin-button" onClick={changeTransferAmount}>
                        Изменить
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeUserProps;
