import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { createNewUser } from "../api/UserSerice";
import {useNavigate} from "react-router-dom";
const CreateNewUser = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const createNewUserHandler = useCallback(
    (e) => {
      e.preventDefault();
      const requsetPayload = {
        firstName,
        lastName,
        birthDate,
        userName,
        password,
        roles: [
          {
            id: 3,
            name: "worker",
          },
        ],
      };
      // Here you can handle form submission, e.g., validate input, send login request, etc.
      createNewUser(requsetPayload).then((response) => {
        if (response.status == 200) {
          navigate("/login");
        }
      });
    },
    [firstName, lastName, birthDate, userName, password]
  );

  useEffect(() => console.log(birthDate), [birthDate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-medium">
            Please Fill Below Details
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={createNewUserHandler}>
          <div className="rounded-md shadow-sm -space-y-px">
            <CustomInput
              id="first-name"
              label="First Name"
              type="text"
              autoComplete="firstname"
              required
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
            />
            <CustomInput
              id="last-name"
              label="Last Name"
              type="text"
              autoComplete="lastname"
              required
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
            />
            <CustomInput
              id="birthdate"
              label="Birth Date"
              type="date"
              autoComplete="birthdate"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="Birth Name"
            />
            <CustomInput
              id="user-name"
              label="User Name"
              type="text"
              autoComplete="username"
              required
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
            />
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewUser;
