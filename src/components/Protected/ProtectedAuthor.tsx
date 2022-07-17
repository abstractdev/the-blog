import { Navigate } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

function ProtectedAuthor(props: PropsInterface) {
  const { children } = props;
  const { user } = useContext(AuthContext);
  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  if (user.role === "user") {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectedAuthor;
