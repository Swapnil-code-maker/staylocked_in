export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
  },
} as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";