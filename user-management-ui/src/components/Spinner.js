// Spinner.js

import React, { useState } from "react";
import { FaReact } from "react-icons/fa";

const Spinner = ({ loading }) => {
  const [isSpinning, setIsSpinning] = useState(true);

  const toggleSpinner = () => {
    setIsSpinning(!isSpinning);
  };

  return (
    // isSpinning ? <div>
    <div
      className={`fixed z-50 flex justify-center items-center h-screen w-screen bg-black ${
        isSpinning ? "opacity-75" : ""
      }`}
    >
      {isSpinning && (
        <div className="text-white text-4xl">
          <FaReact className="animate-spin" />
        </div>
      )}
      {/* <button
          onClick={toggleSpinner}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {isSpinning ? 'Stop Spinner' : 'Start Spinner'}
        </button> */}
    </div>
    // </div>: <></>
  );
};

export default Spinner;
