import React, { useState } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, errorInfo) => {
    console.error('Error caught:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="bg-red-100 p-4 rounded-lg shadow-md">
        <h2 className="text-red-600 font-semibold text-lg mb-2">
          Something went wrong.
        </h2>
        <p className="text-gray-700">
          We apologize for the inconvenience. Our team has been notified.
        </p>
        {/* You can add additional error information or links here */}
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
