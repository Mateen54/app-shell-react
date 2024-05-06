import React from "react";
import { Paper, Typography, Grid, Box } from "@mui/material";

import Sidebar from "../Sidebar";

import DashboardTable from "../DashboardTable";

import "./Dashboard.css";

const Dashboard = () => {
  const cards = [
    { title: "Ongoing Campaign", count: 250 },
    { title: "Previous Campaign", count: 250 },
    { title: "Total Briefs", count: 250 },
    { title: "Reviewed Brief", count: 250 },
    { title: "Lost Plan", count: 250 },
  ];

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        sx={{ color: "#294799", fontWeight: "500", mb: 4, mt: 5 }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} md={2.4}>
            <Box
              sx={{
                border: "1px solid #94A2F2",
                borderRadius: "15px",
                py: 1,
                pl: 1,
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "17px", mb: 1 }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#294799", fontWeight: "500" }}
              >
                {card.count}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3 }}>
        <DashboardTable />
      </Box>
    </>
  );
};

export default Dashboard;
