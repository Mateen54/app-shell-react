import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./login.css"; // Ensure your CSS file is correctly linked

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

// Adjusted inputStyle to have 100% width
const inputStyle = {
  width: "100%", // Input will fill the width of its container
  height: "40px",
  borderRadius: "10px",
  width: "350px",
};

// Adjusted buttonStyle to have 100% width
const buttonStyle = {
  width: "150px", // Button will fill the width of its container
  height: "40px",
  marginTop: "5px",
  borderRadius: "10px",
  backgroundColor: "#294799",
  color: "#ffffff",
};

const formItemStyle = {
  marginBottom: "10px",
  width: "350px", // Set width for form items
  display: "flex", // Added for centering
  justifyContent: "center", // Added for centering
};

const mainContainerStyle = {
  width: "700px",
  height: "800px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #C8C4C4",
  borderRadius: "24px",
  backgroundColor: "#fff",
  margin: "auto",
  marginTop: "112px",
  marginBottom: "112px",
};

const logoStyle = {
  width: "133px",
  height: "80px",
};

const CreateCompany = () => {
  return (
    <div style={mainContainerStyle}>
      <img src="/images/app-logo.png" alt="Company Logo" style={logoStyle} />
      <h1 style={{ textAlign: "center" }}>SIGN UP</h1> {/* Centered title */}
      <Form {...formItemLayout} requiredMark={false}>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
          style={formItemStyle}
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
          style={formItemStyle}
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
          style={formItemStyle}
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={formItemStyle}
        >
          <Input.Password
            style={inputStyle}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          style={formItemStyle}
        >
          <Input.Password
            style={inputStyle}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{ ...formItemLayout.wrapperCol, offset: 0 }}
          style={{ ...formItemStyle, width: "100%", marginTop: "24px" }} // Button takes the full width of its container
        >
          <Button type="primary" htmlType="submit" style={buttonStyle}>
            Continue
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCompany;
