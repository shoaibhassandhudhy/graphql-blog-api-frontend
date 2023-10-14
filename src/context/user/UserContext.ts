import { createContext, useContext } from "react";
import { UserContextProps } from "../../types/index";

export const UserContext = createContext<UserContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
