import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
});

const PDFDocument = ({ res, formatDate }) => (
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
                {dem.lifestylemanagements.map((lsm) => lsm.LSM_type).join(", ")}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>Geographical</Text>
      {res.currentRecord.regions.map((region, index) => (
        <Text key={index} style={styles.paragraph}>
          {region.region_name}
        </Text>
      ))}
      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: "bold" }}>Cities:</Text>{" "}
        {res.currentRecord.cities.map((city) => city.city_name).join(", ")}
      </Text>

      <Text style={styles.subtitle}>Campaign Budget</Text>
      <Text style={styles.paragraph}>
        Creative: {res.currentRecord.creative}
      </Text>
      <Text style={styles.paragraph}>
        Conventional: {res.currentRecord.conventional}
      </Text>

      <Text style={styles.subtitle}>Budget Distribution</Text>
      <Text style={styles.paragraph}>Region wise: 10 million</Text>
      <Text style={styles.paragraph}>City wise: 30 million</Text>

      <Text style={styles.subtitle}>Agency Selection</Text>
      <Text style={styles.paragraph}>City wise</Text>

      <Text style={styles.subtitle}>Creative Work</Text>
      <Text style={styles.paragraph}>Required</Text>

      <Text style={styles.subtitle}>Link</Text>
      <Text style={styles.paragraph}>{res.currentRecord.cw_link}</Text>

      <Text style={styles.subtitle}>Additional Requirement</Text>
      <Text style={styles.paragraph}>
        {res.currentRecord.additional_requirements}
      </Text>
    </Page>
  </Document>
);

export default PDFDocument;
