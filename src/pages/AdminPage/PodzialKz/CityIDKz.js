import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllCitiesKz, axiosCreateCitiesKz } from "../../../api/podzialKz";

function CityIDKz() {
    const { id_for_base } = useParams();
    const dispatch = useDispatch();
    const statebackground = !!localStorage.getItem("backroundImg");
    const { user, citiesKz } = useAppSelector((store) => store.user);
    const navigate = useNavigate();
    const [firstTime, setFirstTime] = useState({});
    const [secondTime, setSecondTime] = useState({});
    const [thirdTime, setThirdTime] = useState({});
    const setCity = [setFirstTime, setSecondTime, setThirdTime];
    const currentCities = [firstTime, secondTime, thirdTime];

    async function getAllCities() {
        const data = await axiosGetAllCitiesKz();
        if (data) {
            dispatch({
                type: reducerTypes.GET_CITIES_KZ,
                payload: data,
            });
        }
    }

    async function createCity(firstTime, secondTime, thirdTime) {
        const city = [firstTime, secondTime, thirdTime].filter((el) => !!el.godzina);
        const result = await axiosCreateCitiesKz(city);
        if (!result.cities[0]) {
            getAllCities();
            if (result.updated[0]) return alert('Город обновлен');
            if (result.not_id_for_base) return alert('Не указан id_for_base');
        } else {
            alert('Что-то пошло не так');
        }
    }

    useEffect(() => {
        const temporaryCities = citiesKz?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
        if (temporaryCities) {
            temporaryCities?.map((item, index) => setCity[index](item))
        }
        // eslint-disable-next-line
    }, [citiesKz]);

    useEffect(() => {
        if (user?.role === 'USER' || user?.role === null || user?.role === '' || user?.role === undefined) {
            navigate("/")
        }
    }, [user?.role, navigate, user])

    useEffect(() => {
        if (!citiesKz[0]) {
            getAllCities();
        }
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    minHeight: "100vh",
                    justifyContent: "center",
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
                            <table style={{ minWidth: '150%', textAlign: 'center' }}>
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
                                        currentCities?.map((item, index) => <tr>
                                            <td>
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, l_p: e.target.value }))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '50px' }}
                                                    type="number"
                                                    autoComplete="off"
                                                    value={item.l_p || ""}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, godzina: e.target.value }))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.godzina || ""}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, os_poj: e.target.value }))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    //style={{ color: "white", borderRadius: "5px", minWidth: '0px', width: '130px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.os_poj || ""}
                                                />
                                            </td>
                                            <td>

                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, pary: e.target.value }))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.pary || ""}
                                                />
                                            </td>
                                            {index === 0 ? <td rowspan={`${currentCities.length}`}>
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, wyjasnienia: !!e.target.checked })))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '25px', height: '25px' }}
                                                    type="checkbox"
                                                    autoComplete="off"
                                                    checked={!!item.wyjasnienia}
                                                />
                                            </td> : ''}
                                            {index === 0 ? <td rowspan={`${currentCities.length}`}>
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, projekt: e.target.value })))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '50px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.projekt || ""}
                                                />
                                            </td> : ''}
                                            {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px' }}>
                                                <textarea
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, miasto_lokal: e.target.value })))}
                                                    //className="tabl-flex-admin-user-scores"
                                                    style={{ width: '260px', height: '125px' }}
                                                    type="text"
                                                    autoComplete="off"
                                                    value={item.miasto_lokal || ""}
                                                />
                                            </td> : ''}
                                            {index === 0 ? <td rowspan={`${currentCities.length}`}>
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, timezone: e.target.value })))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '50px' }}
                                                    type="number"
                                                    autoComplete="off"
                                                    value={item.timezone || ""}
                                                />
                                            </td> : ''}
                                            <td>
                                                <input
                                                    onChange={(e) => setCity[index](prev => ({ ...prev, limit: e.target.value }))}
                                                    //className="tabl-flex-admin-user-scores "
                                                    style={{ width: '50px' }}
                                                    type="number"
                                                    autoComplete="off"
                                                    value={item.limit || ""}
                                                />
                                            </td>
                                            {index === 0 ? <td rowspan={`${currentCities.length}`}>
                                                <input
                                                    onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, w_toku: e.target.checked })))}
                                                    //className="tabl-flex-admin-user-scores "
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default CityIDKz;
