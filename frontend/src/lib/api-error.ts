import { AxiosError } from "axios";

interface BackendErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  errors?: Record<string, string>;
}

/**
 * Extracts a human-readable message from a backend error response.
 * Handles both the plain ErrorResponse shape and the ValidationErrorResponse
 * shape (which carries a field -> message map) returned by
 * GlobalExceptionHandler.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as BackendErrorResponse | undefined;

    if (data?.errors && Object.keys(data.errors).length > 0) {
      return Object.values(data.errors)[0];
    }

    if (data?.message) {
      return data.message;
    }

    if (error.response?.status === 401) {
      return "Invalid email or password.";
    }

    if (error.response?.status === 409) {
      return "This resource already exists.";
    }

    if (!error.response) {
      return "Could not reach the server. Please check your connection.";
    }
  }

  return fallback;
}
