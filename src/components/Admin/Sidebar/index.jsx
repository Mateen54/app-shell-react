import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const drawerWidth = 245;

const routeCategoryMapping = {
  "/dashboard": "Dashboard",
  "/brief-review": "Brief Review",
  "/ongoing-campaign": "Ongoing Campaign",
  "/previous-campaign": "Previous Campaign",
  "/competitor-report": "Competitor Report",
  "/lost-plan": "Lost Plan",
  "/client-management": "Client Management",
  "/user-management": "User Management",
};

const Sidebar = ({ children }) => {
  const location = useLocation();
  console.log("Current Pathname:", location.pathname);
  const getCategoryForRoute = (pathname) => {
    const route = Object.keys(routeCategoryMapping).find((key) =>
      pathname.startsWith(key)
    );
    console.log("routeCategoryMapping[route]", pathname);
    return routeCategoryMapping[route];
  };

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
            style={{ width: "133px", height: "80px", marginTop: "20px" }}
          />
        </div>

        <List sx={{ mt: 1, mx: 1, p: 0 }}>
          {[
            "/dashboard",
            "/brief-review",
            "/ongoing-campaign",
            "/previous-campaign",
            "/competitor-report",
            "/lost-plan",
            "/client-management",
            "/user-management",
          ].map((route) => (
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
          <ListItem key="Logout">
            <img
              src="/images/logout.png"
              alt="Company Logo"
              style={{ width: "24px", height: "24px", marginRight: "8px" }}
            />
            <ListItemText primary="Logout" />
          </ListItem>
          <Box sx={{ display: "flex" }}>
            <img
              src="/images/notification.png"
              alt="Company Logo"
              style={{ width: "24px", height: "24px" }}
            />
            <img
              src="/images/setting.png"
              alt="Company Logo"
              style={{ width: "24px", height: "24px" }}
            />
          </Box>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
