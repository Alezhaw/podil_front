import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserRegistr from "./pages/UserRegistr/UserRegistr";
import UserInput from "./pages/UserInput/UserInput";
import UserID from "./pages/Users/UserID";
import CityID from "./pages/Podzial/CityID";
import TrailID from "./pages/Trails/TrailID";
import EditDeparture from "./pages/Trails/Departure/EditDeparture/EditDeparture";
import AllUsers from "./pages/Users/AllUsers";
import AllCities from "./pages/Podzial/AllCities";
import AllTrails from "./pages/Trails/AllTrails";
import AllTrailsDictionary from "./pages/Trails/Dictionary/AllTrailsDictionary";
import CheckBases from "./pages/CheckBases/CheckBases";
import CheckSpeaker from "./pages/CheckSpeaker/CheckSpeaker";
import CheckScenario from "./pages/CheckScenario/CheckScenario";
import LogsCities from "./pages/Logs/LogsCities";
import LogsBases from "./pages/Logs/LogsBases";
import MapsPage from "./pages/Map/MapsPage";
import "./style/body.css";
import { useAppSelector } from "./store/reduxHooks";
import { reducerTypes } from "./store/Users/types";
import { reducerTrailsTypes } from "./store/Trails/trailsTypes";
import io from "socket.io-client";
import { defaultUrl } from "./api/axios";
import Header from "./components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

export const socket = io.connect(defaultUrl, {
  reconnection: true,
  reconnectionAttempts: 100,
  reconnectionDelay: 1000,
});

function App() {
  const dispatch = useDispatch();
  const { storedCities, bases, selectedLang, country, user } = useAppSelector((store) => store.user);
  const { trails } = useAppSelector((store) => store.trails);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  useEffect(() => {
    selectLocale();
    // eslint-disable-next-line
  }, [selectedLang]);

  useEffect(() => {
    if (!user.id) {
      dispatch({
        type: reducerTypes.GET_USER,
        payload: localStorage.getItem("token") ? jwt_decode(localStorage.getItem("token")) : null,
      });
    }
    // eslint-disable-next-line
  }, []);

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
      if (country === data.country) {
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
          payload: updatedCities,
        });
      }
    });
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    socket.on("updateTrails", ({ data }) => {
      if (country === data.country) {
        let updatedTrails = trails?.map((trail) => {
          const updatedTrail = data.trails.filter((el) => Number(el.id) === trail.id)[0];
          return updatedTrail ? updatedTrail : trail;
        });
        dispatch({
          type: reducerTrailsTypes.GET_TRAILS,
          payload: updatedTrails,
        });
      }
    });
    // eslint-disable-next-line
  }, [trails]);

  useEffect(() => {
    socket.on("deleteCity", ({ data }) => {
      if (country === data.country) {
        if (data.deleteTime ?? false) {
          const filteredCities = storedCities?.filter((el) => Number(el.id) !== Number(data.deleteTime));
          dispatch({
            type: reducerTypes.GET_CITIES,
            payload: filteredCities,
          });
        } else {
          const filteredCities = storedCities?.filter((el) => Number(el.id_for_base) !== Number(data.deleteCity));
          dispatch({
            type: reducerTypes.GET_CITIES,
            payload: filteredCities,
          });
        }
      }
    });
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    socket.on("updateBases", ({ data }) => {
      if (country === data.country) {
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
          payload: updatedBases,
        });
      }
    });
    // eslint-disable-next-line
  }, [bases]);

  useEffect(() => {
    socket.on("deleteBase", ({ data }) => {
      if (country === data.country) {
        const filteredBases = bases?.filter((el) => Number(el.id) !== Number(data.deleteBase));
        dispatch({
          type: reducerTypes.GET_BASES,
          payload: filteredBases,
        });
      }
    });
    // eslint-disable-next-line
  }, [bases]);

  useEffect(() => {
    socket.on("deleteTrails", ({ data }) => {
      if (country === data.country) {
        const filteredTrails = trails?.filter((el) => Number(el.id) !== Number(data.id));
        dispatch({
          type: reducerTrailsTypes.GET_TRAILS,
          payload: filteredTrails,
        });
      }
    });
    // eslint-disable-next-line
  }, [trails]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/podil" element={<AllCities />} />
          <Route path="/trails" element={<AllTrails />} />
          <Route path="/dictionary" element={<AllTrailsDictionary />} />
          <Route path="/bases" element={<CheckBases />} />
          <Route path="/speaker" element={<CheckSpeaker />} />
          <Route path="/scenario" element={<CheckScenario />} />
          <Route path="/logsCities" element={<LogsCities />} />
          <Route path="/logsBases" element={<LogsBases />} />
          <Route path="/trailMap" element={<MapsPage />} />
          <Route path="/users/:id" element={<UserID />} />
          <Route path="/city/:id_for_base" element={<CityID />} />
          <Route path="/trails/:id" element={<TrailID />} />
          <Route path="/trailsDepartureEdit" element={<EditDeparture />} />
          <Route path="/login/:logout" element={<UserInput />} />
          <Route path="/login/" element={<UserInput />} />
          <Route path="/registr" element={<UserRegistr />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
