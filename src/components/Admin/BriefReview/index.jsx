import React from "react";
import { Menu, Dropdown, Table, Input, Select, Row, Col, Tabs } from "antd";
import Sidebar from "../Sidebar";
import "./table.css";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const { TabPane } = Tabs;

// Define your data with 20 items
// Define your data with 20 items
const data = new Array(20).fill(null).map((_, index) => ({
  key: index,
  srf: index + 1,
  briefName: "Lorem Ipsum Condor",
  date: "01/25/2014-01/24",
  duration: "1 Year",
  region: "Punjab",
  city: "Lahore",
  mediaType: "Billboard",
  medium: "4",
  action: <img src="/images/document-upload.png" />,
}));

// Define the columns for your table
const columns = [
  {
    title: "SR#",
    dataIndex: "srf",
    key: "srf",
  },
  {
    title: "Brief Name",
    dataIndex: "briefName",
    key: "briefName",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Media Type",
    dataIndex: "mediaType",
    key: "mediaType",
  },
  {
    title: "Medium",
    dataIndex: "medium",
    key: "medium",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text) => <a>{text}</a>,
  },
];

const BriefReview = () => {
  const paginationConfig = {
    pageSize: 10, // Number of items per page
    showSizeChanger: false, // Hide the size changer
    showQuickJumper: false, // Hide the quick jumper
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Copy</Menu.Item>
      <Menu.Item key="2">CSV</Menu.Item>
      <Menu.Item key="3">Excel</Menu.Item>
      <Menu.Item key="4">PDF</Menu.Item>
      <Menu.Item key="5">Print</Menu.Item>
    </Menu>
  );

  const ExportDropdown = () => (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Export <DownOutlined />
      </a>
    </Dropdown>
  );

  const NewBriefCmp = () => {
    return (
      <>
        <Row style={{ marginBottom: "10px" }} justify="space-between">
          <Col>
            <Search placeholder="Lorem" enterButton style={{ width: 200 }} />
          </Col>
          <Row>
            <Col>
              <Select
                defaultValue="region"
                style={{ width: 120, marginRight: "12px" }}
              >
                <Option value="region">Region</Option>
                {/* other options */}
              </Select>
            </Col>
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
          className="custom-dashboard-table" // Assign the unique class here
          columns={columns}
          dataSource={data}
          pagination={paginationConfig}
        />
      </>
    );
  };

  return (
    <>
      <Sidebar>
        <h1>Breif Review</h1>
        <div style={{ marginBottom: "30px" }} className="brief-review-tabs">
          <Tabs defaultActiveKey="1" className="custom-tabs">
            <TabPane tab="New Brief" key="1">
              <NewBriefCmp />
            </TabPane>

            <TabPane tab="Approved" key="3">
              Content of Approved
            </TabPane>
          </Tabs>
        </div>
      </Sidebar>
    </>
  );
};

export default BriefReview;
