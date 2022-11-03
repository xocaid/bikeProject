import './App.css';
import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Margins/header";
import Footer from './components/Margins/footer';
import NavigationBar from './components/NavigationBar/navigationBar';
import Home from './components/Tabs/Home/home';
import Favorites from './components/Tabs/Favorites/favorites';
import Login from './components/Tabs/Login/login';
import Account from './components/Tabs/Account/account';


function App() {
  return (
    <div className="App">
      <Header />


      <Router>
        <NavigationBar />
        <Routes >
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </Router>



      <Footer />
    </div>
  );
}

export default App;
