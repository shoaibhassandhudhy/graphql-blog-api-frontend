import { useCallback, useContext } from "react";
import { removeToken, saveToken } from "../utility_Func";
import { UserContext } from "../context/user";

export const useAuth = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const logout = useCallback(() => {
    removeToken();
    setIsLoggedIn(false);
  }, []);

  const login = useCallback((token: string) => {
    saveToken(token);
    setIsLoggedIn(true);
  }, []);

  return { logout, login };
};
