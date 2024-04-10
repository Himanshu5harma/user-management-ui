import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar/Navbar";
import { useIdleTimer } from 'react-idle-timer';
import {useNavigate} from 'react-router-dom';
import { LOGIN_ROUTE_PATH, SESSION_EXPIRED_ROUTE_PATH } from "../../data/Constant";

const ProtectedRoutes = ({}) => {
  const navigate = useNavigate();
  let sessionExpired = false;
  const handleOnIdle = event => {
    console.log('User is idle', event);
    console.log('Last active', getLastActiveTime().getMilliseconds());
    localStorage.clear();
    sessionExpired = true;
    navigate(SESSION_EXPIRED_ROUTE_PATH);
  };

  const handleOnActive = event => {
    console.log('User is active', event);
    console.log('Time remaining', getRemainingTime());
  };

  const handleOnAction = event => {
    console.log('User did something',getLastActiveTime().getMilliseconds(), event);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 10, // 10 minutes
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });
  const {validToken} = useAuth();

  return validToken ? (
    <div>
      <Navbar sessionExpired={sessionExpired}/>
      <Outlet />
    </div>
  ) : (
    <Navigate to={LOGIN_ROUTE_PATH} />
  );
};

export default ProtectedRoutes;
