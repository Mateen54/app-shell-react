import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./signup.css"; // Ensure your CSS file is correctly linked

import { useDispatch } from "react-redux";
import { signupUser } from "../../features/signup/signupSlice.js";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

// Adjusted inputStyle to have 100% width
const inputStyle = {
  width: "100%", // Input will fill the width of its container
  height: "30px",
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
  // height: "800px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  border: "1px solid #C8C4C4",
  borderRadius: "24px",
  backgroundColor: "#fff",
  margin: "32px auto",
  // marginTop: "112px",
  // marginBottom: "112px",
};

const logoStyle = {
  width: "133px",
  height: "80px",
};

const Signup = () => {
  return (
    <div style={mainContainerStyle}>
      <img src="/images/app-logo.png" alt="Company Logo" style={logoStyle} />
      {/* <h1 style={{ textAlign: "center" }}>SIGN UP</h1>  */}
      <Form {...formItemLayout} requiredMark={false}>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: "Please input your company!" }]}
          style={formItemStyle}
        >
          <Input style={inputStyle} />
        </Form.Item>
        <Form.Item label="Department" name="department" style={formItemStyle}>
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
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: 0 }}>
          <div style={{ textAlign: "center" }}>
            Already have an account? <a href="/login">Login</a>
          </div>{" "}
          {/* Centered login link */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
