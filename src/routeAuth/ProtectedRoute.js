import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "./useUserRole"; // Adjust the import path as needed
import useLocalStorage from "./useLocalStorage"; // Adjust the import path as needed

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const role = useUserRole();
  const [token] = useLocalStorage("authToken", null);
  const isAuthenticated = !!token;
  const isAllowed = allowedRoles.includes(role);

  if (!isAuthenticated || !isAllowed) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
