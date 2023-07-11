import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserRegistr from "./pages/UserRegistr/UserRegistr";
import UserInput from "./pages/UserInput/UserInput";
import AdminPanel from "./pages/AdminPage/AdminPanel";
import UserID from "./pages/AdminPage/Users/UserID";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CityIDRu from "./pages/AdminPage/PodzialRu/CityIDRu";
import CityIDKz from "./pages/AdminPage/PodzialKz/CityIDKz";
import "./style/body.css";
import { useAppSelector } from "./store/reduxHooks";
import { reducerTypes } from "./store/Users/types";
import io from "socket.io-client";
import { defaultUrl } from "./api/axios";

export const socket = io.connect(defaultUrl);

function App() {
  const dispatch = useDispatch();
  const { user, citiesRu, citiesKz } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (user?.email) {
      socket.emit("join", { name: "1", room: "1" });
    }
  }, [user]);

  useEffect(() => {
    socket.on("updateCitiesRu", ({ data }) => {
      let updatedCities = citiesRu?.map((city) => {
        const updatedCity = data.cities.filter((el) => Number(el.id) === city.id)[0];
        return updatedCity ? updatedCity : city;
      });
      const newTimes = data.cities.filter((el) => {
        return !citiesRu?.filter((item) => item.id_for_base === el.id_for_base)?.filter((item) => item.id === el.id)[0];
      });
      updatedCities = [...updatedCities, ...newTimes];
      dispatch({
        type: reducerTypes.GET_CITIES_RU,
        payload: updatedCities,
      });
    });
    // eslint-disable-next-line
  }, [citiesRu]);

  useEffect(() => {
    socket.on("updateCitiesKz", ({ data }) => {
      let updatedCities = citiesKz?.map((city) => {
        const updatedCity = data.cities.filter((el) => Number(el.id) === city.id)[0];
        return updatedCity ? updatedCity : city;
      });
      const newTimes = data.cities.filter((el) => {
        return !citiesKz?.filter((item) => item.id_for_base === el.id_for_base)?.filter((item) => item.id === el.id)[0];
      });
      updatedCities = [...updatedCities, ...newTimes];
      dispatch({
        type: reducerTypes.GET_CITIES_KZ,
        payload: updatedCities,
      });
    });
    // eslint-disable-next-line
  }, [citiesKz]);

  useEffect(() => {
    socket.on("deleteCityRu", ({ data }) => {
      if (data.deleteTime ?? false) {
        const filteredCities = citiesRu?.filter((el) => Number(el.id) !== Number(data.deleteTime));
        dispatch({
          type: reducerTypes.GET_CITIES_RU,
          payload: filteredCities,
        });
      } else {
        const filteredCities = citiesRu?.filter((el) => Number(el.id_for_base) !== Number(data.deleteCity));
        dispatch({
          type: reducerTypes.GET_CITIES_RU,
          payload: filteredCities,
        });
      }
    });
    // eslint-disable-next-line
  }, [citiesRu]);

  useEffect(() => {
    socket.on("deleteCityKz", ({ data }) => {
      if (data.deleteTime ?? false) {
        const filteredCities = citiesKz?.filter((el) => Number(el.id) !== Number(data.deleteTime));
        dispatch({
          type: reducerTypes.GET_CITIES_KZ,
          payload: filteredCities,
        });
      } else {
        const filteredCities = citiesKz?.filter((el) => Number(el.id_for_base) !== Number(data.deleteCity));
        dispatch({
          type: reducerTypes.GET_CITIES_KZ,
          payload: filteredCities,
        });
      }
    });
    // eslint-disable-next-line
  }, [citiesKz]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/adminPanel/user/:id" element={<UserID />} />
        <Route path="/adminPanel/cityRu/:id_for_base" element={<CityIDRu />} />
        <Route path="/adminPanel/cityKz/:id_for_base" element={<CityIDKz />} />
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
