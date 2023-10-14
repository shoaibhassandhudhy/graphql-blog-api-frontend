import { isToken } from "../../utility_Func";
import { UserProviderProps } from "../../types/index";
import { UserContext } from "./UserContext";
import { useState } from "react";

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isToken());
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
