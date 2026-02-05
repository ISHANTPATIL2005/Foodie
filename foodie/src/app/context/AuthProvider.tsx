"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthData, AccountType } from "@/app/lib/auth";

interface AuthContextType {
  token: string | null;
  user: AuthData["user"] | null;
  accountType: AccountType|string | null;
  login: (data: AuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthData["user"] | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);

  // restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedAccountType = localStorage.getItem("accounttype");

    if (storedToken && storedUser && storedAccountType) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setAccountType(storedAccountType);
    }
  }, []);

  const login = (data: AuthData) => {
    setToken(data.token);
    setUser(data.user);
    setAccountType(data.user.accountType);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("accounttype", data.user.accountType);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAccountType(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("accounttype");
  };

  return (
    <AuthContext.Provider value={{ token, user, accountType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
