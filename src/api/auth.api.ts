import apiClient from "./axios";

import type { ApiResponse } from "../types/api.types";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export const login = async (
  payload: LoginRequest,
): Promise<ApiResponse<LoginResponse>> => {
  const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload,
  );

  return data;
};
