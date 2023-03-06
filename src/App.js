import { Route, Routes } from "react-router-dom";
import UserRegistr from "./pages/UserRegistr/UserRegistr";
import UserInput from "./pages/UserInput/UserInput";
import UserSoglos from "./pages/UserSoglos/UserSoglos";
import HomePage from "./pages/HomePage/HomePage";
import Settings from "./pages/Settings/Settings";
import Makedeal from "./pages/Makedeal/Makedeal";
import Deals from "./pages/Deals/Deals";
import Output from "./pages/Output/Output";
import Payments from "./pages/Payment/Payments";
import SystemMessages from "./pages/SystemMassages/SystemMessages";
import Deal from "./pages/Deals/Deal";
import Howitwork from "./pages/Howitwork/Howitwork";
import AdminPanel from "./pages/AdminPage/AdminPanel";
import BlockMaseges from "./pages/BlockMasseges/BlockMaseges";
import Sertificates from "./pages/Sertificates/Sertificates";
import UserID from "./pages/AdminPage/Users/UserID";
import DealID from "./pages/AdminPage/Deals/DealID";
import RefillID from "./pages/AdminPage/Refills/RefillID";
import TransfersID from "./pages/AdminPage/Transfers/ChildPages/TransfersID";
import TransfersToUserID from "./pages/AdminPage/Transfers/ChildPages/TransfersToUserID";
import Disputes from "./pages/Disputes/Disputes";
import AdminChat from "./pages/AdminPage/Chats/AdminChat";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import sound from './sound/newMessage.mp3';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Chat from "./pages/ChatComponent/Chat";

export const socket = io.connect(`https://back-yipq.onrender.com`);

function App() {
  const audioPlayer = useRef(null);

  function playAudio() {
    try {
      if (audioPlayer) {
        audioPlayer.current.play();
      }
    } catch {
      console.log('Ошибка воспроизведения аудио, обновите страницу')
    }
  }

  useEffect(() => {
    socket.on('messageToAdmin', ({ data }) => {
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
        <Route path="/" element={<HomePage />} />
        <Route path="/adminPanel/user/:id" element={<UserID />} />
        <Route path="/adminPanel/deal/:id" element={<DealID />} />
        <Route path="/adminPanel/refill/:id" element={<RefillID />} />
        <Route path="/adminPanel/transfers/:id" element={<TransfersID />} />
        <Route
          path="/adminPanel/transferstouser/:id"
          element={<TransfersToUserID />}
        />
        <Route path="/adminPanel/chat/:email" element={<AdminChat />} />
        <Route path="/deal/:id" element={<Deal />} />
        <Route path="/systemmessages" element={<SystemMessages />} />
        <Route path="/blockMaseges" element={<BlockMaseges />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/output" element={<Output />} />
        <Route path="/howitwork" element={<Howitwork />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/sertificates" element={<Sertificates />} />
        <Route path="/makedeal" element={<Makedeal />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<UserInput />} />
        <Route path="/registr" element={<UserRegistr />} />
        <Route path="/rules" element={<UserSoglos />} />
        <Route path="/disputes" element={<Disputes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
