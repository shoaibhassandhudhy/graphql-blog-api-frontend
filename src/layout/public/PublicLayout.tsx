import { Navigate, Outlet } from "react-router-dom";
import { AuthLayoutWrapper } from "../../styles";
import { useContext } from "react";
import { UserContext } from "../../context/user";
import { useEffect } from "react";
export const PublicLayout = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  } else
    return (
      <AuthLayoutWrapper>
        <Outlet />
      </AuthLayoutWrapper>
    );
};
