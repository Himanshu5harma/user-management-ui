import React, { useEffect, useState } from "react";

function ErrorBoundary({ error, setError }) {
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 3000);
    }
  }, [error]);
  return error ? (
    <div className=" z-40 flex w-full fixed">
      <div className="bg-red-600 text-white p-2 px-4 rounded-lg shadow-md mt-5 mx-auto animate-bounce ">
        {error}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default ErrorBoundary;
