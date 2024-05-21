import React, { useState, useEffect } from "react";
import {
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

import "./UserManagement.css";
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../../features/getUserSlice";
import { createUser } from "../../../features/createUserSlice";
import { getRoles } from "../../../features/getRolesSlice";
import { deleteUser } from "../../../features/deleteUserSlice";
import EditUser from "./EditUser";

import Alert from "../../../reuseComponent/Alert";
const { Search } = Input;
const { Option } = Select;

const UserManagement = () => {
  const dispatch = useDispatch();

  const [avatarSrc, setAvatarSrc] = useState(null);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [isVisible, setIsModalVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editClicked, setIsEditClicked] = useState(false);

  const { items, status, error, loading } = useSelector(
    (state) => state.getUser
  );

  const createUserRes = useSelector((state) => state.createUser);

  const getRolesRes = useSelector((state) => state.getRoles);
  const getUserRes = useSelector((state) => state.createUser);
  const deleteUserRes = useSelector((state) => state.deleteUser);
  const editUserRes = useSelector((state) => state.editUser);

  const [localUsers, setLocalUsers] = useState(items.users);

  useEffect(() => {
    if (createUserRes.error) {
      message.error(createUserRes.error.response.data.message);
    }
  }, [createUserRes.error]); // Dependency array includes createClient.error to re-run the effect when it changes

  useEffect(() => {
    if (editUserRes.status === "succeeded") {
      setIsModalVisible(false);
    }
  }, [editUserRes.status]); // Depend on editUserRes.status to react to its changes

  useEffect(() => {
    // Update local state when items.users changes
    setLocalUsers(items.users);
  }, [items.users]);

  useEffect(() => {
    if (deleteUserRes.status === "succeeded" && deletingUserId) {
      // Remove the user from local state without another server call
      const updatedUsers = localUsers.filter(
        (user) => user.user_id !== deletingUserId
      );
      setLocalUsers(updatedUsers);
    }
  }, [deleteUserRes]);

  useEffect(() => {
    if (getUserRes.user) {
      setAlertMessage("Please check Email");
      setShowAlert(true);
      setIsModalVisible(false);

      form.resetFields();
      setTimeout(() => {
        dispatch(getUser());
        dispatch(getRoles());
      }, 4200);
    }
  }, [getUserRes.user]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getRoles());
  }, [dispatch]);

  const showModal = () => {
    setIsEditClicked(false);
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
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Role Title",
      dataIndex: ["role", "role_title"],
      key: "role_title",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => {
        return text === "Y" ? (
          <span>
            <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
            Active
          </span>
        ) : (
          <span>
            <CloseCircleOutlined style={{ color: "red", marginRight: 8 }} />
            Inactive
          </span>
        );
      },
    },
    {
      title: "Activity Tracker",
      key: "activityTracker",
      align: "center",
      render: (text, record) => (
        <div>
          <a style={buttonStyles.delete} onClick={() => viewDetail(record)}>
            View Detail
          </a>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (text, record) => (
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
    setEditData(record);
    setIsEditClicked(true);
    document.body.classList.add("modal-open");

    console.log(record);
  }

  function handleDelete(record) {
    console.log(record);
    dispatch(deleteUser(record.user_id));
    setDeletingUserId(record.user_id);
  }

  const showCategoryData = (record) => {
    console.log(record);
  };

  const viewDetail = (record) => {};

  const onFinish = (values) => {
    if (!isPictureUploaded) {
      alert("Please upload a profile picture!");
      return;
    }

    const formData = new FormData();

    // Append the picture file
    formData.append("profilePic", file);

    // Append other form values
    Object.keys(values).forEach((key) => {
      if (key !== "profilePic") {
        // Avoid appending the file input again
        formData.append(key, values[key]);
      }
    });

    console.log("FormData prepared for submission: ", formData);

    dispatch(createUser(formData));
  };

  const handleRoleChange = (value, option) => {
    const roleTitle = option.children;
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
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
          {editClicked ? "Update User" : "Add User"}
        </h3>
        <Divider />
        {editClicked ? (
          <EditUser data={editData} />
        ) : (
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
                      {
                        required: true,
                        message: "Please input the full name!",
                      },
                      {
                        pattern: /^[A-Za-z\s]*$/,
                        message: "Please enter only letters and spaces",
                      },
                    ]}
                  >
                    <Input placeholder="John Doe" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="emailAddress"
                    label="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please input the email address!",
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
                        message: "Please input phone number",
                      },
                      {
                        pattern: /^[0-9]{6,}$/,
                        message: "Enter enter minimum 6 digit number",
                      },
                    ]}
                  >
                    <Input placeholder="XXX XXXXXXXX" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="role_id"
                    label="Role"
                    rules={[
                      { required: true, message: "Please select the role!" },
                    ]}
                  >
                    <Select
                      placeholder="Select a role"
                      onChange={handleRoleChange} // Set the onChange handler
                      showSearch
                      optionFilterProp="children"
                    >
                      {getRolesRes?.items.roles?.map((role) => (
                        <Option key={role.role_id} value={role.role_id}>
                          {role.role_title}
                        </Option>
                      ))}
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
                  disabled={getUserRes.isLoading}
                  loading={getUserRes.isLoading}
                >
                  Create User
                </Button>
              </Form.Item>
            </Form>
          </div>
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
                User Management
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
                Result ({localUsers?.length || 0})
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
                placeholder="Search"
                onSearch={(value) => console.log(value)}
                className="custom-search"
              />
            </Col>
          </Row>
        </div>

        <div style={{ padding: "15px" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "500px", // This height can be adjusted as needed
              }}
            >
              <Spin size="large" />
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table
              className="custom-dashboard-table" // Assign the unique class here
              columns={columns}
              dataSource={localUsers}
              pagination={paginationConfig}
            />
          )}
        </div>
      </>
    </>
  );
};

export default UserManagement;
