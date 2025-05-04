import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/loader.css";
function SuccessScreen() {
  const [loading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 2000);
  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center bg-green-100">
          <div className="bg-white p-10 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Booking Successful!
            </h1>
            <p className="text-lg mb-6">
              Thank you for booking with us. Enjoy your stay!
            </p>
            <Link
              to="/"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SuccessScreen;
