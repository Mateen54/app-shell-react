import React from "react";
import { useSelector } from "react-redux";
import { Table, Row, Col, Select, Spin } from "antd";
import { getColumns, paginationConfig } from "./tableUtils";

const { Option } = Select;

const LostPlan = ({ navigate, dispatch }) => {
  const { items, loading } = useSelector((res) => res.lostPlan);
  const allBrief = useSelector((res) => res.lostPlan);

  return (
    <>
      <Row style={{ marginBottom: "10px" }} justify="space-between">
        <Col></Col>
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
          dataSource={items.plans}
          pagination={{
            ...paginationConfig,
            position: ["bottomLeft", "bottomRight"],
          }}
        />
      )}
    </>
  );
};

export default LostPlan;
