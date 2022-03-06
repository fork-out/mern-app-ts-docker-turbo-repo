import React, { createContext, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { User } from "../@types/user";
import ViewLoader from "../components/view-loader";
import { useMeLazyQuery } from "../generated/graphql";
import { setAccessToken } from "../utils/token.utils";

interface AuthContextType {
  currentUser: User | any;
  setCurrentUser: (value: User | any) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [meQuery] = useMeLazyQuery();

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      setLoading(true);
      try {
        const data = await res.json();
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          try {
            const { data } = await meQuery();
            setCurrentUser(data?.me);
          } catch (error) {
            setCurrentUser(null);
            console.error(error);
            toast.error("Error loading the user.");
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
        setCurrentUser(null);
        console.error(error);
        toast.error("Error loading the user.");
      } finally {
        setLoading(false);
      }
    });
  }, [meQuery]);

  const handleSetUser = (user: User) => setCurrentUser(user);

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
