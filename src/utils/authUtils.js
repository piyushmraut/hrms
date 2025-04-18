// import { db } from "../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// export const getUserRole = async (email) => {
//   const adminsRef = collection(db, "admins");
//   const q = query(adminsRef, where("email", "==", email));
//   const querySnapshot = await getDocs(q);
//   return !querySnapshot.empty ? "admin" : "employee";
// };

/*
 *  Preferred Response
 */

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserRole = async (email) => {
  try {
    const adminsRef = collection(db, "admins");
    const q = query(adminsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return "employee";
    }
    return "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    throw error; // Re-throw the error to be caught in AuthProvider
  }
};