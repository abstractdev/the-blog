import { Navigate } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

function Protected(props: PropsInterface) {
  const { children } = props;
  const { user } = useContext(AuthContext);
  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
