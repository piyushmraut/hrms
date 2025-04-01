import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserRole = async (email) => {
  const adminsRef = collection(db, "admins");
  const q = query(adminsRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty ? "admin" : "employee";
};