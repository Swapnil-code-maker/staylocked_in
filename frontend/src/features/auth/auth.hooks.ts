"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { authApi } from "./auth.api";
import {
  LoginRequest,
  LoginResponse,
} from "./types";

export function useLogin() {
  return useMutation<
    LoginResponse,
    AxiosError,
    LoginRequest
  >({
    mutationFn: (request) =>
      authApi.login(request),
  });
}