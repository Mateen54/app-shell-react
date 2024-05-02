// ClientModal.js
import React, { useState } from "react";
import {
  Modal,
  Steps,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Divider,
} from "antd";
const { Step } = Steps;
const { Option } = Select;

const ClientModal = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const stepsTitles = ["Company Info", "Contact Info", "Administrative Info"];

  const stepComponents = [
    <>
      <Form
        form={form}
        key="personal-info"
        layout="vertical"
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="e.g. John Doe" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Business"
              name="business"
              rules={[
                { required: true, message: "Please select your business" },
              ]}
            >
              <Select placeholder="Select business">
                <Option value="planner">Planner</Option>
                {/* More options here */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Industry"
              name="industry"
              rules={[
                { required: true, message: "Please select your industry" },
              ]}
            >
              <Select placeholder="Select industry">
                <Option value="planner">Planner</Option>
                {/* More options here */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Website URL"
          name="website"
          rules={[{ required: true, message: "Please enter your website URL" }]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Description goes here..." />
        </Form.Item>
      </Form>
      ,
      {/* <div className="centered-button">
        <Button
          onClick={handleNext}
          type="primary"
          style={{ backgroundColor: "blue", borderColor: "blue" }}
        >
          Next
        </Button>
      </div> */}
    </>,
    <>
      <Form form={form} key="contact-details" layout="vertical">
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Please enter your email address" },
          ]}
        >
          <Input placeholder="e.g. example@example.com" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="e.g. 555-1234" />
        </Form.Item>
        <Form.Item
          label="Physical Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input placeholder="e.g. 123 Main St" />
          <Input
            style={{ marginTop: "10px" }}
            placeholder="Apartment, studio, or floor"
          />
        </Form.Item>
      </Form>
      {/* <div
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
          style={{ backgroundColor: "blue", borderColor: "blue" }}
        >
          Next
        </Button>
      </div> */}
    </>,
  ];

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep((current) => current + 1);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handlePrev = () => {
    setCurrentStep((current) => current - 1);
  };

  const handleFinish = (values) => {
    console.log("Received values of form: ", values);
    onClose();
  };

  // The rest of your stepComponents and modal code here...

  return (
    <Modal
      title="Add Client"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={841}
      className="add-client-modal"
    >
      <Divider />
      <Steps current={currentStep}>
        {stepsTitles.map((title, index) => (
          <Step
            key={title}
            title={
              <span>
                <span>{title}</span>
                {index < stepsTitles.length - 1 && (
                  <img src="/images/arrow-right.png" />
                )}
              </span>
            }
            icon={currentStep === index ? null : undefined}
          />
        ))}
      </Steps>
      <div className="steps-content">{stepComponents[currentStep]}</div>
      <div className="steps-action">
        <div className="steps-action">
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentStep < stepsTitles.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentStep === stepsTitles.length - 1 && (
            <Button
              type="primary"
              onClick={() => console.log("Form Submitted")}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ClientModal;
