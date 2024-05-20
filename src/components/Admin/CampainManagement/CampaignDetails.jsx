import React from "react";
import { Table, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const columns = [
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
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
];

const CampaignDetails = () => {
  const navigate = useNavigate();
  const selectedCampaign = useSelector(
    (state) => state.selectedCampaign.selectedCampaign
  );

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  console.log("selectedCampaign", selectedCampaign);

  return (
    <>
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
            Campaign Management
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
                {selectedCampaign.brief.brief_name}
              </h2>
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: "10px" }}>
          <Col span={6}>
            <div style={{ fontFamily: "gothamBook" }}>
              Uploaded at:{" "}
              <strong>{formatDate(selectedCampaign.createdAt)}</strong>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ fontFamily: "gothamBook" }}>
              Uploaded by: <strong>{selectedCampaign.client?.fullName}</strong>
            </div>
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
            marginBottom: "30px",
          }}
        />

        <div className="site-layout-background">
          <Title level={4}>Duration</Title>
          <Paragraph>
            {formatDate(selectedCampaign.brief.start_date)} -
            {formatDate(selectedCampaign.brief.end_date)}{" "}
          </Paragraph>

          <Title level={4}>Objectives</Title>
          {selectedCampaign.brief.campaignobjectives.map((objective, index) => (
            <Paragraph key={index}>{objective.objective_value}</Paragraph>
          ))}

          <Title level={4}>Regions</Title>
          {selectedCampaign.brief.regions.map((region, index) => (
            <Paragraph key={index}>{region.region_name}</Paragraph>
          ))}

          <Title level={4}>Cities</Title>
          <Paragraph>
            {selectedCampaign.brief.cities
              .map((city) => city.city_name)
              .join(", ")}
          </Paragraph>

          <Title level={4}>Campaign Budget</Title>
          <Paragraph>Creative: {selectedCampaign.brief.creative}</Paragraph>
          <Paragraph>
            Conventional: {selectedCampaign.brief.conventional}
          </Paragraph>

          <Title level={4}>Creative Work</Title>
          <Paragraph>
            {selectedCampaign.brief.cw_required === "Y"
              ? "Required"
              : "Not Required"}
          </Paragraph>
          {selectedCampaign.brief.cw_link && (
            <Paragraph>
              Link:{" "}
              <a
                href={selectedCampaign.brief.cw_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedCampaign.brief.cw_link}
              </a>
            </Paragraph>
          )}

          <Title level={4}>Additional Requirements</Title>
          <Paragraph>
            {selectedCampaign.brief.additional_requirements}
          </Paragraph>
        </div>
      </div>
    </>
  );
};

export default CampaignDetails;
