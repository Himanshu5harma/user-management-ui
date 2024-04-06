import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar/Navbar";

const ProtectedRoutes = () => {
  const user = useAuth();
  return user ? (
    <div>
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoutes;
