import { login as loginRequest } from "/@features/login/services/login";

export function useAuth() {
  const login = async (userId: string, password: string) => {
    const data = await loginRequest(userId, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.userId);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const isAuthenticated = (): boolean => !!getToken();

  return {
    login,
    logout,
    getToken,
    isAuthenticated,
  };
}
