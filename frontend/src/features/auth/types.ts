export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  userId: number;
  fullName: string;
  email: string;
}

export interface AuthUser {
  userId: number;
  fullName: string;
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (response: LoginResponse) => void;
  logout: () => void;
}
export interface RegisterRequest {
  fullName: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
}