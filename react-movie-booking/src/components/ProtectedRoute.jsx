import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const { user } = useContext(UserContext);

  const hasAccess = user && allowedRoles.includes(user.role);

  return hasAccess ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;