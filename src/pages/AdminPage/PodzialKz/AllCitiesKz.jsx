import { useAppSelector } from '../../../store/reduxHooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reducerTypes } from '../../../store/Users/types';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { axiosGetAllCitiesKz, axiosDeleteCityKz, axiosCreateCitiesKz } from '../../../api/podzialKz';
import { StyledInput } from '../../../style/styles';
import { useNavigate } from 'react-router-dom';
import { StyledDiv, StyledDivHeader } from '../Users/style';
import CloseIcon from '@mui/icons-material/Close';

function CitiesKz() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filterInProgress, setFilterInProgress] = useState(true);
    const [filterZamkniete, setFilterZamkniete] = useState(true);
    const [filterPayed, setFilterPayed] = useState(true);
    const [filterComplete, setFilterComplete] = useState(true);
    const [filterArbitration, setFilterArbitration] = useState(true);
    const [sortId, setSortId] = useState(true);
    const { citiesKz, user } = useAppSelector((store) => store.user);
    const [cities, setCities] = useState([]);
    const [page, setPage] = useState(0);
    const [deleteCities, setDeleteCities] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [firstTime, setFirstTime] = useState({});
    const [secondTime, setSecondTime] = useState({});
    const [thirdTime, setThirdTime] = useState({});

    async function getAllCities() {
        const data = await axiosGetAllCitiesKz();
        if (data) {
            dispatch({
                type: reducerTypes.GET_CITIES_KZ,
                payload: data,
            });
        }
    }

    function changeDeleteCities(checked, id_for_base) {
        if (checked) {
            setDeleteCities((prev) => [...prev, id_for_base]);
        } else {
            setDeleteCities((prev) => prev.filter((item) => item !== id_for_base));
        }
    }

    function changeCityValues(key, value) {
        const setCity = [setFirstTime, setSecondTime, setThirdTime];
        setCity.map((item) => item((prev) => ({ ...prev, [key]: value })));
    }

    async function createCity(firstTime, secondTime, thirdTime) {
        const city = [firstTime, secondTime, thirdTime].filter((el) => !!el.godzina);
        const result = await axiosCreateCitiesKz(city);
        if (result) {
            getAllCities();
            alert('Sucess');
            setFirstTime({});
            setSecondTime({});
            setThirdTime({});
            setIsOpen(false);
        } else {
            alert('Что-то пошло не так');
        }
    }

    useEffect(() => {
        setCities(
            citiesKz
                ?.filter((el, i, ar) => (search ? el?.miasto_lokal?.toLowerCase()?.includes(search) : true))
                .filter((item, i, ar) => ar.map((el) => el.id_for_base).indexOf(item.id_for_base) === i)
                ?.filter(
                    (checkbox) =>
                        (!checkbox?.zamkniete && filterInProgress) ||
                        (!!checkbox?.zamkniete && filterZamkniete) ||
                        (checkbox?.status === 3 && filterPayed) ||
                        (checkbox?.status === 4 && filterComplete) ||
                        (checkbox?.status === 5 && filterArbitration)
                )
                ?.sort((a, b) => (sortId ? Number(b.id_for_base) - Number(a.id_for_base) : Number(a.id_for_base) - Number(b.id_for_base)))
        );
    }, [citiesKz, search, filterInProgress, filterZamkniete, filterPayed, filterComplete, filterArbitration, sortId]);

    useEffect(() => {
        getAllCities();
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <StyledInput
                    className="tabl-flex-admin-search"
                    style={{ color: 'white', borderRadius: '5px', paddingLeft: '10px' }}
                    type="search"
                    id="Search"
                    value={search}
                    placeholder="Поиск"
                    onChange={(e) => setSearch(e.target.value?.toLowerCase())}
                    autoComplete="off"
                    required
                />

                <div className="tabl-flex-admin-filtr" style={{ borderRadius: '5px' }}>
                    <h5 style={{ margin: '0' }}>Не закрыт</h5> <Checkbox value={filterInProgress} defaultChecked onChange={() => setFilterInProgress((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>Закрыт</h5> <Checkbox value={filterZamkniete} defaultChecked onChange={() => setFilterZamkniete((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>...</h5> <Checkbox value={filterPayed} defaultChecked onChange={() => setFilterPayed((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>...</h5> <Checkbox value={filterComplete} defaultChecked onChange={() => setFilterComplete((prev) => !prev)} color="error" />
                    <h5 style={{ margin: '0' }}>...</h5> <Checkbox value={filterArbitration} defaultChecked onChange={() => setFilterArbitration((prev) => !prev)} color="error" />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: '40px' }}>
                <div onClick={() => setIsOpen(true)} style={{ maxWidth: '205px !important' }} className="tabl-flex-admin-button-global2">
                    Новый зал
                </div>
            </div>
            {isOpen ? (
                <div onClick={() => setIsOpen(false)} style={{ background: 'rgba(17, 17, 18, 0.95)' }} className="modalStyles">
                    <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', width: '59%', flexDirection: 'row-reverse' }}>
                        <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)}></CloseIcon>
                    </div>
                    <div onClick={(e) => e.stopPropagation()} className="modalContentStyles">
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Первое время</h6>
                                    <input
                                        onChange={(e) => setFirstTime((prev) => ({ ...prev, godzina: e.target.value }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.godzina || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Второе время</h6>
                                    <input
                                        onChange={(e) => setSecondTime((prev) => ({ ...prev, godzina: e.target.value }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={secondTime?.godzina || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center', overflowWrap: 'anywhere' }}>Третье время</h6>
                                    <input
                                        onChange={(e) => setThirdTime((prev) => ({ ...prev, godzina: e.target.value }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        s
                                        required
                                        value={thirdTime?.godzina || ''}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ flexDirection: 'column', width: '300px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Город</h6>
                                    <input
                                        onChange={(e) => changeCityValues('miasto_lokal', e.target.value)}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px', height: '269px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.miasto_lokal || ''}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ flexDirection: 'column', width: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>KP</h6>
                                    <input
                                        onChange={(e) => changeCityValues('projekt', e.target.value)}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.projekt || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', width: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Часовой пояс</h6>
                                    <input
                                        onChange={(e) => changeCityValues('timezone', Number(e.target.value) || null)}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="number"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.timezone || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', width: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>ID for base</h6>
                                    <input
                                        onChange={(e) => changeCityValues('id_for_base', Number(e.target.value) || null)}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="number"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.id_for_base || ''}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Лимит 1</h6>
                                    <input
                                        onChange={(e) => setFirstTime((prev) => ({ ...prev, limit: Number(e.target.value) || null }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="number"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.limit || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Лимит 2</h6>
                                    <input
                                        onChange={(e) => setSecondTime((prev) => ({ ...prev, limit: Number(e.target.value) || null }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="number"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={secondTime?.limit || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center', overflowWrap: 'anywhere' }}>Лимит 3</h6>
                                    <input
                                        onChange={(e) => setThirdTime((prev) => ({ ...prev, limit: Number(e.target.value) || null }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="number"
                                        placeholder=""
                                        autoComplete="off"
                                        s
                                        required
                                        value={thirdTime?.limit || ''}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Limit regalo 1</h6>
                                    <input
                                        onChange={(e) => setFirstTime((prev) => ({ ...prev, present: e.target.value }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={firstTime?.present || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center' }}>Limit regalo 2</h6>
                                    <input
                                        onChange={(e) => setSecondTime((prev) => ({ ...prev, present: e.target.value }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        required
                                        value={secondTime?.present || ''}
                                    />
                                </div>
                                <div style={{ flexDirection: 'column', maxWidth: '110px' }} className="pages-user-block">
                                    <h6 style={{ margin: '0', textAlign: 'center', overflowWrap: 'anywhere' }}>Limit regalo 3</h6>
                                    <input
                                        onChange={(e) => setThirdTime((prev) => ({ ...prev, present: e.target.value }))}
                                        className="tabl-flex-admin-user-scores "
                                        style={{ color: 'white', borderRadius: '5px', minWidth: '0px' }}
                                        type="text"
                                        placeholder=""
                                        autoComplete="off"
                                        s
                                        required
                                        value={thirdTime?.present || ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tabl-flex-admin-button-global2" onClick={() => createCity(firstTime, secondTime, thirdTime)}>
                            Создать зал
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <h3 style={{ textAlign: 'center' }}>Города</h3>

            <div className="tabl-flex-admin" style={{ borderRadius: '5px' }}>
                <StyledDivHeader size="80px" style={{ cursor: 'pointer' }} onClick={() => setSortId((prev) => !prev)}>
                    ID{' '}
                </StyledDivHeader>
                <StyledDivHeader size="324px">Город</StyledDivHeader>
                <StyledDivHeader size="80px">Закрыт</StyledDivHeader>
                <StyledDivHeader size="210px">В току</StyledDivHeader>
                <StyledDivHeader size="80px">Удалить</StyledDivHeader>
            </div>

            {cities?.slice(page * itemsPerPage, (page + 1) * itemsPerPage)?.map((item, index) => (
                <div style={{ marginTop: '5px', borderRadius: '5px' }} className="tabl-flex-admin-user" key={item?.id}>
                    <StyledDiv size="80px" style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)}>
                        {item?.id_for_base}
                    </StyledDiv>
                    <StyledDiv size="324px" style={{ cursor: 'pointer', height: 'auto' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)}>
                        {item?.miasto_lokal}
                    </StyledDiv>
                    <StyledDiv size="80px" style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)}>
                        {item?.zamkniete ? <>Да</> : <>Нет</>}
                    </StyledDiv>
                    <StyledDiv size="210px" style={{ cursor: 'pointer' }} onClick={() => navigate(`/adminPanel/deal/${item?.id}`)}>
                        {item?.w_toku ? <>Да</> : <>Нет</>}
                    </StyledDiv>
                    <StyledDiv size="80px" onChange={(e) => changeDeleteCities(e.target.checked, item?.id_for_base)}>
                        <Checkbox color="error" />
                    </StyledDiv>
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: '5px' }}>
                <div
                    className="tabl-flex-admin-button"
                    onClick={async () => {
                        await Promise.all(deleteCities?.map(async (id_for_base) => await axiosDeleteCityKz(Number(id_for_base))));
                        setDeleteCities([]);
                        await getAllCities();
                        alert('Success');
                    }}
                >
                    Удалить
                </div>
            </div>

            <Pagination
                style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                count={Math.ceil(cities?.length / itemsPerPage)}
                shape="rounded"
                onChange={(e, value) => setPage(Number(value) - 1)}
                renderItem={(item) => <PaginationItem {...item} />}
            />

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
                <h6 style={{ margin: '0px', paddingRight: '10px' }}>Кол-во</h6>
                <input
                    className="tabl-flex-admin-pages"
                    style={{ color: 'white', borderRadius: '5px' }}
                    type="number"
                    name="name"
                    value={itemsPerPage}
                    placeholder="Елементов на странице"
                    // className={styles.input}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    autoComplete="off"
                    required
                />
            </div>
        </>
    );
}

export default CitiesKz;
