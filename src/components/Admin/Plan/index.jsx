import React, { useEffect } from "react";
import { Row, Col, Input, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchApprovedPlan } from "../../../features/Plan/approvedPlanSlice";
import { fetchLostPlan } from "../../../features/Plan/lostPlainSlice";

import PlanTabs from "./planTabs";

const { Search } = Input;
const { TabPane } = Tabs;

const Plan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApprovedPlan());
    dispatch(fetchLostPlan());
  }, [dispatch]);

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
        Plan
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
            Result
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
          style={{ fontFamily: "gothamBook" }}
          className="custom-tabs"
        >
          <TabPane tab="Lost Plan" key="1">
            <PlanTabs tab="lost" navigate={navigate} dispatch={dispatch} />
          </TabPane>
          <TabPane tab="Approved Plan" key="2">
            <PlanTabs tab="approved" navigate={navigate} dispatch={dispatch} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Plan;
