// import React, { useState, useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const RequireAuth = ({ children }) => {
//   const location = useLocation();
//   const token = localStorage.getItem("authToken");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(!!token); // Load only if there is a token

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (!token) {
//         setIsAuthenticated(false);
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("/api/verifyToken", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token }),
//         });

//         const data = await response.json();
//         if (data.isValid) {
//           setIsAuthenticated(true);
//         } else {
//           localStorage.removeItem("authToken"); // Optional: Remove invalid token
//           setIsAuthenticated(false);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error("Error verifying token:", error);
//         setIsAuthenticated(false);
//         setIsAuthenticated(true);
//       }
//       setIsLoading(false);
//     };

//     if (token) {
//       verifyToken();
//     }
//   }, [token]); // Dependency on token to re-run effect if it changes

//   if (!isAuthenticated) {
//     // Redirect them immediately if not authenticated
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default RequireAuth;

import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Authenticate based on token existence

  useEffect(() => {
    // This effect will only run once on component mount or when the token changes
    setIsAuthenticated(!!token);
  }, [token]); // Reacting to changes in token to update authentication status

  if (!isAuthenticated) {
    // Redirect them immediately if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
