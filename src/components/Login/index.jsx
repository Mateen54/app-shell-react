import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./login.css"; // Ensure your CSS file is correctly linked
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../features/signup/signupSlice.js";
import { useNavigate } from "react-router-dom";

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

const logoStyle = {
  width: "133px",
  height: "80px",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isNewPassword, setIsNewPassword] = useState(false);

  const { user, isLoading, error } = useSelector((state) => state.signup);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(signupUser(values)).then(({ payload }) => {
      if (payload) {
        setIsNewPassword(true);
      }
    });
  };

  const onFinishPassword = (values) => {
    console.log("Received values of form: ", values);
    dispatch(signupUser(values)).then(({ payload }) => {
      if (payload) {
        navigate("/dashboard"); // Redirect to dashboard on successful signup
      }
    });
  };

  return (
    <div className="centerWrapper">
      <div className="mainContainer">
        <img src="/images/app-logo.png" alt="Company Logo" style={logoStyle} />
        {isNewPassword ? (
          <Form
            {...formItemLayout}
            requiredMark={false}
            onFinish={onFinishPassword}
          >
            <Form.Item
              label="Old Password"
              name="password"
              rules={[
                { required: true, message: "Please input your old  password!" },
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
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "Please input your new password!" },
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
              label="Confirm Password"
              name="password"
              rules={[
                { required: true, message: "Please confrim your password!" },
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
              {isLoading ? (
                <Spin />
              ) : (
                <Button type="primary" htmlType="submit" style={buttonStyle}>
                  Create Password
                </Button>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: 0 }}>
              <div style={{ textAlign: "center" }}>
                Already have an account? <a href="/login">Login</a>
              </div>{" "}
              {/* Centered login link */}
            </Form.Item>
          </Form>
        ) : (
          <Form {...formItemLayout} requiredMark={false} onFinish={onFinish}>
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
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
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
              {isLoading ? (
                <Spin />
              ) : (
                <Button type="primary" htmlType="submit" style={buttonStyle}>
                  Sign In
                </Button>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: 0 }}>
              <div style={{ textAlign: "center" }}>
                Already have an account? <a href="/login">Login</a>
              </div>{" "}
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Login;
