import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./tes.css";

const TestingB = () => {
  // Initial data moved to state
  const [tableData, setTableData] = useState([
    {
      key: "1",
      siteCode: "000001",
      region: "Northern",
      city: "Lahore",
      secClass: "A,B,C",
      lsm: "A,B,C",
      areaClass: "High",
      siteRanking: "Top",
      siteVendor: "Vendor X",
      medium: "Billboard",
      assetType: "Digital",
      google: "google",
    },
    {
      key: "2",
      siteCode: "000001",
      region: "Northern",
      city: "Faisalabad",
      secClass: "A,B,C",
      lsm: "A,B,C",
      areaClass: "High",
      siteRanking: "Top",
      siteVendor: "Vendor X",
      medium: "Billboard",
      assetType: "Digital",
      google: "google",
    },
    {
      key: "3",
      siteCode: "000001",
      region: "Northern",
      city: "Islamabad",
      secClass: "A,B,C",
      lsm: "A,B,C",
      areaClass: "High",
      siteRanking: "Top",
      siteVendor: "Vendor X",
      medium: "Billboard",
      assetType: "Digital",
      google: "google",
    },
    {
      key: "4",
      siteCode: "000001",
      region: "Northern",
      city: "Rawalpindi",
      secClass: "A,B,C",
      lsm: "A,B,C",
      areaClass: "High",
      siteRanking: "Top",
      siteVendor: "Vendor X",
      medium: "Billboard",
      assetType: "Digital",
      google: "google",
    },
    // Add more rows as needed
  ]);

  const confirmDelete = (record) => {
    message.success("Record deleted successfully");
    // Here you can handle the deletion logic
  };

  const handleCheckClick = (record) => {
    // Move the clicked row to the top of the table
    const newData = tableData.filter((item) => item.key !== record.key); // Remove the item
    newData.unshift(record); // Add it to the beginning
    setTableData(newData); // Set the new data array
  };

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span style={{ display: "flex", gap: "10px" }}>
          <img
            src="/images/checked.png"
            style={{ width: "10px", height: "10px" }}
            alt="Edit"
            onClick={() => handleCheckClick(record)}
          />
          <img
            src="/images/cross.png"
            style={{ width: "10px", height: "10px" }}
            alt="Delete"
          />
        </span>
      ),
    },
    {
      title: "Site Code",
      dataIndex: "siteCode",
      key: "siteCode",
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
      title: "SEC Class",
      dataIndex: "secClass",
      key: "secClass",
    },
    {
      title: "LSM",
      dataIndex: "lsm",
      key: "lsm",
    },
    {
      title: "Area Class",
      dataIndex: "areaClass",
      key: "areaClass",
      render: (_, record) => <Input />,
    },
    {
      title: "Site Ranking",
      dataIndex: "siteRanking",
      key: "siteRanking",
      render: (_, record) => <Input />,
    },
    {
      title: "Site Vendor",
      dataIndex: "siteVendor",
      key: "siteVendor",
      render: (_, record) => <Input />,
    },
    {
      title: "Medium",
      dataIndex: "medium",
      key: "medium",
      render: (_, record) => <Input />,
    },
    {
      title: "Asset Type",
      dataIndex: "assetType",
      key: "assetType",
      render: (_, record) => <Input />,
    },
    {
      title: "Google",
      key: "google",
      render: (_, record) => <Input />,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        rowClassName="table-row"
        className="custom-table"
      />
    </>
  );
};

export default TestingB;
