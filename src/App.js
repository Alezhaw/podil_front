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
import "./style/body.css";
import { useAppSelector } from "./store/reduxHooks";
import { reducerTypes } from "./store/Users/types";
import io from "socket.io-client";
import { defaultUrl } from "./api/axios";

export const socket = io.connect(defaultUrl);

function App() {
  const dispatch = useDispatch();
  const { user, storedCities, citiesKz, bases, basesRu, basesKz } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (user?.email) {
      socket.emit("join", { name: "1", room: "1" });
    }
  }, [user]);

  useEffect(() => {
    socket.on("updateCities", ({ data }) => {
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
    });
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    socket.on("deleteCity", ({ data }) => {
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
    });
    // eslint-disable-next-line
  }, [storedCities]);

  useEffect(() => {
    socket.on("updateBases", ({ data }) => {
      let updatedBases = basesRu?.map((city) => {
        const updatedBase = data.bases.filter((el) => Number(el.id) === city.id)[0];
        return updatedBase ? updatedBase : city;
      });
      const newBases = data.bases.filter((el) => {
        return !basesRu?.filter((item) => item.id_for_base === el.id_for_base)?.filter((item) => item.id === el.id)[0];
      });
      updatedBases = [...updatedBases, ...newBases];
      dispatch({
        type: reducerTypes.GET_BASES_RU,
        payload: updatedBases,
      });
    });
    // eslint-disable-next-line
  }, [basesRu]);

  useEffect(() => {
    socket.on("deleteBase", ({ data }) => {
      const filteredBases = basesRu?.filter((el) => Number(el.id) !== Number(data.deleteBase));
      dispatch({
        type: reducerTypes.GET_BASES,
        payload: filteredBases,
      });
    });
    // eslint-disable-next-line
  }, [basesRu]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/adminPanel/user/:id" element={<UserID />} />
        <Route path="/adminPanel/city/:id_for_base" element={<CityID />} />
        <Route path="/adminPanel/RU/:id_for_base" element={<CityID country="RU" />} />
        <Route path="/adminPanel/KZ/:id_for_base" element={<CityID country="KZ" />} />
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
