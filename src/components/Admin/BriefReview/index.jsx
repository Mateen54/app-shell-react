import React, { useEffect, useState } from "react";
import { Row, Col, Input, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingBrief } from "../../../features/fetchPendingBrief/fetchPendingBriefSlice";
import { fetchAllBrief } from "../../../features/fetchApprovedBreif/fetchApprovedBriefSlice";
import BriefTabs from "./BriefTabs";
import "./table.css";

const { Search } = Input;
const { TabPane } = Tabs;

const BriefReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");

  const res = useSelector((res) => res);

  const newBriefCount = res.pendingBreif.items?.briefs?.length || 0;
  const approvedBriefCount = res.approvedBrief.items?.briefs?.length || 0;

  console.log("sd", approvedBriefCount);

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
        Brief Management
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
      <Row
        style={{
          padding: "0",
          margin: "0",
          marginTop: "23px",
          marginBottom: "0px",
          fontFamily: "gothamMedium",
          paddingLeft: "15px",
          paddingRight: "10px",
        }}
        justify="space-between"
        alignItems="center"
      >
        <Col>
          <span
            style={{
              fontFamily: "gothamMedium",
              fontSize: "16px",
              color: "#294799",
              fontWeight: 500,
            }}
          >
            Result: ({activeTab === "1" ? approvedBriefCount : newBriefCount})
          </span>
        </Col>
        <Col>
          <Search
            placeholder="Search"
            onSearch={(value) => console.log(value)}
            className="custom-search"
          />
        </Col>
      </Row>
      <div
        style={{
          marginBottom: "30px",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
        className="brief-review-tabs"
      >
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => setActiveTab(key)}
          style={{ fontFamily: "gothamBook" }}
          className="custom-tabs"
        >
          <TabPane tab="New Brief" key="1">
            <BriefTabs tab="new" navigate={navigate} dispatch={dispatch} />
          </TabPane>
          <TabPane tab="Approved" key="2">
            <BriefTabs tab="approved" navigate={navigate} dispatch={dispatch} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default BriefReview;
