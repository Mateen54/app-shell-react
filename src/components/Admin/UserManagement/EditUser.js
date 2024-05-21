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
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

import { editUser } from "../../../features/editUserSlice";

const { Search } = Input;
const { Option } = Select;

const EditUser = ({ data }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const getRolesRes = useSelector((state) => state.getRoles);
  const editUserRes = useSelector((state) => state.editUser);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      fullName: data.fullName,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      role_id: data.role_id,
    });
  }, [form, data]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the preview URL to the result of the FileReader
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true); // Disable form fields
    const formData = new FormData();

    formData.append("fullName", values.fullName);
    formData.append("emailAddress", values.emailAddress);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("role_id", values.role_id);

    // Check if a file is selected and append it to the FormData
    const fileInput = document.getElementById("avatar-upload");
    if (fileInput && fileInput.files[0]) {
      formData.append("profilePic", fileInput.files[0]);
    } else {
    }

    console.log("Form submitted:", data);
    dispatch(
      editUser({
        userId: data.user_id,
        userData: formData,
      })
    ).finally(() => {
      setIsSubmitting(false); // Enable form fields after the request is complete
    });
  };

  const handleRoleChange = () => {};

  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            onChange={handleAvatarChange}
            disabled={isSubmitting}
          />
          <label
            htmlFor="avatar-upload"
            style={{
              cursor: isSubmitting ? "not-allowed" : "pointer",
              pointerEvents: isSubmitting ? "none" : "auto",
            }}
          >
            <Badge
              count={
                <img
                  width="24px"
                  height="24px"
                  src="/images/camera.png"
                  style={{
                    backgroundColor: "#294799",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              }
              offset={[-9, 60]}
            >
              <Avatar
                size={74}
                icon={<UserOutlined />}
                src={imagePreview || data.profilePic || undefined} // Use the preview image or fall back to the existing profile picture
                style={{ color: "#F2F3FF", backgroundColor: "#C6CBFD" }}
              />
            </Badge>
          </label>
        </div>
        <Form
          form={form}
          name="edit_user"
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
                <Input disabled={isSubmitting} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="emailAddress"
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
                <Input disabled={isSubmitting} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please input the phone number!" },
                ]}
              >
                <Input disabled={isSubmitting} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role_id"
                label="Role"
                rules={[{ required: true, message: "Please select the role!" }]}
              >
                <Select
                  placeholder="Select a role"
                  onChange={handleRoleChange}
                  showSearch
                  optionFilterProp="children"
                  disabled={isSubmitting}
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
              loading={isSubmitting || editUserRes.loading}
              disabled={isSubmitting}
            >
              Update User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditUser;
