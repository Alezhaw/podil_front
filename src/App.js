import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserRegistr from "./pages/UserRegistr/UserRegistr";
import UserInput from "./pages/UserInput/UserInput";
import AdminPanel from "./pages/AdminPage/AdminPanel";
import UserID from "./pages/AdminPage/Users/UserID";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CityID from "./pages/AdminPage/Podzial/CityID";
import TrailID from "./pages/AdminPage/Trails/TrailID";
import "./style/body.css";
import { useAppSelector } from "./store/reduxHooks";
import { reducerTypes } from "./store/Users/types";
import { reducerTrailsTypes } from "./store/Users/trails/trailsTypes";
import io from "socket.io-client";
import { defaultUrl } from "./api/axios";

export const socket = io.connect(defaultUrl);

function App() {
  const dispatch = useDispatch();
  const { user, storedCities, bases, countryForCheck, selectedLang } = useAppSelector((store) => store.user);
  const { trails, trailsCountryForCheck } = useAppSelector((store) => store.trails);

  useEffect(() => {
    if (user?.email) {
      socket.emit("join", { name: "1", room: "1" });
    }
  }, [user]);

  useEffect(() => {
    selectLocale();
    // eslint-disable-next-line
  }, [selectedLang]);

  async function selectLocale() {
    let texts = {};
    try {
      const module = await import(`./localeTexts/${selectedLang?.toLowerCase() || "en"}`);
      texts = module?.texts;
    } catch (e) {
      const module = await import(`./localeTexts/en`);
      texts = module?.texts;
    }
    dispatch({
      type: reducerTypes.GET_SELECTED_LOCALE,
      payload: texts,
    });
  }

  useEffect(() => {
    socket.on("updateCities", ({ data }) => {
      if (countryForCheck === data.country) {
        let updatedCities = storedCities?.map((city) => {
          const updatedCity = data.cities.filter((el) => Number(el.id) === city.id)[0];
          return updatedCity ? updatedCity : city;
        });
        const newTimes = data.cities.filter((el) => {
          return !storedCities?.filter((item) => item.id_for_base === el.id_for_base)?.filter((item) => item.id === el.id)[0];
        });
        updatedCities = [...updatedCities, ...newTimes];
        dispatch({
          type: reducerTypes.GET_CITIES,
          payload: { cities: updatedCities, country: data.country },
        });
      }
    });
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    socket.on("updateTrails", ({ data }) => {
      if (trailsCountryForCheck === data.country) {
        let updatedTrails = trails?.map((trail) => {
          const updatedTrail = data.trails.filter((el) => Number(el.id) === trail.id)[0];
          return updatedTrail ? updatedTrail : trail;
        });
        dispatch({
          type: reducerTrailsTypes.GET_TRAILS,
          payload: { trails: updatedTrails, country: data.country },
        });
      }
    });
    // eslint-disable-next-line
  }, [trails]);

  useEffect(() => {
    socket.on("deleteCity", ({ data }) => {
      if (countryForCheck === data.country) {
        if (data.deleteTime ?? false) {
          const filteredCities = storedCities?.filter((el) => Number(el.id) !== Number(data.deleteTime));
          dispatch({
            type: reducerTypes.GET_CITIES,
            payload: { cities: filteredCities, country: data.country },
          });
        } else {
          const filteredCities = storedCities?.filter((el) => Number(el.id_for_base) !== Number(data.deleteCity));
          dispatch({
            type: reducerTypes.GET_CITIES,
            payload: { cities: filteredCities, country: data.country },
          });
        }
      }
    });
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    socket.on("updateBases", ({ data }) => {
      if (countryForCheck === data.country) {
        const country = data.country;

        let updatedBases = bases?.map((city) => {
          const updatedBase = data.bases.filter((el) => Number(el.id) === city.id)[0];
          return updatedBase ? updatedBase : city;
        });
        const newBases = data.bases.filter((el) => {
          return !bases?.filter((item) => item.id_for_base === el.id_for_base)?.filter((item) => item.id === el.id)[0];
        });
        updatedBases = [...updatedBases, ...newBases];
        dispatch({
          type: reducerTypes.GET_BASES,
          payload: { bases: updatedBases, country: country },
        });
      }
    });
    // eslint-disable-next-line
  }, [bases]);

  useEffect(() => {
    socket.on("deleteBase", ({ data }) => {
      if (countryForCheck === data.country) {
        const country = data.country;

        const filteredBases = bases?.filter((el) => Number(el.id) !== Number(data.deleteBase));
        dispatch({
          type: reducerTypes.GET_BASES,
          payload: { bases: filteredBases, country: country },
        });
      }
    });
    // eslint-disable-next-line
  }, [bases]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/adminPanel/user/:id" element={<UserID />} />
        <Route path="/adminPanel/city/:id_for_base" element={<CityID />} />
        <Route path="/adminPanel/RU/:id_for_base" element={<CityID country="RU" />} />
        <Route path="/adminPanel/KZ/:id_for_base" element={<CityID country="KZ" />} />
        <Route path="/adminPanel/PL/:id_for_base" element={<CityID country="PL" />} />
        <Route path="/adminPanel/trails/RU/:id" element={<TrailID country="RU" />} />
        <Route path="/adminPanel/trails/KZ/:id" element={<TrailID country="KZ" />} />
        <Route path="/adminPanel/trails/PL/:id" element={<TrailID country="PL" />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login/:logout" element={<UserInput />} />
        <Route path="/login/" element={<UserInput />} />
        <Route path="/registr" element={<UserRegistr />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
