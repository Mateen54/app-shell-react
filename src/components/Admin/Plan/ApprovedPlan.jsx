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
} from "antd";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
import { getColumnsApproved, paginationConfig } from "./tableUtils";

import { setRecordPlan } from "../../../features/Plan/recordPlainSlice";
import { fetchPO } from "../../../features/Plan/fetchPOSlice";
const { Option } = Select;

const ApprovedPlan = ({ navigate, dispatch }) => {
  const { items, loading } = useSelector((res) => res.approvedPlan);
  const poState = useSelector((state) => state.fetchPO);

  useEffect(() => {
    if (poState.loading === false && poState.items.length > 0) {
      navigate("/po-review");
    }
  }, [poState.loading, poState.items, navigate]);

  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    const updateTableHeight = () => {
      const availableHeight = window.innerHeight - 200; // Adjust based on your layout
      setTableHeight(availableHeight);
    };

    // Initial calculation
    updateTableHeight();

    // Update height on window resize
    window.addEventListener("resize", updateTableHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateTableHeight);
    };
  }, []);

  const viewDetails = (record) => {
    dispatch(setRecordPlan(record));

    console.log("record", record);

    navigate("/plan-review");
  };

  const viewDetailsPO = (record) => {
    console.log("record", record);
    dispatch(fetchPO(record.brief_id));

    navigate("/plan-po-review");
  };

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => viewDetails(record)}>
        View Plan
      </Menu.Item>
      <Menu.Item key="2" onClick={() => viewDetailsPO(record)}>
        View PO
      </Menu.Item>
      {/* <Menu.Item key="3">Delete</Menu.Item> */}
    </Menu>
  );

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Dropdown overlay={actionsMenu(record)}>
        <Button>
          Action <DownOutlined />
        </Button>
      </Dropdown>
    ),
  };

  return (
    <>
      <Row style={{ marginBottom: "10px" }} justify="space-between">
        <Col></Col>
        <Row>
          <Col>
            <Select defaultValue="Export" style={{ width: 120 }}>
              <Option value="csv">CSV</Option>
              <Option value="excel">Excel</Option>
              <Option value="pdf">PDF</Option>
            </Select>
          </Col>
        </Row>
      </Row>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={[...getColumnsApproved(), actionColumn]}
          dataSource={items.plans}
          pagination={{
            ...paginationConfig,
            position: ["bottomLeft", "bottomRight"],
          }}
          scroll={{ y: tableHeight - 200 }} // Adjust based on your layout
          className="custom-pagination"
        />
      )}
    </>
  );
};

export default ApprovedPlan;
