import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RequireAuth from "./routeAuth/RequireAuth";
import { Spin } from "antd";

const Dashboard = React.lazy(() => import("./components/Admin/Dashboard"));
const Login = React.lazy(() => import("./components/Login"));
const BriefReview = React.lazy(() => import("./components/Admin/BriefReview"));
const Signup = React.lazy(() => import("./components/Signup"));
const UserManagement = React.lazy(() =>
  import("./components/Admin/UserManagement")
);
const ClientManagement = React.lazy(() =>
  import("./components/Admin/ClientManagement")
);

const CenteredLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Adjust this value as needed
    }}
  >
    <Spin size="large" />
  </div>
);

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <Login />
              </React.Suspense>
            }
          />

          <Route
            path="/Signup"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <Signup />
              </React.Suspense>
            }
          />

          <Route
            path="/dashboard"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path="/brief-review"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <BriefReview />
              </React.Suspense>
            }
          />

          <Route
            path="/user-management"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <UserManagement />
              </React.Suspense>
            }
          />

          <Route
            path="/client-management"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <ClientManagement />
              </React.Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
