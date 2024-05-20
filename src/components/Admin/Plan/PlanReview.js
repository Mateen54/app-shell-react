import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Row,
  Col,
  Select,
  Button,
  Dropdown,
  Menu,
  Spin,
  Modal,
  Upload,
  message,
  Card,
  Typography,
} from "antd";
import {
  DownOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import "./lostPlain.css";

const { Option } = Select;
const { Text } = Typography;

const PlanReview = () => {
  const res = useSelector((res) => res.selectedPlan);
  console.log(res);

  const createdAt = new Date("2024-03-22T19:27:00"); // Example date
  const formattedDate = createdAt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <h1
        style={{
          margin: "0px",
          padding: "0px",
          color: "#294799",
          fontSize: "20px",
          marginTop: "30px",
          fontFamily: "gothamBook",
          paddingLeft: "15px",
          marginTop: "45px",
        }}
      >
        Plan Review
      </h1>
      <hr
        style={{
          padding: "0px",
          margin: "0px",
          border: "none",
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          marginTop: "10px",
          boxShadow: "none",
        }}
      />

      <h1
        style={{
          margin: "0px",
          padding: "0px",
          color: "#294799",
          fontSize: "20px",
          marginTop: "30px",
          fontFamily: "gothamBook",
          paddingLeft: "15px",
          marginTop: "45px",
        }}
      >
        {res.currentRecordPlan.brief_name}
      </h1>

      <Card
        className="lost-plain"
        style={{
          width: 300,
          borderRadius: 8,
          border: "2px solid #A3A3A3",
          padding: "0px",
          margin: "0px",
          marginTop: "20px",
          margin: "20px",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong style={{ fontSize: 16, color: "#294799" }}>
              Plan 01
            </Text>
          </Col>
          <Col>
            <img src="/images/document-download111.png" alt="Document Upload" />
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{
            backgroundColor: "#E0E7FF",
            borderRadius: 8,
            padding: "20px",
            border: "2px solid #294799",
          }}
        >
          <a href={res.currentRecordPlan.plan.plan_file} download>
            <Col>
              <img
                src="/images/document-upload.png"
                alt="Document Upload"
                style={{ width: 60, height: 60 }}
              />
            </Col>
          </a>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong style={{ color: "#000" }}>
              Created At
            </Text>
          </Col>
          <Col>
            <Text>{formattedDate}</Text>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PlanReview;
