import axiosClient from "@/lib/axios";

import { API } from "@/constants/api";

import {
  LoginRequest,
  LoginResponse,
} from "@/features/auth/types";

class AuthService {
  async login(
    request: LoginRequest
  ): Promise<LoginResponse> {
    const response =
      await axiosClient.post<LoginResponse>(
        API.AUTH.LOGIN,
        request
      );

    return response.data;
  }
}

export const authService = new AuthService();