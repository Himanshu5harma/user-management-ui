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
  ROLE_SELECTION_ROUTE_PATH,
  SESSION_EXPIRED_ROUTE_PATH,
  UN_AUTHORIZED_ROUTE_PATH,
} from "../../data/Constant";
import { AuthContext, ErrorContext, RolesContext } from "./Contexts";
import RoleSelection from "../../pages/RoleSelection";
import Unauthorized from "../error/Unauthorized";
import Spinner from "../../components/Spinner";
import ErrorBoundary from "../error/ErrorBoundary";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [allRoles, setAllRoles] = useState([]);
  const [error, setError] =useState('');
  
  const updatedAcitveRole = (newAcitveRole) => {
    setCurrentUser((prev) => ({ ...prev, activeRole: newAcitveRole }));
  };

  useEffect(() => console.log(currentUser?.activeRole), [currentUser]);
  return (
    <AuthContext.Provider value={currentUser}>
      <RolesContext.Provider value={allRoles}>
        <ErrorContext.Provider value={{error,setError}}>
        <div className={`App`}>
          <ErrorBoundary error ={error} setError={setError}/>
          <BrowserRouter>
            <Routes>
              <Route path={LOGIN_ROUTE_PATH} element={<LoginPage setCurrentUser={setCurrentUser} />} />
              <Route path={NEW_USER_ROUTE_PATH} element={<CreateNewUser />} />
              <Route path={SESSION_EXPIRED_ROUTE_PATH} element={<SessionExpired />} />
              <Route path={UN_AUTHORIZED_ROUTE_PATH} element={<Unauthorized />} />
              <Route path={ROLE_SELECTION_ROUTE_PATH} element={  <RoleSelection updatedAcitveRole={updatedAcitveRole} /> } />
              <Route element={  <ProtectedRoutes updatedAcitveRole={updatedAcitveRole} setCurrentUser={setCurrentUser}/> } >
                <Route  path={HOME_ROUTE_PATH} element={<Home setAllRoles={setAllRoles} />} />
                <Route path={PROFILE_ROUTE_PATH} element={<Profile />} />
                <Route path={DASHBOARD_ROUTE_PATH} element={<Dashboard />} />
                <Route path={ADMIN_ROUTE_PATH} element={<AdminSection />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        </ErrorContext.Provider>
      </RolesContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
