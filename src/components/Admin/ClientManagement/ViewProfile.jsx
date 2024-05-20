import React, { useState, useEffect } from "react";
import {
  Menu,
  Dropdown,
  Table,
  Input,
  Select,
  Row,
  Col,
  Tabs,
  Button,
  Divider,
  Modal,
  Steps,
  Form,
  Avatar,
  Badge,
  Spin,
  message,
  Typography,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import "./clientManagement.css";

const { Title, Text, Link } = Typography;

const ViewProfile = () => {
  return (
    <>
      <div>
        <Row>
          <Col>
            <h1
              style={{
                margin: "0px",
                padding: "0px",
                color: "#294799",
                fontSize: "20px",
                marginTop: "30px",
                fontFamily: "gothamBook",
                paddingLeft: "20px",
                marginTop: "45px",
              }}
            >
              Client Management
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

        <Row
          style={{
            padding: "0",
            margin: "0",
            marginTop: "23px",
            marginBottom: "0px",
            fontFamily: "gothamMedium",
            paddingLeft: "20px",
            paddingRight: "10px",
          }}
          justify="space-between"
          alignItems="center"
        >
          <Col>
            <span
              style={{
                fontFamily: "gothamMedium",
                fontSize: "16px",
                color: "#294799",
                fontWeight: 500,
              }}
            ></span>
          </Col>
          <Col></Col>
        </Row>
      </div>

      <div style={{ padding: "20px", borderRadius: "8px" }}>
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col span={5}>
            <Row gutter={16}>
              <Col>
                <Avatar
                  size={100}
                  src="path_to_your_image" // replace with actual image source
                  alt="Darla Adams"
                />
              </Col>
              <Col>
                <Title level={4}>Darla Adams</Title>
                <Text type="secondary">Manager</Text>
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <Row gutter={16}>
              <Col span={6}>
                <Text strong>Department:</Text>
                <br />
                <Text>Media</Text>
              </Col>
              <Col span={6}>
                <Text strong>Phone Number:</Text>
                <br />
                <Text>
                  <PhoneOutlined /> 442-677-2418 x0108
                </Text>
              </Col>
              <Col span={6}>
                <Text strong>Email Address:</Text>
                <br />
                <Text>
                  <MailOutlined /> Darla.Adams@yahoo.com
                </Text>
              </Col>
              <Col span={6}>
                <Text strong>Address:</Text>
                <br />
                <Text>
                  <HomeOutlined /> 33377 Forest Road, D'Amoreshire
                </Text>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: "20px" }}>
              <Col span={6}>
                <Text strong>Company:</Text>
                <br />
                <Text>Coca Cola</Text>
              </Col>
              <Col span={6}>
                <Text strong>Business:</Text>
                <br />
                <Text>LLC</Text>
              </Col>
              <Col span={6}>
                <Text strong>Industry:</Text>
                <br />
                <Text>Food & Drinks</Text>
              </Col>
              <Col span={6}>
                <Text strong>Website:</Text>
                <br />
                <Link href="https://www.coca-colacompany.com/">
                  <GlobalOutlined /> www.coca-colacompany.com
                </Link>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Text strong>Description:</Text>
                <br />
                <Text>
                  Lorem ipsum dolor sit amet consectetur. At eu dignissim urna
                  venenatis et tellus. Ultricies felis sem donec sagittis
                  volutpat ipsum fringilla ultrices. Donec id ac enim at
                  consectetur viverra facilisis etiam semper. In orci cursus
                  ipsum risus condimentum sit et cursus. Non in cursus sit
                  varius suscipit mollis. Bibendum sit morbi est pharetra at sit
                  libero amet nec. Neque pharetra molestie odio nunc ac purus
                  eget fames. Aliquam sit diam vestibulum bibendum dolor
                  faucibus. Dolor sit magna volutpat neque lectus odio.
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ViewProfile;
