import { Route, Routes } from "react-router-dom";
import UserRegistr from "./pages/UserRegistr/UserRegistr";
import UserInput from "./pages/UserInput/UserInput";
import AdminPanel from "./pages/AdminPage/AdminPanel";
import UserID from "./pages/AdminPage/Users/UserID";
import { useRef } from "react";
import sound from "./sound/newMessage.mp3";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CityIDRu from "./pages/AdminPage/PodzialRu/CityIDRu";
import CityIDKz from "./pages/AdminPage/PodzialKz/CityIDKz";
import "./style/body.css";

//export const socket = io.connect(`https://back-nnk5.onrender.com`);

function App() {
  const audioPlayer = useRef(null);

  return (
    <>
      <audio ref={audioPlayer} src={sound} />
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
