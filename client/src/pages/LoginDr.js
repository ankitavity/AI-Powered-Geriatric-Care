import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  UserOutlined,
  LockOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

const LoginDr = () => {
  const navigate = useNavigate();

  const submitHandler = async (val) => {
    try {
      const resp = await axios.post(
        "http://192.168.88.150:7000/api/v1/dr/login",
        val
      );

      if (resp.data.success) {
        message.success(resp.data.message);
        const myObject = {
          _id: resp.data.data._id,
          email: resp.data.data.email,
          drName: resp.data.data.drName,
          drPhone: resp.data.data.drPhone,
        };
        window.localStorage.setItem("doctorDetails", JSON.stringify(myObject));
        navigate("/dr_details");
      } else {
        message.error(resp.data.message);
      }
    } catch (error) {
      message.error(error.message || "Login failed");
    }
  };

  return (
    <div className="login-page-dr">
      {/* Vibrant Hero Section with Animated Background */}
      <div className="hero-section-animated text-center py-5">
        <div className="animated-bg"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="hero-content p-4 rounded-lg">
                <div className="animated-icon-container mb-3">
                  <MedicineBoxOutlined className="animated-icon" />
                </div>
                <h1 className="display-4 fw-bold mb-3 text-white glow-text">
                  Doctor Portal
                </h1>
                <p className="lead text-white mb-4 highlight-text">
                  Welcome back to your medical dashboard
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Enhanced Colorful Login Card */}
      <Container className="mb-5 mt-n5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg login-card-enhanced">
              <div className="color-bar-animated"></div>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="floating-icon-circle mx-auto">
                    <MedicineBoxOutlined className="fs-1 text-white" />
                  </div>
                  <h2 className="gradient-text mb-3">Welcome Back, Doctor</h2>
                  <p className="text-muted">Access your patient dashboard</p>
                </div>

                <Form
                  layout="vertical"
                  onFinish={submitHandler}
                  className="login-form"
                >
                  <Form.Item
                    label={<span className="form-label">Email Address</span>}
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-primary" />}
                      type="email"
                      placeholder="doctor@example.com"
                      className="fancy-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="form-label">Password</span>}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="text-primary" />}
                      type="password"
                      placeholder="Enter your secure password"
                      className="fancy-input"
                    />
                  </Form.Item>

                  <Form.Item className="mb-3">
                    <button className="btn-glow w-100 py-3">
                      <span className="btn-text">Login to Dashboard</span>
                    </button>
                  </Form.Item>
                </Form>

                <div className="text-center mt-4">
                  <p className="forgot-password mb-3">
                    <a href="#" className="gradient-text-link">
                      Forgot password?
                    </a>
                  </p>
                  <div className="divider-fancy">
                    <span>New to the platform?</span>
                  </div>
                  <Link to="/register_dr" className="text-decoration-none">
                    <button className="btn-outline-fancy mt-3">
                      Create Doctor Account
                    </button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Colorful Benefits Section */}
      <Container className="benefits-section mb-5">
        <Row>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-1">
              <div className="benefit-icon">
                <i className="bi bi-clipboard-pulse"></i>
              </div>
              <h4>Patient Records</h4>
              <p>Access complete medical histories and treatment plans</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-2">
              <div className="benefit-icon">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h4>Schedule Management</h4>
              <p>Organize appointments and follow-ups efficiently</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-3">
              <div className="benefit-icon">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <h4>Secure Messaging</h4>
              <p>Communicate with patients and healthcare teams</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginDr;
