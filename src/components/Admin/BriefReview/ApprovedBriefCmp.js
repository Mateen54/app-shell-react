import React from "react";
import { useSelector } from "react-redux";
import { Table, Row, Col, Select, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getColumnsApproved } from "./TableUtils";

import { setRecord } from "../../../features/recordBriefSlice";

const { Option } = Select;

const ApprovedBriefCmp = ({ navigate, dispatch }) => {
  const { items } = useSelector((res) => res.approvedBrief);

  const viewDetails = (record) => {
    dispatch(setRecord(record));
    navigate(
      record.submission_method === "form"
        ? "/brief-review-form"
        : "/brief-review-file"
    );
  };

  const attachPlan = (record) => {
    alert(`Attach plan for ${record.brief_name}`);
  };

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => viewDetails(record)}>
        View Detail
      </Menu.Item>
      <Menu.Item key="2" onClick={() => attachPlan(record)}>
        Attach Plan
      </Menu.Item>
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
            <Select defaultValue="export" style={{ width: 120 }}>
              <Option value="copy">Copy</Option>
              <Option value="csv">CSV</Option>
              <Option value="excel">Excel</Option>
              <Option value="pdf">PDF</Option>
              <Option value="print">Print</Option>
            </Select>
          </Col>
        </Row>
      </Row>
      <Table
        columns={[...getColumnsApproved(), actionColumn]}
        dataSource={items.briefs}
      />
    </>
  );
};

export default ApprovedBriefCmp;
