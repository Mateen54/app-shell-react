import React, { useState, useEffect } from "react";
import { Button, Input, Select, Row, Col, Tabs, message, Modal } from "antd";
import Sidebar from "../../Sidebar";
import "../table.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  approvedBriefApi,
  resetStatus,
} from "../../../../features/acceptBrief/acceptBriefSlice";

import { rejectBriefApi } from "../../../../features/rejectBreif/rejectBriefSlice";

const { Option } = Select;
const { Search, TextArea } = Input;

const { TabPane } = Tabs;

const BreifDetailByFile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const res = useSelector((res) => res.selectedBrief);
  const resUpdate = useSelector((res) => res.acceptBrief);

  const rejectRes = useSelector((res) => res.rejectBrief);

  const fileName = res.currentRecord.file_path;
  const filePath = res.currentRecord.file_path;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");
  const [dispatched, setDispatched] = useState(false);
  const [dispatchedReject, setDispatchedReject] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle OK button in modal
  const handleOk = () => {
    console.log("Brief rejected");
    setIsModalVisible(false);
    // Additional logic for when a brief is rejected
  };

  // Function to handle Cancel button in modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleAddReason = () => {
    console.log("Reason for rejection:", reason);

    dispatch(rejectBriefApi({ brief_id: res.currentRecord.brief_id, reason }));

    setIsModalVisible(false);
    setReason("");
  };

  const handleDownloadClick = () => {
    if (!filePath) return;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName || "Download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const approveBrief = () => {
    console.log(res.currentRecord.brief_id);
    dispatch(approvedBriefApi(res.currentRecord.brief_id));
    setDispatched(true);
  };
  useEffect(() => {
    if (dispatched) {
      if (resUpdate.status === "succeeded") {
        message.success("Brief approved successfully!");
        dispatch(resetStatus());

        setTimeout(() => {
          navigate("/brief-review");
        }, 2000);
      } else if (resUpdate.status === "failed") {
        message.error("Failed to reject brief.");
      }
    }
  }, [resUpdate.status, dispatched, navigate, dispatch]);

  useEffect(() => {
    if (dispatchedReject) {
      if (rejectRes.status === "succeeded") {
        message.success("Brief rejected successfully!");
        setIsModalVisible(false);
        setReason("");
        setTimeout(() => {
          navigate("/brief-review");
        }, 2000);
      } else if (rejectRes.status === "failed") {
        message.error("Failed to reject brief.");
      }
    }
  }, [rejectRes.status, dispatchedReject, navigate, dispatch]);

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        footer={null}
      >
        <div style={{ padding: "20px" }}>
          <h2
            style={{
              fontSize: "31px",
              fontFamily: "gothamMedium",
              color: "#294799",
              textAlign: "center",
              padding: "0",
              margin: "0",
            }}
          >
            Reason
          </h2>
          <p style={{ textAlign: "center", fontFamily: "gothamBook" }}>
            Please add your reason why you are rejecting the brief
          </p>
          <TextArea
            style={{ height: "150px" }}
            value={reason}
            onChange={handleChange}
            placeholder="Enter your reason here..."
          />
          <div style={{ textAlign: "right", marginTop: "16px" }}>
            <Button
              key="back"
              onClick={handleCancel}
              style={{ marginRight: "8px" }}
            >
              Cancel
            </Button>
            <Button
              style={{ background: "#294799", color: "white" }}
              key="submit"
              onClick={handleAddReason}
            >
              Add Reason
            </Button>
          </div>
        </div>
      </Modal>

      <Row>
        <Col>
          <h1
            style={{
              margin: "0px",
              padding: "0px",
              color: "#294799",
              fontSize: "25px",
              marginTop: "30px",
              fontFamily: "gothamMedium",
              paddingLeft: "20px",
              marginTop: "80px",
            }}
          >
            Breif Review
          </h1>
        </Col>
      </Row>
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

      <div
        style={{
          fontFamily: "gothamBook",
          paddingLeft: "10px",
          paddingRight: "10px",
          padding: "20px",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <h2
              style={{
                color: "#294799",
                fontSize: "31px",
                margin: "0",
                padding: "0",
                fontFamily: "gothamBook",
                marginBottom: "10px",
              }}
            >
              {res.currentRecord.brief_name}
            </h2>
          </Col>
          {res.currentRecord.status !== "approved" && (
            <Col>
              <Button
                style={{
                  marginRight: "10px",
                  border: "1px solid #FF3B30",
                  color: "#FF3B30",
                  width: "150px",
                  height: "40px",
                  fontFamily: "gothamBook",
                }}
              >
                Reject Brief
              </Button>
              <Button
                onClick={approveBrief}
                style={{
                  background: "#294799",
                  color: "white",
                  width: "150px",
                  height: "40px",
                  fontFamily: "gothamBook",
                }}
              >
                Approve
              </Button>
            </Col>
          )}
        </Row>

        <Row style={{ marginBottom: "10px" }}>
          <Col span={6}>
            <div style={{ fontFamily: "gothamBook" }}>
              Uploaded at: <strong>01/11/23</strong>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ fontFamily: "gothamBook" }}>
              Uploaded by: <strong>Pepsi</strong>
            </div>
          </Col>
        </Row>

        <hr style={{ background: "#C8C4C4", marginTop: "20px" }} />

        <h1
          style={{
            fontWeight: "bold",
            display: "block",
            color: "#294799",
            fontSize: "20px",
          }}
        >
          Attached File
        </h1>

        <div style={{ maxWidth: "180px" }}>
          <Button
            style={{ display: "flex", alignItems: "center", gap: 10 }}
            onClick={handleDownloadClick}
          >
            {res.currentRecord.brief_name}
            <img
              src="/images/document-download.png"
              alt="Download"
              onClick={handleDownloadClick}
              style={{ cursor: "pointer" }}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default BreifDetailByFile;
