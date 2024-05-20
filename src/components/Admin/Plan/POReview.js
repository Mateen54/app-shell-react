import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Typography, Checkbox, message } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { approvedPO } from "../../../features/Plan/approvedPOSlice";
import "./lostPlain.css";
import { useNavigate } from "react-router-dom";

import { resetStatusPO } from "../../../features/Plan/approvedPOSlice";

const { Text, Title } = Typography;

const POReview = () => {
  const navigate = useDispatch();
  const dispatch = useDispatch();
  const res = useSelector((state) => state.fetchPO);
  const approvedPORes = useSelector((state) => state.approvedPO);
  const [selectedPO, setSelectedPO] = useState(null);
  const [localPayOrders, setLocalPayOrders] = useState([]);
  const [approvalInitiated, setApprovalInitiated] = useState(false);

  useEffect(() => {
    if (res.items && res.items.payOrders) {
      setLocalPayOrders(res.items.payOrders);
      if (res.items.payOrders.length === 1) {
        setSelectedPO(res.items.payOrders[0]);
      }
    }
  }, [res.items]);

  useEffect(() => {
    if (approvedPORes.status === "succeeded") {
      message.success("PO Approved Successfully");
      if (selectedPO) {
        const updatedPayOrders = localPayOrders.map((order) =>
          order.payment_order_id === selectedPO.payment_order_id
            ? { ...order, status: "accepted" }
            : order
        );
        setLocalPayOrders(updatedPayOrders);
        setSelectedPO(null);
        dispatch(resetStatusPO());

        setTimeout(() => {
          navigate("/plan");
        }, 500);
      }
    } else if (approvedPORes.status === "failed") {
      message.error(approvedPORes.error || "Failed to Approve PO");
      dispatch(resetStatusPO());
    }
  }, [approvedPORes.status]);

  if (!res.items || !res.items.payOrders) {
    return <div>Loading...</div>;
  }

  const approvePO = () => {
    if (selectedPO) {
      if (selectedPO.status === "accepted") {
        alert("Already Accepted");
      } else {
        dispatch(approvedPO(selectedPO.payment_order_id));
        setApprovalInitiated(true); // Set approval initiated flag
      }
    } else {
      alert("Please select a PO");
    }
  };

  const rejectPO = () => {
    if (selectedPO) {
      alert("PO Rejected: " + selectedPO.payment_order_id);
      // Dispatch your reject PO action here
    } else {
      alert("Please select a PO");
    }
  };

  const handleCheckboxChange = (checked, order) => {
    if (checked) {
      setSelectedPO(order);
    } else {
      setSelectedPO(null);
    }
  };

  const isButtonDisabled = () => {
    return (
      !selectedPO ||
      (localPayOrders.length === 1 && selectedPO.status === "accepted")
    );
  };

  return (
    <>
      <h1
        style={{
          margin: "0px",
          padding: "0px",
          color: "#294799",
          fontSize: "20px",
          marginTop: "30px",
          fontFamily: "gothamBook",
          paddingLeft: "15px",
        }}
      >
        PO Review
      </h1>
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

      <Row justify="space-between" align="middle" style={{ padding: "25px" }}>
        <Col>
          <Title
            level={2}
            style={{
              margin: "0px",
              padding: "0px",
              color: "#294799",
              fontSize: "20px",
              fontFamily: "gothamBook",
            }}
          >
            Files
          </Title>
        </Col>
        <Col>
          <Button
            onClick={rejectPO}
            disabled={isButtonDisabled()}
            style={{
              marginRight: "10px",
              border: isButtonDisabled()
                ? "1px solid #d3d3d3"
                : "1px solid #FF3B30",
              color: isButtonDisabled() ? "#d3d3d3" : "#FF3B30",
              width: "150px",
              height: "40px",
              fontFamily: "gothamBook",
            }}
          >
            Reject PO
          </Button>
          <Button
            onClick={approvePO}
            disabled={isButtonDisabled()}
            style={{
              background: isButtonDisabled() ? "#d3d3d3" : "#294799",
              color: "white",
              width: "150px",
              height: "40px",
              fontFamily: "gothamBook",
            }}
          >
            Approve
          </Button>
        </Col>
      </Row>

      {localPayOrders.length === 0 ? (
        <Title
          level={2}
          style={{
            margin: "0px",
            padding: "0px",
            color: "#294799",
            fontSize: "20px",
            fontFamily: "gothamBook",
            padding: "15px",
          }}
        >
          No PO Available
        </Title>
      ) : (
        <Row style={{ marginLeft: "10px" }} justify="start">
          {localPayOrders.map((order, index) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={6}
                style={{ padding: "8px" }}
              >
                <Card
                  className="lost-plain"
                  style={{
                    borderRadius: 8,
                    border: "2px solid #A3A3A3",
                    padding: "0px",
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Checkbox
                        checked={
                          selectedPO?.payment_order_id ===
                            order.payment_order_id ||
                          order.status === "accepted"
                        }
                        onChange={(e) =>
                          handleCheckboxChange(e.target.checked, order)
                        }
                        disabled={order.status === "accepted"}
                      ></Checkbox>

                      <Text
                        strong
                        style={{
                          fontSize: 16,
                          color: "#294799",
                          marginLeft: "10px",
                        }}
                      >
                        PO {order.payment_order_id}
                      </Text>
                    </Col>
                    <Col>
                      {order.status === "accepted" ? (
                        <CheckCircleOutlined
                          style={{ fontSize: "20px", color: "#52c41a" }}
                        />
                      ) : (
                        <ClockCircleOutlined
                          style={{ fontSize: "20px", color: "#faad14" }}
                        />
                      )}
                    </Col>
                  </Row>

                  <Row
                    justify="center"
                    align="middle"
                    style={{
                      backgroundColor: "#E0E7FF",
                      borderRadius: 8,
                      padding: "20px",
                      border: "2px solid #294799",
                    }}
                  >
                    <a href={order.pay_order_file} download>
                      <Col>
                        <img
                          src="/images/document-upload.png"
                          alt="Document Upload"
                          style={{ width: 60, height: 60 }}
                        />
                      </Col>
                    </a>
                  </Row>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong style={{ color: "#000" }}>
                        Created At
                      </Text>
                    </Col>
                    <Col>
                      <Text>{formattedDate}</Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default POReview;
