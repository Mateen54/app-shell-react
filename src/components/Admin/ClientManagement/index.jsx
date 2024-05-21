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
} from "antd";
import Sidebar from "../Sidebar";
import "./clientManagement.css";
import { DownOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import UpdatedClient from "./UpdateClient";

import { useSelector, useDispatch } from "react-redux";

import { clientMangement } from "../../../features/ClientReducer/clientManagementSlice";

import Alert from "../../../reuseComponent/Alert";

import { registerClient } from "../../../features/clientSlice";
import { deleteClient } from "../../../features/deleteClientSlice";

const { Option } = Select;
const { Search } = Input;

const { Step } = Steps;

const ClientManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { items, status, error, loading } = useSelector(
    (state) => state.clientMangement
  );

  const res = useSelector((state) => state.deleteClient);
  const updateClientSlice = useSelector((state) => state.updateClient);

  const [isVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setNewFile] = useState(null);
  const [deletingClientId, setDeletingClientId] = useState(null);
  const [clients, setClients] = useState([]);
  const [setEdit, setIsEdit] = useState(false);
  const [recordData, setRecordData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(clientMangement());
  }, [dispatch]);

  const createClient = useSelector((state) => state.createClient);
  console.log("dsa", createClient);
  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  useEffect(() => {
    // Check that registrationData exists and is not empty
    if (
      createClient.registrationData &&
      !isObjectEmpty(createClient.registrationData)
    ) {
      form.resetFields();
      setCurrentStep(0);
      setNewFile(null);
      setIsPictureUploaded(false);
      setAvatarSrc(null); // Should probably be null if resetting to default state
      setIsModalVisible(false);
      message.success("Client created successfully!");
    }
  }, [createClient.registrationData]);

  useEffect(() => {
    if (createClient.error) {
      setShowError(true); // Show the error message when there is an error
      message.error(createClient.error);
      const timer = setTimeout(() => {
        setShowError(false); // Hide the error message after 10 seconds
      }, 10000); // 10000 milliseconds = 10 seconds

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [createClient.error]); // Dependency array includes createClient.error to re-run the effect when it changes

  useEffect(() => {
    if (res.status === "succeeded" && deletingClientId) {
      console.log("Deletion succeeded");
      const updatedClients = clients.filter(
        (client) => client.clientId !== deletingClientId
      );
      setClients(updatedClients);
    }
  }, [res, deletingClientId, clients]);

  useEffect(() => {
    if (items) {
      setClients(items.clients);
    }
  }, [items]);

  useEffect(() => {
    if (updateClientSlice.status === "succeeded") {
      setAlertMessage("Update successful!");
      setShowAlert(true);
      setIsModalVisible(false); // Close modal on successful update
      setIsEdit(false); // Reset edit state
      setTimeout(() => {
        dispatch(clientMangement());
      }, 4200);
    }
  }, [updateClientSlice.status]);

  const showModal = () => {
    setIsEdit(false);
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
    let formDataPic = new FormData();
    formDataPic.append("companyFile", file);

    try {
      await form.validateFields();

      form.validateFields().then((values) => {
        const finalData = { ...formData, ...values };

        Object.keys(finalData).forEach((key) => {
          formDataPic.append(key, finalData[key]);
        });

        console.log("Sending data to server...", finalData);

        dispatch(registerClient(formDataPic));
      });
    } catch (error) {
      console.error("Validation error:", error); // Handle validation error, prevent step change
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setNewFile(file);
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
          style={{ padding: 0, margin: 0, marginBottom: "8px" }}
          label="Company Name"
          name="companyName"
          rules={[
            { required: true, message: "Please enter your company name" },
            {
              pattern: /^[A-Za-z\s]*$/,
              message: "Please enter only letters and spaces",
            },
          ]}
        >
          <Input placeholder="e.g. John Doe" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              style={{
                padding: 0,
                margin: 0,
                marginTop: "13px",
                marginBottom: "8px",
              }}
              label="Business"
              name="businessType"
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
              style={{
                padding: 0,
                margin: 0,
                marginTop: "13px",
                marginBottom: "8px",
              }}
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
          style={{
            padding: 0,
            margin: 0,
            marginTop: "13px",
            marginBottom: "8px",
          }}
          label="Website URL"
          name="websiteURL"
          rules={[
            {
              type: "url",
              required: true,
              message: "Please enter your website URL",
            },
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="companyDesc"
          rules={[{ required: true, message: "Please enter a description" }]}
          style={{
            padding: 0,
            margin: 0,
            marginTop: "13px",
            marginBottom: "8px",
          }}
        >
          <Input.TextArea
            placeholder="Description goes here..."
            style={{ height: "100px", resize: "none" }} // Fixed height and prevent resizing
          />
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
          style={{
            backgroundColor: "#294799",
            borderColor: "#294799",
            marginTop: "",
          }}
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
            {
              type: "email",
              required: true,
              message: "Please enter your email address",
            },
          ]}
        >
          <Input placeholder="e.g. example@example.com" />
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter at least 6 digits",
            },
            {
              pattern: /^[0-9]{6,}$/,
              message: "Enter enter minimum 6 digit number",
            },
          ]}
        >
          <Input placeholder="e.g. 555-1234" />
        </Form.Item>
        <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Physical Address"
          name="physicalAddress1"
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
          <Col span={12} style={{}}>
            <Form.Item
              style={{
                padding: 0,
                margin: 0,
                marginTop: "13px",
              }}
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
                {
                  pattern: /^[A-Za-z\s]*$/,
                  message: "Please enter only letters and spaces",
                },
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
          name="physicalAddress2"
          rules={[
            { required: true, message: "Please enter your physical address" },
          ]}
        >
          <Input placeholder="e.g. 456 Elm St" />
        </Form.Item>
        {/* <Form.Item
          style={{ padding: 0, margin: 0, marginTop: "13px" }}
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please choose a username" }]}
        >
          <Input placeholder="e.g. jane.doe" />
        </Form.Item> */}
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
          loading={createClient.loading}
          style={{ backgroundColor: "#294799", borderColor: "#294799" }}
        >
          Create Client
        </Button>
      </div>
    </>,
  ];

  const viewProfile = (record) => {
    navigate("/view-client-profile");
  };

  const removeClient = (record) => {
    console.log(res);
    setDeletingClientId(record.clientId); // Set the client ID being deleted
    dispatch(deleteClient(record.clientId));
  };

  const editClientInfo = (record) => {
    console.log(record);
    setIsEdit(true);
    setRecordData(record);
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
      {/* <Menu.Item key="2" onClick={() => removeClient(record)}>
        Disable
      </Menu.Item> */}
    </Menu>
  );

  const columns = [
    {
      title: "SR#",
      dataIndex: "clientId",
      key: "srf",
    },
    {
      title: "Client Name",
      dataIndex: "fullName",
      key: "clientName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",

      render: (text) => {
        const date = new Date(text);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear().toString().substr(-2);
        return `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}`;
      },
    },
    {
      title: "No of Briefs",
      dataIndex: "total_briefs",
      key: "noOfBriefs",
    },
    {
      title: "No of Campaigns",
      dataIndex: "total_campaigns",
      key: "noOfCampaigns",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const columnsWithRender = columns.map((column) => {
    if (column.dataIndex === "action") {
      return {
        ...column,
        render: (text, record) => (
          <Dropdown overlay={() => ActionMenu(record)}>
            <Button style={{ border: "1px solid #94A2F2" }}>
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
      {showAlert && (
        <Alert
          message={alertMessage}
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}
      <Modal
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        width={841}
        className="add-client-modal"
      >
        <h3 style={{ color: "#294799", fontSize: "20px" }}>
          {setEdit ? "Update Client" : "Add Client"}
        </h3>
        <Divider />
        {!setEdit && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
            className="custom-button-tabs"
          >
            <Steps current={currentStep} style={{ width: "80%" }}>
              {stepsTitles.map((title, index) => (
                <Step
                  key={title}
                  title={
                    <span>
                      {title}
                      {index < stepsTitles.length - 1 && <RightOutlined />}
                    </span>
                  }
                  icon={currentStep === index ? null : undefined}
                />
              ))}
            </Steps>
          </div>
        )}

        {setEdit ? (
          <UpdatedClient onClose={onClose} data={recordData} />
        ) : (
          <div className="steps-content">{stepComponents[currentStep]}</div>
        )}
      </Modal>
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
              >
                Result ({clients?.length || 0})
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
                placeholder="Search"
                onSearch={(value) => console.log(value)}
                className="custom-search"
              />
            </Col>
          </Row>
        </div>

        <div style={{ padding: "20px" }}>
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
              dataSource={clients}
              pagination={paginationConfig}
            />
          )}
        </div>
      </>
    </>
  );
};
export default ClientManagement;
