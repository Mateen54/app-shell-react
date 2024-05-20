import React from "react";
import { Navigate } from "react-router-dom";
import useUserRole from "./useUserRole"; // Adjust the import path as needed

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useUserRole();
  const isAllowed = allowedRoles.includes(role);
  console.log("role", allowedRoles);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
