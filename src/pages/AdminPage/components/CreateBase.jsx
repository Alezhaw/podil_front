import CloseIcon from '@mui/icons-material/Close';

function CreateBase({ setIsOpen, newBase, setNewBase, createBase }) {
    return (
        <div onClick={() => setIsOpen(false)} style={{ background: 'rgba(17, 17, 18, 0.95)' }} className="modalStyles">
            <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', width: '59%', flexDirection: 'row-reverse' }}>
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)}></CloseIcon>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
            <div style={{ minWidth: '100px', margin: '0px 5px', textAlign: 'center' }}>
<tr>
    <td colspan="3" className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_id: e.target.value }))}
            className="tableInput"
            //style={{ width: '50px' }}
            type="text"
            autoComplete="off"
            placeholder="ID"
            value={newBase.base_id || ""}
        />
    </td>
</tr>
<tr>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_stat_1: e.target.value }))}
            className="tableInput"
            style={{ width: '50px' }}
            type="text"
            autoComplete="off"
            placeholder="стат 1"
            value={newBase.base_stat_1 || ""}
        />
    </td>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_stat_2: e.target.value }))}
            className="tableInput"
            style={{ width: '120px' }}
            type="text"
            autoComplete="off"
            placeholder="стат 2"
            value={newBase.base_stat_2 || ""}
        />
    </td>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_stat_3: e.target.value }))}
            className="tableInput"
            style={{ width: '50px' }}
            type="text"
            autoComplete="off"
            placeholder="стат 3"
            value={newBase.base_stat_3 || ""}
        />
    </td>
</tr>
<tr>
    <td colspan="2" className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_type: e.target.value }))}
            className="tableInput"
            // style={{ width: '120px' }}
            type="text"
            autoComplete="off"
            placeholder="Тип"
            value={newBase.base_type || ""}
        />
    </td>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_sort: e.target.value }))}
            className="tableInput"
            style={{ maxWidth: '120px' }} //140 сделать
            type="text"
            autoComplete="off"
            placeholder="сорт из"
            value={newBase.base_sort || ""}
        />
    </td>
</tr>
<tr>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_sogl_1: e.target.value }))}
            className="tableInput"
            style={{ width: '50px' }}
            type="number"
            autoComplete="off"
            placeholder="согл 1"
            value={newBase.base_sogl_1 || ""}
        />
    </td>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_sogl_2: e.target.value }))}
            className="tableInput"
            style={{ width: '50px' }}
            type="number"
            autoComplete="off"
            placeholder="согл 2"
            value={newBase.base_sogl_2 || ""}
        />
    </td>
    <td className="basesTableCell">
        <input
            onChange={(e) => setNewBase(prev => ({ ...prev, base_sogl_3: e.target.value }))}
            className="tableInput"
            style={{ width: '50px' }}
            type="number"
            autoComplete="off"
            placeholder="согл 3"
            value={newBase.base_sogl_3 || ""}
        />
    </td>
</tr>
<tr>
    <td colspan="3" className="basesTableCell"> Ком: <input
        onChange={(e) => setNewBase(prev => ({ ...prev, base_comment: e.target.value }))}
        className="tableInput"
        //style={{ width: '50px' }}
        type="text"
        autoComplete="off"
        placeholder="комментарий"
        value={newBase.base_comment || ""}
    /></td>
</tr>
</div>
                <div className="tabl-flex-admin-button-global2" onClick={() => createBase([newBase])}>
                    Создать Базу
                </div>
            </div>
        </div>
    );
}

export default CreateBase;
