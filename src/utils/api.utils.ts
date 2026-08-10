import axios from "axios";

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong.",
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.responseMessage || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
