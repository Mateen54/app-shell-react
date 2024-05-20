import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./login.css"; // Ensure your CSS file is correctly linked
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInUser, clearError } from "../../features/SignIn/signInSlice.js";

import { createPassword } from "../../features/CreatePassword/createPassworsSlice.js";

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
  fontFamily: "gothamMedium",
  fontWeight: 500,
  border: "1px solid #C8C4C4",
};

// Adjusted buttonStyle to have 100% width
const buttonStyle = {
  width: "150px", // Button will fill the width of its container
  height: "40px",
  marginTop: "35px",
  borderRadius: "10px",
  backgroundColor: "#294799",
  color: "#ffffff",
  fontFamily: "gothamBook",
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
  const [errorDisplayed, setErrorDisplayed] = useState("EWQ");

  const { user, isLoading, error } = useSelector((state) => state.signIn);

  // console.log(user.data.isAdmin);
  // console.log(user.data.isPasswordUpdated);
  // console.log(user.data.token);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(signInUser(values))
      .then(({ payload }) => {
        if (payload) {
          console.log("User data:", payload);
          if (payload.userData.isAdmin === "Y") {
            localStorage.setItem("authToken", payload.userData.token);
            localStorage.setItem("userRoles", "admin");
            navigate("/brief-management");
          } else {
            if (payload.userData.isPasswordUpdated === "Y") {
              localStorage.setItem("authToken", payload.userData.token);

              navigate("/brief-management");
            } else {
              setIsNewPassword(true);
            }
          }
        } else {
          console.log("No payload received, handle accordingly");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Optionally handle errors, e.g., display an error message
      });
  };

  const onFinishPassword = (values) => {
    console.log("Received values of form: ", values);
    const token = user.token;
    dispatch(createPassword({ userData: values, token })).then(
      ({ payload }) => {
        if (payload) {
          console.log("payload", payload);
          localStorage.setItem("authToken", token);

          navigate("/dashboard");
        }
      }
    );
  };

  useEffect(() => {
    if (error) {
      message.error(error);

      setTimeout(() => dispatch(clearError()), 1000);
    }
  }, [error, dispatch]);

  return (
    <>
      <div className="centerWrapper">
        <div className="mainContainer">
          <img
            src="/images/app-logo.png"
            alt="Company Logo"
            style={logoStyle}
          />
          {isNewPassword ? (
            <Form
              {...formItemLayout}
              requiredMark={false}
              onFinish={onFinishPassword}
            >
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your old  password!",
                  },
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
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
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
                name="confirmPassword"
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
              <Form.Item
                wrapperCol={{ ...formItemLayout.wrapperCol, offset: 0 }}
              >
                <div style={{ textAlign: "center" }}>
                  Already have an account? <a href="/login">Login</a>
                </div>{" "}
                {/* Centered login link */}
              </Form.Item>
            </Form>
          ) : (
            <Form {...formItemLayout} requiredMark={false} onFinish={onFinish}>
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "gothamMedium",
                  marginTop: "40px",
                  marginBottom: "40px",
                  fontWeight: 500,
                }}
              >
                SIGN IN
              </h2>
              <Form.Item
                label="Email"
                name="emailAddress"
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
                  <Spin style={{ marginTop: "30px" }} />
                ) : (
                  <Button type="primary" htmlType="submit" style={buttonStyle}>
                    Sign In
                  </Button>
                )}
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
