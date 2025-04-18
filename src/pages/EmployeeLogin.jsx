// import React from "react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const EmployeeLogin = () => {
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate("/employee-dashboard");
//     } catch (error) {
//       console.error("Error logging in with Google:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button onClick={handleGoogleLogin} className="bg-red-500 text-white p-4 rounded">
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default EmployeeLogin;

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, googleProvider, db } from "../firebase"; // Import db
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // Perform Google login
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user details to Firestore "users" collection
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      }, { merge: true });

      // Redirect to employee dashboard
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