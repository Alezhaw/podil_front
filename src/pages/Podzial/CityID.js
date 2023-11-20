import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";
import { reducerTypes } from "../../store/Users/types";
import Podzial from "../../api/podzial";
import { Button, Menu, MenuItem } from "@mui/material";
import CityTableID from "./components/CityTableID";
import Base from "./components/Base";
import CreateBase from "./components/CreateBase";
import { getFormatTime } from "../../utils/utils";
import { PageContainer } from "../../components/Page.styled";
import DeleteIcon from "@mui/icons-material/Delete";

function CityID() {
  const { id_for_base } = useParams();
  const dispatch = useDispatch();
  const { user, storedCities, bases, locale, country } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState({});
  const [secondTime, setSecondTime] = useState({});
  const [thirdTime, setThirdTime] = useState({});
  const setCity = [setFirstTime, setSecondTime, setThirdTime];
  const currentCities = [firstTime, secondTime, thirdTime].filter((el) => !!el?.id);
  const [currentBases, setCurrentBases] = useState([]);
  const [newBase, setNewBase] = useState({});
  const [deleteBases, setDeleteBases] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const messages = useMemo(() => {
    return {
      return: locale["return"],

      podil: locale["city_id_podil"],
      bases: locale["city_id_bases"],
      speaker: locale["city_id_speaker"],
      scenario: locale["city_id_scenario"],
      delete: locale["delete"],
      apply: locale["city_id_apply"],
      apply_for_bases: locale["city_id_apply_for_bases"],
      new_base: locale["city_id_new_base"],
      create_base: locale["city_id_create_base"],
      search: locale["search"],
      headers: {
        delete: locale["delete"],
        lp: locale["l_p"],
        time: locale["time"],
        coming: locale["coming"],
        couples: locale["couples"],
        explains: locale["explains"],
        project: locale["project"],
        timezone: locale["timezone"],
        region: locale["region"],
        address: locale["address"],
        institution: locale["institution"],
        hall: locale["hall"],
        date: locale["date"],
        population: locale["population"],
        city_lokal: locale["city_lokal"],
        city_id_system: locale["city_id_system"],
        note: locale["note"],
        limit: locale["limit"],
        status: locale["status"],
        during: locale["during"],
        closed_mock: locale["closed_mock"],
        add_scenario: locale["add_scenario"],
        scenario: locale["scenario"],
        verification_dkj: locale["verification_dkj"],
        undermining_scenariuszy: locale["undermining_scenariuszy"],
        present: locale["present"],
        numbers_for_1_consent: locale["numbers_for_1_consent"],
        wb_1: locale["wb_1"],
        wb_2: locale["wb_2"],
        quantity_invites: locale["quantity_invites"],
        consent_another_city: locale["consent_another_city"],
        numbers_for_consent: locale["numbers_for_consent"],
        topical_quantity_invites: locale["topical_quantity_invites"],
        days_statictic: locale["days_statictic"],
        day_1: locale["day_1"],
        day_2: locale["day_2"],
        day_3: locale["day_3"],
        vip: locale["vip"],
        vip_id: locale["vip_id"],
        vip_format: locale["vip_format"],
        vip_limit: locale["vip_limit"],
        vip_coming: locale["vip_coming"],
        vip_total_steam: locale["vip_total_steam"],
        vip_percent_coming: locale["vip_percent_coming"],
        system: locale["system"],
        confirmation: locale["confirmation"],
        consent_results_confirmation: locale["consent_results_confirmation"],
        refusal_results_confirmation: locale["refusal_results_confirmation"],
        dots_results_confirmation: locale["dots_results_confirmation"],
        sms: locale["sms"],
        sms_consent: locale["sms_consent"],
        sms_confirmation: locale["sms_confirmation"],
        citiesStatus: locale["cities_status"],
      },
    };
  }, [locale]);

  async function getCity(id_for_base) {
    const data = await Podzial.getOneCity(Number(id_for_base) || 0, country);
    if (data) {
      dispatch({
        type: reducerTypes.GET_CITIES,
        payload: data,
      });
    }
  }

  async function getBasesForCity(id_for_base) {
    const data = await Podzial.getBasesForCity(Number(id_for_base) || 0, country);
    if (data) {
      dispatch({
        type: reducerTypes.GET_BASES,
        payload: data.sort((a, b) => a.id - b.id),
      });
    }
  }

  async function createCity(firstTime, secondTime, thirdTime) {
    const city = [firstTime, secondTime, thirdTime]?.filter((el) => !!el.time);
    // const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    const result = await Podzial.createCities(city, country);
    await getCity(id_for_base);
    if (result[0]?.error) {
      return alert("Error");
    }
    alert("Success");
  }

  async function deleteTime(id, country) {
    const result = await Podzial.deleteTime(id, country);
    if (result) {
      await getCity(id_for_base);
      alert("Deleted");
    } else {
      alert("Something went wrong");
    }
  }

  async function createBase(currentBases) {
    const result = await Podzial.createBase(currentBases, country);
    if (result.update) {
      await getBasesForCity(id_for_base);
      alert("Updated");
    } else {
      if (result.notIdForBase) {
        return alert("Не указан id_for_base");
      }
      if (result.bases[0]) {
        await getBasesForCity(id_for_base);
        setNewBase({ id_for_base: currentCities[0]?.id_for_base });
        setIsOpen(false);
        return alert("Created");
      }
      alert("Something went wrong");
    }
  }

  async function deleteBase(deleteBases) {
    try {
      await Promise.all(deleteBases?.map(async (id) => await Podzial.deleteBase(country, Number(id))));
      setDeleteBases([]);
      await getBasesForCity(id_for_base);
      alert("Success");
    } catch (e) {
      alert("Something went wrong");
    }
  }

  function changeDeleteBases(checked, id) {
    if (checked) {
      setDeleteBases((prev) => [...prev, id]);
    } else {
      setDeleteBases((prev) => prev.filter((item) => item !== id));
    }
  }

  useEffect(() => {
    const temporaryCities = storedCities?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryCities) {
      setCity.map((set) => set({}));
      temporaryCities
        ?.sort((a, b) => getFormatTime(a) - getFormatTime(b))
        ?.slice(0, 3)
        .map((item, index) => setCity[index](item));
      setNewBase((prev) => ({ ...prev, id_for_base: temporaryCities[0]?.id_for_base }));
    }
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    const temporaryBases = bases?.filter((item) => Number(item?.id_for_base) === Number(id_for_base));
    if (temporaryBases) {
      // setCurrentBases([...temporaryBases, ...temporaryBases])
      setCurrentBases(temporaryBases);
    }
    // eslint-disable-next-line
  }, [bases]);

  useEffect(() => {
    if (user?.role === "USER") {
      alert("Нет доступа");
      navigate("/login");
    }
  }, [user?.role, navigate, user]);

  useEffect(() => {
    const checkCurrentCity = storedCities?.filter((el) => Number(el.id_for_base) === Number(id_for_base))[0];
    const checkCurrentBases = bases?.filter((el) => Number(el.id_for_base) === Number(id_for_base))[0];
    if (!checkCurrentCity) {
      getCity(id_for_base);
    }
    if (!checkCurrentBases) {
      getBasesForCity(id_for_base);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <PageContainer>
      <div style={{ marginTop: "1rem", color: "white" }}>
        <div style={{ overflowX: "auto" }}>
          <CityTableID setCity={setCity} currentCities={currentCities} deleteTime={deleteTime} country={country} messages={messages.headers} />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Button onClick={() => createCity(firstTime, secondTime, thirdTime)} variant="outlined">
              {messages.apply}
            </Button>
          </div>
        </div>
        <div>
          {/* <div style={{ overflowX: 'auto', padding: '0px 25px', marginTop: '25px' }}> */}
          <div style={{ overflow: "auto" }}>
            {/* <table style={{ minWidth: `${currentBases?.length * 358}px`, textAlign: 'center' }}> */}
            <div style={{ padding: "0px", margin: "1rem 0px 0px" }}>
              <table style={{ textAlign: "center" }}>
                <tbody style={{ display: "flex", flexDirection: "row" }}>
                  {currentBases?.map((item) => (
                    <Base item={item} setCurrentBases={setCurrentBases} changeDeleteBases={changeDeleteBases} key={item.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "1rem",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <div style={{ minWidth: "50%", display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => createBase(currentBases)} variant="outlined" hidden={!currentBases[0]}>
                {messages.apply_for_bases}
              </Button>
            </div>
            <div style={{ minWidth: "50%", display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => deleteBase(deleteBases)} variant="outlined" hidden={!deleteBases[0]}>
                <DeleteIcon />
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "40px" }}>
            <Button onClick={() => setIsOpen(true)} variant="outlined">
              {messages.new_base}
            </Button>
          </div>
          {isOpen ? (
            <CreateBase
              setIsOpen={setIsOpen}
              newBase={newBase}
              setNewBase={setNewBase}
              createBase={createBase}
              cities={storedCities}
              bases={bases}
              currentBases={currentBases}
              getFilteredBases={Podzial.getFilteredBases}
              country={country}
              messages={messages}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default CityID;
