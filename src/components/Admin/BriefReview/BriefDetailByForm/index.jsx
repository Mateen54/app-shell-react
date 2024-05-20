import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  Tabs,
  Typography,
  Table,
  Divider,
  Modal,
  Input,
  message,
} from "antd";

import "../table.css";

import { useNavigate } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useSelector, useDispatch } from "react-redux";

import {
  approvedBriefApi,
  resetStatus,
} from "../../../../features/acceptBrief/acceptBriefSlice";

import { rejectBriefApi } from "../../../../features/rejectBreif/rejectBriefSlice";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

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

  const [dispatched, setDispatched] = useState(false);
  const [dispatchedReject, setDispatchedReject] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const res = useSelector((res) => res.selectedBrief);

  const resUpdate = useSelector((res) => res.acceptBrief);

  const rejectRes = useSelector((res) => res.rejectBrief);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle OK button in modal
  const handleOk = () => {
    console.log("Brief rejected");
    setIsModalVisible(false);
  };

  console.log(rejectRes.status);
  // Function to handle Cancel button in modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const approveBrief = () => {
    console.log(res.currentRecord.brief_id);
    setDispatched(true);
    dispatch(approvedBriefApi(res.currentRecord.brief_id));
  };

  const handleAddReason = () => {
    console.log("Reason for rejection:", reason);
    setDispatchedReject(true);
    dispatch(rejectBriefApi({ brief_id: res.currentRecord.brief_id, reason }));
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
      key: `D${index + 1}`, // Unique key for each row
      age: demo.ages.map((age) => age.age_range).join(", "), // Join age ranges into a single string
      gender: demo.genders.map((gender) => gender.gender_Type).join(", "), // Join gender types into a single string
      secClass: demo.secclasses.map((sec) => sec.sec_range).join(", "), // Join SEC classes into a single string
      lsm: demo.lifestylemanagements.map((lsm) => lsm.LSM_type).join(", "), // Join LSM types into a single string
    }));
  };

  const demographicData = processDemographicsData(
    res.currentRecord.demographics
  );

  console.log("dsad", dispatched);

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

  const styles = StyleSheet.create({
    body: {
      padding: 10,
      fontFamily: "Helvetica",
    },
    title: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 5,
      fontWeight: "bold",
    },
    paragraph: {
      fontSize: 10,
      marginBottom: 5,
    },
    table: {
      display: "table",
      width: "auto",
      marginVertical: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      backgroundColor: "#f0f0f0",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
    },
    tableCellHeader: {
      margin: 5,
      fontSize: 10,
      fontWeight: "bold",
    },
    tableCell: {
      margin: 5,
      fontSize: 10,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginVertical: 10,
    },
  });

  const MyDocument = ({ res }) => (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Duration</Text>
        <Text style={styles.paragraph}>
          {formatDate(res.currentRecord.start_date)} -{" "}
          {formatDate(res.currentRecord.end_date)}
        </Text>

        <Text style={styles.subtitle}>Objectives</Text>
        {res.currentRecord.campaignobjectives.map((objective, index) => (
          <Text key={index} style={styles.paragraph}>
            {objective.objective_value}
          </Text>
        ))}

        <Text style={styles.subtitle}>Mediums</Text>
        {res.currentRecord.mediums.map((medium, index) => (
          <Text key={index} style={styles.paragraph}>
            {medium.medium_name}
          </Text>
        ))}

        <Text style={styles.subtitle}>Demographic</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Age</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Gender</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>SEC Class</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>LSM</Text>
            </View>
          </View>
          {res.currentRecord.demographics.map((dem, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {dem.ages.map((age) => age.age_range).join(", ")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {dem.genders.map((gender) => gender.gender_Type).join(", ")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {dem.secclasses.map((sec) => sec.sec_range).join(", ")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {dem.lifestylemanagements
                    .map((lsm) => lsm.LSM_type)
                    .join(", ")}
                </Text>
              </View>
            </View>
          ))}
          <Text style={styles.subtitle}>Geographical</Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Region</Text>
            {"\n"}
            Punjab
            {"\n"}
            Sindh
            {"\n"}
            KPK
          </Text>
          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Cities:</Text> lahore,
            peshawar, multan
          </Text>

          <Text style={styles.subtitle}>Campaign Budget</Text>
          <Text style={styles.paragraph}>Creative: 10 million mli</Text>
          <Text style={styles.paragraph}>Conventional: 20 million mli</Text>

          <Text style={styles.subtitle}>Budget Distribution</Text>
          <Text style={styles.paragraph}>Region wise: 10 million</Text>
          <Text style={styles.paragraph}>City wise: 30 million</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
        footer={null}
        width={739}
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
            <button
              style={{
                background: "#294799",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              key="submit"
              onClick={handleAddReason}
            >
              Add Reason
            </button>
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
                {res.currentRecord.brief_name}
              </h2>
              <div>
                <PDFDownloadLink
                  document={<MyDocument res={res} />}
                  fileName="campaign-details.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </div>
            </div>
          </Col>
          {res.currentRecord.status !== "approved" && (
            <Col>
              <Button
                onClick={showModal}
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
            {res.currentRecord.cities
              .map((city, index) => city.city_name)
              .join(", ")}
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
      </div>
    </>
  );
};

export default BreifDetailByForm;
