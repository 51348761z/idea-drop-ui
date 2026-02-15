import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import type { LoginInput, RegisterInput, User } from "../types";

type AuthResponse = {
  accessToken: string;
  user: User;
};

export const registerUserApi = async (
  input: RegisterInput,
): Promise<AuthResponse> => {
  try {
    const res = await api.post("/auth/register", input);
    return res.data;
  } catch (err) {
    const message =
      err instanceof AxiosError
        ? err.response?.data?.message
        : "Register failed.";
    throw new Error(message);
  }
};

export const loginUserApi = async (
  loginInput: LoginInput,
): Promise<AuthResponse> => {
  try {
    const res = await api.post("/auth/login", loginInput);
    return res.data;
  } catch (err) {
    const message =
      err instanceof AxiosError ? err.response?.data?.message : "Login failed.";
    throw new Error(message);
  }
};

export const logoutUserApi = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    const message =
      err instanceof AxiosError
        ? err.response?.data?.message
        : "Logout failed.";
    throw new Error(message);
  }
};

export const refreshAccessTokenApi = async (): Promise<AuthResponse> => {
  try {
    const res = await api.post("/auth/refresh");
    return res.data;
  } catch (err) {
    const message =
      err instanceof AxiosError
        ? err.response?.data?.message
        : "Refresh token failed.";
    throw new Error(message);
  }
};
