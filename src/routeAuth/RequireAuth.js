import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "./useLocalStorage"; // Adjust the import path as needed
import localStorage from "redux-persist/es/storage";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [token, setToken] = useLocalStorage("authToken");
  const isAuthenticated = !!token; // Authenticate based on token existence

  useEffect(() => {
    const handleStorageEvent = (event) => {
      if (event.key === "authToken") {
        if (!event.newValue || event.newValue !== token) {
          // Token has been removed or changed
          setToken(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [token, setToken]);

  useEffect(() => {
    // If the token in state is null, remove it from localStorage
    if (!token) {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  if (!isAuthenticated) {
    // Redirect them immediately if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
