"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, [checkAuth]);

  const setAuthenticated = useCallback((value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      // Token is set when logging in (you set it in localStorage in your login logic)
      // Also set it in a cookie for middleware access
      document.cookie = `auth-token=${localStorage.getItem("token")}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
    }
    window.dispatchEvent(new Event("authChange"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    document.cookie = "auth-token=; path=/; max-age=0";
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("authChange"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
