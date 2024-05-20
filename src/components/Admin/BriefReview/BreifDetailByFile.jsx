import React from "react";
import { Button, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BriefDetailLayout from "./BriefDetailLayout";
import useBriefActions from "./useBriefActions";

const BreifDetailByFile = () => {
  const navigate = useNavigate();
  const res = useSelector((res) => res.selectedBrief);

  const {
    isModalVisible,
    setIsModalVisible,
    reason,
    setReason,
    approveBrief,
    handleAddReason,
  } = useBriefActions(navigate);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleDownloadClick = () => {
    const filePath = res.currentRecord.file_path;
    if (!filePath) return;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = res.currentRecord.file_name || "Download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <BriefDetailLayout
      brief={res.currentRecord}
      showModal={showModal}
      approveBrief={() => approveBrief(res.currentRecord.brief_id)}
      isModalVisible={isModalVisible}
      handleOk={() => setIsModalVisible(false)}
      handleCancel={() => setIsModalVisible(false)}
      reason={reason}
      handleChange={handleChange}
      handleAddReason={() => handleAddReason(res.currentRecord.brief_id)}
      handleDownloadClick={handleDownloadClick}
    >
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
    </BriefDetailLayout>
  );
};

export default BreifDetailByFile;
