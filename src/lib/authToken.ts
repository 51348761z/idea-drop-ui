let storedAccessToken: string | null = null;

export const setStoredAccessToken = (token: string | null) => {
  storedAccessToken = token;
};

export const getStoredAccessToken = () => {
  return storedAccessToken;
};
