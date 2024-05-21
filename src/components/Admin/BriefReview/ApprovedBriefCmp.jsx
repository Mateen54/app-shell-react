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
import { setRecord } from "../../../features/recordBriefSlice";
import "./customPagination.css";
import axios from "axios";
import { fetchPendingBrief } from "../../../features/fetchPendingBrief/fetchPendingBriefSlice";

const { Option } = Select;

const ApprovedBriefCmp = ({ navigate, dispatch }) => {
  const { items, loading } = useSelector((res) => res.pendingBreif);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [file, setFile] = useState(null);
  const [plainLoading, setPlainLoading] = useState(false);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    dispatch(fetchPendingBrief());
  }, []);

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
    dispatch(setRecord(record));
    navigate(
      record.submission_method === "form"
        ? "/brief-review-form"
        : "/brief-review-file"
    );
  };

  const attachPlan = (record) => {
    setIsModalVisible(true);
    setSelectedRecord(record);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info) => {
    setFile(info.file);
  };

  const handleAttachPlan = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("authToken");

    try {
      setPlainLoading(true);
      const response = await axios.post(
        `https://appsellapi.thecbt.live/api/upload-plan/admin-appsells/${selectedRecord.brief_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("File uploaded successfully", response.data);
      setPlainLoading(false);
      handleOk();
      setFile(null);
      setTimeout(() => {
        message.success("Plan Attached successfully!");
      }, 500);
    } catch (error) {
      setPlainLoading(false);
      console.log("error", error.response);

      message.error(
        "you can only attach plan to an approved brief or plan is already attach"
      );
      setFile(null);
      setIsModalVisible(false);

      console.error("Error uploading file", error);
    }
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
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h2
          style={{
            fontSize: "20px",
            fontFamily: "gothamMedium",
            color: "#294799",
            textAlign: "center",
            padding: "0",
            margin: "0",
          }}
        >
          Add Plan
        </h2>

        <p>
          {selectedRecord && (
            <>
              Attach plan for Brief Name:
              <span style={{ color: "#294799", marginLeft: "13px" }}>
                "{selectedRecord.brief_name}"
              </span>
            </>
          )}
        </p>
        <Upload
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleFileChange}
          accept=".pdf, .xlsx"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select File (PDF or XLSX)</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleAttachPlan}
          style={{
            background: "#294799",
            color: "white",
            border: "none",
            borderRadius: "10px",
            marginTop: "30px",
          }}
          loading={plainLoading}
        >
          Attach Plan
        </Button>
      </Modal>

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
          dataSource={items.briefs}
          pagination={{
            ...paginationConfig,
            position: ["bottomLeft", "bottomRight"],
          }}
          // scroll={{ y: tableHeight - 200 }} // Adjust based on your layout
          className="custom-pagination"
        />
      )}
    </>
  );
};

export default ApprovedBriefCmp;
