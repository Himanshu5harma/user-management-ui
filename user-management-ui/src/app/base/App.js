import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import PageNotFound from "../error/PageNotFound";
import CreateNewUser from "../../pages/CreateNewUser";
import Dashboard from "../../pages/Dashboard";
import AdminSection from "../../pages/AdminSection";
import SessionExpired from "../../pages/SessionExpired";

import {
  ADMIN_ROUTE_PATH,
  DASHBOARD_ROUTE_PATH,
  HOME_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
  NEW_USER_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  SESSION_EXPIRED_ROUTE_PATH,
} from "../../data/Constant";
import { AuthContext } from "./Contexts";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <AuthContext.Provider value={currentUser}>
      <div className={`App`}>
        <BrowserRouter>
          <Routes>
            <Route
              path={LOGIN_ROUTE_PATH}
              element={<LoginPage setCurrentUser={setCurrentUser} />}
            />
            <Route path={NEW_USER_ROUTE_PATH} element={<CreateNewUser />} />
            <Route
              path={SESSION_EXPIRED_ROUTE_PATH}
              element={<SessionExpired />}
            />
            <Route element={<ProtectedRoutes />}>
              <Route path={HOME_ROUTE_PATH} element={<Home />} />
              <Route path={PROFILE_ROUTE_PATH} element={<Profile />} />
              <Route path={DASHBOARD_ROUTE_PATH} element={<Dashboard />} />
              <Route path={ADMIN_ROUTE_PATH} element={<AdminSection />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
