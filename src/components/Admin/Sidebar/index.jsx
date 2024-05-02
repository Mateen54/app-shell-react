import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";
import "./sidebar.css";

const drawerWidth = 245;

const Sidebar = ({ children }) => {
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
            padding: "10px",
          }}
        >
          <img
            src="/images/app-logo.png"
            alt="Company Logo"
            style={{ width: "133px", height: "80px", marginTop: "20px" }}
          />
        </div>

        <List sx={{ mt: 1, ml: 3 }}>
          {[
            "Dashboard",
            "Brief Review",
            "Ongoing Campaign",
            "Previous Campaign",
            "Competitor Report",
            "Lost Plan",
            "Client Management",
            "User Management",
          ].map((text, index) => (
            <ListItem
              // sx={{ mb: 1 }}
              key={text}
              component={Link}
              to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <ListItemText primary={text} />
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
