import { Route, Routes } from "react-router-dom";
import UserRegistr from "./pages/UserRegistr/UserRegistr";
import UserInput from "./pages/UserInput/UserInput";
import HomePage from "./pages/HomePage/HomePage";
import AdminPanel from "./pages/AdminPage/AdminPanel";
import UserID from "./pages/AdminPage/Users/UserID";
import DealID from "./pages/AdminPage/Deals/DealID";
import RefillID from "./pages/AdminPage/Refills/RefillID";
import TransfersID from "./pages/AdminPage/Transfers/ChildPages/TransfersID";
import TransfersToUserID from "./pages/AdminPage/Transfers/ChildPages/TransfersToUserID";
import AdminChat from "./pages/AdminPage/Chats/AdminChat";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import sound from "./sound/newMessage.mp3";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chat from "./pages/ChatComponent/Chat";
import CityIDRu from "./pages/AdminPage/PodzialRu/CityIDRu";
import CityIDKz from "./pages/AdminPage/PodzialKz/CityIDKz";

export const socket = io.connect(`https://back-nnk5.onrender.com`);

function App() {
  const audioPlayer = useRef(null);

  function playAudio() {
    try {
      if (audioPlayer) {
        audioPlayer.current.play();
      }
    } catch {
      console.log("Ошибка воспроизведения аудио, обновите страницу");
    }
  }

  useEffect(() => {
    socket.on("messageToAdmin", ({ data }) => {
      if (!data?.nickname) playAudio();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <audio ref={audioPlayer} src={sound} />
      <Header />
      <Chat />
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/adminPanel/user/:id" element={<UserID />} />
        <Route path="/adminPanel/deal/:id" element={<DealID />} />
        <Route path="/adminPanel/refill/:id" element={<RefillID />} />
        <Route path="/adminPanel/transfers/:id" element={<TransfersID />} />
        <Route path="/adminPanel/transferstouser/:id" element={<TransfersToUserID />} />
        <Route path="/adminPanel/chat/:email" element={<AdminChat />} />
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
