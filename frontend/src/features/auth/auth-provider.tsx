"use client";

import {
  useMemo,
  useState,
} from "react";

import { AuthContext } from "./auth-context";
import { authStorage } from "./auth-storage";

import {
  AuthUser,
  LoginResponse,
} from "./types";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({
  children,
}: Props) {
  const [token, setToken] = useState(() =>
    authStorage.getToken()
  );

  const [user, setUser] = useState<AuthUser | null>(() =>
    authStorage.getUser()
  );

  function login(response: LoginResponse) {
    const currentUser: AuthUser = {
      userId: response.userId,
      fullName: response.fullName,
      email: response.email,
    };

    authStorage.setToken(response.accessToken);
    authStorage.setUser(currentUser);

    setToken(response.accessToken);
    setUser(currentUser);
  }

  function logout() {
    authStorage.clear();

    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}