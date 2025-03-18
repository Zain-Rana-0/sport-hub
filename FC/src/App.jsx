import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import RegistrationForm from './pages/Signup'
import Clubs from './pages/Clubs'
import Navbar from './components/navbar/Navbar';
import Tournaments from './pages/Tournaments';
import ClubDetail from './pages/ClubDetail';
import Tournamentpage from './pages/Tournamentpage';
import Footer from './components/footer/Footer';
import Users from './pages/dashboard';

import ClubRegistration from './components/clubRegistration';

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/clubDetail" element={<ClubDetail />} />
            <Route path="/tournamentspage" element={<Tournamentpage />} />
            <Route path="/" element={<Users />} />
            <Route path="/clubregistration" element={<ClubRegistration />} />
          
          </Routes>
          {/* <Footer /> */}
        </div>
    </BrowserRouter>
  );
}

export default App












