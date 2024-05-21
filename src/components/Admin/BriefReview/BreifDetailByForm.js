import React from "react";
import { Table, Typography, Row, Col } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BriefDetailLayout from "./BriefDetailLayout";
import useBriefActions from "./useBriefActions";
import PDFDocument from "./PDFDocument";

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

const BreifDetailByForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const processDemographicsData = (demographics) => {
    return demographics.map((demo, index) => ({
      key: `D${index + 1}`,
      age: demo.ages.map((age) => age.age_range).join(", "),
      gender: demo.genders.map((gender) => gender.gender_Type).join(", "),
      secClass: demo.secclasses.map((sec) => sec.sec_range).join(", "),
      lsm: demo.lifestylemanagements.map((lsm) => lsm.LSM_type).join(", "),
    }));
  };

  const demographicData = processDemographicsData(
    res.currentRecord.demographics
  );

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
    >
      <Row style={{ marginBottom: "10px" }}>
        <Col span={6}>
          <div style={{ fontFamily: "gothamBook" }}>
            Uploaded at:{" "}
            <strong>{formatDate(res.currentRecord.createdAt)}</strong>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ fontFamily: "gothamBook" }}>
            Uploaded by: <strong>{res.currentRecord.client?.fullName}</strong>
          </div>
        </Col>
      </Row>

      <hr style={{ background: "#C8C4C4", marginTop: "20px" }} />

      <div style={{ maxWidth: "800px", fontFamily: "gothamBook" }}>
        <Title level={4}>Duration</Title>
        <Paragraph>
          {formatDate(res.currentRecord.start_date)} -{" "}
          {formatDate(res.currentRecord.end_date)}
        </Paragraph>

        <Title level={4}>Objectives</Title>
        {res.currentRecord.campaignobjectives.map((objective, index) => (
          <Paragraph key={index}>{objective.objective_value}</Paragraph>
        ))}

        <Title level={4}>Mediums</Title>
        {res.currentRecord.mediums.map((medium, index) => (
          <Paragraph key={index}>{medium.medium_name}</Paragraph>
        ))}

        <Title level={4}>Demographic</Title>
        <Table
          dataSource={demographicData}
          columns={columns}
          pagination={false}
          size="small"
        />

        <Title level={4}>Geographical</Title>
        <Title level={5}>Region</Title>
        {res.currentRecord.regions.map((region, index) => (
          <Paragraph key={index}>{region.region_name}</Paragraph>
        ))}

        <Title level={5}> Cities:</Title>
        <Paragraph>
          {res.currentRecord.cities.map((city) => city.city_name).join(", ")}
        </Paragraph>

        <Title level={4}>Campaign Budget</Title>
        <Paragraph>Creative: {res.currentRecord.creative}</Paragraph>
        <Paragraph>Conventional: {res.currentRecord.conventional}</Paragraph>

        <Title level={4}>Budget Distribution</Title>
        <Paragraph>Region wise: 10 million</Paragraph>
        <Paragraph>City wise: 30 million</Paragraph>

        <Title level={4}>Agency Selection</Title>
        <Paragraph>City wise</Paragraph>

        <Title level={4}>Creative Work</Title>
        <Paragraph>Required</Paragraph>

        <Title level={4}>Link</Title>
        <Paragraph>{res.currentRecord.cw_link}</Paragraph>

        <Title level={4}>Additional Requirement</Title>
        <Paragraph>{res.currentRecord.additional_requirements}</Paragraph>
      </div>
    </BriefDetailLayout>
  );
};

export default BreifDetailByForm;
