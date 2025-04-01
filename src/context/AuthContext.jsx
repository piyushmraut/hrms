// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import { getUserRole } from "../utils/authUtils";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         const role = await getUserRole(user.email);
//         setUserRole(role);
//       } else {
//         setUserRole(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, userRole }}>
    

//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUserRole } from "../utils/authUtils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const role = await getUserRole(user.email);
        setUserRole(role);
        setUserName(user.displayName || "Admin");
      } else {
        setUserRole(null);
        setUserName(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userRole, userName }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};