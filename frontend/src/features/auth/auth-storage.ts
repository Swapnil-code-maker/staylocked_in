import { AUTH_STORAGE } from "./auth.constants";
import { AuthUser } from "./types";

class AuthStorage {
  getToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(AUTH_STORAGE.TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(AUTH_STORAGE.TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(AUTH_STORAGE.TOKEN);
  }

  getUser(): AuthUser | null {
    if (typeof window === "undefined") {
      return null;
    }

    const user = localStorage.getItem(AUTH_STORAGE.USER);

    if (!user) {
      return null;
    }

    return JSON.parse(user) as AuthUser;
  }

  setUser(user: AuthUser): void {
    localStorage.setItem(
      AUTH_STORAGE.USER,
      JSON.stringify(user)
    );
  }

  removeUser(): void {
    localStorage.removeItem(AUTH_STORAGE.USER);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }
}

export const authStorage = new AuthStorage();