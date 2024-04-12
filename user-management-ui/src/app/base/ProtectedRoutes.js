import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar/Navbar";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE_PATH,
  NO_ROLE_SELECTED,
  ROLE_SELECTION_ROUTE_PATH,
  SESSION_EXPIRED_ROUTE_PATH,
} from "../../data/Constant";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Contexts";
import { decodeToken } from "../../utils/utils";

const ProtectedRoutes = ({ updatedAcitveRole,setCurrentUser }) => {
  const navigate = useNavigate();

  let sessionExpired = false;
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  if(currentUser?.activeRole === NO_ROLE_SELECTED){
    navigate(ROLE_SELECTION_ROUTE_PATH);
  }

  useEffect(() => {
    if (!Object.keys(currentUser).length) {
      const token = localStorage.getItem("token");
      const userDetails = decodeToken(token);
      if (typeof userDetails === "object") {
        const { firstName, lastName, roles } = userDetails;
        const userRoles = roles.map((role) => role.authority);
        setCurrentUser((prev) => ({
          firstName,
          lastName,
          roles: userRoles,
          activeRole: userRoles.length == 1 ? userRoles[0] : NO_ROLE_SELECTED,
        }));
      }
    } else if (currentUser?.activeRole === NO_ROLE_SELECTED) {
      navigate(ROLE_SELECTION_ROUTE_PATH);
    }
  }, [currentUser]);

  const handleOnIdle = (event) => {
    console.log("User is idle", event);
    console.log("Last active", getLastActiveTime().getMilliseconds());
    localStorage.clear();
    sessionExpired = true;
    navigate(SESSION_EXPIRED_ROUTE_PATH);
  };

  const handleOnActive = (event) => {
    console.log("User is active", event);
    console.log("Time remaining", getRemainingTime());
  };

  const handleOnAction = (event) => {
    console.log(
      "User did something",
      getLastActiveTime().getMilliseconds(),
      event
    );
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 10, // 10 minutes
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    // onAction: handleOnAction,
    debounce: 500,
  });

  const { validToken } = useAuth();

  return validToken ? (
    <div>
      <Navbar
        sessionExpired={sessionExpired}
        updatedAcitveRole={updatedAcitveRole}
      />
      <Outlet />
    </div>
  ) : (
    <Navigate to={LOGIN_ROUTE_PATH} />
  );
};

export default ProtectedRoutes;
