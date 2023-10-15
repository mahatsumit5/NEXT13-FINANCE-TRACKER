"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = async () => {
    try {
      signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    signOut(auth);
  };
  const values = { user, loading, googleLoginHandler, logout };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
