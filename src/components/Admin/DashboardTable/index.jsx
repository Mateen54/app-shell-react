import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./dashTable.css";

const DashboardTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generatedData = [
      {
        key: 1,
        sr: 1,
        campaignName: "Alpha Campaign",
        date: "04/12/2022",
        duration: "3 Months",
        region: "North",
        city: "Chicago",
        mediaType: "Online",
        medium: "Social Media",
      },
      {
        key: 2,
        sr: 2,
        campaignName: "Beta Launch",
        date: "05/15/2022",
        duration: "6 Months",
        region: "South",
        city: "Houston",
        mediaType: "TV",
        medium: "Broadcast",
      },
      {
        key: 3,
        sr: 3,
        campaignName: "Gamma Sale",
        date: "06/20/2022",
        duration: "1 Month",
        region: "East",
        city: "New York",
        mediaType: "Print",
        medium: "Newspaper",
      },
      {
        key: 4,
        sr: 4,
        campaignName: "Delta Expansion",
        date: "07/22/2022",
        duration: "2 Years",
        region: "West",
        city: "San Francisco",
        mediaType: "Billboard",
        medium: "Outdoor",
      },
      {
        key: 5,
        sr: 5,
        campaignName: "Epsilon Product",
        date: "08/30/2022",
        duration: "4 Months",
        region: "Central",
        city: "Denver",
        mediaType: "Online",
        medium: "Email",
      },
      {
        key: 6,
        sr: 6,
        campaignName: "Zeta Service",
        date: "10/11/2022",
        duration: "3 Weeks",
        region: "North",
        city: "Seattle",
        mediaType: "TV",
        medium: "Cable",
      },
      {
        key: 7,
        sr: 7,
        campaignName: "Eta Event",
        date: "11/05/2022",
        duration: "5 Days",
        region: "South",
        city: "Miami",
        mediaType: "Print",
        medium: "Magazine",
      },
      {
        key: 8,
        sr: 8,
        campaignName: "Theta Project",
        date: "12/16/2022",
        duration: "1 Year",
        region: "East",
        city: "Boston",
        mediaType: "Online",
        medium: "Video",
      },
      {
        key: 9,
        sr: 9,
        campaignName: "Iota Initiative",
        date: "01/20/2023",
        duration: "2 Months",
        region: "West",
        city: "Los Angeles",
        mediaType: "Billboard",
        medium: "Digital",
      },
      {
        key: 10,
        sr: 10,
        campaignName: "Kappa Drive",
        date: "02/28/2023",
        duration: "10 Days",
        region: "Central",
        city: "St. Louis",
        mediaType: "Print",
        medium: "Flyers",
      },
    ];
    setData(generatedData);
  }, []);

  // Dummy function for search handling, to be implemented
  const handleSearch = (value, dataIndex) => {
    // Implement search functionality here
    console.log(`Searching for ${value} in ${dataIndex}`);
  };

  const SearchInput = ({ dataIndex }) => (
    <Input
      prefix={<SearchOutlined />}
      style={{ width: "70px", height: "30px" }}
    />
  );

  // Define a function to render action buttons
  const renderActionButtons = () => (
    <>
      <div style={{ display: "flex" }}>
        <Button
          style={{
            marginRight: "8px",
            color: "#ffa940",
            borderColor: "#ffa940",
          }}
        >
          Site
        </Button>
        <Button style={{ color: "#ffa940", borderColor: "#ffa940" }}>
          Tracking
        </Button>
      </div>
    </>
  );

  const headerStyle = {
    textAlign: "center", // Align text in the center
  };

  // Columns definition with search inputs on the first row
  const columns = [
    {
      title: <div style={headerStyle}>SR#</div>,
      dataIndex: "sr",
      key: "sr",
      render: (text, record, index) =>
        index === 0 ? (
          <Input style={{ width: "33px", height: "30px" }} />
        ) : (
          text
        ),
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="Campaign Name" /> : text,
    },
    {
      title: <div style={headerStyle}>Date</div>,
      dataIndex: "date",
      key: "date",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="Date" /> : text,
    },
    {
      title: <div style={headerStyle}>Duration</div>,
      dataIndex: "duration",
      key: "duration",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="Duration" /> : text,
    },
    {
      title: <div style={headerStyle}>Region</div>,
      dataIndex: "region",
      key: "region",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="Region" /> : text,
    },
    {
      title: <div style={headerStyle}>City</div>,
      dataIndex: "city",
      key: "city",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="City" /> : text,
    },
    {
      title: <div style={headerStyle}>Media Type</div>,
      dataIndex: "mediaType",
      key: "mediaType",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="Media Type" /> : text,
    },
    {
      title: <div style={headerStyle}>Medium</div>,
      dataIndex: "medium",
      key: "medium",
      render: (text, record, index) =>
        index === 0 ? <SearchInput dataIndex="Medium" /> : text,
    },
    {
      title: <div style={headerStyle}>Actions</div>,
      key: "action",
      render: (text, record, index) =>
        index === 0 ? null : renderActionButtons(),
    },
  ];

  // Insert a dummy row for the search inputs at the beginning of the data array
  const modifiedData = [
    {
      key: "search",
      sr: "",
      campaignName: "",
      date: "",
      duration: "",
      region: "",
      city: "",
      mediaType: "",
      medium: "",
    },
    ...data,
  ];

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={modifiedData}
      pagination={true}
    />
  );
};

export default DashboardTable;
