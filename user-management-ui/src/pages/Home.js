import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { DASHBOARD_ROUTE_PATH, LOGIN_ROUTE_PATH } from "../data/Constant";
import { getAllRoles } from "../api/RolesService";
import { ErrorContext, RolesContext } from "../app/base/Contexts";

const Home = (props) => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const allRoles = useContext(RolesContext);
  const {error, setError} = useContext(ErrorContext);
  if (!isAuthenticated) 
    navigate(LOGIN_ROUTE_PATH);
  const { setAllRoles } = props;

  useEffect(() => {
    console.log("form home");
    if (!(allRoles && allRoles.length !== 0)) {
      getAllRoles().then((response) => {
        if (response.status === 200) {
          setAllRoles(response?.data);
        }
      }).catch((error)=>{
        setError(error?.response?.data?.message);
      });;
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 pt-40">
        <p className="text-4xl mb-4">Welcome to the User Management System! </p>
        <p className="text-xl mb-4">
          This application allows you to efficiently manage user accounts,
          roles, and permissions.
        </p>
        <p className="text-gray-600 mb-4 text-xl">
          Key features:
          <ul className="list-disc ml-6">
            <li>Create, edit, and delete user accounts</li>
            <li>Assign roles (e.g., admin, user, manager)</li>
            <li>Control access to specific features based on user roles</li>
          </ul>
        </p>
        <button
          onClick={()=> navigate(DASHBOARD_ROUTE_PATH)}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md inline-block"
        >
          Go to Dashboard
        </button>
      </main>
    </div>
  );
};

export default Home;
