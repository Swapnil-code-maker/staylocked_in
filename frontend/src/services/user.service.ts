import axiosClient from "@/lib/axios";
import {
  RegisterRequest,
  UserResponse,
} from "@/features/auth/types";

class UserService {
  async register(
    request: RegisterRequest
  ): Promise<UserResponse> {
    const response =
      await axiosClient.post<UserResponse>(
        "/api/users/register",
        request
      );

    return response.data;
  }
}

export const userService = new UserService();