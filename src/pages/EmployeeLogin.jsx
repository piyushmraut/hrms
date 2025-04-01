import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/employee-dashboard");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-4 rounded">
        Login with Google
      </button>
    </div>
  );
};

export default EmployeeLogin;