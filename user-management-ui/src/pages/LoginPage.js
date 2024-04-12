import React, { useCallback, useState } from "react";
import bcrypt from 'bcryptjs';
import { getEntitlement } from "../api/AuthService";
import { useNavigate, Link } from "react-router-dom";
import {
  HOME_ROUTE_PATH,
  NEW_USER_ROUTE_PATH,
  NO_ROLE_SELECTED,
  saltRounds,
} from "../data/Constant";
import { decodeToken } from "../utils/utils";

const LoginPage = ({ setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // Here you can handle form submission, e.g., validate input, send login request, etc.
      getEntitlement({ username, password
        // : await bcrypt.hash(password,saltRounds) 
      })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("token", response?.data?.jwt);
            const userDetails = decodeToken(response?.data?.jwt);
            if (typeof userDetails === "object") {
              const { firstName, lastName, roles, sub:username } = userDetails;
              const userRoles = roles.map((role) => role.authority);
              setCurrentUser((prev)=>({
                firstName,
                lastName,
                username,
                roles: userRoles,
                activeRole:
                  userRoles.length == 1 ? userRoles[0] : NO_ROLE_SELECTED,
              }));
            }

            navigate(HOME_ROUTE_PATH);
          } else {
            throw new Error("An error occurred in");
          }
        })
        .catch((error) => {
          setHasError(true);
        });
    },
    [username, password]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-medium">
            Please Login To Continue
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {hasError && (
            <div className="text-red-500 text-sm w-full text-center font-thin">
              Incorrect Username or Password
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
          <div>
            <div>
              <h2 className="mt-6 text-center text-sm font-light hover:underline">
                <Link to={NEW_USER_ROUTE_PATH}>Create new Account</Link>
              </h2>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
