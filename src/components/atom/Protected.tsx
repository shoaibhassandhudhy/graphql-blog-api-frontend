import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { ProtectedProps } from "../../types";
import { useContext } from "react";
const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
