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
} from "antd";
import Sidebar from "../Sidebar";
import "./clientManagement.css";
import { DownOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { clientMangement } from "../../../features/ClientReducer/clientManagementSlice";

import { addClient } from "../../../features/AddClient/addClientSlice";

import columns from "./client.json";

const { Option } = Select;
const { Search } = Input;

const { Step } = Steps;

const ClientManagement = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { items, status, error, loading } = useSelector(
    (state) => state.clientMangement
  );

  useEffect(() => {
    dispatch(clientMangement());
  }, [dispatch]);

  const [isVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
    document.body.classList.add("modal-open");
  };

  const onClose = () => {
    document.body.classList.remove("modal-open");
    setIsModalVisible(false);
  };

  const handleNext = async () => {
    try {
      if (!isPictureUploaded) {
        return;
      }

      const values = await form.validateFields();
      setFormData((prev) => ({ ...prev, ...values }));

      if (currentStep < stepComponents.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };
  const handlePrev = () => {
    setCurrentStep((current) => current - 1);
  };

  const stepsTitles = ["Company Info", "Contact Info", "Administrative Info"];

  const handleCreateClient = async () => {
    try {
      // Validate only the current step fields
      await form.validateFields();
      form.validateFields().then((values) => {
        const finalData = { ...formData, ...values };
        console.log("All collected data:", finalData);
        form.resetFields();
        dispatch(addClient(finalData));
      });
    } catch (error) {
      console.error("Validation error:", error); // Handle validation error, prevent step change
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatarSrc(e.target.result); // Update the avatar source state
        setIsPictureUploaded(true); // Set that a picture is uploaded
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const stepComponents = [
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="avatar-upload"
          onChange={handleAvatarChange}
        />
        <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
          {" "}
          {/* Makes the entire label clickable */}
          <Badge
            count={
              <img
                width="24px"
                height="24px"
                src="/images/camera.png"
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "#294799",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              />
            }
            offset={[-9, 60]} // Adjust as needed
            style={{}} // White border effect
          >
            <Avatar
              size={74}
              icon={<UserOutlined />}
              src={avatarSrc} // The source of the Avatar image
              style={{ color: "#F2F3FF", backgroundColor: "#C6CBFDs" }}
            />
          </Badge>
        </label>
      </div>

      {!isPictureUploaded && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "red",
          }}
        >
          <p>Please Upload Image</p>
        </div>
      )}

      <Form
        form={form}
        key="personal-info"
        layout="vertical"
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          style={{ padding: 0, margin: 0 }}
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="e.g. John Doe" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              style={{ padding: 0, margin: 0, marginTop: "13px" }}
              label="Business"
              name="business"
              rules={[
                { required: true, message: "Please select your business" },
              ]}
            >
              <Select placeholder="Select business">
                <Option value="planner">Planner</Option>
                <Option value="retail">Retail</Option>
                <Option value="tech">Technology</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{ padding: 0, margin: 0, marginTop: "13px" }}
              label="Industry"
              name="industry"
              rules={[
                { required: true, message: "Please select your industry" },
              ]}
            >
              <Select placeholder="Select industry">
                <Option value="healthcare">Healthcare</Option>
                <Option value="finance">Finance</Option>
                <Option value="education">Education</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Website URL"
          name="website"
          rules={[{ required: true, message: "Please enter your website URL" }]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Description goes here..." />
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginTop: "13px",
        }}
      >
        <Button
          onClick={handleNext}
          type="primary"
          style={{ backgroundColor: "#294799", borderColor: "#294799" }}
        >
          Next
        </Button>
      </div>
    </>,
    <>
      <Form
        style={{ marginTop: "20px" }}
        form={form}
        key="contact-details"
        layout="vertical"
      >
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email address" },
          ]}
        >
          <Input placeholder="e.g. example@example.com" />
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="e.g. 555-1234" />
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Physical Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input placeholder="e.g. 123 Main St" />
        </Form.Item>
        <Input
          style={{ marginTop: "10px", marginBottom: "20px" }}
          placeholder="Apartment, studio, or floor"
        />
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handlePrev}
          type="default"
          style={{ borderColor: "#blue", color: "blue" }}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          type="primary"
          style={{ backgroundColor: "#294799", borderColor: "#294799" }}
        >
          Next
        </Button>
      </div>
    </>,
    <>
      <Form
        style={{ marginTop: "20px" }}
        form={form}
        key="job-details"
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              style={{ padding: 0, margin: 0, marginTop: "13px" }}
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="e.g. Jane Doe" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{ padding: 0, margin: 0, marginTop: "13px" }}
              label="Job Title"
              name="jobTitle"
              rules={[
                { required: true, message: "Please select your job title" },
              ]}
            >
              <Select placeholder="Select job title">
                <Option value="manager">Manager</Option>
                {/* More options here */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please select your department" }]}
        >
          <Select placeholder="Select department">
            <Option value="hr">Human Resources</Option>
            <Option value="it">IT</Option>
            <Option value="marketing">Marketing</Option>
          </Select>
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Physical Address"
          name="physicalAddress"
          rules={[
            { required: true, message: "Please enter your physical address" },
          ]}
        >
          <Input placeholder="e.g. 456 Elm St" />
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please choose a username" }]}
        >
          <Input placeholder="e.g. jane.doe" />
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "13px",
        }}
      >
        <Button
          onClick={handlePrev}
          type="default"
          style={{ borderColor: "#blue", color: "blue" }}
        >
          Back
        </Button>
        <Button
          onClick={handleCreateClient}
          type="primary"
          style={{ backgroundColor: "#294799", borderColor: "#294799" }}
        >
          Create Client
        </Button>
      </div>
    </>,
  ];

  const viewProfile = (record) => {
    alert(`View profile for ${record.clientName}`);
  };

  const removeClient = (record) => {
    alert(`Remove client ${record.clientName}`);
  };

  const editClientInfo = (record) => {
    alert(`Edit client info for ${record.clientName}`);
    setIsModalVisible(true);
  };

  const ActionMenu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => viewProfile(record)}>
        View profile
      </Menu.Item>
      <Menu.Item key="3" onClick={() => editClientInfo(record)}>
        Edit Info
      </Menu.Item>
      <Menu.Item key="2" onClick={() => removeClient(record)}>
        Disable
      </Menu.Item>
    </Menu>
  );

  const columnsWithRender = columns.map((column) => {
    if (column.dataIndex === "action") {
      return {
        ...column,
        render: (text, record) => (
          <Dropdown overlay={() => ActionMenu(record)}>
            <Button style={{ border: "2px solid #94A2F2" }}>
              Action <DownOutlined />
            </Button>
          </Dropdown>
        ),
      };
    }
    return column;
  });
  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
  };

  return (
    <>
      <Modal
        title="Add Client"
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        width={841}
        className="add-client-modal"
      >
        <Divider />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Steps current={currentStep} style={{ width: "80%" }}>
            {stepsTitles.map((title, index) => (
              <Step
                key={title}
                title={
                  <span>
                    {title}
                    {index < stepsTitles.length - 1 && (
                      <RightOutlined /> // Changed to use Ant Design's RightOutlined icon
                    )}
                  </span>
                }
                icon={currentStep === index ? null : undefined}
              />
            ))}
          </Steps>
        </div>
        <div className="steps-content">{stepComponents[currentStep]}</div>
      </Modal>

      <Sidebar>
        <div>
          <Row>
            <Col>
              <h1
                style={{
                  margin: "0px",
                  padding: "0px",
                  color: "#294799",
                  fontSize: "25px",
                  marginTop: "30px",
                }}
              >
                Client Management
              </h1>
            </Col>
          </Row>
          <Divider
            style={{
              padding: "0px",
              margin: "0px",
              marginTop: "10px",
            }}
          />

          <Row
            style={{
              padding: "0",
              margin: "0",
              marginTop: "15px",
              marginBottom: "6px",
            }}
            justify="space-between"
            alignItems="center"
          >
            <Col>
              <span
                style={{ fontSize: "16px", color: "#294799", fontWeight: 500 }}
              >
                Result (11)
              </span>
            </Col>
            <Col>
              <Button
                onClick={showModal}
                type="primary"
                style={{ marginRight: "16px", background: "#294799" }}
              >
                Add Client
              </Button>
              <Search
                placeholder="input search text"
                onSearch={(value) => console.log(value)}
                className="custom-search"
              />
            </Col>
          </Row>
        </div>
        <Divider style={{ padding: "0", margin: "0", marginBottom: "20px" }} />
        <div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "500px", // Adjust this value as needed
              }}
            >
              <Spin size="large" />
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table
              className="custom-dashboard-table"
              columns={columnsWithRender}
              dataSource={items}
              pagination={paginationConfig}
            />
          )}
        </div>
      </Sidebar>
    </>
  );
};
export default ClientManagement;
