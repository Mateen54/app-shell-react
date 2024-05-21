import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Row, Col, Select, Spin } from "antd";
import { getColumns, paginationConfig } from "./tableUtils";
import { fetchAllBrief } from "../../../features/fetchApprovedBreif/fetchApprovedBriefSlice";

const { Option } = Select;

const NewBriefCmp = ({ navigate, dispatch }) => {
  const { items, loading } = useSelector((res) => res.approvedBrief);
  const allBrief = useSelector((res) => res.approvedBrief);

  useEffect(() => {
    dispatch(fetchAllBrief());
  }, []);

  return (
    <>
      <Row style={{ marginBottom: "10px" }} justify="space-between">
        <Col></Col>
        <Col>
          <Select defaultValue="Export" style={{ width: 120 }}>
            <Option value="csv">CSV</Option>
            <Option value="excel">Excel</Option>
            <Option value="pdf">PDF</Option>
          </Select>
        </Col>
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
          className="custom-dashboard-table"
          columns={getColumns(dispatch, navigate)}
          dataSource={items.briefs}
          pagination={{
            ...paginationConfig,
            position: ["bottomLeft", "bottomRight"],
          }}
        />
      )}
    </>
  );
};

export default NewBriefCmp;
