"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { userApi } from "./user.api";

import {
  RegisterRequest,
  UserResponse,
} from "./types";

export function useRegister() {
  return useMutation<
    UserResponse,
    AxiosError,
    RegisterRequest
  >({
    mutationFn: (request) =>
      userApi.register(request),
  });
}