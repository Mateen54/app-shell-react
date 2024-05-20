import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "../../../utils/dateUtils"; // Import the date formatting utility

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10, fontSize: 12 },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCellHeader: { margin: 5, fontSize: 10, fontWeight: "bold" },
  tableCell: { margin: 5, fontSize: 10 },
});

const PDFDocument = ({ res }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Brief Name: {res.brief_name}</Text>
        <Text>Uploaded At: {formatDate(res.createdAt)}</Text>
        <Text>Uploaded By: {res.client?.fullName}</Text>
      </View>
      <View style={styles.section}>
        <Text>
          Duration: {formatDate(res.start_date)} - {formatDate(res.end_date)}
        </Text>
      </View>
      <View style={styles.section}>
        <Text>Objectives:</Text>
        {res.campaignobjectives.map((objective, index) => (
          <Text key={index}>{objective.objective_value}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Mediums:</Text>
        {res.mediums.map((medium, index) => (
          <Text key={index}>{medium.medium_name}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          Demographic:
        </Text>
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
          {res.demographics.map((demo, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {demo.ages.map((age) => age.age_range).join(", ")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {demo.genders.map((gender) => gender.gender_Type).join(", ")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {demo.secclasses.map((sec) => sec.sec_range).join(", ")}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {demo.lifestylemanagements
                    .map((lsm) => lsm.LSM_type)
                    .join(", ")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text>Geographical:</Text>
        <Text>
          Regions: {res.regions.map((region) => region.region_name).join(", ")}
        </Text>
        <Text>
          Cities: {res.cities.map((city) => city.city_name).join(", ")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text>Campaign Budget:</Text>
        <Text>Creative: {res.creative}</Text>
        <Text>Conventional: {res.conventional}</Text>
      </View>
      <View style={styles.section}>
        <Text>Budget Distribution:</Text>
        <Text>Region wise: 10 million</Text>
        <Text>City wise: 30 million</Text>
      </View>
      <View style={styles.section}>
        <Text>Agency Selection: City wise</Text>
      </View>
      <View style={styles.section}>
        <Text>Creative Work: Required</Text>
      </View>
      <View style={styles.section}>
        <Text>Link: {res.cw_link}</Text>
      </View>
      <View style={styles.section}>
        <Text>Additional Requirement: {res.additional_requirements}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
