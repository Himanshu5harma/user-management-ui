import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import LoginPage from "../../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import PageNotFound from "../error/PageNotFound";
import CreateNewUser from "../../pages/CreateNewUser";
import Dashboard from "../../pages/Dashboard";
// import useAuth from "../../hooks/useAuth";

function App() {
  
  return (
    <div className={`App`}>
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/new-user" element={<CreateNewUser/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path="/" element={<Home/> }/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
          <Route path="*" element={<PageNotFound/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;