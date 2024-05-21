import React, { useState, useEffect } from "react";
import { Row, Col, Input, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./CampaignTable.css";

import CampaignTabs from "./campaignTabs";

const { Search } = Input;
const { TabPane } = Tabs;

const CampaignManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((res) => res);

  const [activeKey, setActiveKey] = useState("1");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const lengthOngoing = response?.fetchCampaign?.items?.length;

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
        Campaign
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
          activeKey={activeKey}
          onChange={handleTabChange}
          style={{ fontFamily: "gothamBook" }}
          className="custom-tabs"
        >
          <TabPane
            tab={
              <span>
                Ongoing Campaign
                {activeKey === "1" && (
                  <span className="tab-count">{lengthOngoing}</span>
                )}
              </span>
            }
            key="1"
          >
            <CampaignTabs
              tab="ongoing"
              navigate={navigate}
              dispatch={dispatch}
              response={response}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                Completed Campaign
                {/* {activeKey === "2" && <span className="tab-count">0</span>} */}
              </span>
            }
            key="2"
          >
            <CampaignTabs
              tab="completed"
              navigate={navigate}
              dispatch={dispatch}
              response={response}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default CampaignManagement;
