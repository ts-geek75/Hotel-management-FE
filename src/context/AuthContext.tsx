"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (value: boolean) => void;
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
    window.dispatchEvent(new Event("authChange"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setAuthenticated }}>
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
