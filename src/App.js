import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";

import RequireAuth from "./routeAuth/RequireAuth";
import ProtectedRoute from "./routeAuth/ProtectedRoute"; // Ensure this matches the exact filename
import Sidebar from "./components/Admin/Sidebar";
import Dashboard from "./components/Admin/Dashboard";
import Login from "./components/Login";
import BriefReview from "./components/Admin/BriefReview";
import Signup from "./components/Signup";
import UserManagement from "./components/Admin/UserManagement";
import ClientManagement from "./components/Admin/ClientManagement";
import TestingB from "./components/TestingB";
import BreifDetailByFile from "./components/Admin/BriefReview/BreifDetailByFile";
import BreifDetailByForm from "./components/Admin/BriefReview/BreifDetailByForm";
import Plan from "./components/Admin/Plan";
import PlanReview from "./components/Admin/Plan/PlanReview";
import POReview from "./components/Admin/Plan/POReview";

import CampaignManagement from "./components/Admin/CampainManagement";
import CampaignDetails from "./components/Admin/CampainManagement/CampaignDetails";

import ViewProfile from "./components/Admin/ClientManagement/ViewProfile";

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
    <Router>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<CenteredLoader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<CenteredLoader />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          element={
            <RequireAuth>
              <ProtectedRoute allowedRoles={["planner", "editor", "admin"]}>
                <Sidebar />
              </ProtectedRoute>
            </RequireAuth>
          }
        >
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["planner", "editor", "admin"]}>
                    <Dashboard />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="brief-management"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["KMA", "editor", "admin"]}>
                    <BriefReview />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="campaign-management"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["KMA", "editor", "admin"]}>
                    <CampaignManagement />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="campaign-details"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["KMA", "editor", "admin"]}>
                    <CampaignDetails />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="brief-review-file"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["KMA", "editor", "admin"]}>
                    <BreifDetailByFile />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="brief-review-form"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["KMA", "editor", "admin"]}>
                    <BreifDetailByForm />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="user-management"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <UserManagement />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="client-management"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <ClientManagement />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="view-client-profile"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin", "manager"]}>
                    <ViewProfile />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />

          <Route
            path="plan"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin", "planner"]}>
                    <Plan />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="plan-review"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin", "planner"]}>
                    <PlanReview />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="plan-po-review"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin", "planner"]}>
                    <POReview />
                  </ProtectedRoute>
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="testing"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <TestingB />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
