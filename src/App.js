import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import RequireAuth from "./routeAuth/RequireAuth"; // This is not used in your code sample provided.
import { Spin } from "antd";
import Sidebar from "./components/Admin/Sidebar";

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

const TestingB = React.lazy(() => import("./components/TestingB"));

const CenteredLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
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
            index
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <Login />
              </React.Suspense>
            }
          />

          <Route
            path="signup"
            element={
              <React.Suspense fallback={<CenteredLoader />}>
                <Signup />
              </React.Suspense>
            }
          />

          <Route path="/" element={<Sidebar />}>
            <Route
              path="dashboard"
              element={
                <React.Suspense fallback={<CenteredLoader />}>
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                </React.Suspense>
              }
            />
            <Route
              path="brief-review"
              element={
                <React.Suspense fallback={<CenteredLoader />}>
                  <BriefReview />
                </React.Suspense>
              }
            />
            <Route
              path="user-management"
              element={
                <React.Suspense fallback={<CenteredLoader />}>
                  <UserManagement />
                </React.Suspense>
              }
            />
            <Route
              path="client-management"
              element={
                <React.Suspense fallback={<CenteredLoader />}>
                  <ClientManagement />
                </React.Suspense>
              }
            />

            <Route
              path="testing"
              element={
                <React.Suspense fallback={<CenteredLoader />}>
                  <TestingB />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
