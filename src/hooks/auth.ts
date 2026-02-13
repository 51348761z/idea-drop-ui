import { loginUserApi, logoutUserApi, registerUserApi } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  return useMutation({
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({ to: "/ideas" });
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  return useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate({ to: "/ideas" });
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
