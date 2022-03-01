import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AllAuctionsPage from "./pages/AllAuctionsPage";
import BidHistoryPage from "./pages/BidHistoryPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import SingleAuctionPage from "./pages/SingleAuctionPage";
import MyContext from "./context/MyContext";
import {useState} from "react";


function App() {

    const [getUser,setUser] = useState([])

  return (
    <div className="App d-flex j-center f-column">
        <MyContext.Provider value={{getUser, setUser}}>
        <BrowserRouter>
            <Toolbar/>
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/allauctions" element={<AllAuctionsPage/>}/>
                <Route path="/bidhistory" element={<BidHistoryPage/>}/>
                <Route path="/create" element={<CreateAuctionPage/>}/>
                <Route path="/singleauction/:id" element={<SingleAuctionPage/>}/>
            </Routes>
        </BrowserRouter>
        </MyContext.Provider>
    </div>
  );
}

export default App;