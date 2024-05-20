import React, { useState, useEffect } from "react";
import { Input, Select, Row, Col, Button, Form, Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateClient } from "../../../features/updateClientSlice";
import "./clientManagement.css";

const { Option } = Select;

const UpdatedClient = ({ data }) => {
  const dispatch = useDispatch();
  const updateClientSlice = useSelector((state) => state.updateClient);

  const [form] = Form.useForm();
  const [avatarSrc, setAvatarSrc] = useState(data.companyLogo);
  const [file, setFile] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  useEffect(() => {
    setAvatarSrc(data.companyLogo);
    form.resetFields();
    form.setFieldsValue(data);
  }, [data, form]);

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setAvatarSrc(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditClient = () => {
    setIsFormDisabled(true);

    const formData = new FormData();
    const allValues = form.getFieldsValue(true);

    Object.keys(allValues).forEach((key) => {
      formData.append(key, allValues[key]);
    });

    if (file) formData.append("companyLogo", file);

    dispatch(
      updateClient({ clientId: data.clientId, clientData: formData })
    ).finally(() => setIsFormDisabled(false));
  };

  const handleCancel = () => {
    form.resetFields();
    setAvatarSrc(data.companyLogo);
  };

  const FormItem = ({ name, label, rules, children }) => (
    <Form.Item name={name} label={label} rules={rules}>
      {children}
    </Form.Item>
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="avatar-upload"
          onChange={handleAvatarChange}
          disabled={isFormDisabled}
        />
        <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
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
            offset={[-9, 60]}
          >
            <Avatar
              size={74}
              icon={<UserOutlined />}
              src={avatarSrc}
              style={{ color: "#F2F3FF", backgroundColor: "#C6CBFD" }}
            />
          </Badge>
        </label>
      </div>
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        onFinish={handleEditClient}
        style={{ marginTop: "20px" }}
        disabled={isFormDisabled}
      >
        <h3 className="form-section-title">Company Info</h3>
        <FormItem
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="e.g. John Doe" />
        </FormItem>
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              name="businessType"
              label="Business"
              rules={[
                { required: true, message: "Please select your business" },
              ]}
            >
              <Select placeholder="Select business">
                <Option value="planner">Planner</Option>
                <Option value="retail">Retail</Option>
                <Option value="tech">Technology</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="industry"
              label="Industry"
              rules={[
                { required: true, message: "Please select your industry" },
              ]}
            >
              <Select placeholder="Select industry">
                <Option value="healthcare">Healthcare</Option>
                <Option value="finance">Finance</Option>
                <Option value="education">Education</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          name="websiteURL"
          label="Website URL"
          rules={[{ required: true, message: "Please enter your website URL" }]}
        >
          <Input placeholder="https://example.com" />
        </FormItem>
        <FormItem
          name="companyDesc"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Description goes here..." />
        </FormItem>
        <h3 className="form-section-title">Contact Info</h3>
        <FormItem
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Please enter your email address" },
          ]}
        >
          <Input
            readOnly
            style={{ cursor: "pointer" }}
            placeholder="e.g. example@example.com"
          />
        </FormItem>
        <FormItem
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input number" },
            { pattern: /^[0-9]+$/, message: "Only numbers are allowed" },
          ]}
        >
          <Input placeholder="e.g. 555-1234" />
        </FormItem>
        <FormItem
          name="physicalAddress1"
          label="Physical Address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input placeholder="e.g. 123 Main St" />
        </FormItem>
        <h3 className="form-section-title">Administrative Info</h3>
        <FormItem
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="e.g. Jane Doe" />
        </FormItem>
        <FormItem
          name="jobTitle"
          label="Job Title"
          rules={[{ required: true, message: "Please select your job title" }]}
        >
          <Select placeholder="Select job title">
            <Option value="manager">Manager</Option>
            {/* More options here */}
          </Select>
        </FormItem>
        <FormItem
          name="department"
          label="Department"
          rules={[{ required: true, message: "Please select your department" }]}
        >
          <Select placeholder="Select department">
            <Option value="hr">Human Resources</Option>
            <Option value="it">IT</Option>
            <Option value="marketing">Marketing</Option>
          </Select>
        </FormItem>
        <FormItem
          name="physicalAddress2"
          label="Physical Address"
          rules={[
            { required: true, message: "Please enter your physical address" },
          ]}
        >
          <Input placeholder="e.g. 456 Elm St" />
        </FormItem>

        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="form-actions"
        >
          <Button
            type="default"
            onClick={handleCancel}
            disabled={isFormDisabled}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#294799", color: "white" }}
            loading={updateClientSlice.status === "loading"}
            disabled={isFormDisabled}
          >
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdatedClient;
