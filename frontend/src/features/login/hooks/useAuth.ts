import { login as loginRequest } from "../services/login";

export function useAuth() {
  const login = async (userId: string, password: string) => {
    const data = await loginRequest(userId, password);

    localStorage.setItem("token", data.token);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
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
