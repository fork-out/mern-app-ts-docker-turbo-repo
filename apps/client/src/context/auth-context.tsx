import React, { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { User } from "../@types/user";
import ViewLoader from "../components/view-loader";
import { auth } from "../firebase";

interface AuthContextType {
  currentUser: User;
  setCurrentUser: (value: User) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, user => {
      setLoading(false);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });
  }, []);

  const handleSetUser = (user: any) => setCurrentUser(user);

  return (
    <ViewLoader isLoading={loading} loadingMessage="Loading...">
      <AuthContext.Provider
        value={{
          currentUser,
          setCurrentUser: v => handleSetUser(v)
        }}
      >
        {children}
      </AuthContext.Provider>
    </ViewLoader>
  );
};
