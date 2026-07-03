import { userService } from "@/services/user.service";

import {
  RegisterRequest,
  UserResponse,
} from "./types";

class UserApi {
  register(
    request: RegisterRequest
  ): Promise<UserResponse> {
    return userService.register(request);
  }
}

export const userApi = new UserApi();