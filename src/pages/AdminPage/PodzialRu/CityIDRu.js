import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllCitiesRu, axiosCreateCitiesRu, axiosGetAllBasesRu, axiosCreateBaseRu } from "../../../api/podzialRu";

function CityIDRu() {
    const { id_for_base } = useParams();
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem("backroundImg");
    const { user, citiesRu, basesRu } = useAppSelector((store) => store.user);
    const navigate = useNavigate();
    const [firstTime, setFirstTime] = useState({});
    const [secondTime, setSecondTime] = useState({});
    const [thirdTime, setThirdTime] = useState({});
    const setCity = [setFirstTime, setSecondTime, setThirdTime];
    const currentCities = [firstTime, secondTime, thirdTime]?.filter(el => !!el?.godzina);
    const [currentBases, setCurrentBases] = useState([]);

    async function getAllCities() {
        const data = await axiosGetAllCitiesRu();
        if (data) {
            dispatch({
                type: reducerTypes.GET_CITIES_RU,
                payload: data,
            });
        }
    }

    async function getAllBases() {
        const data = await axiosGetAllBasesRu();
        if (data) {
            dispatch({
                type: reducerTypes.GET_BASES_RU,
                payload: data,
            });
        }
    }

    async function createCity(firstTime, secondTime, thirdTime) {
        const city = [firstTime, secondTime, thirdTime].filter((el) => !!el.godzina);
        const result = await axiosCreateCitiesRu(city);
        if (!result.cities[0]) {
            getAllCities();
            if (result.updated[0]) return alert('Город обновлен');
            if (result.not_id_for_base) return alert('Не указан id_for_base');
        } else {
            alert('Что-то пошло не так');
        }
    }

    async function createBase(currentBases) {
        const result = await axiosCreateBaseRu(currentBases);
        console.log(result)
        if (result.update) {
            getAllBases();
            alert('Sucess');
        } else {
            if (result.notIdForBase) {
                return alert('Не указан id_for_base');
            }
            if (result.bases[0]) {
                getAllBases();
                return alert('Успешно создано');
            }
            alert('Что-то пошло не так')
        }
    }

    useEffect(() => {
        const temporaryCities = citiesRu?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
        if (temporaryCities) {
            temporaryCities?.map((item, index) => setCity[index](item))
        }
        // eslint-disable-next-line
    }, [citiesRu]);

    useEffect(() => {
        const temporaryBases = basesRu?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
        if (temporaryBases) {
            // setCurrentBases([...temporaryBases, ...temporaryBases])
            setCurrentBases(temporaryBases)
            console.log(1, temporaryBases)
        }
        // eslint-disable-next-line
    }, [basesRu]);

    useEffect(() => {
        if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
            navigate("/")
        }
    }, [user?.role, navigate, user])

    useEffect(() => {
        if (!citiesRu[0]) {
            getAllCities();
        }
        if (!basesRu[0]) {
            getAllBases();
        }
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    minHeight: "100vh",
                    // justifyContent: "center",
                    //overflowX: 'hidden'
                }}
                className={!statebackground ? "styleAdminPanel" : "styleAdminPanel2"}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "rgba(17, 17, 18, 0.65)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: "10px",
                            color: "white",
                        }}
                    >
                        <div
                            onClick={() => navigate("/adminPanel")}
                            className="tabl-flex-admin-button-global2"
                        >
                            Вернуться назад
                        </div>
                    </div>
                    <div style={{ marginTop: "20px", color: "white" }}>
                        <div style={{ overflowX: 'auto', padding: '0px 25px' }}>
                            <table>
                                {/* <table style={{ minWidth: '150%', textAlign: 'center' }}> */}
                                <thead>
                                    <tr>
                                        <th>L.p</th>
                                        <th>Godzina</th>
                                        <th>Приход всего</th>
                                        <th>Пар всего</th>
                                        <th>Проверка прихода</th>
                                        <th>КР</th>
                                        <th>Miasto / Lokal</th>
                                        <th>Часовой Пояс</th>
                                        <th>Лимит</th>
                                        <th>w toku</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentCities?.map((item, index) => <tr key={item.id}>
                                            <td className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, l_p: e.target.value }))}
                                                    className="tableInput"
                                                    style={{ width: '50px' }}
                                                    type="number"
                                                    autoComplete="off"
                                                    value={item.l_p || ""}
                                                />
                                            </td>
                                            <td className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, godzina: e.target.value }))}
                                                    className="tableInput"
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.godzina || ""}
                                                />
                                            </td>
                                            <td className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, os_poj: e.target.value }))}
                                                    className="tableInput"
                                                    //style={{ color: "white", borderRadius: "5px", minWidth: '0px', width: '130px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.os_poj || ""}
                                                />
                                            </td>
                                            <td className="basesTableCell">

                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, pary: e.target.value }))}
                                                    className="tableInput"
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.pary || ""}
                                                />
                                            </td>
                                            {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, wyjasnienia: !!e.target.checked })))}
                                                    className="tableInput"
                                                    style={{ width: '25px', height: '25px' }}
                                                    type="checkbox"
                                                    autoComplete="off"
                                                    checked={!!item.wyjasnienia}
                                                />
                                            </td> : ''}
                                            {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, projekt: e.target.value })))}
                                                    className="tableInput"
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.projekt || ""}
                                                />
                                            </td> : ''}
                                            {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                <textarea
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, miasto_lokal: e.target.value })))}
                                                    className="tableInput"
                                                    style={{ width: '260px', height: '125px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.miasto_lokal || ""}
                                                />
                                            </td> : ''}
                                            {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, timezone: e.target.value })))}
                                                    className="tableInput"
                                                    style={{ width: '50px' }}
                                                    type="number"
                                                    autoComplete="off"
                                                    value={item.timezone || ""}
                                                />
                                            </td> : ''}
                                            <td className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, limit: e.target.value }))}
                                                    className="tableInput"
                                                    style={{ width: '50px' }}
                                                    type="number"
                                                    autoComplete="off"
                                                    value={item.limit || ""}
                                                />
                                            </td>
                                            {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, w_toku: e.target.checked })))}
                                                    className="tableInput"
                                                    style={{ width: '25px', height: '25px' }}
                                                    type="checkbox"
                                                    autoComplete="off"
                                                    checked={!!item.w_toku}
                                                />
                                            </td> : ''}

                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                marginTop: "20px",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                className="tabl-flex-admin-button-global"
                                onClick={() => createCity(firstTime, secondTime, thirdTime)}
                            >
                                Внести изменения
                            </div>
                        </div>
                        <div>
                            {/* <div style={{ overflowX: 'auto', padding: '0px 25px', marginTop: '25px' }}> */}
                            <div>
                                {/* <table style={{ minWidth: `${currentBases?.length * 358}px`, textAlign: 'center' }}> */}
                                <table style={{ textAlign: 'center' }}>
                                    <tbody style={{ display: 'flex', flexDirection: 'row' }}>
                                        {currentBases?.map((item, index) => <div style={{ minWidth: '100px' }} key={item.id}>
                                            <tr>
                                                <td colspan="3" className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_id: e.target.value }) : el))}
                                                        className="tableInput"
                                                        //style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.base_id || ""}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_stat_1: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.base_stat_1 || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_stat_2: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ width: '120px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.base_stat_2 || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_stat_3: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.base_stat_3 || ""}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_type: e.target.value }) : el))}
                                                        className="tableInput"
                                                        // style={{ width: '120px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.base_type || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_sort: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ maxWidth: '120px' }} //140 сделать
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.base_sort || ""}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_sogl_1: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.base_sogl_1 || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_sogl_2: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.base_sogl_2 || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_sogl_3: e.target.value }) : el))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.base_sogl_3 || ""}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" className="basesTableCell"> Ком: <input
                                                    onChange={(e) => setCurrentBases(prev => prev.map(el => el.id === item.id ? ({ ...el, base_comment: e.target.value }) : el))}
                                                    className="tableInput"
                                                    //style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.base_comment || ""}
                                                /></td>
                                            </tr>
                                        </div>)}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    marginTop: "20px",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    className="tabl-flex-admin-button-global"
                                    onClick={() => createBase(currentBases)}
                                >
                                    Внести изменения
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CityIDRu;
