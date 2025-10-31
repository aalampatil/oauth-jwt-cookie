import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const {googleAuth} =  useAuthContext()
  
  function handleClick()  {
    googleAuth();
  }



  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white p-8 rounded-2xl shadow-md text-center">
      <p className="text-lg text-gray-700 mb-2">
        Verify yourself to enter inside Home
      </p>
      <span className="text-green-600 font-semibold block mb-4">
        Verify Me
      </span>
      <button
        onClick={handleClick}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
      >
        Login with Google
      </button>
    </div>
  </div>
);

};

export default Login;
