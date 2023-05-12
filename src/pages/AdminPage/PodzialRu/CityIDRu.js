import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/reduxHooks";
import { reducerTypes } from "../../../store/Users/types";
import { axiosGetAllCitiesRu, axiosCreateCitiesRu, axiosGetAllBasesRu, axiosCreateBaseRu } from "../../../api/podzialRu";
import { Container } from "@material-ui/core";

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

    function formatDate(date) {
        return String(date)?.split('T')[0]?.replaceAll('-', '.') || ''
    }

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
                        <div style={{ overflowX: 'auto', }}>
                            <Container style={{ padding: '0px' }}>
                                <table style={{ textAlign: 'center' }}>
                                    {/* <table style={{ minWidth: '150%', textAlign: 'center' }}> */}
                                    <thead>
                                        <tr>
                                            <th className="basesTableCell">L.p</th>
                                            <th className="basesTableCell">Godzina</th>
                                            <th className="basesTableCell">Приход всего</th>
                                            <th className="basesTableCell">Пар всего</th>
                                            <th className="basesTableCell">Проверка прихода</th>
                                            <th className="basesTableCell">КР</th>
                                            <th className="basesTableCell">Miasto / Lokal</th>
                                            <th className="basesTableCell">Часовой Пояс</th>
                                            <th className="basesTableCell">Лимит</th>
                                            <th className="basesTableCell">W toku</th>
                                            <th className="basesTableCell">Zamkniete</th>
                                            <th className="basesTableCell">Dodawanie rekordów</th>
                                            <th className="basesTableCell">Scenariusze</th>
                                            <th className="basesTableCell">Weryfikacja DKJ</th>
                                            <th className="basesTableCell">Podpinanie scenariuszy</th>
                                            <th className="basesTableCell">Limit regalo</th>
                                            <th className="basesTableCell">Rekodow na 1 zgode</th>
                                            <th className="basesTableCell">WB 1</th>
                                            <th className="basesTableCell">WB 2</th>
                                            <th className="basesTableCell">Ilość Zaproszeń</th>
                                            <th className="basesTableCell">Zgody inne miasto</th>
                                            <th colspan="2" style={{ border: '1px solid white' }}>
                                                <tr>
                                                    <th style={{ borderRight: '1px solid white' }}>Rekodow na 1 zgode</th>
                                                    <th>Aktualna ilość zaproszeń</th>
                                                </tr>
                                                <tr>
                                                    <th colspan="2" style={{ borderTop: '1px solid white', borderBottom: '1px solid white' }}>1 dzień</th>
                                                </tr>
                                                <tr>
                                                    <th colspan="2" style={{ position: 'relative', top: '6px' }} >{
                                                        <input
                                                            onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dzien_1_data: e.target.value })))}
                                                            className="tableInput"
                                                            type="text"
                                                            autoComplete="off"
                                                            value={formatDate(currentCities[0]?.dzien_1_data || '') || ""}
                                                        />
                                                    }</th>
                                                </tr>
                                            </th>
                                            <th colspan="2" style={{ border: '1px solid white' }}>
                                                <tr>
                                                    <th style={{ borderRight: '1px solid white' }}>Rekodow na 1 zgode</th>
                                                    <th>Aktualna ilość zaproszeń</th>
                                                </tr>
                                                <tr>
                                                    <th colspan="2" style={{ borderTop: '1px solid white', borderBottom: '1px solid white' }}>2 dzień</th>
                                                </tr>
                                                <tr>
                                                    <th colspan="2" style={{ position: 'relative', top: '6px' }} >{
                                                        <input
                                                            onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dzien_2_data: e.target.value })))}
                                                            className="tableInput"
                                                            type="text"
                                                            autoComplete="off"
                                                            value={formatDate(currentCities[0]?.dzien_2_data || '') || ""}
                                                        />
                                                    }</th>
                                                </tr>
                                            </th>
                                            <th colspan="2" style={{ border: '1px solid white' }}>
                                                <tr>
                                                    <th style={{ borderRight: '1px solid white' }}>Rekodow na 1 zgode</th>
                                                    <th>Aktualna ilość zaproszeń</th>
                                                </tr>
                                                <tr>
                                                    <th colspan="2" style={{ borderTop: '1px solid white', borderBottom: '1px solid white' }}>3 dzień</th>
                                                </tr>
                                                <tr>
                                                    <th colspan="2" style={{ position: 'relative', top: '6px' }} >{
                                                        <input
                                                            onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dzien_3_data: e.target.value })))}
                                                            className="tableInput"
                                                            type="text"
                                                            autoComplete="off"
                                                            value={formatDate(currentCities[0]?.dzien_3_data || '') || ""}
                                                        />
                                                    }</th>
                                                </tr>
                                            </th>
                                            <th colspan="6" style={{ border: '1px solid white' }}>
                                                <th colspan="6" style={{ width: '335px', borderBottom: '1px solid white', height: '75px' }}>
                                                    VIP
                                                </th>
                                                <tr style={{ height: '55px' }}>
                                                    <th style={{ borderRight: '1px solid white', width: '100px' }}>ID</th>
                                                    <th style={{ borderRight: '1px solid white', width: '100px' }}>Формат</th>
                                                    <th style={{ borderRight: '1px solid white', width: '70.89px' }}>Лимит</th>
                                                    <th style={{ borderRight: '1px solid white', width: '70.89px' }}>Приход</th>
                                                    <th style={{ borderRight: '1px solid white', width: '70.89px' }}>Пар всего</th>
                                                    <th style={{ width: '70.89px' }}>%, прихода</th>
                                                </tr>
                                            </th>
                                            <th className="basesTableCell">ЗАМЕТКА</th>
                                            <th colspan="3" style={{ border: '1px solid white' }}>
                                                <th colspan="3" style={{ borderBottom: '1px solid white', height: '75px' }}>
                                                    WYNIKI POTWIERDZEŃ
                                                </th>
                                                <tr>
                                                    <th style={{ borderRight: '1px solid white', width: '70.89px', height: '55px' }}>Zgoda</th>
                                                    <th style={{ borderRight: '1px solid white', width: '70.89px' }}>Odmowy</th>
                                                    <th style={{ width: '70.89px' }}>Kropki</th>
                                                </tr>
                                            </th>
                                            <th colspan="2" style={{ border: '1px solid white', minWidth: '220px' }}>
                                                <th colspan="2" style={{ borderBottom: '1px solid white', height: '75px', width: '220px' }}>
                                                    SMS
                                                </th>
                                                <tr>
                                                    <th style={{ borderRight: '1px solid white', width: '110px', height: '55px' }}>Umawianie</th>
                                                    <th >Potwierdzanie</th>
                                                </tr>
                                            </th>
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
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, zamkniete: e.target.checked })))}
                                                        className="tableInput"
                                                        style={{ width: '25px', height: '25px' }}
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        checked={!!item.zamkniete}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dodawanie_rekordow: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: 'auto', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.dodawanie_rekordow || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, scenariusze: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: 'auto', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.scenariusze || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, weryfikacja_dkj: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: 'auto', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.weryfikacja_dkj || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, podpinanie_scenariuszy: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: 'auto', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.podpinanie_scenariuszy || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, present: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '100px', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.present || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, rekodow_na_1_zgode: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '50px', }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={Number(item.rekodow_na_1_zgode).toFixed() || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, wb_1: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '100px', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.wb_1 || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, wb_2: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '70px', }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.wb_2 || ""}
                                                    />
                                                </td> : ''}
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, ilosc_zaproszen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.ilosc_zaproszen || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => null}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value="IN P."
                                                    /></td>
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dzien_1_rekodow_na_1_zgode: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '50px', }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={Number(item.dzien_1_rekodow_na_1_zgode).toFixed() || ""}
                                                    />
                                                </td> : ''}
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, dzien_1_aktualna_ilosc_zaproszen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.dzien_1_aktualna_ilosc_zaproszen || ""}
                                                    />
                                                </td>
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dzien_2_rekodow_na_1_zgode: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '50px', }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={Number(item.dzien_2_rekodow_na_1_zgode).toFixed() || ""}
                                                    />
                                                </td> : ''}
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, dzien_2_aktualna_ilosc_zaproszen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.dzien_2_aktualna_ilosc_zaproszen || ""}
                                                    />
                                                </td>
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, dzien_3_rekodow_na_1_zgode: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '50px', }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={Number(item.dzien_3_rekodow_na_1_zgode).toFixed() || ""}
                                                    />
                                                </td> : ''}
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, dzien_3_aktualna_ilosc_zaproszen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.dzien_3_aktualna_ilosc_zaproszen || ""}
                                                    />
                                                </td>
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, vip_id: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '100px', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.vip_id || ""}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, vip_format: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '100px', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.vip_format || ""}
                                                    />
                                                </td> : ''}


                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, vip_limit: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.vip_limit || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, vip_coming: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.vip_coming || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, vip_total_steam: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.vip_total_steam || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, vip_percent_coming: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.vip_percent_coming || ""}
                                                    />
                                                </td>
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} style={{ maxWidth: '250px', padding: '0px' }} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, system: e.target.value })))}
                                                        className="tableInput"
                                                        style={{ width: '100px', }}
                                                        type="text"
                                                        autoComplete="off"
                                                        value={item.system || ""}
                                                    />
                                                </td> : ''}
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, zgoda_wyniki_potwierdzen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.zgoda_wyniki_potwierdzen || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, odmowy_wyniki_potwierdzen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.odmowy_wyniki_potwierdzen || ""}
                                                    />
                                                </td>
                                                <td className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity[index](prev => ({ ...prev, kropki_wyniki_potwierdzen: e.target.value }))}
                                                        className="tableInput"
                                                        style={{ width: '50px' }}
                                                        type="number"
                                                        autoComplete="off"
                                                        value={item.kropki_wyniki_potwierdzen || ""}
                                                    />
                                                </td>
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, sms_umawianie: e.target.checked })))}
                                                        className="tableInput"
                                                        style={{ width: '25px', height: '25px' }}
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        checked={!!item.sms_umawianie}
                                                    />
                                                </td> : ''}
                                                {index === 0 ? <td rowspan={`${currentCities.length}`} className="basesTableCell">
                                                    <input
                                                        onChange={(e) => setCity?.map(item => item(prev => ({ ...prev, sms_potwierdzen: e.target.checked })))}
                                                        className="tableInput"
                                                        style={{ width: '25px', height: '25px' }}
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        checked={!!item.sms_potwierdzen}
                                                    />
                                                </td> : ''}

                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </Container>
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
                            <div style={{ overflow: 'auto' }}>
                                {/* <table style={{ minWidth: `${currentBases?.length * 358}px`, textAlign: 'center' }}> */}
                                <Container style={{ padding: '0px', marginTop: '20px' }}>
                                    <table style={{ textAlign: 'center' }}>
                                        <tbody style={{ display: 'flex', flexDirection: 'row' }}>
                                            {currentBases?.map((item, index) => <div style={{ minWidth: '100px', margin: '0px 5px' }} key={item.id}>
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
                                </Container>
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
