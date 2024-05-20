import React, { useState, useEffect } from "react";
import { Table, Row, Col, Select, Button, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { fetchOngoingCampaign } from "../../../features/Campaign/fetchCampaignSlice";
import { useSelector } from "react-redux";
import "./CampaignTable.css";
import { getColumns, getNestedValue, paginationConfig } from "./tableUtils"; // Adjust the import path accordingly

import { setSelectedCampaign } from "../../../features/Campaign/selectedCampaignSlice";

const { Option } = Select;

const OngoingCampaign = ({ navigate, dispatch, response }) => {
  const { items, error, loading } = response.fetchCampaign;

  useEffect(() => {
    dispatch(fetchOngoingCampaign());
  }, [dispatch]);

  const [tableData, setTableData] = useState([]);
  const [tableHeight, setTableHeight] = useState(0);
  const [searchText, setSearchText] = useState({
    campaign_name: "",
    createdAt: "",
    client_fullName: "",
    regions: "",
    city: "",
    sites: "",
  });

  useEffect(() => {
    console.log("Items:", items); // Add this line
    if (Array.isArray(items?.campaigns)) {
      const flattenedData = items.campaigns.map((campaign) => ({
        campaign_id: campaign.campaign_id,
        brief_id: campaign.brief.brief_id,
        campaign_name: campaign.campaign_name,
        campaign_status: campaign.campaign_status,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
        deletedAt: campaign.deletedAt,
        brief_name: campaign.brief.brief_name,
        start_date: campaign.brief.start_date,
        end_date: campaign.brief.end_date,
        creative: campaign.brief.creative,
        conventional: campaign.brief.conventional,
        cw_required: campaign.brief.cw_required,
        cw_link: campaign.brief.cw_link,
        additional_requirements: campaign.brief.additional_requirements,
        isAccepted: campaign.brief.isAccepted,
        rejected_reason: campaign.brief.rejected_reason,
        status: campaign.brief.status,
        submission_method: campaign.brief.submission_method,
        file_path: campaign.brief.file_path,
        is_Plan_attached: campaign.brief.is_Plan_attached,
        is_PO_attached: campaign.brief.is_PO_attached,
        isDeleted: campaign.brief.isDeleted,
        brief_createdAt: campaign.brief.createdAt,
        brief_updatedAt: campaign.brief.updatedAt,
        regions: campaign.brief.regions,
        cities: campaign.brief.cities,
        campaignobjectives: campaign.brief.campaignobjectives,
        client_fullName: campaign.brief.client.fullName,
        clientId: campaign.brief.client.clientId,
        originalObject: campaign, // Include the original object here
      }));

      const filteredData = flattenedData.filter((campaign) => {
        return Object.keys(searchText).every((key) => {
          const value = searchText[key];
          if (!value) return true;
          const column = getColumns().find((column) => column.key === key);
          const dataIndex = column.dataIndex;
          const cellValue = Array.isArray(dataIndex)
            ? getNestedValue(campaign, dataIndex)
            : campaign[dataIndex];
          return (
            cellValue &&
            cellValue.toString().toLowerCase().includes(value.toLowerCase())
          );
        });
      });

      console.log("Filtered Data:", filteredData); // Add this line

      setTableData([searchRow, ...filteredData]);
    }
  }, [items, searchText]);

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

  const handleSearch = (value, dataIndex) => {
    setSearchText({ ...searchText, [dataIndex]: value });
  };

  const handleViewDetails = (record) => {
    dispatch(setSelectedCampaign(record.originalObject));
    console.log(record.originalObject);
    navigate("/campaign-details");
  };

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (text, record) =>
      record.key !== "search-row" ? (
        <Button
          style={{ color: "#294799", border: "none", padding: 0 }}
          type="link"
          onClick={() => handleViewDetails(record)}
        >
          View details
        </Button>
      ) : null,
  };

  const searchRow = {
    key: "search-row",
    campaign_name: (
      <Input
        value={searchText.campaign_name}
        onChange={(e) => handleSearch(e.target.value, "campaign_name")}
        suffix={<SearchOutlined style={{ color: "#C8C4C4" }} />}
      />
    ),
    createdAt: (
      <Input
        value={searchText.createdAt}
        onChange={(e) => handleSearch(e.target.value, "createdAt")}
        suffix={<SearchOutlined style={{ color: "#C8C4C4" }} />}
      />
    ),
    client_fullName: (
      <Input
        value={searchText.client_fullName}
        onChange={(e) => handleSearch(e.target.value, "client_fullName")}
        suffix={<SearchOutlined style={{ color: "#C8C4C4" }} />}
      />
    ),
    regions: (
      <Input
        value={searchText.regions}
        onChange={(e) => handleSearch(e.target.value, "region")}
        suffix={<SearchOutlined style={{ color: "#C8C4C4" }} />}
      />
    ),
    city: (
      <Input
        value={searchText.city}
        onChange={(e) => handleSearch(e.target.value, "city")}
        suffix={<SearchOutlined style={{ color: "#C8C4C4" }} />}
      />
    ),
    sites: (
      <Input
        value={searchText.sites}
        onChange={(e) => handleSearch(e.target.value, "sites")}
        suffix={<SearchOutlined style={{ color: "#C8C4C4" }} />}
      />
    ),
    action: null,
  };

  console.log("Search Row:", searchRow); // Add this line

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

      {loading ? (
        <Spin />
      ) : (
        <Table
          className="custom-pagination-ongoing"
          columns={[...getColumns(), actionColumn]}
          dataSource={tableData}
          pagination={{
            ...paginationConfig,
            position: ["bottomLeft", "bottomRight"],
          }}
          scroll={{ y: tableHeight - 200 }} // Adjust based on your layout
        />
      )}
    </>
  );
};

export default OngoingCampaign;
