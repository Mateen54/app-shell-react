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
} from "antd";
import Sidebar from "../Sidebar";
import "./UserManagement.css";
import {
  SearchOutlined,
  DownOutlined,
  RightOutlined,
  UserOutlined,
  CameraOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { clientMangement } from "../../../features/ClientReducer/clientManagementSlice";

const { Search } = Input;
const { Option } = Select;

const UserManagement = () => {
  const dispatch = useDispatch();

  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [isVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});

  // const { items, status, error } = useSelector(
  //   (state) => state.clientMangement
  // );

  useEffect(() => {
    dispatch(clientMangement());
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
    document.body.classList.add("modal-open");
  };

  const onClose = () => {
    document.body.classList.remove("modal-open");
    setIsModalVisible(false);
  };

  const buttonStyles = {
    edit: {
      color: "#294799",
      marginRight: "8px",
      fontSize: "14px",
      textDecoration: "underline",
    },
    delete: {
      color: "#ffa500",
      fontSize: "14px",
      textDecoration: "underline",
    },
  };

  const columns = [
    {
      title: "SR#",
      dataIndex: "srf",
      key: "srf",
      align: "center",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Activity Tracker",
      dataIndex: "activityTracker",
      key: "activityTracker",
      align: "center",
      render: (text, record) => (
        <button
          onClick={() => showCategoryData(record)}
          style={{
            textDecoration: "underline",
            color: "#ffa500", // Adjust the color as needed
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "0",
            // Any other styles you want to apply to the button
          }}
        >
          View Activity
        </button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        // Assuming you will have some components to render here
        <div>
          <a style={buttonStyles.edit} onClick={() => handleEdit(record)}>
            Edit
          </a>
          <a style={buttonStyles.delete} onClick={() => handleDelete(record)}>
            Delete
          </a>
        </div>
      ),
    },
  ];

  function handleEdit(record) {
    setIsModalVisible(true);
    document.body.classList.add("modal-open");
  }

  function handleDelete(record) {
    // Implement your delete logic here
  }

  const showCategoryData = (record) => {
    console.log(record);
  };

  const items = [
    {
      key: "1",
      srf: "01",
      fullName: "Lorem Ipsum Condor",
      emailAddress: "example@gmail.com",
      phoneNumber: "xxxx xxxx xxxx",
      role: "Planner",
      status: "Approved",
      activityTracker: "View detail",
      action: "",
    },
    {
      key: "1",
      srf: "01",
      fullName: "Mateen",
      emailAddress: "example@gmail.com",
      phoneNumber: "xxxx xxxx xxxx",
      role: "Planner",
      status: "Approved",
      activityTracker: "View detail",
      action: "",
    },
    {
      key: "1",
      srf: "01",
      fullName: "Ali",
      emailAddress: "example@gmail.com",
      phoneNumber: "xxxx xxxx xxxx",
      role: "Planner",
      status: "Approved",
      activityTracker: "View detail",
      action: "",
    },
  ];

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!isPictureUploaded) {
      alert("Please upload a profile picture!");
      return;
    }

    console.log("Received values of form: ", values);
    console.log("Avatar Source: ", avatarSrc);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
        setIsPictureUploaded(true);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Replace '#ececec' with the actual color code from your image
  const mainContainerBgColor = "#ececec"; // Example color code

  const paginationConfig = {
    pageSize: 10, // Number of items per page
    showSizeChanger: false, // Hide the size changer
    showQuickJumper: false, // Hide the quick jumper
    showTotal: (total, range) =>
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
  };

  return (
    <>
      <Modal
        title="Create User"
        visible={isVisible}
        onCancel={onClose}
        footer={null}
        width={841}
        className="add-client-modal"
      >
        <div>
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
            name="create_user"
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={24}>
              {" "}
              {/* Add appropriate gutter size for spacing */}
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input the full name!" },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input the email address!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input the phone number!",
                    },
                  ]}
                >
                  <Input placeholder="XXX XXXXXXXX" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    { required: true, message: "Please select the role!" },
                  ]}
                >
                  <Select placeholder="e.g., Planner">
                    <Option value="planner">Planner</Option>
                    <Option value="designer">Designer</Option>
                    <Option value="analyst">Analyst</Option>
                    {/* Add other roles as needed */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#294799",
                  color: "white",
                  marginTop: "10px",
                }}
                htmlType="submit"
              >
                Create User
              </Button>
            </Form.Item>
          </Form>

          <Form
            form={form}
            name="update_user"
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input the full name!" },
                  ]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    { required: true, message: "Please select the role!" },
                  ]}
                >
                  <Select placeholder="Select a role">
                    <Option value="planner">Planner</Option>
                    <Option value="designer">Designer</Option>
                    <Option value="analyst">Analyst</Option>
                    {/* Add other roles as needed */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    { required: true, message: "Please select the status!" },
                  ]}
                >
                  <Select placeholder="Select a status">
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                    {/* Add other statuses as needed */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="oldPassword"
                  label="Old Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your old password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="confirmNewPassword"
                  label="Confirm New Password"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#294799",
                  color: "white",
                  marginTop: "10px",
                }}
                htmlType="submit"
              >
                Update User
              </Button>
            </Form.Item>
          </Form>
        </div>
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
                  fontSize: "25px",
                  marginTop: "30px",
                }}
              >
                User Management
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
                Result (12)
              </span>
            </Col>
            <Col>
              <Button
                onClick={showModal}
                type="primary"
                style={{ marginRight: "16px", background: "#294799" }}
              >
                Create User
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
          <Table
            className="custom-dashboard-table" // Assign the unique class here
            columns={columns}
            dataSource={items}
            pagination={paginationConfig}
          />
        </div>
      </>
    </>
  );
};

export default UserManagement;
