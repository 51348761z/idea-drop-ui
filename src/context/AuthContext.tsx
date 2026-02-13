import { refreshAccessTokenApi } from "@/api/auth";
import type { User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const { accessToken: newToken, user } = await refreshAccessTokenApi();
        setAccessToken(newToken);
        setUser(user);
      } catch (err) {
        setAccessToken(null);
        setUser(null);
        console.error("No valid refresh token found ", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">Loading</div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
