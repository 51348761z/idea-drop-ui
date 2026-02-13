import { api } from "@/lib/axios";
import type { RegisterInput, User } from "@/types";
import { AxiosError } from "axios";

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
