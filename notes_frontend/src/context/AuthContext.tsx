"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getToken,
  removeToken,
  getMe,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "../utils/api";

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: load user if token exists
  useEffect(() => {
    const initialize = async () => {
      const token = getToken();
      if (token) {
        try {
          const me = await getMe();
          setUser(me);
        } catch {
          removeToken();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await apiLogin(email, password);
    const me = await getMe();
    setUser(me);
    setLoading(false);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    await apiRegister(email, password);
    // Optionally, auto-login after registering
    await login(email, password);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
