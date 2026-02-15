import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import {
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from "../services/authService";

export const useRegisterUser = () => {
  const { setAccessToken, setUser } = useAuth();

  return useMutation({
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
    },
  });
};

export const useLoginUser = () => {
  const { setAccessToken, setUser } = useAuth();

  return useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
    },
  });
};

export const useLogoutUser = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuth();

  return useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      setAccessToken(null);
      setUser(null);
      navigate({ to: "/" });
    },
  });
};
