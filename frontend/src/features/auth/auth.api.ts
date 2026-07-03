import { authService } from "@/services/auth.service";

import {
  LoginRequest,
  LoginResponse,
} from "./types";

class AuthApi {
  login(
    request: LoginRequest
  ): Promise<LoginResponse> {
    return authService.login(request);
  }
}

export const authApi = new AuthApi();