import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";

const RequireAuth = React.lazy(() => import("./routeAuth/RequireAuth"));
const ProtectedRoute = React.lazy(() => import("./routeAuth/ProtectedRoute"));
const Sidebar = React.lazy(() => import("./components/Admin/Sidebar"));
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
const BreifDetailByFile = React.lazy(() =>
  import("./components/Admin/BriefReview/BreifDetailByFile")
);
const BreifDetailByForm = React.lazy(() =>
  import("./components/Admin/BriefReview/BreifDetailByForm")
);
const Plan = React.lazy(() => import("./components/Admin/Plan"));
const PlanReview = React.lazy(() =>
  import("./components/Admin/Plan/PlanReview")
);
const POReview = React.lazy(() => import("./components/Admin/Plan/POReview"));
const CampaignManagement = React.lazy(() =>
  import("./components/Admin/CampainManagement")
);
const CampaignDetails = React.lazy(() =>
  import("./components/Admin/CampainManagement/CampaignDetails")
);
const ViewProfile = React.lazy(() =>
  import("./components/Admin/ClientManagement/ViewProfile")
);
const CompetitorReport = React.lazy(() =>
  import("./components/CompetitorReport")
);

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
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    const checkResourcesLoaded = () => {
      const allStyles = Array.from(document.styleSheets).every(
        (styleSheet) => styleSheet.cssRules || styleSheet.rules
      );
      if (allStyles) {
        setResourcesLoaded(true);
      }
    };

    if (document.readyState === "complete") {
      checkResourcesLoaded();
    } else {
      window.addEventListener("load", checkResourcesLoaded);
      return () => window.removeEventListener("load", checkResourcesLoaded);
    }
  }, []);

  if (!resourcesLoaded) {
    return <CenteredLoader />;
  }

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
            <Suspense fallback={<CenteredLoader />}>
              <RequireAuth>
                <ProtectedRoute allowedRoles={["planner", "editor", "admin"]}>
                  <Sidebar />
                </ProtectedRoute>
              </RequireAuth>
            </Suspense>
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
            path="competitor-report"
            element={
              <Suspense fallback={<CenteredLoader />}>
                <RequireAuth>
                  <ProtectedRoute allowedRoles={["admin", "planner"]}>
                    <CompetitorReport />
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
