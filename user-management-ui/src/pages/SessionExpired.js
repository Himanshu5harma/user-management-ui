import React from 'react';
import {useNavigate} from 'react-router-dom'
import { LOGIN_ROUTE_PATH } from '../data/Constant';

const SessionExpired = ({ onNavigateToLogin }) => {
    const nevigate = useNavigate();
  return (
    <div className="bg-gray-light min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your session has expired.</h2>
        <p className="italic">
          Please click the button below to log in again:
        </p>
        <button
          onClick={()=> nevigate(LOGIN_ROUTE_PATH)}
          className="mt-4 bg-gray-500 text-white  px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;
