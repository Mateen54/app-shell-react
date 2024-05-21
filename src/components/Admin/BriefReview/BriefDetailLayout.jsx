import React, { useState } from "react";
import { Row, Col, Button, Modal, Typography, Input, Spin } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const BriefDetailLayout = ({
  brief,
  showModal,
  approveBrief,
  handleDownloadClick,
  isModalVisible,
  handleOk,
  handleCancel,
  reason,
  handleChange,
  handleAddReason,
  children,
  MyDocument, // Add MyDocument to props
}) => {
  const [loading, setLoading] = useState(false);

  const rejectRes = useSelector((res) => res.rejectBrief);

  const handleApprove = async () => {
    setLoading(true);
    setTimeout(() => {
      approveBrief();
    }, 0);
  };

  const handleReject = async () => {
    showModal();
  };

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
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Button
              style={{
                background: "#294799",
                color: "white",
                border: "none",
                borderRadius: "10px",
              }}
              onClick={handleAddReason}
              loading={rejectRes.loading}
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
              fontFamily: "gothamBook",
              paddingLeft: "20px",
              marginTop: "45px",
            }}
          >
            Brief Review
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
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                {brief.brief_name}
              </h2>
              {MyDocument && (
                <PDFDownloadLink
                  document={<MyDocument res={brief} />}
                  fileName="campaign-details.pdf"
                >
                  {({ loading }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>
              )}
            </div>
          </Col>

          {brief.status !== "approved" && (
            <Col>
              <Button
                onClick={handleReject}
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
                onClick={handleApprove}
                style={{
                  background: "#294799",
                  color: "white",
                  width: "150px",
                  height: "40px",
                  fontFamily: "gothamBook",
                }}
                loading={loading}
              >
                Approve
              </Button>
            </Col>
          )}
        </Row>

        {children}
      </div>
    </>
  );
};

export default BriefDetailLayout;
