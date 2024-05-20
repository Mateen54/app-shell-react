import React from "react";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import "./sidebar.css";

const drawerWidth = 245;

const routeCategoryMapping = {
  "/dashboard": "Dashboard",
  "/brief-management": "Brief Management",
  "/campaign-management": "Campaign Management",
  "/plan": "Plan",
  "/client-management": "Client Management",
  "/user-management": "User Management",
  "/competitor-report": "Competitor Report",
};

const Sidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRoles"); // Fetch user role from localStorage

  const getCategoryForRoute = (pathname) => {
    const route = Object.keys(routeCategoryMapping).find((key) =>
      pathname.startsWith(key)
    );
    return routeCategoryMapping[route];
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Define routes accessible by each role
  const roleBasedRoutes = {
    admin: [
      "/dashboard",
      "/brief-management",
      "/campaign-management",
      "/plan",
      "/client-management",
      "/user-management",
      "/competitor-report",
    ],
    planner: ["/dashboard", "/brief-review", "/plan"],
    user: ["/dashboard", "/brief-review"],
    // Add more roles as needed
  };

  // Get the routes allowed for the current user role
  const accessibleRoutes = roleBasedRoutes[userRole] || [];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
          }}
        >
          <img
            src="/images/app-logo.png"
            alt="Company Logo"
            style={{ width: "100px", height: "57px", marginTop: "10px" }}
          />
        </div>

        <List sx={{ mt: 3, mx: 1, p: 0 }}>
          {accessibleRoutes.map((route) => (
            <ListItem
              sx={{
                backgroundColor: location.pathname.startsWith(route)
                  ? "black"
                  : "transparent",
              }}
              key={route}
              component={Link}
              to={route}
              selected={location.pathname.startsWith(route)}
            >
              <ListItemText primary={getCategoryForRoute(route)} />
            </ListItem>
          ))}
        </List>

        <List
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mr: 2,
            ml: 2,
          }}
        >
          <ListItem button onClick={handleLogout} key="Logout">
            <img
              src="/images/logout.png"
              alt="Logout Icon"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
                color: "red",
              }}
            />
            <ListItemText style={{ color: "#3E3E3E" }} primary="Logout" />
          </ListItem>

          <Box sx={{ display: "flex" }}>
            <img
              src="/images/setting.png"
              alt="Settings Icon"
              style={{ width: "20px", height: "20px" }}
            />
            <img
              src="/images/notification.png"
              alt="Notifications Icon"
              style={{ width: "20px", height: "20px" }}
            />
          </Box>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
