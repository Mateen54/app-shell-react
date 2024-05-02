import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (data.isValid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("authToken"); // Optional: Remove invalid token
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>; // Or any other loader component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
